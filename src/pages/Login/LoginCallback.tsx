import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthService from '../../api/AuthService';
import axiosPath from '../../api/axiosPath';

const LoginCallback = () => {
  const href = window.location.href;
  const [searchParams] = useSearchParams(href);
  const code = searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(code);
    if (code) {
      console.log('code:', code);
      AuthService.kakaoLogin(code, axiosPath.REDIRECT_URI)
        .then(() => {
          console.log('성공');
        })
        .catch((error) => {
          console.log(error);
          navigate('/login');
        });
    }
  }, [code]);

  return (
    <div style={{ width: '100%', height: '100vh', verticalAlign: 'middle' }}>
      로그인 중입니다! 잠시만 기다려주세요!
    </div>
  );
};

export default LoginCallback;
