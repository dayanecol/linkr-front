import axios from 'axios'
import { useEffect, useState } from "react";
import Post from '../../components/posts.js';
import { toast } from 'react-toastify';
export default function Posts({id}) {
    const [posts, setPosts] = useState(false);

    useEffect(()=>{
        const promise = axios.get(`https://lmback-linkr.herokuapp.com/users/${id}`);
        promise
            .then((res) => setPosts(res.data))
            .catch(() => toast.error("An error occured while trying to fetch the posts, please refresh the page"))
    }, [])
    if(!posts) {
        return <h1>loading</h1>
    }
    console.log(posts)
    return (
        <>{posts.map((post) => <Post post={post} />)}</>
    )
}
