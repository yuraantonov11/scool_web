import { FC, ReactNode, Suspense as ReactSuspense } from 'react';
import Spinner from '../spinner/Spinner';

interface Props {
  children: ReactNode;
}
const Suspense: FC<Props> = ({ children }) => {
  return <ReactSuspense fallback={<Spinner />}>{children}</ReactSuspense>;
};

export default Suspense;
