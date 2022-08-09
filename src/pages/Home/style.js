import styled from "styled-components";
const Container = styled.div`
    width: 100%;
    height: 100vh;
    background:#333333;;
`;
const Main = styled.div`
    display: flex;
    flex-direction:row;

    align-items:center;
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
        h1 {
            font-size: 43px;
            margin: 50px 0;
        }
    }
    .trending {
        margin-top:150px;
        width: 28%;
        height: 40px;
        left: 877px;
        top: 232px;

        background: #171717;
        border-radius: 16px;
    }

`;
const Header = styled.div`
    display:flex;
    align-items: center;
    justify-content:space-between;

    padding: 25px;
    width: 100%;
    height: 72px;
    background-color: #151515;
    h1 {
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 49px;
        line-height: 54px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
    }
    img {
        width: 53px;
        height: 53px;
        border-radius: 26.5px;
    }
`
export {Main, Header, Container}