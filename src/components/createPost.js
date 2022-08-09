import styled from "styled-components"
export default function CreatePost() {
    return(
        <Container>
            <div>
                <img src="https://blog.emania.com.br/wp-content/uploads/2019/01/como-tirar-foto-de-cachorro.jpg" alt="imagem teste" />
            </div>
            <div>
                <h2>What are you going to share today?</h2>
                <input 
                    type="url" 
                    placeholder="http://..."
                />
                <textarea
                    name="message"
                    type="text" 
                    placeholder="Awesome article about #javascriptaa"
                />
                <div className="buttonCreate">
                    <button>
                        <span>Publish</span>
                    </button>
                </div>
            </div>
        </Container>
    )
}
const Container = styled.div`
    width: 100%;
    height: 209px;

    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display:flex;
    flex-direction:row;

    margin-bottom:20px;
    input, textarea {
        border:none;
        height: 30px;
        padding: 5px 20px;

        background: #EFEFEF;
        border-radius: 5px;
    }
    textarea {
        height: 85px;
        padding-bottom:50px;
        overflow:hidden;
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
    .buttonCreate{
        display:flex;
        width:100%;
        justify-content:end;
    }
    button {
        border:none;
        width: 112px;
        height: 31px;

        background: #1877F2;
        border-radius: 5px;
    }
    span {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
    }
    h2 {
        margin-bottom:10px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 17px;
        line-height: 20px;
        color: #707070;
    }
    @media(max-width: 767px) {
        border-radius: 0;
        > * {
        &:first-child{
            display:none;
            }
        }
        > * {
            &:nth-child(2){
            width: 100%
            }
        }
        h2{
            text-align: center;
        }
    }
`