import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import fetchPaypal from "@services/paypal";
import { FC } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import tw from "twin.macro";

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
            "AcAuqsDsHD2c1oLtDIKmJ1MI-BA6uQ-pfMi5HPRiO2O5lTYzGGNsLWsFlY8m8IhH0YVGyRnDeQ1AIekB",
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
