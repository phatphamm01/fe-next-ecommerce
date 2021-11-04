import { ReactChild } from 'react';
import tw from 'twin.macro';

const TitleContainer = tw.h3`text-3xl font-bold text-red-500`;
interface ITitle {
  children: ReactChild;
}

const Title = ({ children }: ITitle) => {
  return <TitleContainer>{children}</TitleContainer>;
};

export default Title;
