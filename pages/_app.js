
import { MantineProvider } from '@mantine/core';

import '../styles/globals.css'



export default function App({ Component, pageProps }) {
  return (
    <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      colorScheme: "light",
    }}
    defaultProps={{
      Container: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320,
        },
      },
    }}
  >
        <Component {...pageProps} />
    </MantineProvider>
  )
}
