import styled from "styled-components";

export default function Post({post}) {
    console.log(post)
    return (
        <Container>
            <div>
                <img src="https://blog.emania.com.br/wp-content/uploads/2019/01/como-tirar-foto-de-cachorro.jpg" alt="imagem teste" />
            </div>
            <div>
                <h2 className="name">Juvenal junior</h2>
                <h2 className="text">{post.content}</h2>
                <div className="box">
                    <div>
                        <h2 className="namePost">Como aplicar o Material UI em um projeto React</h2>
                        <h2 className="textPost">Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.</h2>
                        <h2 className="linkPost">https://medium.com/@pshrmn/a-simple-react-router</h2>
                    </div>
                    <img src="https://blog.emania.com.br/wp-content/uploads/2019/01/como-tirar-foto-de-cachorro.jpg" alt="imagem teste" />
                </div>
            </div>
        </Container>
    )
}
const Container=styled.div`
    width: 100%;
    min-height: 232px;

    background: #171717;
    border-radius: 16px;

    display:flex;

    margin-bottom:20px;
    h2 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
    }
    h2.name {
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
    }
    h2.text {
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;  
    }
    h2.namePost {
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
    }
    h2.textPost {
        font-size: 9px;
        line-height: 11px;
        color: #9B9595;
    }
    h2.linkPost {
        font-size: 9px;
        line-height: 11px;
        color: #CECECE;
    }
    > * {
        &:nth-child(2){
            padding:15px;
            width: 80%;
            gap:5px;
            display:flex;
            flex-direction: column;
            align-items:start;
        }
    }
    > * {
        &:first-child{
            width: 70px;
            display:flex;
            align-items:start;
            justify-content:start;
            img {
                margin:15px;
                width: 50px;
                height: 50px;
                border-radius: 26.5px;
            }
        }
    }
    .box {
        width: 100%;
        height: 115px;

        border: 1px solid #4D4D4D;
        border-radius: 11px;
        display:flex;
        div {
            width:70%;
            display:flex;
            flex-direction:column;
            padding:10px;
            justify-content:space-between;
        }
        img {
            width:30%;
            min-width:95px;
            border-radius: 0px 12px 13px 0px;
        }
    }
    @media(max-width: 767px) {
        border-radius: 0;
    }
    
`