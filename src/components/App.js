import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../themes/GlobalStyle.js";
import Timeline from "../pages/Timeline/index.js";
import SignInPage from "../pages/SignInPage/SignInPage.js";
import SignUpPage from "../pages/SignUpPage/SignUpPage.js"; 
import UserPage from "../pages/UserPage/index.js";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import HashtagPage from "../pages/Hashtags/index.js";

export default function App(){
    return (
        <BrowserRouter>
            <GlobalStyle />
            <ToastContainer autoClose={3000}/>
            <Routes>
                <Route path="/" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/user/:id" element={<UserPage />} />
                <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
            </Routes>
        </BrowserRouter>
    );
}