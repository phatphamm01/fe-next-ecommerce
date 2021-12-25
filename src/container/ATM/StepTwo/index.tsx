import { numberToMoneyVer2 } from "@common/function/convertStringToMoney";
import Button from "@design/Button";
import fetchAtm from "@services/atm/index";
import { message, Modal } from "antd";
import "antd/dist/antd.css";
import { Formik } from "formik";
import { FC, useContext, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import * as Yup from "yup";
import { setDataUser } from "..";
import { ATMContext } from "../index";

const StepTwoContainer = styled.div`
  ${tw``}
`;

const StepTwoBox = styled.form`
  ${tw`flex flex-col gap-4 max-w-[320px] mx-auto mt-6`}
`;
const Title = styled.p`
  ${tw`text-center font-medium text-red-600 text-xl`}
`;
const MoneyBox = styled.div`
  ${tw`relative h-6`}
`;
const Money = styled.p`
  ${tw`absolute w-[100vw] text-center text-red-500`}
  left: 50%;
  transform: translateX(-50%);
`;
const InputContainer = styled.div`
  ${tw``}
`;
const InputBox = styled.div`
  ${tw`border-2 border-red-400 rounded-lg`}
`;
const Input = styled.input`
  ${tw`outline-none bg-transparent w-full h-full py-3 px-3 text-red-600`}

  &::placeholder {
    ${tw`text-red-300 font-light`}
  }
`;
const ControlBox = styled.div`
  ${tw``}
`;
const ErrorMessage = styled.div`
  ${tw`text-red-500 pt-1 min-h-[0.75rem] text-xs`}
`;

interface IStepTwo {}

const StepTwo: FC<IStepTwo> = () => {
  const { state, dispatch, handleClose } = useContext(ATMContext);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOk = () => {
    setIsPopup(false);
  };

  const handleCancel = () => {
    setIsPopup(false);
    handleClose?.();
  };

  return (
    <StepTwoContainer>
      <Modal
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Có"
        cancelText="Không"
        title="Thông báo"
        visible={isPopup}
      >
        <p>Quá trình nạp tiền thành công</p>
        <p>Bạn có muốn tiếp tục thực hiện giao dịch không ?</p>
      </Modal>
      <Formik
        initialValues={{
          money: "",
        }}
        validationSchema={Yup.object().shape({
          money: Yup.string()
            .min(6, "Số tiền nạp phải lớn hơn 10,000")
            .matches(/(?=.*[0-9])/, "Vui lòng nhập chính xác")
            .required("Vui lòng nhập số tiền muốn nạp"),
        })}
        onSubmit={async (values, { resetForm }) => {
          try {
            setLoading(true);
            let numb = values.money.match(/\d|e/g);
            let numberClear = numb ? numb.join("") : "";
            await fetchAtm.addmoney(state?.dataUser.token!, {
              vnd: Number(numberClear),
            });

            dispatch?.(
              setDataUser({
                payload: {
                  ...state?.dataUser!,
                  data: {
                    ...state?.dataUser.data,
                    currentMoney:
                      Number(numberClear) +
                      Number(state?.dataUser.data.currentMoney),
                  },
                },
              })
            );
            resetForm();
            message.success("Nạp tiền thành công");
            setIsPopup(true);
          } catch (error) {
          } finally {
            setLoading(false);
          }
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,

            handleBlur,
            handleSubmit,
            setFieldValue,
          } = props;

          return (
            <StepTwoBox onSubmit={handleSubmit}>
              <Title>
                Xin chào <b>{state?.dataUser?.data.fullName}</b>
              </Title>
              <MoneyBox>
                <Money>
                  Tài khoản của bạn có:{" "}
                  {numberToMoneyVer2(state?.dataUser?.data.currentMoney - 0)}{" "}
                  VND
                </Money>
              </MoneyBox>
              <InputContainer>
                <InputBox>
                  <Input
                    autoComplete="off"
                    name="money"
                    onChange={(ev: any) => {
                      let numb = ev.target.value.match(/\d|e/g);
                      let numberClear = numb ? numb.join("") : "";

                      setFieldValue(
                        "money",
                        numberClear === ""
                          ? ""
                          : numberToMoneyVer2(Number(numberClear))
                      );
                    }}
                    onBlur={handleBlur}
                    value={values.money}
                    placeholder="Nhập số tiền muốn nạp"
                  />
                </InputBox>
                {errors.money && touched.money && (
                  <ErrorMessage>{errors.money}</ErrorMessage>
                )}
              </InputContainer>
              <ControlBox>
                <Button disabled={loading} type="submit" variant="container">
                  Nạp tiền
                </Button>
              </ControlBox>
            </StepTwoBox>
          );
        }}
      </Formik>
    </StepTwoContainer>
  );
};

export default StepTwo;
