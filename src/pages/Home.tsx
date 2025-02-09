import styled from 'styled-components';
import styleToken from '../style/styleToken.ts';
import Logo from '../images/character.png';
import PraiseItem from './PraiseItem.tsx'; // 이미지 경로에 맞게 수정하세요
import PlusImageIcon from '../images/plus.png';
import FixedHeader from '../components/FixedHeader.tsx';
import { useEffect, useState } from 'react';
import '../pages/Login/slick.css';
import Common from '../style/Common.ts';
import { axiosInstance } from '../api/axiosConfig.ts';
import { Article, ArticleResponse } from '../types/MainPage.ts';
import { PageContainer, Subtitle, TitleStyle } from '../style/MainPage.ts';
import Footer from './Footer.tsx';
import WriteSlidingPanel from './WriteSlidingPanel.tsx';
import RecentComments from '../components/RecentComments.tsx';

const PraiseCard = styled.div`
  background-color: ${styleToken.color.primary};
  margin-top: 60px;
  border: 1px solid #d3e9ff;
  padding: 25px 0;
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
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  max-width: 784px;
  width: 100%;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
`;

const FloatingButton = styled.button`
  padding: 12px 20px;
  background-color: ${Common.colors.white};
  color: ${styleToken.color.secondary};
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  margin-right: 4vw;
  border: 1px solid ${styleToken.color.secondary};
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

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isWriteMode, setWriteMode] = useState(false);
  const [bgColor, setBgColor] = useState<string>('white');
  const [nickname, setNickname] = useState<string | null>(null); //

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname'); // Renamed for clarity
    setNickname(storedNickname); // Updated to use React state setter
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      //TODO: 임시로 로그인이 안되므로 nickname 존재유무 관계없이 포스트 가져오기
      // if (nickname) {
      const response: ArticleResponse = await axiosInstance.get('/articles', {
        params: { limit: 20, offset: 0 },
      });
      setArticles(response.data.list);
      // }
    };
    fetchArticles();
  }, []);

  const handleWriteClick = async (isWriteMode: boolean) => {
    if (isWriteMode) {
      setBgColor('#4D4D4D');
    } else {
      setBgColor('white');
    }
    setWriteMode(isWriteMode);
  };

  return (
    <>
      <FixedHeader bgColor={bgColor} />
      {!isWriteMode && (
        <>
          <PageContainer>
            <PraiseCard>
              <ContentWrapper>
                <TextGroup>
                  <TitleStyle>당신의 칭찬요정을 만나보세요!</TitleStyle>
                  <Subtitle>
                    오늘 하루, 뿌듯한 일이 있으셨나요? 너무 작고 사소한 일이라도
                    좋습니다. 글을 올리면 칭찬요정들이 찾아갈거에요~
                  </Subtitle>
                </TextGroup>
                <Icon src={Logo} alt="logo" />
              </ContentWrapper>
            </PraiseCard>
            <RecentComments />
            <PraiseList>
              {articles.map((item, idx) => {
                return (
                  <>
                    <PraiseItem
                      key={idx}
                      index={idx}
                      islast={idx === articles.length - 1}
                      article={item}
                    />
                    {idx !== articles.length - 1 && <ListGap />}
                  </>
                );
              })}
            </PraiseList>
          </PageContainer>
          <Footer />
        </>
      )}
      {!isWriteMode && (
        <ButtonWrapper>
          <FloatingButton onClick={() => handleWriteClick(true)}>
            <PlusIcon src={PlusImageIcon} alt="plus" />
            칭찬글 쓰기
          </FloatingButton>
        </ButtonWrapper>
      )}
      {isWriteMode && (
        <WriteSlidingPanel
          isWriteMode={isWriteMode}
          handleWriteClick={handleWriteClick}
        />
      )}
    </>
  );
};
export default Home;
