import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Button } from '../../components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../../api/axiosConfig.ts';
import Logo2 from '../../images/Group794.png';
import comein from '../../images/Label.png';

const Wrap = styled.div`
position: relative;
  width: 100%;
  height: 100vh;
  text-align: center;
  padding:16% 30px 30px;
  background: #EDF2FF;
  & > div {
    margin-top: 24px;
    p{font-size:23px;
      font-weight: bold;
      line-height: 1.5;
      color:#171717;
      
    }
  }
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
const InputBox = styled.input`
  background: #ffffff;
  height: 51px;
  border: 1px solid #6B90FF;
  display: block;
  width: 100%;
  text-align: center;
  padding: 13px 0;
  margin-top: 24px;
  outline: none;
  transition: 0.2s;
  &:focus {
    border: 1px solid #1A4DE5; 
  }
`;

function SetNickName() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userNickName, setUserNickName] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserNickName(value);
  };
  const handleSubmit = async () => {
    let userSocialId = searchParams.get('userSocialId');
    debugger;
    if (userSocialId) {
      const response = await axiosInstance.post('/users/by-social', {
        userSocialId,
        nickname: userNickName,
      });
      console.log('userNickName', userNickName);

      if (response.status === 200) {
        localStorage.setItem('nickname', userNickName);

        navigate('/home');
      } else {
        console.log(response.status);
      }
    }
  };
  return (
    <Wrap>
      <Image>
        <img src={Logo2} alt="logo" />
      </Image>
      <div className="contentsBox">
        <p>칭찬요정에서 사용하실 <br/>닉네임을 알려주세요.</p>

        <InputBox
          placeholder="닉네임을 입력해주세요."
          onChange={handleChange}
        />
      </div>
      <Button
        img={<img src={comein} alt='완료! 입장하기기' style={{}}/>}
        disabled={false}
        onClick={handleSubmit}
        text=""
        styles={{
          position: 'absolute',
          bottom: '47px',
          left: '30px',
          right:'30px',
          background:'#3869FA',
          borderRadius:'8px',
          with:'100%'
        }}
        buttonColor={'skyblue'}
        textColor={'#fff'}
      />
    </Wrap>
  );
}

export default SetNickName;
