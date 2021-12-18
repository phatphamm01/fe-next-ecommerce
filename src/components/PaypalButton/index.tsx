import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import { FC, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { toast } from "react-toastify";
import fetchPaypal from "services/paypal";

const PaypalContainer = styled.div`
  ${tw`z-0`}

  & * {
    z-index: 0;
  }
`;

interface IPaypal {
  price: string;
  moneyVND: number;
  closePopup: (() => void) | undefined;
}

const Paypal: FC<IPaypal> = ({ price, moneyVND, closePopup }) => {
  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: "vertical" },
    createOrder(data, actions) {
      return actions.order.create({
        intent: "CAPTURE",

        purchase_units: [
          {
            amount: {
              value: price + "",
              currency_code: "USD",
            },
          },
        ],
      });
    },
    onError(err) {
      console.log(err);
    },
    // onShippingChange(data, actions) {
    //   dataPaypal.current = data;

    //   return actions.resolve();
    // },
    onApprove(data, actions) {
      return actions.order.capture().then(async (details) => {
        try {
          await fetchPaypal.recharge({ vnd: moneyVND });
          toast.success("Nạp tiền thành công");
        } catch (error: any) {
          toast.error(error?.message);
        } finally {
          closePopup?.();
        }
      });
    },
  };

  return (
    <PaypalContainer>
      <PayPalScriptProvider
        options={{
          components: "buttons",
          currency: "USD",
          "client-id":
            "AUYYe_jA-9FTUNZF-UFRISfMvUAnKTzxAb1pELVDW36PaFFvg_a3YXGJfgrc32USF79FL3C59jTluzvc",
        }}
      >
        <PayPalButtons
          {...paypalbuttonTransactionProps}
          style={{ layout: "horizontal" }}
        />
      </PayPalScriptProvider>
    </PaypalContainer>
  );
};

export default Paypal;
