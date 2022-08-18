import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background:#333333;
    overflow:hidden;
    overflow-y:scroll;
    padding-top: 72px;
    @media(max-width: 767px) {
        padding-top: 0px;
    }
`;
const Main = styled.div`
    display: flex;
    flex-direction:row;

    justify-content: space-between;

    margin:0 auto;
    width: 70%;
    h1 {
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        color: #FFFFFF;
    }
    .timeline {
        width: 70%;
        display:flex;
        flex-direction:column;
        > h1 {
            font-size: 43px;
            margin: 50px 0;
        }
    }

    .right-side{
        display:flex;
        flex-direction:column;
        margin-top:69px;
        width:29%;
    }
    .trending {
        width: 100%;
        margin-bottom: 100%;
        background: #171717;
        border-radius: 16px;
    }

    .follow{
        display:flex;
        justify-content:flex-end;
        margin-bottom:41px;
    }
    span {
        display: flex;
        align-items: center;
        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 20px;
        }
        h1 {
            font-family: 'Oswald';
            font-style: normal;
            font-weight: 700;
            color: #FFFFFF;
        }
    }
    .titleNameUser {
        margin-top: 50px;
        margin-bottom: 42px;
    }
   
    @media(max-width: 767px) {
        width:100%;
        .trending {
            display:none;
        }
        .timeline {
            width:100%;
            h1 {
                margin-left:25px;
            }
        }

    }

`;

const UserName = styled.h1`
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    color: #FFFFFF;
    font-size: 43px;
`;

export {Main, Container, UserName};