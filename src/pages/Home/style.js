import styled from "styled-components";

//font-family: 'Lato', sans-serif;
//font-family: 'Oswald', sans-serif;
//font-family: 'Passion One', cursive;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background:#333333;
    overflow:hidden;
    overflow-y:scroll;
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
    .trending {
        width: 28%;
        margin-top: 141px;
        margin-bottom: 100%;
        background: #171717;
        border-radius: 16px;
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

export {Main, Container}