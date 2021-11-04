import { createGlobalStyle } from 'styled-components';
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro';

const CustomStyles = createGlobalStyle`
  html{
    scroll-behavior: smooth;
  }
  body {
    font-family: 'Be Vietnam Pro', sans-serif;
  }
  #__next{
    position: relative;
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
