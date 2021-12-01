import { Route, Routes } from "react-router";
import MainPage from "./containers/MainPage";
import LoginPage from "./containers/LoginPage";
import GlobalStyle from "./styles/globalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
