/* eslint-disable react-hooks/exhaustive-deps */
import { memo, FC, useEffect, useCallback } from "react";
import { Wrap, WrapItem, Spinner, Center, useDisclosure } from '@chakra-ui/react'

import { UserCard } from "../organisms/layout/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../organisms/layout/user/UserDetailModal";

export const UserManagement: FC = memo(() => {
  const { getUsers, loading, users } = useAllUsers();
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => getUsers(), []);

  const onClickUser = useCallback(() => onOpen(), []);

  return (
    <>
      {loading ? (
          <Center h="100vh">
            <Spinner />
          </Center>
        ) : (
          <Wrap p={{ base: 4, md: 10 }}>
            {users.map((user) => (
              <WrapItem key={user.id} mx="auto">
                <UserCard imageUrl="https://source.unsplash.com/random" userName={user.username} fullName={user.name} onClick={onClickUser} />
                <UserDetailModal isOpen={isOpen} onClose={onClose} userName={user.username} fullName={user.name} userEmail={user.email} userTel={user.phone} />
              </WrapItem>
            ))}
          </Wrap>
      )}
    </>
  );
});
