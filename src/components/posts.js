import axios from 'axios'
import { useEffect, useState } from "react";
import Post from './post.js';
import { toast } from 'react-toastify';
import { Circles } from 'react-loader-spinner';
export default function Posts() {
    const [posts, setPosts] = useState(false);

    useEffect(()=>{
        const promise = axios.get("https://lmback-linkr.herokuapp.com/posts");
        promise
            .then((res) => setPosts(res.data))
            .catch(() => {
                toast.error("An error occured while trying to fetch the posts, please refresh the page")
            })
    }, [])
    console.log(posts.length)
    if(!posts) {
        return  <Circles
                    color="black"
                    height={60}
                    width={80}
                />
    } else if(posts.length === 0) {
        return <h1>There are no posts yet</h1>
    }
    return (
        <>{posts.map((post) => <Post post={post} />)}</>
    )
}
