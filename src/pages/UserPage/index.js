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
import { modalStyle, ModalText, ModalCancelButton, ModalDeleteButton, ModalButtons } from "../Home/style.js";
import FollowButton from "../../components/shared/FollowButton.js";

export default function UserPage() {

    const { id } = useParams();
    const [userName, setUserName] = useState("");
    const [userPhoto, setUserPhoto] = useState("");
    const data = localStorage.getItem("data");
    const { token, userId } = data ? JSON.parse(data): "";
    const [atualization, setAtualization] = useState(false);
    const [load, setLoad] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [statusFollow, setStatusFollow] = useState("Follow");
    const [color,setColor] = useState(true);
    const [disable,setDisable] = useState(false);
    
    useEffect(() => {

        atualization ? setAtualization(false):setAtualization(true);
        if (!token) {
            alert("You must be logged in to see this page");
            navigate("/");
            return;
        }
    // eslint-disable-next-line    
    },[id])

    function handleFollow(){
        setDisable(true);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.post(`https://lmback-linkr.herokuapp.com/user/${id}/follow`,"",config);
        promise
            .then((response)=>{
                setStatusFollow(response.data);
                setColor(response.data==="Follow");
                setDisable(false);
            })
            .catch ((error)=>{
                toast.error("An error occured while trying to follow/unfollow");
                console.log(error);
                setDisable(false);
            });
    }
        

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

            await axios.delete(`https://lmback-linkr.herokuapp.com/posts/${postToDelete}`,config);
            atualization ? setAtualization(false):setAtualization(true);
            setModalIsOpen(false);

        } catch (error){

            toast.error("An error occured while trying to delete the post");
            setLoad(false);
            setModalIsOpen(false);
            console.log(error);

        }
    }

    function renderFollowButton(){

        return(
        <> 
            {parseInt(userId)!==parseInt(id)?
                <div className="follow">
                    <FollowButton 
                        color={color} 
                        onClick={()=>handleFollow()}
                        disabled={disable}
                    >{statusFollow}</FollowButton>
                </div>
                :
                <div style={{marginTop: '71px'}}></div>
            }
            
        </>
            
        );
        
    }

    return (
        <Container>
            <Header />
            <Main>
                <div className="timeline">
                    <span className="titleNameUser">                        
                        <img src={userPhoto} alt="foto do usuário"/>
                        <UserName>{userName}'s posts</UserName>
                        
                    </span>
                    <div>
                    <AtualizationContext.Provider value={{atualization, setAtualization, load, setLoad}}>
                        <UserPosts id={id} setUserName={setUserName} setUserPhoto={setUserPhoto} setModalIsOpen={setModalIsOpen} setPostToDelete={setPostToDelete} />
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
                <div className="right-side">
                    {renderFollowButton()}
                    <div className="trending">
                            
                            <Trendings />
                    </div>
                </div>    
            </Main>
        </Container>
    )
}
