import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from './config/theme'

import { OptionsProviderComponent as OptionsProvider } from './context/OptionsContext'

import Header from './components/Header'
import Main from './components/Main'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <OptionsProvider>
          <Header />
          <Main />
        </OptionsProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
