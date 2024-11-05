import styled from 'styled-components';
import styleToken from '../style/styleToken.ts';
import Logo from '../images/character.png';
import PraiseItem from './PraiseItem.tsx'; // 이미지 경로에 맞게 수정하세요
import PlusImageIcon from '../images/plus.png';
import FixedHeader from '../components/FixedHeader.tsx';
import Slider from 'react-slick';
import { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PraiseCard = styled.div`
  background-color: ${styleToken.color.primary};
  border: 1px solid #d3e9ff;
  padding: 70px 0 40px 0;

  text-align: left;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 15px;
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

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px; /* 화면의 오른쪽에 고정 */
  background-color: ${styleToken.color.background};
  color: ${styleToken.color.secondary};
  width: calc(100% - 32px);
  max-width: 146px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 700;
  padding: 18px 0;
  border-radius: 32px;
  border: 1px solid ${styleToken.color.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* 다른 요소 위에 고정되도록 z-index 추가 */
`;

const PraiseList = styled.div`
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 30%;
  background-color: ${styleToken.color.background};
`;

const ListGap = styled.div`
  background-color: ${styleToken.color.backgroundSecondary};
  height: 8px;
`;

const WriteSlide = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface SlideWrapperProps {
  isOpen: boolean;
}
const SlideWrapper = styled.div<SlideWrapperProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90%;
  background-color: white;
  z-index: 2000;
  transition: transform 0.5s ease;
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(100%)')};
  overflow: hidden;
`;
const Home = () => {
  console.log('homePage');
  const array = ['2', '3', '4', '5', '6'];

  const [isWriteMode, setWriteMode] = useState(false);

  const handleWriteClick = () => {
    console.log('write click');
    setWriteMode(!isWriteMode);
  };

  const Title = styled.h1`
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    text-align: center;
    margin-bottom: 10px;
  `;

  const Subtitle = styled.p`
    font-size: 14px;
    color: #333333;
    text-align: center;
    margin-bottom: 20px;
  `;

  const Textarea = styled.textarea`
    width: 100%;
    height: 150px;
    padding: 10px;
    border: 2px solid #b0e0e6;
    border-radius: 8px;
    resize: none;
    outline: none;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 15px;
    color: #333333;
    background-color: #f8f9fa;
  `;

  const NoteContainer = styled.div`
    margin-bottom: 20px;
  `;

  const Note = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #666666;
    margin-bottom: 5px;

    & svg {
      margin-right: 5px;
      color: #ff6b6b;
    }
  `;

  const Button = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #b0e0e6;
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #add8e6;
    }
  `;

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
    <div>
      <FixedHeader />
      {!isWriteMode && (
        <>
          {' '}
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
        </>
      )}
      <FloatingButton onClick={handleWriteClick}>
        <PlusIcon src={PlusImageIcon} alt="plus" />
        칭찬글 쓰기
      </FloatingButton>
      {isWriteMode && (
        <SlideWrapper isOpen={isWriteMode}>
          <Slider {...sliderSettings}>
            <WriteSlide>
              <Title>칭찬받고 싶은 내용을 입력하세요 😉</Title>
              <Subtitle>칭찬요정들이 찾아올거에요~</Subtitle>
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
              </NoteContainer>
              <Button>칭찬글 쓰기</Button>
            </WriteSlide>
          </Slider>
        </SlideWrapper>
      )}
    </div>
  );
};
export default Home;
