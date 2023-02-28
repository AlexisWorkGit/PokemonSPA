import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider,createTheme } from '@nextui-org/react';
import { darkTheme } from '@/themes';

// const theme = createTheme({
//   type: "dark", // it could be "light" or "dark"
//   theme: {
//     colors: {
//       primary: '#4ADE7B',
//       secondary: '#F9CB80',
//       error: '#FCC5D8',
//     },
//   }
// })

function App({ Component, pageProps }: AppProps) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider theme={ darkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default App;

