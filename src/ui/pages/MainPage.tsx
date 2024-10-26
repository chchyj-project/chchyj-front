import styled from '@emotion/styled';
import Body from '../components/layout/Body';
import styleToken from '../styles/styleToken.ts';
import RightArrowIcon from '../../assets/character.png';
import ComplimentItem from '../components/mainPage/ComplimentItem.tsx'; // 이미지 경로에 맞게 수정하세요

const ComplimentCard = styled.div`
  //width: 100%;
  //max-width: 440px;
  background-color: #e0f4ff;
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
  /* 왼쪽에 텍스트, 오른쪽에 아이콘 */
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

const Button = styled.button`
  background-color: ${styleToken.color.secondary};
  color: white;
  width: 100%;
  font-size: 18px;
  border: none;
  padding: 18px 0;
  margin: 0 16px;
  font-weight: 700;
  line-height: 21px;
  //cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const ComplimentList = styled.div`
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
  text-align: left;
`;

// 컴포넌트
export default function MainPage() {
  console.log('homePage');
  return (
    <Body>
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
        <ContentWrapper>
          <Button>칭찬글 쓰기</Button>
        </ContentWrapper>
      </ComplimentCard>
      <ComplimentList>
        {Array(10)
          .fill(0)
          .map((item, idx) => {
            console.log('item', item, idx);
            return <ComplimentItem />;
          })}
      </ComplimentList>
    </Body>
  );
}
