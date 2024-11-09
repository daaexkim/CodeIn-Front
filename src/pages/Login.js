import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login(){
    const [id,setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        //로그인 로직
        console.log('로그인 시도: ', {id, password});
    };

    const handleSignup = () => {
        //회원가입 로직
        navigate('/register');
    };

    return (
        <div className = "login-container">
            <h2>로그인</h2>
            <input 
              type = "text"
              placeholder = "아이디"
              value = {id}
              onChange = {(e) => setId(e.target.value)}
            />
            <input
              type = "password"
              placeholder = "비밀번호"
              value = {password}
              onChange = {(e) => setPassword}
            />
            <div className='button-container'>
                <button onClick = {handleLogin}>로그인</button>
                <button onClick = {handleSignup}>회원가입</button>
            </div>
        </div>
    )
}

export default Login;