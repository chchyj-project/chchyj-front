import styled from 'styled-components';
import { Button } from '../../components';

interface IProps {
  src: string;
  text: string;
  handleClick: () => void;
}
const DetailWrap = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
  padding: 0 29px;
  position: relative;
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
  transform: translate(-50%, 0);
`;

function OnboardingDetail({ src, text, handleClick }: IProps) {
  return (
    <DetailWrap>
      <Image>
        <img src={src} alt="" />
      </Image>

      <Text>{text}</Text>
      <Button
        disabled={false}
        onClick={handleClick}
        text={'다음'}
        buttonColor={'beige100'}
        textColor={'#000'}
        styles={{
          position: 'absolute',
          bottom: '113px',
          left: '50%',
          transform: 'translate(-50%, 0)',
        }}
      />
    </DetailWrap>
  );
}

export default OnboardingDetail;
