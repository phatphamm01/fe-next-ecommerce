import useLeave from "@hook/useLeave";
import { AnyAction, createSlice } from "@redux-ts-starter-kit/slice";
import {
  createContext,
  Dispatch,
  FC,
  useEffect,
  useReducer,
  useState,
} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import checkNullObject from "../../common/function/checkNullObject";
import ATMLayout from "./components/Layout";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const ATMContainer = styled.div`
  ${tw`min-h-[100vh] min-w-[100vw] flex justify-center items-center`}
  background-image: url("https://toigingiuvedep.vn/wp-content/uploads/2021/08/background-anime-duong-pho-ve-dem.jpeg");
`;
const ATMView = styled.div`
  ${tw`w-full h-full`}
`;
const OffBox = styled.div`
  ${tw`w-full h-full flex items-center justify-center pointer-events-none`}
`;
const GreetingMessage = styled.span`
  ${tw`text-red-600 text-xl font-bold text-center pb-10 `}
`;

interface IATM {}

interface IDataUser {
  token: string;
  data: any;
}
interface IATMContext {
  state?: {
    step: number;
    dataUser: {
      token: string;
      data: any;
    };
  };
  dispatch?: Dispatch<AnyAction<string>>;
  handleClose?: () => void;
}

const initialState = {
  step: 1,
  dataUser: {
    token: "",
    data: {},
  },
};

const AtmSlice = createSlice({
  name: "atm",
  initialState,
  cases: {
    setDataUser: (state, action: { payload: IDataUser }) => {
      state.dataUser = action.payload;
      if (!checkNullObject(action.payload)) {
        state.step = 2;
      }
    },
    clearDataUser: (state) => {
      state.step = 1;
      state.dataUser = {
        token: "",
        data: {},
      };
    },
  },
});

const AtmReducer = AtmSlice.reducer;
export const { setDataUser, clearDataUser } = AtmSlice.actions;
export const ATMContext = createContext<IATMContext>({});

const ATM: FC<IATM> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [state, dispatch] = useReducer(AtmReducer, initialState);

  useEffect(() => {
    if (!isOpen) {
      dispatch(clearDataUser());
    }
  }, [isOpen]);

  try {
    useLeave("/atm", isOpen);
  } catch (error) {
    console.log(error);
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ATMContext.Provider value={{ state, dispatch, handleClose }}>
      <ATMContainer>
        <ATMLayout>
          <ATMLayout.View>
            <ATMView>
              {!isOpen && (
                <OffBox>
                  <GreetingMessage>
                    Chào mừng bạn đến với ATM Virtual <br />
                    Vui lòng khởi động để sử dụng dịch vụ
                  </GreetingMessage>
                </OffBox>
              )}
              {isOpen && (
                <>
                  {state.step === 1 && <StepOne />}
                  {state.step === 2 && <StepTwo />}
                </>
              )}
            </ATMView>
          </ATMLayout.View>
          <ATMLayout.Control handleButton={handleOpen} active={isOpen} />
        </ATMLayout>
      </ATMContainer>
    </ATMContext.Provider>
  );
};

export default ATM;
