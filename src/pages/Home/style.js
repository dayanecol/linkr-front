import styled from "styled-components";
const Container = styled.div`
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
export {Container, Header}