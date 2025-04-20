import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthService from '../../api/AuthService';
import axiosPath from '../../api/axiosPath';
import Loading from '../../components/common/Loading.tsx';

const LoginCallback = () => {
  const href = window.location.href;
  const [searchParams] = useSearchParams(href);
  const code = searchParams.get('code');
  const navigate = useNavigate();

  console.log(window.location.origin)

  useEffect(() => {
    console.log('code-->', code);
    if (code) {
      console.log('code:', code);
      AuthService.kakaoLogin(code, window.location.origin + '/login/callback')
        .then(() => {
          console.log('성공');
        })
        .catch((error) => {
          console.log(error);
          navigate('/login');
        });
    }
  }, [code, navigate]);

  return <Loading />;
};

export default LoginCallback;
