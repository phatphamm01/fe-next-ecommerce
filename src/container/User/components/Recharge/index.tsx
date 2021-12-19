import { FC, useState, useEffect, useContext } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Button from "@design/Button";
import InputUser from "@design/InputUser";
import fetchPaypal from "@services/paypal";
import convertStringToMoney from "@common/function/convertStringToMoney";
import PaypalButton from "@components/PaypalButton";
import { PopupContext } from "@pages/_app";

const RechargeContainer = styled.div`
  ${tw`pb-10`}
`;
const RechargeBox = styled.div`
  ${tw`px-10`}
`;
const InputBox = styled.div`
  /* ${tw`grid grid-cols-[1fr 140px] gap-4 mb-4`} */
  ${tw` mb-4`}
`;
const Control = styled.div`
  ${tw`flex gap-4`}
`;
const Change = styled.div`
  ${tw`mb-4`}
`;
const ChangeText = styled.span`
  ${tw`font-bold`}
`;
const ChangeMoney = styled.span`
  ${tw`float-right`}
`;
const PaypalBox = styled.div`
  ${tw``}
`;

interface IRecharge {}

const Recharge: FC<IRecharge> = () => {
  const { closePopup } = useContext(PopupContext);

  const [money, setMoney] = useState<number>(0);
  const [moneyVND, setMoneyVND] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    handleGetExchangeRate();
    setTimeout(async () => {
      handleGetExchangeRate();
    }, 60 * 1000);
  }, [exchangeRate]);

  const handleGetExchangeRate = async () => {
    const data = await getExchangeRateApi();

    setExchangeRate(data);
  };

  const getExchangeRateApi = async () => {
    let { data } = await fetchPaypal.convertVNDtoUSD();

    return data;
  };

  const handlePay = () => {
    setIsActive(true);
  };

  useEffect(() => {
    let numb = input.match(/\d|e/g);
    let numberClear: any = numb ? numb.join("") : "";
    numberClear = Number(numberClear);

    setMoneyVND(numberClear);
    if (numberClear >= 20000) {
      let money = Number(numberClear) / exchangeRate;
      setMoney(Math.round(money * 100) / 100);
      return;
    }
    setMoney(0);
  }, [input]);

  const handleClosePopup = () => {
    closePopup?.();
  };

  return (
    <RechargeContainer>
      <RechargeBox>
        <InputBox>
          <InputUser
            onChange={(e) => {
              setInput(convertStringToMoney(e.target.value) || "");
            }}
            value={input}
            nullError={false}
            styledInput={{ fontSize: "16px" }}
            placeholder="Nhập số tiền cần nạp (> 20,000VND)"
            name="Số tiền nạp"
            type="text"
          />
        </InputBox>
        <Change>
          <ChangeText>VND to USD</ChangeText>
          <ChangeMoney>${money}</ChangeMoney>
        </Change>
        <PaypalBox>
          {isActive && (
            <PaypalButton
              closePopup={handleClosePopup}
              moneyVND={moneyVND}
              price={money + ""}
            />
          )}
        </PaypalBox>
        <Control>
          <Button onClick={handleClosePopup} variant="outlined">
            Hủy
          </Button>
          {!isActive && (
            <Button onClick={handlePay} variant="container">
              Tiếp tục
            </Button>
          )}
        </Control>
      </RechargeBox>
    </RechargeContainer>
  );
};

export default Recharge;
