import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Button } from '../../components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../../api/axiosConfig.ts';

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
  padding: 29px;
  position: relative;
  & > div {
    margin-top: 300px;
  }
`;

const InputBox = styled.input`
  background: #ffffff;
  border: 1px solid #acacac;
  border-radius: 5px;
  display: block;
  width: 100%;
  text-align: center;
  padding: 13px 0;
  margin-top: 40px;
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
      <div className="contentsBox">
        <p>칭찬요정에서 사용하실 닉네임을 알려주세요.</p>

        <InputBox
          placeholder="닉네임을 입력해주세요."
          onChange={handleChange}
        />
      </div>
      <Button
        disabled={false}
        onClick={handleSubmit}
        text={'시작하기'}
        styles={{
          position: 'fixed',
          bottom: '113px',
          left: '50%',
          transform: 'translate(-50%, 0)',
        }}
        buttonColor={'skyblue'}
        textColor={'#fff'}
      />
    </Wrap>
  );
}

export default SetNickName;
