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
    const [usersFollowedId, setUsersFollowedId] = useState([]);
    const [usersFollowedName, setUsersFollowedName] = useState([]);
    const data = localStorage.getItem("data");
    const { token } = data ? JSON.parse(data): "";

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }



    useEffect(()=>{
        // const followResponse = axios.get ("https://lmback-linkr.herokuapp.com/follow/user",config);
        const followResponse = axios.get ("https://localhost:5000/follow/user",config);
        followResponse
            .then((response)=>{
                setUsersFollowedId(response.data.map((id) => id.id));
                setUsersFollowedName(response.data.map((id) => id.name));
                console.log(response.data);
                if(response.data.length===0){
                    setFollowExist(false)
                }else{setFollowExist(true)}
                
            })
            .catch((error)=>{
                toast.error("An error occured while trying to fetch the posts, please refresh the page");
                console.log(error);
            })
        // const promise = axios.get("https://lmback-linkr.herokuapp.com/posts", config);
        let filter;
        const promise = axios.get("https://lmback-linkr.herokuapp.com/follows", config);
        promise
            .then((res) => {
                filter = res.data.map((post) => {
                    if (usersFollowedId?.includes(post.id) && !usersFollowedName?.includes(post.ReposterName)){
                        return;
                    } else {
                        return(post);
                    }
                });
                console.log(filter);
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
