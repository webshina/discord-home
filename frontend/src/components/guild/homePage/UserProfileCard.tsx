import { GuildMemberItem } from '#/common/types/Guild';
import { ActivityLevel } from '@/components/common/ActiveLevel';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { UserProfile } from './UserProfile';

type Props = {
  discordMember: GuildMemberItem;
};

export const UserProfileCard: React.FC<Props> = (props) => {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  return (
    <>
      <Modal
        closeOnOverlayClick={true}
        isOpen={isOpenModal}
        onClose={onCloseModal}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent bgColor="transparent">
          <ModalBody className="flex justify-center items-center">
            <UserProfile discordMember={props.discordMember} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <button id="user-profile-card" onClick={onOpenModal}>
        <div className="flex flex-col rounded-xl">
          <div className="flex h-[150px]">
            {/* User image */}
            <div className="relative w-[150px]">
              <Image
                src={props.discordMember.avatarURL ?? '/images/no_image.jpeg'}
                alt="image"
                layout="fill"
                objectFit="cover"
                className="rounded-l-xl"
              />
            </div>
            <div className="flex flex-col items-start w-[200px] p-3 bg-slate-900 rounded-r-xl">
              <div className="text-base font-bold">
                {props.discordMember.displayName}{' '}
                <span className="text-xs font-light">
                  {props.discordMember.name}
                </span>
              </div>
              <div className="h-2" />

              {/* Active */}
              <ActivityLevel level={props.discordMember.activityScore ?? 0} />
            </div>
          </div>
        </div>
      </button>
    </>
  );
};
