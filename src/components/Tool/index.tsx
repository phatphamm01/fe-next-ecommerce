import Button from "@design/Button";
import Title from "@design/Title";
import { useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Input from "./components/Input";

const bignumber = require("bignumber.js").BigNumber;

const ToolContainer = styled.section`
  ${tw`container mx-auto my-20`}
`;
const TitlteContainer = styled.div`
  ${tw`text-center mb-20`}
`;
const ToolMain = styled.div`
  ${tw`grid lg:grid-cols-1 grid-cols-2`}
`;
const FormContainer = styled.div`
  ${tw` mb-0 lg:mb-10 mx-32 2xl:mx-20 xl:mx-10 flex flex-col gap-6`}
`;
const FormContent = styled.p`
  ${tw`text-xs text-gray-600`}
`;
const RenderTool = styled.div`
  ${tw`self-center mx-32 2xl:mx-20 xl:mx-10`}
`;
const RenderBox = styled.div`
  ${tw`w-full h-[380px] bg-white p-12`}
  box-shadow: 0px 15px 20px rgba(220, 38, 38, 0.25);
  border-radius: 20px;
`;
const ButtonContainer = styled.div`
  ${tw`mt-20 lg:mt-28 mx-auto w-[200px]`}
`;
const CalcTitle = styled.p`
  ${tw`text-gray-500 mb-4`}
`;
const CalcValue = styled.div`
  ${tw`text-red-600 text-5xl font-bold mb-10`}
`;
const InterestReceive = styled.span`
  ${tw`line-clamp-1 overflow-ellipsis block`}
`;
const Unit = styled.sup`
  ${tw`text-3xl`}
`;

const Tool = () => {
  const deposits = useRef<number>(0);
  const interestRate = useRef<number>(0);
  const sendingTerm = useRef<number>(0);

  const [receiver, setReceiver] = useState<string>();
  const [totalMoney, setTotalMoney] = useState<string>();

  const handleClick = () => {
    let calc = handleCalc();
    setReceiver(calc.receiver);
    setTotalMoney(calc.totalMoney);
  };

  const handleCalc = (): {
    receiver: string;
    totalMoney: string;
  } => {
    let bigNumber = bignumber(deposits.current);
    let receiver = bigNumber.multipliedBy(
      ((interestRate.current / 100) * sendingTerm.current) / 12
    );
    let totalMoney = bigNumber.plus(receiver);

    return {
      receiver: receiver
        .decimalPlaces(0)
        .toString()
        .replace(/(.)(?=(\d{3})+$)/g, "$1,"),
      totalMoney: totalMoney
        .decimalPlaces(0)
        .toString()
        .replace(/(.)(?=(\d{3})+$)/g, "$1,"),
    };
  };

  const numberToMoney = (num: number & { c?: number }): string => {
    const checkNaN = !num?.c || num === 0;

    return checkNaN ? "" : String(num).replace(/(.)(?=(\d{3})+$)/g, "$1,");
  };

  const numberToString = (num: number & { c?: number }): string => {
    const checkNaN = !num?.c || num === 0;

    return checkNaN ? "" : String(num);
  };

  const stringToNumber = (text: string, length?: number): number => {
    if (length && text.length > length) {
      text = text.substring(0, length + 1);
    }

    let numb = text.match(/\d|e/g);
    let numberClear = numb ? numb.join("") : "";
    return bignumber(numberClear);
  };

  return (
    <ToolContainer id="tool">
      <TitlteContainer>
        <Title>CÔNG CỤ TÍNH LÃI TIỀN GỬI TIẾT KIỆM</Title>
      </TitlteContainer>
      <ToolMain>
        <FormContainer>
          <Input
            name="deposits"
            title="Số tiền gửi*"
            type="text"
            onChange={(value, ref) => {
              let num = stringToNumber(value);
              if (ref.current)
                ref.current.value = numberToMoney(bignumber(num));
              deposits.current = num;
            }}
            iconLeft={<>VND</>}
          />
          <Input
            name="interestRate"
            title="Lãi suất gửi*"
            type="text"
            onChange={(value, ref) => {
              let num = stringToNumber(value, 3);
              if (ref.current) ref.current.value = numberToString(num);
              interestRate.current = num;
            }}
            iconLeft={<>% / Năm</>}
          />
          <Input
            name="sendingTerm"
            title="Kì hạn gửi*"
            type="text"
            onChange={(value, ref) => {
              let num = stringToNumber(value, 1);
              if (ref.current) ref.current.value = numberToString(num);
              sendingTerm.current = num;
            }}
            iconLeft={<>Tháng</>}
          />
          <FormContent>
            <b>(*)</b>
            <i>: Thông tin bắt buộc </i> <br />
            <b>(*)</b>
            <i>
              : Nội dung trên có tính chất tham khảo. Vui lòng truy cập ứng dụng
              Summon để cập nhật lãi suất tại thời điểm hiện hành.
            </i>
            <br />
            <b>Lưu ý</b>
            <i>: Lãi tiền gửi ước tính theo phương thức trả lãi cuối kỳ</i>
          </FormContent>
        </FormContainer>
        <RenderTool>
          <RenderBox>
            <CalcTitle>Số tiền lãi nhận được</CalcTitle>
            <CalcValue>
              <InterestReceive>
                {receiver ? receiver : 0} <Unit>đ</Unit>
              </InterestReceive>
            </CalcValue>
            <CalcTitle>Tổng số tiền nhận được khi đến hạn</CalcTitle>
            <CalcValue>
              <InterestReceive>
                {totalMoney ? totalMoney : 0}
                <Unit>đ</Unit>
              </InterestReceive>
            </CalcValue>
          </RenderBox>
        </RenderTool>
      </ToolMain>
      <ButtonContainer>
        <Button onClick={() => handleClick()} variant="container" rounded>
          XEM KẾT QUẢ
        </Button>
      </ButtonContainer>
    </ToolContainer>
  );
};

export default Tool;
