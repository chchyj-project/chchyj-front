import { useEffect } from 'react';
import styled from 'styled-components';
import axiosPath from '../../api/axiosPath';
import { Button } from '../../components';
import Logo from '../../images/character.png';

const LoginPage = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  background: white;
`;
const Image = styled.div`
  width: 90%;
  max-width: 250px;
  min-width: 150px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  img {
    width: 100%;
    display: block;
  }
`;
const Text = styled.div`
  width: 100%;
  color: #000;
  position: absolute;
  bottom: 224px;
  left: 50%;
  text-align: center;
  transform: translate(-50%, 0);
`;
const Login = () => {
  useEffect(() => {
    if (!window.Kakao?.Auth) {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
      script.type = 'text/javascript';
      script.defer = true;
      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(axiosPath.KAKAO_SDK_KEY);
        }
      };

      document.body.appendChild(script);
    }
  }, []);

  const handleClick = () => {
    if (window.Kakao?.isInitialized()) {
      window.Kakao.Auth.authorize({
        redirectUri: axiosPath.REDIRECT_URI,
      });
    }
  };

  return (
    <LoginPage>
      <Image>
        <img src={Logo} alt="" />
      </Image>
      <Text>
        지금 <strong>칭찬요정</strong>에서 시작해보세요.
      </Text>
      <Button
        disabled={false}
        onClick={handleClick}
        text={'카카오로 로그인하기'}
        styles={{
          position: 'absolute',
          bottom: '113px',
          left: '50%',
          transform: 'translate(-50%, 0)',
        }}
        buttonColor={'yellow'}
        textColor={'#000'}
      />
    </LoginPage>
  );
};

export default Login;
