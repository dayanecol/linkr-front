import styled from "styled-components";

export default function Trendings() {
    return (
        <Container>
            <div>
                <h1>trending</h1>
            </div>
            <div className="divisor"></div>
            <div>
                <p># javascript</p>
                <p># react</p>
                <p># react-native</p>
                <p># material</p>
                <p># web-dev</p>
                <p># mobile</p>
                <p># css</p>
                <p># html</p>
                <p># node</p>
                <p># sql</p>
            </div>
        </Container>
    )
}

const Container = styled.div`
    h1 {
            font-size: 27px;
    }
    p {
        font-family: 'Lato';
        color: white;
        font-weight: 700;
        font-size: 19px;
        margin: 10px 0;
    }
    .divisor {
    border-top: 2px solid #484848;
    }
    div:nth-child(1) {
        padding: 16px;
    }
    div:nth-child(3) {
        padding: 15px 16px;
    }
`