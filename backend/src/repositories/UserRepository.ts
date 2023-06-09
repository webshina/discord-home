import { UserItem } from '#/common/types/User';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import axios from 'axios';
import { Request } from 'express';
import { GuildMemberRepository } from './GuildMemberRepository';

export class UserRepository {
  static async format(user: User) {
    const guildMembers = await prisma.guildMember.findMany({
      where: {
        userId: user.id,
      },
      include: {
        guild: true,
      },
    });
    const userItem: UserItem = {
      id: user.id,
      discordId: user.discordId,
      discordAccessToken: user.discordAccessToken,
      guilds: guildMembers.map((guildMember) => ({
        id: guildMember.guild.id,
        discordId: guildMember.guild.discordId,
        name: guildMember.guild.name,
        isPrivate: guildMember.guild.isPrivate,
        iconURL: guildMember.guild.iconURL,
        permissions: Number(guildMember.permissions),
        isOwner: GuildMemberRepository.hasPermission(
          Number(guildMember.permissions),
          'ADMINISTRATOR'
        ),
        isManager: GuildMemberRepository.hasPermission(
          Number(guildMember.permissions),
          'MANAGE_GUILD'
        ),
      })),
    };

    return userItem;
  }

  static async getById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) throw new Error('User not found');
    return this.format(user);
  }

  static async getByAccessToken(accessToken: string) {
    if (!accessToken) return null;

    const user = await prisma.user.findUnique({
      where: {
        discordAccessToken: accessToken,
      },
    });

    if (!user) return null;

    return this.format(user);
  }

  static async getLoginUser(req: Request) {
    const user = await this.getByAccessToken(req.cookies.accessToken);
    return user;
  }

  static async fetchAdminGuilds(userId: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new Error('User not found');

    // Get guilds that the user is an admin of
    const { data: fetchedGuilds } = await axios.get(
      'https://discord.com/api/users/@me/guilds',
      {
        headers: {
          authorization: `Bearer ${user.discordAccessToken}`,
        },
      }
    );

    const adminGuilds: {
      id: number;
      discordId: string;
      name: string;
    }[] = [];
    for (const fetchedGuild of fetchedGuilds) {
      if (
        GuildMemberRepository.hasPermission(
          fetchedGuild.permissions,
          'MANAGE_GUILD'
        )
      ) {
        adminGuilds.push({
          id: fetchedGuild.id,
          discordId: fetchedGuild.id,
          name: fetchedGuild.name,
        });
      }
    }

    return adminGuilds;
  }
}
