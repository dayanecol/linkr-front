import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { TiPencil } from "react-icons/ti";
import { FaTrash} from "react-icons/fa";
import axios from "axios";

export default function Post({post}) {
    const [editContent, setEditContent] = useState('');
    const [allowedEdit, setAllowedEdit] = useState(false);
    const [editableContent, setEditableContent] = useState('');
    const [disable,setDisable] = useState(true);
    const inputRef = useRef(null);
    const URL = "https://lmback-linkr.herokuapp.com/";
    const postId = post.post.id;
    const userId = post.id;

    useEffect(()=>{
        if(allowedEdit && inputRef.current){
            inputRef.current.focus();
        }
    },[allowedEdit]);

    function makeEditable(){
        setAllowedEdit(true);
        setEditContent(editableContent);
    }

    function cancelEdit(){
        setAllowedEdit(false);
    }

    async function sendEditedContent(){
        setDisable(false); 
        try {
            const data = localStorage.getItem("data");
            const { token } = data ? JSON.parse(data): "";

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            await axios.post(
                `${URL}posts/${27}/edit`,
                { content: editContent },
                config
            );
            setEditableContent(editContent);
            setAllowedEdit(false);
        } catch (error) {
            console.log(error.message);
            alert ("Não foi possível salvar as alterações!");
        }
        setDisable(true);
    }

    const verifyKey = (event) => {
        switch (event.keyCode) {
          case 13:
            sendEditedContent();
            event.preventDefault();
            break;
    
          case 27:
            cancelEdit();
            event.preventDefault();
            break;
    
          default:
            break;
        }
      };
    
    return (
        <Container>
            <div>
                <img src={post.profilePicture} alt="imagem teste" />
            </div>
            <div>
                <NameContainer>
                    <h2 className="name">{post.name}</h2>
                    <Icon >
                        { userId ===30? (
                         <>
                            {postId?
                                <TiPencil 
                                className="pencil"
                                onClick={()=>{
                                    allowedEdit ?
                                        cancelEdit()
                                        :
                                        makeEditable()
                                }}
                                /> 
                                :
                                (
                                   <></>  
                                
                            )}
                            <FaTrash className="trash"/>
                         </>       
                        ):(<></>)}
                         
                    </Icon>
                </NameContainer>
                
                <h2 className="text">{
                    allowedEdit?
                        (<textarea
                            className="edit-content"
                            disabled={!disable}
                            ref={inputRef}
                            value={editContent}
                            onChange={(event)=>{
                                setEditContent(event.target.value);
                            }}
                            onKeyDown={verifyKey} 
                        />)
                        :
                        (<>{post.content}</>)
                    }
                </h2>
                
                 
                <div className="box" onClick={() => window.open(`${post.post.url}`)}>
                    <div>
                        <div className="namePost">
                            <h2>{post.post.title}</h2>
                        </div>
                        <div className="textPost">
                            <h2>{post.post.description}</h2>   
                        </div>
                        <div className="linkPost">
                            <h2>{post.post.url}</h2>
                        </div>
                    </div>
                    <img src={post.post.image} alt="imagem teste" />
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
        width:100%; 
         
    }

    .edit-content{
        width:100%;
        height: 44px;
        background: #FFFFFF;
        border-radius: 7px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #4C4C4C;
        border:none;  
        padding:5px 10px 4px 12px;
        resize:none;  
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
    
`;

const Icon = styled.div`
    font-size: 16px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
    :hover {
        cursor: pointer;
    }
    .pencil{
        margin:10px;
    }
`;

const NameContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
`;