import styled from "styled-components";

//font-family: 'Lato', sans-serif;
//font-family: 'Oswald', sans-serif;
//font-family: 'Passion One', cursive;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background:#333333;
    overflow: auto;
    padding-top: 72px;
    @media(max-width: 767px) {
        padding-top: 0px;
    }
`;
const Main = styled.div`
    display: flex;
    flex-direction:row;

    justify-content: space-between;

    margin:0 auto;
    width: 70%;
    h1 {
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        color: #FFFFFF;
    }
    .timeline {
        width: 70%;
        display:flex;
        flex-direction:column;
        > h1 {
            font-size: 43px;
            margin: 50px 0;
        }
    }
    .trending {
        height:fit-content;
        width: 28%;
        margin-top: 141px;
        margin-bottom: 100%;
        background: #171717;
        border-radius: 16px;
    }
    
    @media(max-width: 767px) {
        width:100%;
        .trending {
            display:none;
        }
        .timeline {
            width:100%;
            h1 {
                margin-left:25px;
            }
        }

    }

`;

const modalStyle = {
    content : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: '50%',
        background: '#333333',
        borderRadius: '50px',
        minWidth: '260px',
        minHeight: '450px',
        overflowY: 'hidden',
        overflowX: 'hidden',
    },
    overlay: {
        background: 'rgba(255, 255, 255, 0.9)'   
    }
};

const ModalText = styled.h3`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #FFFFFF;
    width: 55%;
    word-wrap: break-word;
    margin-bottom: 40px;
`;

const ModalDeleteButton = styled.button`
    background: #1877F2;
    border: none;
    border-radius: 5px;
    margin-left: 13.5px;
    margin-right: 13.5px;
    padding: 8px 20px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
`;

const ModalCancelButton = styled.button`
    background: #FFFFFF;
    border: none;
    border-radius: 5px;
    margin-left: 13.5px;
    margin-right: 13.5px;
    padding: 8px 20px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #1877F2;
`;

const ModalButtons = styled.div`
    display: flex;
`;

export {Main, Container, modalStyle, ModalText, ModalDeleteButton, ModalCancelButton, ModalButtons};