import { useEffect } from 'react';
import styled from 'styled-components';
import axiosPath from '../../api/axiosPath';
import { Button } from '../../components';
import Logo from '../../images/logo.png';
import Logo2 from '../../images/Group794.png';
import Kakao from '../../images/kakao.png';
import styleToken from '../../style/styleToken.ts';

const LoginPage = styled.div`
text-align: center;
  height: 100%;
  width: 100%;
  padding: 30% 30px 30px;
  background: #2559F4;
`;
const Image = styled.div`
width: 80%;
max-width: 150px;
min-width: 100px;
margin-left: auto;
margin-right: auto;
  img {
    width: 100%;
  }
`;
const LogoBox = styled.div`
margin-top: 16px;
text-align: center;
  img {
    width: 100%;
  }
`; 
const Info = styled.div`
  width: 100%;
  background:  ${styleToken.color.secondary};
  height: 63px;
  margin-top: 16px;
  color:#E1E2E4;
  font-size: 11px;
  line-height: 1.5;
  min-width: 314px;
  h3{
    font-size: 16px;
  }
`

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
        redirectUri: window.location.origin + axiosPath.REDIRECT_URI,
      });
    }
  };

  return (
    <LoginPage>
      <Image>
        <img src={Logo2} alt="logo" />
        <LogoBox>
        <img src={Logo} alt="logo" />
      </LogoBox>
      </Image>
      <Button
        disabled={false}
        onClick={handleClick}
        text={'카카오톡으로 로그인하기'}
        styles={{
         marginTop:'40px',
         borderRadius:'0',
         fontSize:'18px',
         width:'100%',
        }}
        buttonColor={'yellow'}
        textColor={'#000'}
        img={<img src={Kakao} alt='카카오톡톡' style={{width:'20px',marginRight:'16px'}}/>}
      />
      <Info>
       <h3>안심하세요!</h3> 
        어떤한 개인정보도 수집하지 않않습니다.<br/>
        철저한 익명서비스로 운영됩니다.
      </Info>
    </LoginPage>
  );
};

export default Login;
