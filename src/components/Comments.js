import styled from "styled-components"
export default function Comments () {
    return (
        <Container>
            <div className="comment">
                <img src="https://3.bp.blogspot.com/-oswscyhiDQU/TydFmWqUkkI/AAAAAAAACCg/ch4xfcxnBsA/s320/%C3%80+Espera+de+Um+Milagre+-+Edi%C3%A7%C3%A3o+especial9.jpg" alt="img" />
                <div>
                    <div className="name">
                        <h2>Joao avatares</h2>
                        <h3>• following</h3>
                    </div>
                    <h3>oi</h3>
                </div>
            </div>
            <div className="row"></div>
            <div className="comment">
                <img src="https://3.bp.blogspot.com/-oswscyhiDQU/TydFmWqUkkI/AAAAAAAACCg/ch4xfcxnBsA/s320/%C3%80+Espera+de+Um+Milagre+-+Edi%C3%A7%C3%A3o+especial9.jpg" alt="img" />
                <div>
                    <div className="name">
                        <h2>Joao avatares</h2>
                        <h3>• following</h3>
                    </div>
                    <h3>oi</h3>
                </div>
            </div>
            <div className="row">
            </div>
            <div className="createComment">
                <img src="https://3.bp.blogspot.com/-oswscyhiDQU/TydFmWqUkkI/AAAAAAAACCg/ch4xfcxnBsA/s320/%C3%80+Espera+de+Um+Milagre+-+Edi%C3%A7%C3%A3o+especial9.jpg" alt="img" />
                <input type="text" placeholder="write a comment..."/>
            </div>
        </Container>
    )
}

const Container = styled.div `
    position:relative;
    z-index:0;

    margin-top: -30px;

    width: 100%;
    background: #1E1E1E;
    border-radius: 16px;
    padding-top: 35px;
    input {
        height: 40px;
        width:calc(100% - 60px);
        padding: 0 20px;
        border:none;
        background: #252525;
        border-radius: 8px;
    }
    img {
        width:40px;
        height:40px;
        border-radius: 26px;
    }
    .createComment {
        padding: 10px 20px;
        display:flex;
        justify-content: space-between;
    }
    .comment {
        padding: 10px 20px;
        display:flex;
        justify-content: space-between;
        h3 {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            color: #ACACAC;
        }
        .name {
            display:flex;
            gap:10px;
            h2 {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 700;
                font-size: 14px;
                line-height: 17px;
                color: #F3F3F3;
            }
            h3 {
                color: #565656;
            }
        }
        div {
            width:calc(100% - 60px);
        }
    }
    .row {
        border: 1px solid #353535;
        margin: 0 20px;
    }
`