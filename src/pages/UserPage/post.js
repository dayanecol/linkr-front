import styled from "styled-components";

export default function Post({post}) {
    return (
        <Container>
            <div>
                <img src={post.profilePicture} alt="imagem teste" />
            </div>
            <div>
                <h2 className="name">{post.name}</h2>
                <h2 className="text">{post.content}</h2>

                <div className="box" onClick={() => window.open(`${post.url}`)}>
                    <div>
                        <div className="namePost">
                            <h2>post.post.title</h2>
                        </div>
                        <div className="textPost">
                            <h2>post.post.description</h2>   
                        </div>
                        <div className="linkPost">
                            <h2>{post.url}</h2>
                        </div>
                    </div>
                    <img src="post.post.image" alt="imagem teste" />
                </div>
            </div>
        </Container>
    )
}
const Container=styled.div`
    width: 100%;
    min-height: 200px;

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
    .linkPost {
        max-height:10px;
        overflow:hidden; 
        h2 {
            font-size: 9px;
            line-height: 11px;
            color: #CECECE;
        }
    }
    .namePost {
        max-height:29px;
        overflow:hidden;
        h2 {
            font-size: 11px;
            line-height: 13px;
            color: #CECECE;
        } 
    }
    .textPost{
        max-height:35px;
        overflow:hidden;
        h2 {
            font-size: 9px;
            line-height: 11px;
            color: #9B9595;
        }
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
        > * {
            &:first-child{
                width:70%;
                display:flex;
                flex-direction:column;
                padding:10px;
                justify-content:space-between;
            }
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