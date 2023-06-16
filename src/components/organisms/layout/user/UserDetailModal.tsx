import { Stack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { memo, FC, useContext } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { User } from '../../../../types/api/user';
import { LoginUserContext } from '../../../../provider/LoginUserProvider';
import { PrimaryButton } from '../../../atoms/PrimaryButton';

type Props = {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailModal: FC<Props> = memo((props) => {
  const { user, isOpen, onClose } = props;
  const { loginUser } = useContext(LoginUserContext);

  const isAdminFlag = loginUser?.isAdmin;
  console.log(isAdminFlag);

  const onClickUpdate = () => {
    alert("you're admin!");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
      <ModalOverlay />
      <ModalContent pb={6}>
        <ModalHeader>ユーザー情報</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>名前</FormLabel>
              <Input value={user?.username} isReadOnly={!isAdminFlag} />
            </FormControl>
            <FormControl>
              <FormLabel>フルネーム</FormLabel>
              <Input value={user?.name} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>MAIL</FormLabel>
              <Input value={user?.email} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>TEL</FormLabel>
              <Input value={user?.phone} isReadOnly />
            </FormControl>
            {isAdminFlag && <PrimaryButton onClick={onClickUpdate} isDisabled={false}>更新</PrimaryButton>}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
