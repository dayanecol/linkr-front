import { Container, Main, UserName } from "./style.js";
import UserPosts from "./userPosts.js";
import Trendings from "../../components/Trendings.js";
import Header from "../../components/Layout.js/Header.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AtualizationContext from "../../contexts/AtualizationContext.js";
import Modal from 'react-modal';
import axios from "axios";
import { toast } from "react-toastify";
import { modalStyle, ModalText, ModalCancelButton, ModalDeleteButton, ModalButtons } from "../Timeline/style.js";

export default function HashtagPage() {

    const { hashtag } = useParams();
    const [userName, setUserName] = useState("");
    const [userPhoto, setUserPhoto] = useState("");
    const data = localStorage.getItem("data");
    const { token } = data ? JSON.parse(data): "";
    const [atualization, setAtualization] = useState(false);
    const [load, setLoad] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {

        if (!token) {
            alert("You must be logged in to see this page");
            navigate("/");
            return;
        }

    },[])

    async function handleDelete(){

        setLoad(true);

        const data = localStorage.getItem("data");
        const { token } = data ? JSON.parse(data): "";

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {

            await axios.delete(`https://lmback-linkr.herokuapp.com/posts/${postToDelete}`, config);
            atualization ? setAtualization(false):setAtualization(true);
            setModalIsOpen(false);

        } catch {

            toast.error("An error occured while trying to delete the post");
            setLoad(false);
            setModalIsOpen(false);

        }
    }

    return (
        <Container>
            <Header />
            <Main>
            <AtualizationContext.Provider value={{atualization, setAtualization, load, setLoad}}>
                <div className="timeline">
                    <span>
                        <UserName>#{hashtag}</UserName>
                    </span>
                    
                    <div>
                        <UserPosts hashtag={hashtag} setUserName={setUserName} setUserPhoto={setUserPhoto} setModalIsOpen={setModalIsOpen} setPostToDelete={setPostToDelete} />
                        <Modal isOpen={modalIsOpen} style={modalStyle} closeTimeoutMS={500}>
                            <ModalText>
                                Are you sure you want to delete this post?
                            </ModalText>
                            <ModalButtons>
                                <ModalCancelButton onClick={()=> setModalIsOpen(false)}>
                                    No, go back
                                </ModalCancelButton>
                                <ModalDeleteButton onClick={handleDelete}>
                                    Yes, delete it
                                </ModalDeleteButton>
                            </ModalButtons>
                        </Modal>
                    </div>
                </div>

                <div className="trending">
                    <Trendings />
               </div>
            </AtualizationContext.Provider>
            </Main>
        </Container>
    )
}
