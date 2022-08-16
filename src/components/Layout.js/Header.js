import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { DebounceInput } from 'react-debounce-input';
import axios from "axios";
import NOT_FOUND from "../../assets/images/404.png"

export default function Header(){
    const navigate = useNavigate();
    const data = localStorage.getItem("data");
    const { profilePicture, token } = data ? JSON.parse(data): "";
    const [clicked, setClicked] = useState(false);
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    function logout(){
        localStorage.removeItem("data");
        navigate("/");
    }

    useEffect(()=>{

        if (search.length < 3){
            setResults([]);
            return;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.get(`https://lmback-linkr.herokuapp.com/search/${search}`, config);

        promise.then(res => {
            setResults(res.data);
            
            results.map(result => {
                console.log(result.name);
            })
        })
        .catch(err => {
            console.log(err);
        });

    },[search])

    return (
        <HeaderContainer>
            <Container>
                <TopBar>
                    <Link style={{textDecoration: 'none'}} to="/timeline">
                        <h1>linkr</h1>
                    </Link>
                    <SearchField>                
                        <div>
                            <DebounceInput element={SearchBar} placeholder={"Search for people"} debounceTimeout={300} minLength={3} value={search} onChange={event => setSearch(event.target.value)}/>
                            
                            {
                            results.map((result, index) => 
                                
                                <span onClick={()=> navigate("/user/"+ result.id)} key={index}>
                                    <img 
                                        src={result.profilePicture}/>
                                    <p>{result.name}</p>
                                </span>
                                
                                )
                            }
                            
                                
                        </div>
                    </SearchField>
                    <div onClick={()=> setClicked(!clicked)}>
                        <Icon >
                            {clicked ? 
                                <FaAngleUp />
                                :
                                <FaAngleDown />
                            }  
                        </Icon>
                        <img 
                            src={profilePicture} 
                            onError={e => (e.target.src = NOT_FOUND)}
                            alt="profilePicture" />
                    </div>
                    
                </TopBar>
                    {clicked?
                        <Menu onClick= {()=>{
                            setClicked(!clicked);
                            logout();
                        }}>
                            Logout
                        </Menu>
                        :
                        <></>    
                    }            
            </Container>
        </HeaderContainer>
        
    );
}

const Container = styled.div`
    position: relative;
    z-index: 2;
`;

const TopBar = styled.div`
    display:flex;
    align-items: center;
    justify-content:space-between;
    padding: 25px;
    width: 100%;
    height: 72px;
    background-color: #151515;
    h1 {
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 49px;
        line-height: 54px;
        letter-spacing: 0.05em;
        color: #FFFFFF;

    }
    img {
        width: 53px;
        height: 53px;
        border-radius: 26.5px;
        cursor: pointer;
        object-fit:cover;
    }
    div{
        display:flex;
    }
`;

const Icon = styled.div`
    font-size: 35px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
    :hover {
        cursor: pointer;
    }
`;

const Menu = styled.div`
    width: 150px;
    height: 47px;
    background: #171717;
    border-radius: 0px 0px 20px 20px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor: pointer;
    position:absolute;
    top:72px;
    right:0;
`;

const SearchBar = styled.input`
    border: none;
    background: #FFFFFF;
    border-radius: 8px 8px 0px 0px;
    height: 45px;
    padding: 20px;
    width: 100%;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    :placeholder {
        color: #C6C6C6;
    }
`;

const SearchField = styled.div`
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    width: 40%;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 15px;
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    div {
        border-radius: 8px;
        background: #E7E7E7;
        display: flex;
        flex-direction: column;
        span {
            cursor: pointer;
            transition: filter 0.2s ease-in-out;
            display: flex;
            align-items: center;
            margin: 15px;
            background: #E7E7E7;
            border-radius: 8px;
            p {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 400;
                font-size: 19px;
                line-height: 23px;
                color: #515151;
                cursor: pointer;
            }
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                margin-right: 12px;
            }
            :hover {
                filter: brightness(0.9);
            }
        }
    }
    @media (max-width: 768px) {
        width: 95%;
        top: 80px;
        position: absolute;
    }
`;

const HeaderContainer = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    position: fixed;
    z-index:2;
    @media (max-width: 768px) {
        position: static;
        margin-bottom: 20px;
    }
`;