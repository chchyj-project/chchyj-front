import styled from '@emotion/styled';
import Body from '../components/layout/Body';
import styleToken from '../styles/styleToken.ts';
import RightArrowIcon from '../../assets/character.png';
import ComplimentItem from '../components/mainPage/ComplimentItem.tsx'; // 이미지 경로에 맞게 수정하세요
import PlusImageIcon from '../../assets/plus.png';

const ComplimentCard = styled.div`
  background-color: ${styleToken.color.primary};
  border: 1px solid #d3e9ff;
  padding: 20px 0;
  text-align: left;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 32px;
  color: ${styleToken.color.text};
  margin: 0;
  font-weight: 400;
  line-height: 38px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  line-height: 17px;
  color: ${styleToken.color.textLight};
  margin: 10px 0 20px 0;
`;

const Icon = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
`;

const PlusIcon = styled.img`
  width: 17px;
  height: 17px;
  margin-right: 5px;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 73%;
  transform: translateX(-50%);
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

const ComplimentList = styled.div`
  width: 100%;
  max-width: 500px;
  text-align: left;
  padding-bottom: 50px;
  background-color: ${styleToken.color.background};
`;

const ListGap = styled.div`
  background-color: ${styleToken.color.backgroundSecondary};
  height: 8px;
`;

const array = ['2', '3', '4', '5', '6', '7', '8', '9'];

// 컴포넌트
export default function MainPage() {
  console.log('homePage');
  return (
    <Body color={styleToken.color.backgroundSecondary}>
      <ComplimentCard>
        <ContentWrapper>
          <TextGroup>
            <Title>당신의 칭찬요정을 만나보세요!</Title>
            <Subtitle>
              오늘 하루, 뿌듯한 일이 있으셨나요? 너무 작고 사소한 일이라도
              좋습니다. 글을 올리면 칭찬요정들이 찾아갈거에요~
            </Subtitle>
          </TextGroup>
          <Icon src={RightArrowIcon} alt="Right arrow" />
        </ContentWrapper>
      </ComplimentCard>
      <ComplimentList>
        {array.map((item, idx) => {
          console.log('item>>', item, idx);
          return (
            <>
              <ComplimentItem
                key={idx}
                index={idx}
                isLast={idx === array.length - 1}
              />
              {idx !== array.length - 1 && <ListGap />}
            </>
          );
        })}
      </ComplimentList>
      <FloatingButton>
        <PlusIcon src={PlusImageIcon} alt="plus" />
        칭찬글 쓰기
      </FloatingButton>
    </Body>
  );
}
