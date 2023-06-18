import { Stack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { memo, FC, useContext, useState, ChangeEvent, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/react'
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
  const [username, setUsername] = useState(user?.username);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);

  const isAdminFlag = loginUser?.isAdmin;

  useEffect(() => {
    setUsername(user?.username ?? "");
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPhone(user?.phone ?? "");
  }, [user])

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);

  const onClickUpdate = () => {
    alert("update!");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>ユーザー情報</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>名前</FormLabel>
              <Input value={username} onChange={onChangeUsername} isReadOnly={!isAdminFlag} />
            </FormControl>
            <FormControl>
              <FormLabel>フルネーム</FormLabel>
              <Input value={name} onChange={onChangeName} isReadOnly={!isAdminFlag} />
            </FormControl>
            <FormControl>
              <FormLabel>MAIL</FormLabel>
              <Input value={email} onChange={onChangeEmail} isReadOnly={!isAdminFlag} />
            </FormControl>
            <FormControl>
              <FormLabel>TEL</FormLabel>
              <Input value={phone} onChange={onChangePhone} isReadOnly={!isAdminFlag} />
            </FormControl>
            <ModalFooter>
              {isAdminFlag && (
                <PrimaryButton onClick={onClickUpdate} isDisabled={false}>更新</PrimaryButton>
              ) }
            </ModalFooter>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
