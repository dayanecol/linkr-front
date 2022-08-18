import styled from "styled-components"
import { useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";
import AtualizationContext from "../contexts/AtualizationContext.js";
import { useContext } from "react";
import NOT_FOUND from "../assets/images/404.png"
export default function CreatePost() {
    const {atualization, setAtualization, load, setLoad} = useContext(AtualizationContext);

    const [post, setPost] = useState({
        url: '',
        content: ''
    })
    const data = localStorage.getItem("data");
    const { token, profilePicture } = data ? JSON.parse(data): "";
    async function handlleSubmit(e) {
        e.preventDefault();
        setLoad(true)
        let re = new RegExp("^((http(s?):\/\/?[a-z])|(magnet:\?xt=urn:btih:))")
        if (!re.test(post.url)) {
            toast.error("Enter a correct url");
            setLoad(false)
        } else {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                await axios.post("https://lmback-linkr.herokuapp.com/posts", {...post}, config);
                atualization ? setAtualization(false):setAtualization(true);
                setPost({
                    url: '',
                    content: ''
                })
            } catch (error){
                toast.error("An error occured while trying to create the post");
                setLoad(false);
                console.log(error);
            }
        } 
    }
    console.log({...post})
    function changeInput(e) {
        setPost({...post, [e.target.name]: e.target.value})
    }
    return(
        <Container>
            <div>
                <img src={profilePicture} 
                onError={e => (e.target.src = NOT_FOUND)}
                alt="imagem teste" />
            </div>
            <div>
                <h2>What are you going to share today?</h2>
                <input 
                    disabled={load ? 'disabled' : ''}
                    type="url" 
                    placeholder="http://..."
                    value={post.url}
                    name="url"
                    onChange={changeInput}
                />
                <textarea
                    disabled={load ? 'disabled' : ''}
                    name="content"
                    type="text" 
                    placeholder="Awesome article about #javascriptaa"
                    value={post.content}
                    onChange={changeInput}
                />
                <div className="buttonCreate">
                    {load ?
                    <button disabled>
                        <span>Publishing</span>
                    </button>
                    :
                    <button onClick={handlleSubmit} type="submit">
                        <span>Publish</span>
                    </button>
                    }
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

        display: flex;
        flex-direction: center;
        align-items:center;
        div, span {
            margin: 0 auto;
        }
        cursor:pointer;
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