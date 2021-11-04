import Button from 'design/Button';
import Logo from 'design/Logo';
import styled from 'styled-components';
import tw from 'twin.macro';
import Input from './components/Input';
import Image from 'next/image';

const LoginContainer = tw.main`h-[100vh] w-[100vw] flex items-center`;
const LoginBox = tw.div`grid md:grid-cols-2 rounded-md shadow-2xl min-h-[620px] xl:max-w-[60vw] min-w-[80vw] sm:min-w-[60vw] mx-auto`;
const LogoContainer = tw.div`text-center mt-20`;
const LoginForm = tw.form`mx-10 lg:mx-20 mt-12 grid gap-4`;
const ButtonContainer = tw.div`text-center grid gap-4`;
const FormControl = tw.div`flex justify-between`;
const SavePass = styled.div`
  label {
    padding-left: 10px;
  }
`;
const ForgetPass = tw.div``;
const RuleContent = tw.div`mt-20 text-center`;
const ColorText = tw.span`text-blue-600`;

const Mobile = tw.div``;
const ImageContainer = styled.div(() => [
  `img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }`,
  tw`hidden md:block`,
]);

const LoginPage = () => {
  return (
    <LoginContainer>
      <LoginBox>
        <ImageContainer>
          <img src="https://cdn.dribbble.com/users/949981/screenshots/16123153/media/1063bc72b4c7d1b694aeb93e5a300a2f.png?compress=1&resize=1200x900" />
        </ImageContainer>
        <Mobile>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <LoginForm>
            <Input
              name="username"
              title="Tên đăng nhập"
              type="text"
              onChange={(value, ref) => {}}
              placeholder="Tên đăng nhập"
            />
            <Input
              name="username"
              title="Mật khẩu"
              type="text"
              onChange={(value, ref) => {}}
              placeholder="Mật khẩu"
            />
            <FormControl>
              <SavePass>
                <input type="checkbox" name="savepass" id="savepass" />
                <label htmlFor="savepass">Lưu mật khẩu</label>
              </SavePass>
              <ForgetPass>Quên mật khẩu</ForgetPass>
            </FormControl>
            <ButtonContainer>
              <Button variant="container"> Đăng nhập</Button>
              <Button variant="text"> Đăng kí</Button>
            </ButtonContainer>
          </LoginForm>
          <RuleContent>
            Bằng cách đăng ký, bạn đồng ý với Summon về
            <br />
            <ColorText>Điều khoản và Điều kiện </ColorText>&
            <ColorText> Chính sách Bảo mật</ColorText>
          </RuleContent>
        </Mobile>
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginPage;
