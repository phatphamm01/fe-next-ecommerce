import Logo from "@design/Logo";
import { useRouter } from "next/router";
import { CSSProperties, FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const AuthContainer = styled.main`
  ${tw`h-[100vh] w-[100vw] flex items-center`}
`;
const AuthBox = styled.div`
  ${tw`min-h-[794px] max-w-[60vw] 2xl:max-w-[80vw] xl:max-w-[90vw] grid grid-cols-2 md:grid-cols-1 rounded-md shadow-2xl mx-auto w-full`}
`;
const LogoContainer = styled.div`
  ${tw`text-center mt-20`}
`;

const Mobile = styled.div`
  ${tw``}
`;
const ImageContainer = styled.div`
  ${tw`md:hidden block`}
  img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

interface ILayout {
  styleAuthBox?: CSSProperties;
}

const Layout: FC<ILayout> = ({ styleAuthBox, children }) => {
  const router = useRouter();

  const checkToken = localStorage.getItem("token");
  if (checkToken) {
    router.push("/user");
  }

  return (
    <AuthContainer>
      <AuthBox style={styleAuthBox}>
        <ImageContainer>
          <img src="https://cdn.dribbble.com/users/949981/screenshots/16123153/media/1063bc72b4c7d1b694aeb93e5a300a2f.png?compress=1&resize=1200x900" />
        </ImageContainer>
        <Mobile>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          {children}
        </Mobile>
      </AuthBox>
    </AuthContainer>
  );
};

export default Layout;
