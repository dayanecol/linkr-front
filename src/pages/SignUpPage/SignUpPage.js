import styled from "styled-components";
import LogoAndText from "../../components/shared/LogoAndText.js";
import SignUpForm from "./SignUpForm.js";
import StyledLink from "../../components/shared/StyledLink.js";


export default function SignUpPage(){
    return (
        <StyledBody>
            <LeftSide>
                <LogoAndText />
            </LeftSide>
            <RightSide>
                <SignUpForm />
                <StyledLink to="/">Switch back to log in</StyledLink>
            </RightSide>
            
        </StyledBody>
        
    );
}

const StyledBody = styled.div`
    width : 100vw;
    height:100vh;
    display:flex;
    padding-top:0;
    @media(max-width: 767px) {
        width:100%;
        height:100%;
        display:flex;
        flex-direction:column;
        position:relative;

    }
`;

const RightSide = styled.div`
    display:flex;
    flex-direction:column;
    width:34%;
    background-color: #333;
    display:flex;
    justify-content:center;
    align-items: center;
    padding:3%;
    @media(max-width: 767px) {
        width:100%;
        height:fit-content;
        position:absolute;
        top:30vh;
        z-index:1;
    }
`;

const LeftSide = styled.div`
    width:66%;
    background-color: #E5E5E5;
    @media(max-width: 767px) {
        width:100%;
        display:flex;
        flex-direction:column;
        height:25vh;
        position:absolute;
        z-index:1;
    }
`;