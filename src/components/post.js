import styled from "styled-components";
import { Likes } from "./Likes.js";
import { useEffect, useRef, useState } from "react";
import { TiPencil } from "react-icons/ti";
import { FaTrash} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AtualizationContext from '../contexts/AtualizationContext.js';
import { useContext } from 'react';

export default function Post({post}) {
    const {setAtualization} = useContext(AtualizationContext);
    const [editContent, setEditContent] = useState('');
    const [allowedEdit, setAllowedEdit] = useState(false);
    const [editableContent, setEditableContent] = useState('');
    const [disable,setDisable] = useState(true);
    const inputRef = useRef(null);
    const URL = "https://lmback-linkr.herokuapp.com/";
    const postId = post.post.id;
    const postUserId = post.id;
    const data = localStorage.getItem("data");
    const { userId } = JSON.parse(data);
    const navigate = useNavigate();
    

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

    function goToProfile(id){
        navigate('/user/'+id);
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
                `${URL}posts/${postId}/edit`,
                { content: editContent },
                config
            );
            setEditableContent(editContent);
            setAllowedEdit(false);
            setAtualization(true);
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
                <img className="goToProfile" src={post.profilePicture} onClick={()=> goToProfile(post.id)} alt="imagem teste" />
                <Likes id={post.post.id}/>
            </div>
            <div>
                <NameContainer>
                    <h2 className="name" onClick={()=> goToProfile(post.id)}>{post.name}</h2>
                    <Icon >
                        { postUserId === userId? (
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
                            <h2>{post.post.description }</h2>   
                        </div>
                        <div className="linkPost">
                            <h2>{post.post.url}</h2>
                        </div>
                    </div>
                    <img src={post.post.image} alt="user" />
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
    .emptyHeart {
        color: white;
    }
    .fullHeart {
        color:red;
    }
    h2 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
    }
    h2.name {
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
        cursor: pointer;
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
            height: 100%;
            display:flex;
            flex-direction: column;
            align-items:center;
            justify-content:start;
            gap: 5px;
            img {
                margin:15px;
                width: 50px;
                height: 50px;
                border-radius: 26.5px;
            }
            span {
                color: white
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
    .goToProfile {
        cursor: pointer;
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
        margin-right:10px;
    }
`;

const NameContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
`;