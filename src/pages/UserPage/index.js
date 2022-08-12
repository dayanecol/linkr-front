import { Container, Main, UserName } from "./style.js";
import UserPosts from "./userPosts.js";
import Trendings from "../../components/Trendings.js";
import Header from "../../components/Layout.js/Header.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function UserPage() {

    const { id } = useParams();
    const [userName, setUserName] = useState("");
    const [userPhoto, setUserPhoto] = useState("");
    const data = localStorage.getItem("data");
    const { token } = data ? JSON.parse(data): "";
    const navigate = useNavigate();

    useEffect(() => {

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

        const promise = axios.get(`https://lmback-linkr.herokuapp.com/user/${id}`, config);

        promise.then((res)=>{
            setUserName(res.data.name);
            setUserPhoto(res.data.photo);
        })
        .catch((err)=>{
            console.log(err.response.data);
        })

    },[])

    return (
        <Container>
            <Header />
            <Main>
                <div className="timeline">
                    <span>
                        <img src={userPhoto}/>
                        <UserName>{userName}'s posts</UserName>
                    </span>
                    
                    <div>
                        <UserPosts id={id} />
                    </div>
                </div>

                <div className="trending">
                    <Trendings />
                </div>
            </Main>
        </Container>
    )
}
