import styled from "styled-components"
export default function Post() {
    return (
        <Container>
            <div>
                <img src="https://blog.emania.com.br/wp-content/uploads/2019/01/como-tirar-foto-de-cachorro.jpg" alt="imagem teste" />
            </div>
            <div>
                <h2>Juvenal junior</h2>
                <h3>Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material</h3>
                <div className="box">
                    <div>
                        <h4>Como aplicar o Material UI em um projeto React</h4>
                        <h5>Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.</h5>
                        <h6>https://medium.com/@pshrmn/a-simple-react-router</h6>
                    </div>
                    <img src="https://blog.emania.com.br/wp-content/uploads/2019/01/como-tirar-foto-de-cachorro.jpg" alt="imagem teste" />
                </div>
            </div>
        </Container>
    )
}
const Container=styled.div`
    width: 100%;
    min-height: 276px;

    background: #171717;
    border-radius: 16px;

    display:flex;

    margin-bottom:20px;
    padding:0 10px;
    
    h2 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
    }
    h3 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;  
    }
    h4 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;

        color: #CECECE;
    }
    h5 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 9px;
        line-height: 11px;

        color: #9B9595;
    }
    h6 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 9px;
        line-height: 11px;

        color: #CECECE;
    }
    > * {
        &:nth-child(2){
            width: 90%;
            gap:5px;
            padding:20px;
            display:flex;
            flex-direction: column;
        }
    }
    > * {
        &:first-child{
            width: 10%;
            margin-right:5px;
                img {
                    margin-top:15px;
                    width: 50px;
                    height: 50px;
                    border-radius: 26.5px;
                }
        }
    }
    .box {
        width: 100%;
        min-height: 115px;

        border: 1px solid #4D4D4D;
        border-radius: 11px;
        display:flex;
        div {
            width:70%;
            display:flex;
            flex-direction:column;
            padding:5px;
            justify-content:space-between;
        }
        img {
            width:30%;
            min-width:95px;
        }
    }
`