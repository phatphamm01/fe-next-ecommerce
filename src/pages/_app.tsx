import { Fragment } from 'react';
import type { AppProps } from 'next/app';

import 'tailwindcss/tailwind.css';
import 'common/styles/styles.scss';
import GlobalStyles from 'common/styles/GlobalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <GlobalStyles />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
