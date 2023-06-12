import { Button } from '@chakra-ui/react';
import { memo, FC, ReactNode } from 'react';


type Props = {
  children: ReactNode;
  loading?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

export const PrimaryButton: FC<Props> = memo((props) => {
  const { children, onClick, isDisabled = true, loading = false } = props;
  return (
    <Button
      bg="teal.400"
      color="white"
      _hover={{ opacity: "0.8" }}
      isDisabled={isDisabled}
      onClick={onClick}
      isLoading={loading}
    >
      {children}
    </Button>
  )
});
