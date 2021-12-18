import { FC, useContext, useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Button from "design/Button";
import InputUser from "design/InputUser";

import { CreatePassBookContext } from "..";
import Table from "./Table";
import fetchOptions from "services/option";
import moment from "moment";

import Skeleton from "react-loading-skeleton";
import checkNullObject from "common/function/checkNullObject";
import convertStringToMoney, {
  numberToMoneyVer2,
} from "common/function/convertStringToMoney";
import fetchCart from "services/cart";
import { toast } from "react-toastify";

const StepOneContainer = styled.div`
  ${tw``}
`;
const CraeteBox = styled.div`
  ${tw`px-10`}
`;
const InputBox = styled.div`
  ${tw``}
`;
const ControlBox = styled.div`
  ${tw`my-8 grid gap-2`}
`;

const TermBox = styled.div`
  ${tw``}
`;
const TermList = styled.ul`
  ${tw`flex justify-between`}
`;
const TermItem = styled.li<{ isActive?: boolean }>`
  ${tw`cursor-pointer py-2 w-[60px] text-center border-[1px] rounded-[20px] border-red-300 text-red-500`}

  ${({ isActive }) => isActive && tw`bg-red-400 text-white`};
`;
const Label = styled.p`
  ${tw`text-gray-600 mb-2`}
`;
const TableBox = styled.div`
  ${tw`h-[250px] mt-4`}
`;

interface ICreate {
  closePopup: () => void;
}

const StepOne: FC<ICreate> = ({ closePopup }) => {
  const { data, setData, setStep } = useContext(CreatePassBookContext);
  const [dataTable, settDataTable] = useState<any>();
  const [option, setOption] = useState<
    {
      option?: number;
      value?: number;
    }[]
  >([]);

  const [input, setInput] = useState<string>("");
  const [annual, setAnnual] = useState<{
    option?: number;
    value?: number;
  }>({});

  useEffect(() => {
    if (data?.deposits) {
      setInput(data.deposits + "");
    }

    if (data?.annual) {
      setAnnual(data.annual);
    }
  }, []);

  useEffect(() => {
    handleGetOption();
  }, []);

  useEffect(() => {
    if (Object.values(annual).length === 0) {
      return;
    }

    if (!input) {
      return;
    }

    let month = annual?.option || 0;
    let profit = annual?.value || 1;
    let openDate = moment();
    let endDate = moment().add(month, "month");

    let numb = input.match(/\d|e/g);
    let numberClear: any = numb ? numb.join("") : "";
    numberClear = Number(numberClear);

    let totalProfit = (Number(numberClear) * profit) / 100;
    let result = Number(numberClear) + totalProfit;

    const dataTable = {
      annualInterest: { title: "Lãi suất năm", value: annual.value + "%" },
      totalProfit: {
        title: "Tổng tiền lãi",
        value: numberToMoneyVer2(totalProfit) + "VND",
      },
      openDate: {
        title: "Ngày mở tài khoản",
        value: openDate.format("LL"),
      },
      endDate: {
        title: "Ngày đến hạn",
        value: endDate.format("LL"),
      },
      result: {
        title: "Số dư tại ngày đến hạn",
        value: numberToMoneyVer2(result) + "VND",
      },
    };

    settDataTable(dataTable);
  }, [annual, input]);

  const handleGetOption = async () => {
    const data = await getOptionApi();
    const handleData = data.reduce(
      (result: any, value: any) =>
        value.option !== 0 ? [...result, value] : result,
      []
    );
    console.log(handleData);

    setOption(handleData);
  };

  const getOptionApi = async () => {
    const { data } = await fetchOptions.getCurrentOption();
    return data;
  };

  const handleSelectTerm = (value: any) => {
    setAnnual(value);
  };

  const handleSubmit = async () => {
    let numb = input.match(/\d|e/g);
    let numberClear: any = numb ? numb.join("") : "";
    numberClear = Number(numberClear);

    const payload = { option: annual.option!, deposits: numberClear };

    try {
      const { data } = await fetchCart.add(payload);
      const { success } = data;
      if (!success) {
        toast.error(data?.message);
        return;
      }

      const { objectreponse } = data;

      setData?.({ ...objectreponse, annual: annual });
      setStep?.(2);
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <StepOneContainer>
      <CraeteBox>
        <InputBox>
          <InputUser
            title="Bạn muốn gửi bao nhiêu tiền ?"
            name="money"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(convertStringToMoney(e.target.value) || "");
            }}
            placeholder="Nhập số tiền > 1.000.000"
          />
        </InputBox>
        <TermBox>
          <Label>Bạn muốn kỳ hạn bao nhiêu tháng ?</Label>
          <TermList>
            {option.length > 0
              ? option.map((value) => (
                  <TermItem
                    isActive={value.option === annual.option}
                    onClick={() => handleSelectTerm(value)}
                    key={value.option}
                  >
                    {value?.option}
                  </TermItem>
                ))
              : termList.map((value) => (
                  <TermItem key={value}>{value}</TermItem>
                ))}
          </TermList>
        </TermBox>
        <TableBox>
          {!checkNullObject(dataTable) ? (
            <Table {...dataTable} />
          ) : (
            <Skeleton style={{ height: "100%" }} />
          )}
        </TableBox>
        <ControlBox>
          <Button variant="container" onClick={handleSubmit}>
            Tiếp tục
          </Button>
          <Button variant="outlined" onClick={closePopup}>
            Hủy
          </Button>
        </ControlBox>
      </CraeteBox>
    </StepOneContainer>
  );
};

export default StepOne;

const termList = [1, 3, 6, 12, 18, 24, 36];
