import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useState } from "react";

export default function Header(){
    const navigate = useNavigate();
    const data = localStorage.getItem("data");
    const { profilePicture } = data ? JSON.parse(data): "";
    const [clicked, setClicked] = useState(false);

    function logout(){
        localStorage.removeItem("data");
        navigate("/");
    }

    return (
        <Container>
            <TopBar>
                <Link style={{textDecoration: 'none'}} to="/timeline">
                    <h1>linkr</h1>
                </Link>
                
                <div onClick={()=> setClicked(!clicked)}>
                    <Icon >
                        {clicked ? 
                            <FaAngleUp />
                            :
                            <FaAngleDown />
                        }  
                    </Icon>
                    <img src={profilePicture} alt="profilePicture" />
                </div>
                
            </TopBar>
                {clicked?
                    <Menu onClick= {()=>{
                        setClicked(!clicked);
                        logout();
                    }}>
                        Logout
                    </Menu>
                    :
                    <></>    
                }            
        </Container>
        
    );
}

const Container = styled.div`
    position:relative;
`;

const TopBar = styled.div`
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
        cursor: pointer;
    }
    div{
        display:flex;
    }
`;

const Icon = styled.div`
    font-size: 35px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
    :hover {
        cursor: pointer;
    }
`;

const Menu = styled.div`
    width: 150px;
    height: 47px;
    background: #171717;
    border-radius: 0px 0px 20px 20px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor: pointer;
    position:absolute;
    top:72px;
    right:0;
`;