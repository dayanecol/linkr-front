import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import ReactTooltip from 'react-tooltip';
import axios from "axios";
import { toast } from "react-toastify";
export function Likes (id) {
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
                console.log(message)
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
        const promise = axios.delete("https://lmback-linkr.herokuapp.com/likes", id, config);
        promise
            .then((res) => {
                setLiked(false)
            })
            .catch(() => {
                toast.error("An error occured")
            })
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