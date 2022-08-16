import styled from "styled-components";
import { FaSyncAlt } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import useInterval from 'use-interval';
import axios from "axios";
import AtualizationContext from '../contexts/AtualizationContext.js';
import { ThreeDots } from  'react-loader-spinner';

export default function PostsAfterLoad({posts}){

    const data = localStorage.getItem("data");
    const { token } = data ? JSON.parse(data): "";
    const [hasNewPosts, setHasNewPosts] = useState([]);
    const {atualization, setAtualization} = useContext(AtualizationContext);
    const [loadNew, setLoadNew] = useState(false);
    const ONE_SECOND = 1000;

    useEffect(()=>{
        setLoadNew(false);
    }, [posts])

    useInterval(()=> {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promise = axios.get("https://lmback-linkr.herokuapp.com/posts", config);
        promise
            .then((res) => {
                setHasNewPosts(res.data);
                setLoadNew(false);
            });
        
    }, 20 * ONE_SECOND);

    function loadMore(){
        atualization ? setAtualization(false):setAtualization(true);
        setLoadNew(true);
    }

    return (
        <>
            {
            hasNewPosts.length > posts.length ? 
            <Container onClick={loadMore}>
                {
                loadNew ? 

                <ThreeDots color="#FFFFFF" height={20} width={50} />
                :  
                <> 
                    <h3>
                        {hasNewPosts.length - posts.length} new posts, load more!
                    </h3>
                    <FaSyncAlt color="#FFFFFF" fontSize="16px"/>
                </>
                }
                
            </Container>
            :
            null
            }
        </>
    )
}

const Container = styled.div`
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 17px;
    width: 100%;
    height: 61px;
    background: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    h3 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
        margin-right: 14px;
    }
`;