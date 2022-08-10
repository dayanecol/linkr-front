import axios from 'axios'
import { useEffect, useState } from "react";
import Post from './post.js';
export default function Posts() {
    const [posts, setPosts] = useState(false);

    useEffect(()=>{
        const promise = axios.get("https://lmback-linkr.herokuapp.com/posts");
        promise
            .then((res) => setPosts(res.data))
            .catch((err) => console.error(err))
    }, [])

    if(!posts) {
        return <h1>loading</h1>
    }
    return (
        <>{posts.map((post) => <Post post={post} />)}</>
    )
}
