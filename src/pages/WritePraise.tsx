import Slider from 'react-slick';
import { X } from 'lucide-react';
import styled from 'styled-components';
import Common from '../style/Common.ts';
import styleToken from '../style/styleToken.ts';
import { PageContainer, TitleStyle } from '../style/MainPage.ts';

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
  height: 100vh;
  border-radius: 24px;
  position: relative;
  top: 50px;
  width: 100vw;
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
  background-color: ${styleToken.color.background};

  z-index: 1000; /* 다른 요소 위에 고정되도록 z-index 추가 */
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

function WritePraise({
  isWriteMode,
  handleWriteClick,
}: {
  isWriteMode: boolean;
  handleWriteClick: any;
}) {
  return (
    <PageContainer>
      <SlideWrapper isOpen={isWriteMode}>
        <Slider {...sliderSettings}>
          <WriteSlide>
            <TitleStyle>칭찬받고 싶은 내용을 입력하세요 😉</TitleStyle>
            <TitleStyle>칭찬요정들이 찾아올거에요~</TitleStyle>
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
              <Note>✏️ 칭찬글은 입력 후 15분 이내에만 수정할 수 있습니다.</Note>
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
  );
}
export default WritePraise;
