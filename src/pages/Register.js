import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // 학교 이메일인지 확인
    if (!email.endsWith('@gachon.ac.kr')) {
      alert('학교 이메일만 입력 가능합니다.');
      return;
    }

    // 비밀번호가 8자 이상인지 확인
    if (password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    try {
      // 서버에 요청 보내고 대기
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: id,
          password: password,
        }),
      });

      const data = await response.json();
      console.log('서버 응답: ', data);

      // 회원가입 성공 시 메세지 출력 및 로그인 페이지로 이동
      alert('회원가입이 성공적으로 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      console.log(error);
      alert('회원가입에 문제가 발생했습니다.');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">회원가입</h2>
      <div className="register-input-container">
        <label className="register-label">Email:</label>
        <input
          className="register-input"
          type="email"
          placeholder="Gachon Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="register-input-container">
        <label className="register-label">Id:</label>
        <input
          className="register-input"
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
      </div>

      <div className="register-input-container">
        <label className="register-label">Password:</label>
        <input
          className="register-input"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div className="register-button-container">
        <button className="register-button" onClick={handleSubmit}>회원가입</button>
      </div>
    </div>
  );
};

export default Register;
