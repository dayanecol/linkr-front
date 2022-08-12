import styled from "styled-components";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import ReactTooltip from 'react-tooltip';
import axios from "axios";
import { toast } from "react-toastify";

export default function Post({post}) {
    return (
        <Container>
            <div>
                <img src={post.profilePicture} alt="userImage" />
                <Like id={post.post.id}/>
            </div>
            <div>
                <h2 className="name">{post.name}</h2>
                <h2 className="text">{post.content}</h2>

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
function Like (id) {
    const data = localStorage.getItem("data");
    const { token } = data ? JSON.parse(data): "";

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const [message, setMessage] = useState('')
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState('');
    useEffect(() => {
        const promise = axios.get("https://lmback-linkr.herokuapp.com/likes", config);
        promise

            .then((res) => {
                const likess = res.data.filter((like) => 
                    like.id === id.id
                )
                setLikes(likess[0].users.map((user) => user.name))
            })
            .catch(() => {
                toast.error("An error occured")
            })
    // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if(liked) {
            if(likes.length > 1) {
                setMessage("You, " + likes[0]+ " and others "+ (likes.length - 1))
            } else if(likes.length === 1) {
                setMessage("You and " + likes[0] )
            } else if(likes.length === 0) {
                setMessage("You")
            } else {
                setMessage("there's no likes yet")
            }
        } else {
            if(likes.length > 2) {
                setMessage(likes[0]+ ", " + likes[1]+ " and others "+ likes.length - 2)
            } else if(likes.length === 2) {
                setMessage(likes[0]+ " and " + likes[1] )
            } else if(likes.length === 1) {
                setMessage(likes[0])
            } else {
                setMessage("there's no likes yet")
            }  
        }
    }, [liked, likes])

    useEffect(() => {
        const promise = axios.get("https://lmback-linkr.herokuapp.com/likes/user", config);
        promise
            .then((res) => {
                const postId = res.data.map((dat)=> dat.postId);
                const like = postId.filter((post) => {
                    return post === id.id 
                })
                if(like.length > 0) {
                    setLiked(true)
                }

            })
            .catch(() => {
                toast.error("An error occured")
            })
    // eslint-disable-next-line
    }, [])

    function getLike () {
        const promise = axios.post("https://lmback-linkr.herokuapp.com/likes", id, config);
        promise
            .then((res) => {
                setLiked(true)
            })
            .catch(() => {
                toast.error("An error occured")
            })
    }
    function getDeslike () {
        setLiked(false)
    }
    return (
        <>
        {liked ? 
            <FaHeart className="fullHeart" onClick={getDeslike}/>
            :
            <FaRegHeart className="emptyHeart" onClick={getLike}/>
        }
        
       
        <a data-tip data-for={id.id.toString()}> 
        {liked ?
        <h1>{likes.length + 1}</h1>
        :
        <h1>{likes.length}</h1>
        } 
        </a>
        <ReactTooltip id={id.id.toString()} place="bottom" type="light" effect="float">
        <span>{message}</span>
        </ReactTooltip>
        </>
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
            flex-direction: column;
            align-items:center;
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