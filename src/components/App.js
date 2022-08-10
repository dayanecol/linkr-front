import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../themes/GlobalStyle.js";
import Home from "../pages/Home/index.js";
import SignInPage from "../pages/SignInPage/SignInPage.js";
import SignUpPage from "../pages/SignUpPage/SignUpPage.js"; 
import UserPage from "../pages/UserPage/index.js";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function App(){
    return (
        <BrowserRouter>
            <GlobalStyle />
            <ToastContainer />
            <Routes>
                <Route path="/" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/timeline" element={<Home />} />
                <Route path="/user/:id" element={<UserPage />} />
            </Routes>
        </BrowserRouter>
    );
}