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
    const [loading, setLoading] = useState(false);

    async function submitData(event){
        setLoading(true);
        event.preventDefault();
        try {
            const URL = "https://lmback-linkr.herokuapp.com/";
            const response = await axios.post(URL,{
                email,
                password,
            });
            const serializedData = JSON.stringify(response.data);
            localStorage.setItem("data",serializedData);
            navigate("/timeline");
        } catch (error) {
            setEmail('');
            setPassword('');
            toast.error("E-mail ou senha incorretos!");
            setLoading(false);
            alert(error.response.data.error);
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
          'Log In'
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
            <Button type="submit" disabled={loading}>{loadingButton()}</Button>
        </form>
    );
}