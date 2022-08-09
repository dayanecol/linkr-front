import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";

export default function SignUpForm(){
    const navigate = useNavigate();

    let[email,setEmail] = useState('');
    let[password,setPassword] = useState('');
    let[username,setUsername] = useState('');
    let[pictureUrl,setPictureUrl]=useState('');
    const [loading, setLoading] = useState(false);

    async function submitData(event){
        event.preventDefault();
        try {
            const URL = "https://lmback-linkr.herokuapp.com/sign-up";
            await axios.post(URL,{
                email,
                password,
                username,
                pictureUrl,
            });
            setLoading(true);
            alert("Usuário cadastrado com sucesso!");
            navigate("/");
        } catch (error) {
            setEmail('');
            setPassword('');
            setUsername('');
            setPictureUrl('');
            alert("Usuário já cadastrado ou os dados foram preenchidos incorretamente!");
            setLoading(false);
        }
    }

    function loadingButton() {
        return loading ? (
          <ThreeDots
            color="#000"
            background-color={'#1877F2'}
            opacity={0.7}
            height={60}
            width={80}
          />
        ) : (
          'Sign Up'
        );
    }

    function disable() {
        return loading ? 'disable' : '';
    }

    return(
        <form onSubmit={submitData} >
            <Input 
                type="email"
                placeholder="e-mail"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                maxLength={100}
                required
                disabled={disable()}
            />
            <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={disable()} 
            />
            <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={100}
                required
                disabled={disable()} 
            />
            <Input
                type="url"
                placeholder="picture url"
                value={pictureUrl}
                onChange={(e) => setPictureUrl(e.target.value)}
                maxLength={100}
                required
                disabled={disable()} 
            />
            <Button>{loadingButton()}</Button>
        </form>
    );
}