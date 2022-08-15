import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AtualizationContext from "../contexts/AtualizationContext";

export default function Trendings() {

    const [hashList, setHashList] = useState([]);
    const navigate = useNavigate();
    const data = localStorage.getItem("data");
    const { token } = data ? JSON.parse(data): "";
    

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

        const promise = axios.get(`https://lmback-linkr.herokuapp.com/trendings`, config)
        promise.then((res) => {
            setHashList(res.data);
        })
        promise.catch(() => {
            alert("faio");
        })
    }, [])

    return (
        <Container>
            <div>
                <h1>trending</h1>
            </div>
            <div className="divisor"></div>
            <div>
                {hashList.map((content, index) => (
                <p key={index} 
                onClick={() => {
                    navigate(`/hashtag/${content.hashtag}`)} } ># {content.hashtag}
                    </p>))}
            </div>
        </Container>
    )
}

const Container = styled.div`
    h1 {
            font-size: 27px;
    }
    p {
        font-family: 'Lato';
        color: white;
        font-weight: 700;
        font-size: 19px;
        margin: 10px 0;
        cursor: pointer;
    }
    .divisor {
    border-top: 2px solid #484848;
    }
    div:nth-child(1) {
        padding: 16px;
    }
    div:nth-child(3) {
        padding: 15px 16px;
    }
`