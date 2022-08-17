import styled from "styled-components"
import {FaPaperPlane} from "react-icons/fa"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import axios from "axios";
export default function Comments ({postId, userOwnner}) {
    const [load, setLoad] = useState(false)
    const [commentUser, setCommentUser] = useState('');
    const [comments, setComments] = useState(false)
    const data = localStorage.getItem("data");
    const { token } = data ? JSON.parse(data): "";
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const body = {
        id: postId, comment: commentUser
    }
    console.log(body)
    function handleSubmit () {
        setLoad(true)
        const promise = axios.post("https://lmback-linkr.herokuapp.com/comments", body, config)
        promise
            .then(() => setLoad(false))
            .catch(() => setLoad(false))
    }
    useEffect(() => {
        const promise = axios.get("https://lmback-linkr.herokuapp.com/comments")
        promise
            .then((res) => {
                const commentsThis = res.data.filter((res) => res.postId === postId)
                setComments(commentsThis)
            })
            .catch(() => console.log(body))
    }, [load])
    if(!comments) {
        return <></>
    }
    return (
        <Container>
            {comments.map((comment) => 
                <>
                    <div className="comment">
                        <img src={comment.profilePicture} alt="img" />
                        <div>
                            <div className="name">
                                <h2>{comment.name}</h2>
                                <h3>• following</h3>
                            </div>
                            <h3>{comment.comment}</h3>
                        </div>
                    </div>
                    <div className="row"></div>
                </>
            )}
            <div className="createComment">
                <img src="https://3.bp.blogspot.com/-oswscyhiDQU/TydFmWqUkkI/AAAAAAAACCg/ch4xfcxnBsA/s320/%C3%80+Espera+de+Um+Milagre+-+Edi%C3%A7%C3%A3o+especial9.jpg" alt="img" />
                <div>
                    <input 
                        type="text" 
                        placeholder="write a comment..."
                        value={commentUser}
                        onChange={(e) => setCommentUser(e.target.value)}
                    />
                    <FaPaperPlane onClick={handleSubmit} className="paper" />
                </div>
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
        width:100%;
        padding-left: 20px;
        padding-right: 35px;
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
        div {
            width:calc(100% - 60px);
            display:flex;
            align-items:center;
        }
        .paper {
            margin-left: -25px;
            color:white;
        }
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