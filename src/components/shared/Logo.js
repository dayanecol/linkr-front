import styled from "styled-components";

export default function Logo(){
    return (
        <LogoContainer>
            linkr
        </LogoContainer>
    );
}

const LogoContainer = styled.div`
    font-family: 'Passion One', cursive;
    position:absolute;
    width: 233px;
    height: 117px;
    font-style: normal;
    font-weight: 700;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    margin-bottom:210px;
    text-align:start;
    @media(max-width: 767px) {
        width: 167px;
        height: 84px;
        font-size: 76px;
        line-height: 84px;
        margin-bottom:70px;
    }

`;