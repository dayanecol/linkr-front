import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { toast } from 'react-toastify';

export default function SignUpForm(){
    const navigate = useNavigate();

    let[email,setEmail] = useState('');
    let[password,setPassword] = useState('');
    let[username,setUsername] = useState('');
    let[pictureUrl,setPictureUrl]=useState('');
    const [loading, setLoading] = useState(false);

    async function submitData(event){
        setLoading(true);
        event.preventDefault();
        try {
            const URL = "https://lmback-linkr.herokuapp.com/sign-up";
            await axios.post(URL,{
                email,
                password,
                username,
                pictureUrl,
            });
            
            navigate("/");
        } catch (error) {
            setEmail('');
            setPassword('');
            setUsername('');
            setPictureUrl('');
            toast.error("O e-mail ou username inserido já está cadastrado!");
            setLoading(false);
        }
    }

    function loadingButton() {
        return loading ? (
          <ThreeDots
            color="#579cf6"
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
            <Button type="submit" disabled={loading}>{loadingButton()}</Button>
        </form>
    );
}