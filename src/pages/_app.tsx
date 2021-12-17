import { createContext, ReactChild, useState, useRef, useEffect } from "react";
import type { AppProps } from "next/app";

import { useStore } from "react-redux";
import { wrapper } from "redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";

import tw from "twin.macro";
import styled, { css } from "styled-components";
import useToggleAndCloseVer2 from "hook/useToggleAndCloseVer2";

import GlobalStyles from "common/styles/GlobalStyles";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import "tailwindcss/tailwind.css";
import "common/styles/styles.scss";

const Wrapper = styled.div<{ isPopup: boolean }>`
  ${tw``}
  ${({ isPopup }) =>
    isPopup &&
    css`
      filter: blur(5px);
    `}
`;

const PopupWrapper = styled.div`
  ${tw`fixed z-[9999]`}
  width: 100vw;
  height: 100vh;
  background-color: #00000022;
`;

const PopupBox = styled.div`
  ${tw`relative w-full h-full`}
`;

interface IPopupContext {
  setHtml?: (dom: ReactChild) => void;
  closePopup?: () => void;
}

export const PopupContext = createContext<IPopupContext>({});

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore();
  const [html, setHtml] = useState<ReactChild | null>();

  const ref = useRef<HTMLDivElement>(null);
  const [isPopup, setIsPopup] = useToggleAndCloseVer2(ref);

  const handleSetHtml = (dom: ReactChild) => {
    setHtml(dom);
  };

  const closeHtml = () => {
    setIsPopup(false);
    setHtml(null);
  };

  useEffect(() => {
    if (!html) return;

    setIsPopup(true);
  }, [html]);

  useEffect(() => {
    if (isPopup) return;

    setHtml(null);
  }, [isPopup]);

  return (
    <PopupContext.Provider
      value={{ setHtml: handleSetHtml, closePopup: closeHtml }}
    >
      {isPopup && (
        <PopupWrapper ref={ref}>
          <PopupBox>{html}</PopupBox>
        </PopupWrapper>
      )}
      <Wrapper isPopup={isPopup}>
        {process.browser ? (
          <div id="root">
            <PersistGate
              persistor={store?.__persistor}
              loading={<div>Loading</div>}
            >
              <GlobalStyles />
              <Component {...pageProps} />
            </PersistGate>
          </div>
        ) : (
          <div id="root">
            <PersistGate persistor={store as any}>
              <GlobalStyles />
              <Component {...pageProps} />
            </PersistGate>
          </div>
        )}
      </Wrapper>
    </PopupContext.Provider>
  );
}

export default wrapper.withRedux(MyApp);
