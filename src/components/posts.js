import axios from 'axios'
import { useEffect, useState } from "react";
import Post from './post.js';
import { toast } from 'react-toastify';
import { Circles } from 'react-loader-spinner';

import AtualizationContext from '../contexts/AtualizationContext.js';
import { useContext } from 'react';

export default function Posts({setModalIsOpen, setPostToDelete}) {
    const {atualization, load, setLoad} = useContext(AtualizationContext);

    const [posts, setPosts] = useState(false);
    const data = localStorage.getItem("data");
    const { token } = data ? JSON.parse(data): "";

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(()=>{
        const promise = axios.get("https://lmback-linkr.herokuapp.com/posts", config);
        promise
            .then((res) => {
                setPosts(res.data);
                setLoad(false)
                })
            .catch(() => {
                toast.error("An error occured while trying to fetch the posts, please refresh the page")
            })
    // eslint-disable-next-line
    }, [atualization])

    if(!posts || load) {
        return  <Circles
                    color="black"
                    height={60}
                    width={80}
                />
    } else if(posts.length === 0) {
        return <h1>There are no posts yet</h1>
    }
    return (
        <>{posts.map((post, index) => <Post key={index} post={post} setModalIsOpen={setModalIsOpen} setPostToDelete={setPostToDelete} />)}</>
    )
}
