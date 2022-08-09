import styled from "styled-components";
import LogoAndText from "../../components/shared/LogoAndText.js";
import SignUpForm from "./SignUpForm.js";


export default function SignUpPage(){
    return (
        <StyledBody>
            <LeftSide>
                <LogoAndText />
            </LeftSide>
            <RightSide>
                <SignUpForm />
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