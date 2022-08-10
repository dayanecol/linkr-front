import { Container, Main, UserName } from "./style.js";
import UserPosts from "./userPosts.js";
import Trendings from "../../components/Trendings.js";
import Header from "../../components/Layout.js/Header.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserPage() {

    const { id } = useParams();
    const [userName, setUserName] = useState("");
    const [userPhoto, setUserPhoto] = useState("");

    useEffect(() => {
        const promise = axios.get(`https://lmback-linkr.herokuapp.com/users/${id}`);

        promise.then((res)=>{
            setUserName(res.data[0].name);
            setUserPhoto(res.data[0].photo);
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