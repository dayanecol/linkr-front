import styled from "styled-components";

const Input = styled.input`
    width:100%;
    height: 65px;
    background-color: #FFFFFF;
    border-radius: 6px;
    padding: 15px 0 11px 17px;
    margin-bottom:13px;
    border:none;
    font-family: 'Lato', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 40px;
    color: #151515;
    ::placeholder {
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        color: #9F9F9F;
    }
`;

export default Input;