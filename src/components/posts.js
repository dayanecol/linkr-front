import axios from 'axios'
import { useEffect, useState, useRef, useCallback } from "react";
import Post from './post.js';
import { toast } from 'react-toastify';
import { Circles } from 'react-loader-spinner';
import PostsAfterLoad from './potsAfterLoad.js';
import { ThreeDots } from  'react-loader-spinner';

import AtualizationContext from '../contexts/AtualizationContext.js';
import { useContext } from 'react';

export default function Posts({setModalIsOpen, setPostToDelete}) {
    const {atualization, load, setLoad, atualizationComment} = useContext(AtualizationContext);

    const [posts, setPosts] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [isLoadingNewPage, setIsLoadingNewPage] = useState(false);
    const data = localStorage.getItem("data");
    const { token } = data ? JSON.parse(data): "";
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const lastPostElementRef = useCallback(node => {
        if (isLoadingNewPage) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(page => page + 1);
                console.log(page);
            }
        });
        if (node) observer.current.observe(node);



    }, [atualization, load]);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(()=>{
        if (isLoadingNewPage) return;
        if (!hasMore) return;
        setIsLoadingNewPage(true);
        // const promise = axios.get("https://lmback-linkr.herokuapp.com/posts", config);
        const promise = axios.get("https://lmback-linkr.herokuapp.com/follows?page=" + page, config);
        promise
            .then((res) => {
                if (firstLoad){
                    setPosts(res.data);
                    setFirstLoad(false);
                    setIsLoadingNewPage(false);
                } else {
                    setPosts([...posts, ...res.data]);
                    setLoad(false);
                    setIsLoadingNewPage(false);
                }
                if (res.data.length < 10) {
                    setHasMore(false);
                }
                })
            .catch(() => {
                setIsLoadingNewPage(false);
                toast.error("An error occured while trying to fetch the posts, please refresh the page")
            })
    // eslint-disable-next-line
    }, [atualization, page]);

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
        return <h1>There are no posts yet</h1>
    }
    return (
        <>
            {posts.length > 0 ? <PostsAfterLoad posts={posts} setPosts={setPosts} /> : null} 
            {posts.map((post, index) => <Post lastPostElementRef={lastPostElementRef} key={index} posts={posts} index={index} post={post} comments={comments} setModalIsOpen={setModalIsOpen} setPostToDelete={setPostToDelete} />)}
            {isLoadingNewPage &&  
            <Circles
                color="black"
                height={60}
                width={80}
            />}
            {hasMore ? null : <h1>There are no more posts</h1>}
        </>
    )
}
