import styled from "styled-components"
import {FaPaperPlane} from "react-icons/fa"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import axios from "axios";
import AtualizationContext from "../contexts/AtualizationContext.js";
export default function Comments ({postId, userOwnner, comments}) {
    const {atualizationComment, setAtualizationComment} = useContext(AtualizationContext)
    const [commentUser, setCommentUser] = useState('');
    const [userFollows, setUserFallows] = useState(false)
    
    const data = localStorage.getItem("data");
    const { token, profilePicture } = data ? JSON.parse(data): "";

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    useEffect(()=> {
        const promise = axios.get("https://lmback-linkr.herokuapp.com/follow/user", config)
        promise.then((res) => setUserFallows(res.data))
    }, [])

    const body = {
        id: postId, comment: commentUser
    }

    function handleSubmit () {

        if(commentUser === "") {
            return toast.error("Say something")
        }

        const promise = axios.post("https://lmback-linkr.herokuapp.com/comments", body, config)

        promise
            .then(() => {
                atualizationComment ? setAtualizationComment(false) : setAtualizationComment(true);
                setCommentUser("")
            })
            .catch(() => {
                toast.error("An error ocurred!")
            })
    }
    if(!comments) {
        return <></>
    }
    function Category ({userId}) {
        if(userId === userOwnner) {
            return "• post's author"
        } else if(userFollows?.filter((userFollow)=> userFollow === userId)) {
            return "• following"
        } else {
            return ""
        }
    }
    console.log(comments.map((comment) => comment.userId))
    return (
        <Container>
            {comments.map((comment) => 
                <>
                    <div className="comment">
                        <img src={comment.profilePicture} alt="img" />
                        <div>
                            <div className="name">
                                <h2>{comment.name}</h2>
                                <h3><Category userId={comment.userId} /></h3>
                            </div>
                            <h3>{comment.comment}</h3>
                        </div>
                    </div>
                    <div className="row"></div>
                </>
            )}
            <div className="createComment">
                <img src={profilePicture} alt="img" />
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