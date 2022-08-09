import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../themes/GlobalStyle.js";
import Home from "../pages/Home/index.js";
import SignInPage from "../pages/SignInPage/SignInPage.js";
import SignUpPage from "../pages/SignUpPage/SignUpPage.js";    

export default function App(){
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}