import axios from 'axios'
import { useEffect, useState } from "react";
import Post from './post.js';
import { toast } from 'react-toastify';
import { Circles } from 'react-loader-spinner';
import PostsAfterLoad from './potsAfterLoad.js';

import AtualizationContext from '../contexts/AtualizationContext.js';
import { useContext } from 'react';

export default function Posts({setModalIsOpen, setPostToDelete}) {
    const {atualization, load, setLoad, atualizationComment} = useContext(AtualizationContext);
    const [followExist,setFollowExist] = useState(false);
    const [posts, setPosts] = useState(false);
    const data = localStorage.getItem("data");
    const { token } = data ? JSON.parse(data): "";

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(()=>{
        const followResponse = axios.get ("https://lmback-linkr.herokuapp.com/follow/user",config);
        followResponse
            .then((response)=>{
                if(response.data.length===0){
                    setFollowExist(false)
                }else{setFollowExist(true)}
                
            })
            .catch((error)=>{
                toast.error("An error occured while trying to fetch the posts, please refresh the page");
                console.log(error);
            })
        // const promise = axios.get("https://lmback-linkr.herokuapp.com/posts", config);
        const promise = axios.get("https://lmback-linkr.herokuapp.com/follows", config);
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

    const [comments, setComments] = useState(false)

    useEffect(() => {
        const promise = axios.get("https://lmback-linkr.herokuapp.com/comments")
        promise
            .then((res) => {
                setComments(res.data)
            })
            .catch(() => toast.error("An error ocurred!"))
    }, [atualizationComment])

    if(!posts || load) {
        return  <Circles
                    color="black"
                    height={60}
                    width={80}
                />
    } else if(posts.length === 0) {
        return (
        <>
            {followExist 
                ?
                (<h1>No posts found from your friends</h1>)
                :
                (<h1>You don't follow anyone yet. Search for new friends!</h1>)
            }
        
        </>);
    }
    return (
        <>
            {posts.length > 0 ? <PostsAfterLoad posts={posts} setPosts={setPosts} /> : null} 
            {posts.map((post, index) => <Post key={index} post={post} comments={comments} setModalIsOpen={setModalIsOpen} setPostToDelete={setPostToDelete} />)}
        </>
    )
}
