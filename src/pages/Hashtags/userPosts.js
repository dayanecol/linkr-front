import axios from 'axios'
import { useEffect, useState } from "react";
import Post from './post.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AtualizationContext from '../../contexts/AtualizationContext.js';
import { useContext } from 'react';

export default function Posts({hashtag, setUserName, setUserPhoto, setPostToDelete, setModalIsOpen}) {

    const {atualization } = useContext(AtualizationContext);

    const [posts, setPosts] = useState(false);
    const data = localStorage.getItem("data");
    const { token } = data ? JSON.parse(data): "";
    const navigate = useNavigate();

    useEffect(()=>{
        if (!token) {
            alert("You must be logged in to see this page");
            navigate("/");
            return;
        }
        
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        
        const promise = axios.get(`https://lmback-linkr.herokuapp.com/hashtag/${hashtag}`, config);
        promise
            .then((res) => {
                setPosts(res.data.posts);
                setUserName(res.data.name);
                setUserPhoto(res.data.photo);
            })
            .catch(() => toast.error("An error occured while trying to fetch the posts, please refresh the page"))
        // eslint-disable-next-line    
    }, [atualization, hashtag])

    if(!posts) {
        return <h1>loading</h1>
    }
    return (
        <>{posts.map((post, index) => <Post setPostToDelete={setPostToDelete} setModalIsOpen={setModalIsOpen} key={index} post={post} />)}</>
    )
}
