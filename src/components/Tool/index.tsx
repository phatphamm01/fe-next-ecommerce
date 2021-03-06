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
        <Title>C??NG C??? T??NH L??I TI???N G???I TI???T KI???M</Title>
      </TitlteContainer>
      <ToolMain>
        <FormContainer>
          <Input
            name="deposits"
            title="S??? ti???n g???i*"
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
            title="L??i su???t g???i*"
            type="text"
            onChange={(value, ref) => {
              let num = stringToNumber(value, 3);
              if (ref.current) ref.current.value = numberToString(num);
              interestRate.current = num;
            }}
            iconLeft={<>% / N??m</>}
          />
          <Input
            name="sendingTerm"
            title="K?? h???n g???i*"
            type="text"
            onChange={(value, ref) => {
              let num = stringToNumber(value, 1);
              if (ref.current) ref.current.value = numberToString(num);
              sendingTerm.current = num;
            }}
            iconLeft={<>Th??ng</>}
          />
          <FormContent>
            <b>(*)</b>
            <i>: Th??ng tin b???t bu???c </i> <br />
            <b>(*)</b>
            <i>
              : N???i dung tr??n c?? t??nh ch???t tham kh???o. Vui l??ng truy c???p ???ng d???ng
              Summon ????? c???p nh???t l??i su???t t???i th???i ??i???m hi???n h??nh.
            </i>
            <br />
            <b>L??u ??</b>
            <i>: L??i ti???n g???i ?????c t??nh theo ph????ng th???c tr??? l??i cu???i k???</i>
          </FormContent>
        </FormContainer>
        <RenderTool>
          <RenderBox>
            <CalcTitle>S??? ti???n l??i nh???n ???????c</CalcTitle>
            <CalcValue>
              <InterestReceive>
                {receiver ? receiver : 0} <Unit>??</Unit>
              </InterestReceive>
            </CalcValue>
            <CalcTitle>T???ng s??? ti???n nh???n ???????c khi ?????n h???n</CalcTitle>
            <CalcValue>
              <InterestReceive>
                {totalMoney ? totalMoney : 0}
                <Unit>??</Unit>
              </InterestReceive>
            </CalcValue>
          </RenderBox>
        </RenderTool>
      </ToolMain>
      <ButtonContainer>
        <Button onClick={() => handleClick()} variant="container" rounded>
          XEM K???T QU???
        </Button>
      </ButtonContainer>
    </ToolContainer>
  );
};

export default Tool;
