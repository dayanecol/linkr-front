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
    // const [usersFollowedId, setUsersFollowedId] = useState([]);
    // const [usersFollowedName, setUsersFollowedName] = useState([]);
    let filterList;
    let usersFollowedId;
    let usersFollowedName;
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
                usersFollowedId = response.data.map((id) => id.id);
                usersFollowedName = response.data.map((id) => id.name);
                if(response.data.length===0){
                    setFollowExist(false)
                }else{setFollowExist(true)}

                const promise = axios.get("https://lmback-linkr.herokuapp.com/follows", config);
                promise
                    .then((res) => {
                        filterList = res.data.filter((post) => {
                            console.log(post);
                            console.log(usersFollowedId?.includes(post.id));
                            console.log(usersFollowedName?.includes(post.ReposterName));
                            console.log(post.isRepost);
                           if (usersFollowedId?.includes(post.id) && !usersFollowedName?.includes(post.ReposterName)){
                                if (post.isRepost == false) {
                                    return post;
                                }
                            } else {
                                if (usersFollowedName?.includes(post.ReposterName) || usersFollowedName?.includes(post.ReposterName)){
                                    return(post)
                                }
                            }
                        });
                        setPosts(filterList);
                        setLoad(false)
                        console.log(filterList);
                        })
                    .catch(() => {
                        toast.error("An error occured while trying to fetch the posts, please refresh the page")
                    })                
            })
            .catch((error)=>{
                toast.error("An error occured while trying to fetch the posts, please refresh the page");
                console.log(error);
            })

    }, [atualization,])

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
