import styled from 'styled-components';
import styleToken from '../style/styleToken.ts';
import RightArrowIcon from '../images/character.png';
import PraiseItem from './PraiseItem.tsx'; // 이미지 경로에 맞게 수정하세요
import PlusImageIcon from '../images/plus.png';
import FixedHeader from '../components/FixedHeader.tsx';

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

const array = ['2', '3', '4', '5', '6'];
const HomePage = styled.div`
  //position: relative;
  //height: 100vh;
  //width: 100%;
`;
// 컴포넌트
const Home = () => {
  console.log('homePage');
  return (
    <HomePage>
      <FixedHeader />
      <PraiseCard>
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
      <FloatingButton>
        <PlusIcon src={PlusImageIcon} alt="plus" />
        칭찬글 쓰기
      </FloatingButton>
    </HomePage>
  );
};
export default Home;