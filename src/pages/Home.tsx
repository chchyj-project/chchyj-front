import styled from 'styled-components';
import styleToken from '../style/styleToken.ts';
import Logo from '../images/character.png';
import PraiseItem from './PraiseItem.tsx'; // 이미지 경로에 맞게 수정하세요
import PlusImageIcon from '../images/plus.png';
import FixedHeader from '../components/FixedHeader.tsx';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import '../pages/Login/slick.css';
import { X } from 'lucide-react';
import Common from '../style/Common.ts';

const PageContainer = styled.div`
  display: flex;
  //width: 100vw;
  flex-direction: column;
  //align-items: center;
  background-color: white;
  //width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const PraiseCard = styled.div`
  background-color: ${styleToken.color.primary};
  //position: relative;
  //top: 60px;
  //left: 0;
  //right: 0;
  margin-top: 60px;
  //z-index: 100;
  border: 1px solid #d3e9ff;
  padding: 25px 0;
  //width: 100%;

  text-align: left;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 50px 0 30px 0;
  }
`;

const ContentWrapper = styled.div`
  color: #111111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 18px;
  box-sizing: border-box;
  text-align: center; /* 가운데 정렬 */

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Icon = styled.img`
  width: 150px;
  height: 150px;
  margin-top: -10px;
`;

const PlusIcon = styled.img`
  width: 17px;
  height: 17px;
  margin-right: 5px;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 300px;
  right: 0;
  z-index: 100;
`;

const FloatingButton = styled.button`
  padding: 12px 20px;
  background-color: ${Common.colors.white};
  color: ${styleToken.color.secondary};
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  margin: 0 auto;

  border: 1px solid ${styleToken.color.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #add8e6;
  }
`;

const PraiseList = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border: 1px solid #d3e9ff;
  padding: 10px 0 40px 0;
  background-color: ${styleToken.color.background};
`;

const ListGap = styled.div`
  background-color: ${styleToken.color.backgroundSecondary};
  height: 8px;
`;

const WriteSlide = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; /* X 아이콘을 절대 위치로 정렬하기 위해 추가 */
`;

interface SlideWrapperProps {
  isOpen: boolean;
}
const SlideWrapper = styled.div<SlideWrapperProps>`
  //position: fixed;
  height: 100vh;
  border-radius: 24px;
  //bottom: 20px;
  position: relative;
  top: 50px;
  //left: 0;
  width: 100vw;
  //max-width: 480px; /* 가로 너비 제한 */
  z-index: 2000;
  transition: transform 0.5s ease;
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(100%)')};
  overflow: hidden;
  margin: 0 auto;

  @media (max-width: 768px) {
    left: 0;
    bottom: 0;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  text-align: left;
  margin-bottom: 10px;
  line-height: 1.4; /* 줄 간격 조정 */
  word-wrap: break-word; /* 단어 단위로 줄바꿈 */
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #333333;
  text-align: left;
  margin-bottom: 20px;
  line-height: 1.4; /* 줄 간격 조정 */
  max-width: 400px; /* 줄바꿈 일정하게 유지 */
  word-wrap: break-word;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 45vh;
  padding: 10px;
  border: 1px solid ${Common.colors.skyblue};
  border-radius: 8px;
  resize: none;
  outline: none;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 15px;
  color: #333333;
  background-color: #ffffff;
`;

const NoteContainer = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

const Note = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #b3b3b3;
  line-height: 17px;
  & svg {
    margin-right: 5px;
    color: #ff6b6b;
  }
`;

const Button = styled.button`
  position: fixed;
  //bottom: 20px;
  //right: 20px; /* 화면의 오른쪽에 고정 */
  background-color: ${styleToken.color.background};

  z-index: 1000; /* 다른 요소 위에 고정되도록 z-index 추가 */
`;

const Home = () => {
  console.log('homePage');
  const array = ['2', '3', '4', '5', '6'];

  const [isWriteMode, setWriteMode] = useState(false);
  const [bgColor, setBgColor] = useState<string>('white');

  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    console.log('nickname', nickname);
  }, []);

  const handleWriteClick = () => {
    console.log('write click');
    if (!isWriteMode) {
      setBgColor('#4D4D4D');
    } else {
      setBgColor('white');
    }
    setWriteMode(!isWriteMode);
    // document.documentElement.style.zoom = 'reset';
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };

  return (
    <>
      <FixedHeader bgColor={bgColor} />
      {!isWriteMode && (
        <PageContainer>
          <PraiseCard>
            <ContentWrapper>
              <TextGroup>
                <Title>당신의 칭찬요정을 만나보세요!</Title>
                <Subtitle>
                  오늘 하루, 뿌듯한 일이 있으셨나요? 너무 작고 사소한 일이라도
                  좋습니다. 글을 올리면 칭찬요정들이 찾아갈거에요~
                </Subtitle>
              </TextGroup>
              <Icon src={Logo} alt="logo" />
            </ContentWrapper>
          </PraiseCard>
          <PraiseList>
            {array.map((item, idx) => {
              console.log('item>>', item, idx);
              return (
                <>
                  <PraiseItem
                    key={idx}
                    index={idx}
                    isLast={idx === array.length - 1}
                  />
                  {idx !== array.length - 1 && <ListGap />}
                </>
              );
            })}
          </PraiseList>
        </PageContainer>
      )}
      <ButtonWrapper>
        <FloatingButton onClick={handleWriteClick}>
          <PlusIcon src={PlusImageIcon} alt="plus" />
          칭찬글 쓰기
        </FloatingButton>
      </ButtonWrapper>
      {isWriteMode && (
        <PageContainer>
          <SlideWrapper isOpen={isWriteMode}>
            <Slider {...sliderSettings}>
              <WriteSlide>
                <Title>칭찬받고 싶은 내용을 입력하세요 😉</Title>
                <Subtitle>칭찬요정들이 찾아올거에요~</Subtitle>
                <X
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    cursor: 'pointer',
                  }}
                  onClick={handleWriteClick}
                />
                <Textarea placeholder="이런저런 내용 입력..."></Textarea>
                <NoteContainer>
                  <Note>❤️ 칭찬글 입력시 하트 1개가 차감됩니다.</Note>
                  <Note>
                    ✏️ 칭찬글은 입력 후 15분 이내에만 수정할 수 있습니다.
                  </Note>
                  <Note>
                    ❤️ 칭찬글 삭제 15분 이후에는 하트는 반환되지 않습니다.
                  </Note>
                  <Note>⏰ 욕설/비방 등은 동의없이 삭제될 수 있습니다.</Note>
                  <Button>칭찬글 저장</Button>
                </NoteContainer>
              </WriteSlide>
            </Slider>
          </SlideWrapper>
        </PageContainer>
      )}
    </>
  );
};
export default Home;
