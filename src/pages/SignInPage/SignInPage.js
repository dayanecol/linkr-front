import styled from "styled-components";
import LogoAndText from "../../components/shared/LogoAndText.js";
import SignInForm from "./SignInForm.js";
import StyledLink from "../../components/shared/StyledLink.js";


export default function SignInPage(){
    return (
        <StyledBody>
            <LeftSide>
                <LogoAndText />
            </LeftSide>
            <RightSide>
                <SignInForm />
                <StyledLink to="/sign-up">First time? Create an account!</StyledLink>
            </RightSide>
        </StyledBody>
        
    );
}

const StyledBody = styled.div`
    width : 100vw;
    height:100vh;
    display:flex;
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
`;

const LeftSide = styled.div`
    width:66%;
    background-color: #E5E5E5;
`;