import styled from "styled-components";
import Logo from "./Logo.js";

export default function LogoAndText(){
    return (
        <Container>
                <Logo />
                <Text>
                    save, share and discover
                    the best links on the web
                </Text>   
        </Container>
        );
}

const Container= styled.div`
    display:flex;
    flex-direction:column;
    width: 100%;
    height: 100%;
    background-color: #151515;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;


const Text = styled.div`
    width: 442px;
    height: 128px;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
`;