/* eslint-disable react-hooks/exhaustive-deps */
import { memo, FC, useEffect, useCallback, useContext } from "react";
import { Wrap, WrapItem, Spinner, Center, useDisclosure } from '@chakra-ui/react'

import { UserCard } from "../organisms/layout/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../organisms/layout/user/UserDetailModal";
import { useSelectedUser } from "../../hooks/useSelectedUser";
import { LoginUserContext } from "../../provider/LoginUserProvider";

export const UserManagement: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { getUsers, loading, users } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectedUser();
  const { loginUser } = useContext(LoginUserContext);

  console.log(loginUser);

  useEffect(() => getUsers(), []);

  const onClickUser = useCallback((id: number) => {
    onSelectUser({ id, users, onOpen });
  }, [users]);


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
                <UserCard imageUrl="https://source.unsplash.com/random" id={user.id} userName={user.username} fullName={user.name} onClick={onClickUser} />
              </WrapItem>
            ))}
          </Wrap>
      )}
      <UserDetailModal user={selectedUser} isOpen={isOpen} onClose={onClose} />
    </>
  );
});
