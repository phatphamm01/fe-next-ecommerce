import Button from "@design/Button";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SignupContext } from "..";

const StepTwoContainer = styled.div`
  ${tw`text-center mt-16 text-gray-700`}
`;
const Form = styled.div`
  ${tw`h-full grid py-10 grid-rows-[260px 1fr]`}
`;
const OneMessage = styled.p`
  ${tw`text-xl font-medium`}
`;
const TwoMessage = styled.p`
  ${tw``}
`;
const Link = styled.a`
  ${tw`text-red-400 cursor-pointer`}
`;
interface IStepTwo {}

export interface IDataStepTwo {
  firstName?: string;
  lastName?: string;
  cmnd: string;
}

const StepTwo: FC<IStepTwo> = () => {
  const router = useRouter();
  const { data, setData, setStepNumber } = useContext(SignupContext);

  return (
    <StepTwoContainer>
      <Form>
        <div>
          <OneMessage>Chúc mừng bạn đã đăng ký thành công </OneMessage>
          <TwoMessage>
            Vui lòng đăng nhập vào gmail (
            <Link href="http://www.gmail.com">{data?.email}</Link>) để xác thực
            quá trình đăng ký.
          </TwoMessage>
        </div>
        <Button
          type="button"
          onClick={() => {
            router.push("/login");
          }}
          variant="container"
        >
          Đăng nhập
        </Button>
        <Button
          type="button"
          onClick={() => {
            setStepNumber?.(3);
          }}
          variant="text"
        >
          Quay lại
        </Button>
      </Form>
    </StepTwoContainer>
  );
};

export default StepTwo;
