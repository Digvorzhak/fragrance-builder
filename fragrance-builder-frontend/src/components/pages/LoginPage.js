import React from "react";
import GlobalStyles from "../styles/Global";
import LoginPageContainer from "../styles/LoginPageContainer";
import { AccountBox } from "../accountBox";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    body: "#FAE5C8",
  },
  mobile: "798px",
};

const LoginPage = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <LoginPageContainer>
          <AccountBox />
        </LoginPageContainer>
      </ThemeProvider>
    </>
  );
};

export default LoginPage;
