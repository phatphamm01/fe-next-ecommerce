import { FC, useState, createContext } from "react";
import tw from "twin.macro";
import styled from "styled-components";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const CreateContainer = styled.div`
  ${tw``}
`;

interface ICreate {
  closePopup: () => void;
  handleGetAllPassbook: () => void;
}

interface IData {
  deposits: number;
  option: number;
  profit: number;
  suggest: number;
  totalProfit: number;
  depositinpassbook: number;
  profitinpassbook: number;
  annual: {
    option?: number;
    value?: number;
  };
}

interface IPassBook {
  data?: IData;
  setStep?: (num: number) => void;
  setData?: (data: any) => void;
}

export const CreatePassBookContext = createContext<IPassBook>({});

const Create: FC<ICreate> = ({ closePopup, handleGetAllPassbook }) => {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState();

  const handleChangeStep = (num: number) => {
    setStep(num);
  };
  const handleSetData = (data: any) => {
    setData(data);
  };

  return (
    <CreatePassBookContext.Provider
      value={{
        data: data,
        setData: handleSetData,
        setStep: handleChangeStep,
      }}
    >
      <CreateContainer>
        {step === 1 && <StepOne closePopup={closePopup} />}
        {step === 2 && (
          <StepTwo
            handleGetAllPassbook={handleGetAllPassbook}
            closePopup={closePopup}
          />
        )}
      </CreateContainer>
    </CreatePassBookContext.Provider>
  );
};

export default Create;
