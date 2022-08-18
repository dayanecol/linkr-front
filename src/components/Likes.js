import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import ReactTooltip from 'react-tooltip';
import axios from "axios";
import { toast } from "react-toastify";
import AtualizationContext from '../contexts/AtualizationContext.js';
export function Likes (id) {
    const [loading, setLoading] = useState(false)
    const data = localStorage.getItem("data");
    const { token } = data ? JSON.parse(data): "";
    const {loadNew, setLoadNew} = useContext(AtualizationContext);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const [message, setMessage] = useState('')
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState('');
    useEffect(() => {
        if (loadNew) return;
        const promise = axios.get("https://lmback-linkr.herokuapp.com/likes", config);
        promise

            .then((res) => {
                const likess = res.data.filter((like) => 
                    like.id === id.id
                )
                setLikes(likess[0].users.map((user) => user.name))
                
            })
            .catch((error) => {
                toast.error("An error occured");
                console.log(error);
            })
    // eslint-disable-next-line
    }, [id])
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
                setMessage(likes[0]+ ", " + likes[1]+ " and others "+ (likes.length - 2))
            } else if(likes.length === 2) {
                setMessage(likes[0]+ " and " + likes[1] )
            } else if(likes.length === 1) {
                setMessage(likes[0])
            } else {
                setMessage("there's no likes yet")
            }  
        }
    }, [liked, likes, id])

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
            .catch((error) => {
                toast.error("An error occured");
                console.log(error);
            })
    // eslint-disable-next-line
    }, [id])

    function getLike () {
        if(loading) {
            toast.error("wait a second, please")
        } else {
            setLoading(true)
            const promise = axios.post("https://lmback-linkr.herokuapp.com/likes", id, config);
            promise
                .then((res) => {
                    setLoading(false)
                    setLiked(true)
                })
                .catch(() => {
                    toast.error("An error occured")
                })
        }
        
    }
    function getDeslike () {
        if(loading) {
            toast.error("wait a second, please")
        } else {
            setLoading(true)
            const promise = axios.delete(`https://lmback-linkr.herokuapp.com/likes/${id.id}`, config);
            promise
                .then((res) => {
                    setLiked(false)
                    setLoading(false)
                })
                .catch(() => {
                    toast.error("An error occured")
                })
        }
        
    }
    return (
        <>
        {liked ? 
            <FaHeart className="fullHeart" onClick={getDeslike}/>
            :
            <FaRegHeart className="emptyHeart" onClick={getLike}/>
        }
        
        {/* eslint-disable-next-line */}
        <a data-tip data-for={id.id.toString()}> 
        {liked ?
        <span>{likes.length + 1} {likes.length > 0 ? 'likes' : 'like'}</span>
        :
        <span>{likes.length} {likes.length > 1 ? 'likes' : 'like'}</span>
        } 
        </a>
        <ReactTooltip id={id.id.toString()} place="bottom" type="light" effect="float">
        <h6>{message}</h6>
        </ReactTooltip>
        </>
    )
}