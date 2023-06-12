import { memo, ReactNode, FC } from 'react';

import { Header } from '../organisms/layout/Header';

type Props = {
  children: ReactNode;
}


export const HeadeLayout: FC<Props> = memo((props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  )
});
