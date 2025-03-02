import styled from 'styled-components';
import styleToken from '../style/styleToken.ts';
import Logo from '../images/character.png';
import PraiseItem from './PraiseItem.tsx'; // 이미지 경로에 맞게 수정하세요
import PlusImageIcon from '../images/plus.png';
import FixedHeader from '../components/FixedHeader.tsx';
import { useEffect, useRef, useState } from 'react';
import '../pages/Login/slick.css';
import Common from '../style/Common.ts';
import { PageContainer, Subtitle, TitleStyle } from '../style/MainPage.ts';
import Footer from './Footer.tsx';
import WriteSlidingPanel from './WriteSlidingPanel.tsx';
import RecentComments from '../components/RecentComments.tsx';
import { useArticleStore } from '../store/useArticleStore.ts';
import React from 'react';
import { useScrollDirection } from '../hooks/useScrollDirection.ts';
import { ScrollAwareBottomButtonProps } from '../types/PraiseItem.ts';
import {
  BottomButton,
  ScrollAwareBottomButtonWrapper,
} from '../style/commonStyle.ts';

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
  const {
    articles,
    isWriteMode,
    bgColor,
    nickname,
    fetchArticles,
    setArticles,
    selectedArticleId,
    setWriteMode,
    setNickname,
    setBgColor,
  } = useArticleStore();
  const articleRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const { buttonVisible } = useScrollDirection();

  // selectedArticleId가 변경될 때 해당 게시물로 스크롤

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 초기 데이터 로딩
  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    setNickname(storedNickname);

    if (isInitialLoad) {
      fetchArticles();
      setIsInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (selectedArticleId && articleRefs.current[selectedArticleId]) {
        console.log('Scrolling to:', selectedArticleId);
        console.log('Refs available:', Object.keys(articleRefs.current));

        articleRefs.current[selectedArticleId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 100); // ref가 설정될 시간을 주기 위해 약간의 지연 추가

    return () => clearTimeout(timeoutId);
  }, [selectedArticleId, articles]); // articles 의존성 추가

  const setArticleRef = (el: HTMLDivElement | null, id: number) => {
    if (el && id) {
      articleRefs.current[id] = el;
      // 새로운 ref가 설정되었을 때 selectedArticleId와 일치하면 스크롤
      if (id === selectedArticleId) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  };

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
                  <React.Fragment key={item.id || idx}>
                    <div ref={(el) => setArticleRef(el, item.id)}>
                      <PraiseItem
                        index={idx}
                        islast={idx === articles.length - 1}
                        article={item}
                      />
                    </div>
                    {idx !== articles.length - 1 && <ListGap />}
                  </React.Fragment>
                );
              })}
            </PraiseList>
          </PageContainer>
          <Footer />
        </>
      )}
      {!isWriteMode && (
        <ScrollAwareBottomButtonWrapper visible={buttonVisible}>
          <BottomButton onClick={() => handleWriteClick(true)}>
            <PlusIcon src={PlusImageIcon} alt="plus" />
            칭찬글 쓰기
          </BottomButton>
        </ScrollAwareBottomButtonWrapper>
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
