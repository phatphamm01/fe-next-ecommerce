import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Layout from "../components/Layout";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import Verify from "./Verify";

const SignupForm = styled.div`
  ${tw`mx-20 2xl:mx-10 lg:mx-10 sm:mx-10 mt-12 grid gap-4`}
`;
const RuleContent = styled.div`
  ${tw`mt-20 pb-4 text-center`}
`;
const ColorText = styled.span`
  ${tw`text-blue-600`}
`;

interface IData {
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  CMND?: string;
  district?: { code: string; name: string };
  province?: { code: string; name: string };
  ward?: { code: string; name: string };
}

interface ISignupContext {
  data?: IData;
  setData?: Dispatch<SetStateAction<IData | undefined>>;
  stepNumber: number;
  setStepNumber?: Dispatch<SetStateAction<number>>;
}

export const SignupContext = createContext<ISignupContext>({
  stepNumber: 1,
});

const Signup = () => {
  const [data, setdata] = useState<IData>();
  const [stepNumber, setStepNumber] = useState<number>(1);

  useEffect(() => {}, []);

  return (
    <Layout>
      <SignupContext.Provider
        value={{
          data: data,
          stepNumber: stepNumber,
          setData: setdata,
          setStepNumber: setStepNumber,
        }}
      >
        <SignupForm>
          {stepNumber === 1 && <StepOne />}
          {stepNumber === 2 && <StepTwo />}
          {stepNumber === 3 && <StepThree />}
          {stepNumber === 4 && <Verify />}
        </SignupForm>
        {stepNumber === 1 && (
          <RuleContent>
            Bằng cách đăng ký, bạn đồng ý với Summon về
            <br />
            <ColorText>Điều khoản và Điều kiện </ColorText>&
            <ColorText> Chính sách Bảo mật</ColorText>
          </RuleContent>
        )}
      </SignupContext.Provider>
    </Layout>
  );
};

export default Signup;
