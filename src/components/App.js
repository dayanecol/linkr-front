import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../themes/GlobalStyle.js";
import Home from "../pages/Home/index.js";
export default function App(){
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}