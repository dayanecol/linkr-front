import { Container, Main, modalStyle, ModalText, ModalCancelButton, ModalDeleteButton, ModalButtons } from "./style.js"
import CreatePost from "../../components/createPost.js"
import Posts from "../../components/posts.js"
import Trendings from "../../components/Trendings.js";
import Header from "../../components/Layout.js/Header.js";
import AtualizationContext from "../../contexts/AtualizationContext.js"
import { useState } from "react";
import Modal from 'react-modal';
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
    const [atualization, setAtualization] = useState(false);
    const [load, setLoad] = useState(false);
    const [atualizationComment, setAtualizationComment] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [loadNew, setLoadNew] = useState(false);

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

        } catch (error) {

            toast.error("An error occured while trying to delete the post");
            setLoad(false);
            setModalIsOpen(false);
            console.log(error);

        }
    }

    return (
        <Container>
            <Header />
            <Main>
                <div className="timeline">
                    <h1>Timeline</h1>
                    <div>
                        <AtualizationContext.Provider value={{atualization, setAtualization, load, setLoad, atualizationComment, setAtualizationComment, loadNew, setLoadNew}}>
                            <CreatePost />
                            <Posts setModalIsOpen={setModalIsOpen} setPostToDelete={setPostToDelete} />
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
                        </AtualizationContext.Provider>
                    </div>
                </div>

                <div className="trending">
                    <Trendings />
                </div>
            </Main>
        </Container>
    )
}