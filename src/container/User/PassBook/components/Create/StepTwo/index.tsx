import Button from "@design/Button";
import InputUser from "@design/InputUser";
import fetchCart from "@services/cart";
import { FC, useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import styled from "styled-components";
import tw from "twin.macro";
import { CreatePassBookContext } from "..";
import Table from "./Table";

const StepTwoContainer = styled.div`
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

const TableBox = styled.div`
  ${tw`h-[255px] mt-6`}
`;
const Control = styled.div`
  ${tw`flex gap-4`}
`;
const Message = styled.div`
  ${tw`text-xs text-red-500`}
`;

interface ICreate {
  closePopup: () => void;
  handleGetAllPassbook: () => void;
}

const StepTwo: FC<ICreate> = ({ closePopup, handleGetAllPassbook }) => {
  const { data, setData, setStep } = useContext(CreatePassBookContext);
  const [bookNumber, setBookNumber] = useState<string>();
  const [dataTable, setDataTable] = useState<any>(data);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  useEffect(() => {
    setBookNumber(data?.suggest + "");
  }, []);

  useEffect(() => {
    if (!bookNumber) {
      return;
    }
    handleUpdateCart();
  }, [bookNumber]);

  const handleUpdateCart = async () => {
    try {
      setLoading(true);
      const { objectreponse } = await updateCartApi(Number(bookNumber));
      setDataTable(objectreponse);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const updateCartApi = async (quantity: number) => {
    const { data } = await fetchCart.update({ quantity: quantity });
    return data;
  };

  const handleStep = () => {
    setStep?.(1);
  };

  const handleSubmit = async () => {
    try {
      setLoadingSubmit(true);
      const { data } = await fetchCart.checkout();
      handleGetAllPassbook?.();
      closePopup();
      toast.success("Tạo số tiết kiệm thành công");
    } catch (error: any) {
      toast.error(error?.message || "Lỗi");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <StepTwoContainer>
      <CraeteBox>
        <InputBox>
          <InputUser
            title="Số sổ tiết kiệm bạn muốn tạo ?"
            name="bookNumber"
            type="text"
            value={bookNumber}
            onChange={(e) => {
              setBookNumber(e.target.value);
            }}
            placeholder="Số sổ tiết kiệm"
          />
          <Message>
            Summon gợi ý: bạn nên tạo {data?.suggest} sổ tiết kiệm
          </Message>
        </InputBox>
        <TableBox>
          {bookNumber && !loading ? (
            <Table {...dataTable} numberPassBook={Number(bookNumber)} />
          ) : (
            <Skeleton style={{ height: "100%" }} />
          )}
        </TableBox>
        <ControlBox>
          <Control>
            <Button variant="outlined" onClick={handleStep}>
              Trở lại
            </Button>
            <Button
              disabled={loadingSubmit || loading}
              variant="container"
              onClick={handleSubmit}
            >
              Mở
            </Button>
          </Control>
          <Button variant="text" onClick={closePopup}>
            Hủy
          </Button>
        </ControlBox>
      </CraeteBox>
    </StepTwoContainer>
  );
};

export default StepTwo;
