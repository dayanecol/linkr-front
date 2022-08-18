import styled from "styled-components";

const FollowButton = styled.button`
    display:flex;
    align-items:center;
    justify-content:center;
    width: 112px;
    height: 31px;
    background-color:${(props)=>(props.color?'#1877F2':'#FFF')};
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color:${(props)=>(props.color?'#FFF':'#1877F2')};  
    cursor: pointer;
    border:none; 
`;

export default FollowButton;