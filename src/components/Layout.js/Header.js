import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 

export default function Header(){
    const navigate = useNavigate();
    const data = localStorage.getItem("data");
    const { token, profilePicture } = data ? JSON.parse(data): "";

    function logout(){
        localStorage.removeItem("data");
        navigate("/");
    }

    return (
        <Container>
            <Link style={{textDecoration: 'none'}} to="/timeline">
                <h1>linkr</h1>
            </Link>
            
            <div>
                <img src={profilePicture} alt="profilePicture" />
            </div>
        </Container>
    );
}

const Container = styled.div`
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
`;