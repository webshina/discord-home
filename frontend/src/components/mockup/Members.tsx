import { UserProfileCard } from './UserProfileCard';
import { GuildMemberItem } from './types/DiscordMember';

type Props = {
  discordMembers: GuildMemberItem[];
};
export const Members: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start">
      {props.discordMembers.map((discordMember) => (
        <div className="m-2" key={discordMember.id}>
          <UserProfileCard discordMember={discordMember} />
        </div>
      ))}
    </div>
  );
};
