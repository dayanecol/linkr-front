import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Header(){

    return (
        <Container>
            <Link style={{textDecoration: 'none'}} to="/timeline">
                <h1>linkr</h1>
            </Link>
            
            <div>
                <img src="https://blog.emania.com.br/wp-content/uploads/2019/01/como-tirar-foto-de-cachorro.jpg" alt="imagem teste" />
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