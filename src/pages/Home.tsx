import styled from 'styled-components';
import styleToken from '../style/styleToken.ts';
import Logo from '../images/character.png';
import PraiseItem from './PraiseItem.tsx';
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
import { Plus } from 'lucide-react'; // lucide-react 아이콘 활용

// 카드 디자인 개선 - 여백과 라운드 코너 추가
const PraiseCard = styled.div`
  background-color: ${styleToken.color.primary};
  margin-top: 70px;
  border: 1px solid #d3e9ff;
  border-radius: 16px;
  padding: 32px 0;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  margin-left: 16px;
  margin-right: 16px;

  @media (max-width: 768px) {
    padding: 28px 0;
    margin-top: 65px;
  }
`;

const ContentWrapper = styled.div`
  color: #111111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; // 제목과 부제목 사이 간격 추가
`;

// 이미지 크기 적절히 조정
const Icon = styled.img`
  width: 130px;
  height: 130px;
  margin-top: -5px;

  @media (max-width: 480px) {
    width: 110px;
    height: 110px;
  }
`;

// 플러스 아이콘 크기 조정 및 여백 추가
const PlusIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;

// 리스트 섹션 디자인 개선
const PraiseList = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border: 1px solid #d3e9ff;
  border-radius: 16px;
  padding: 16px 0 48px 0;
  background-color: ${styleToken.color.background};
  margin: 24px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
`;

// 리스트 간격 개선
const ListGap = styled.div`
  background-color: ${styleToken.color.backgroundSecondary};
  height: 10px;
  margin: 4px 0;
`;

// 컨테이너와 동일한 최대 너비를 고려한 플로팅 버튼 래퍼
const FloatingButtonWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  right: 0;
  left: 0;
  max-width: 768px; // 컨테이너와 동일한 최대 너비
  width: 100%;
  margin: 0 auto;
  padding: 0 16px; // 양쪽 패딩
  box-sizing: border-box;
  pointer-events: none; // 래퍼는 클릭 이벤트를 통과시킴
  z-index: 100;
  display: flex;
  justify-content: flex-end; // 우측 정렬
`;

const FloatingActionButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${Common.colors.skyblue};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto; // 버튼 자체는 클릭 가능하게 함

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: -40px;
  right: 0;
  background-color: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  ${FloatingActionButton}:hover & {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 24px;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
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
                    오늘 하루, 뿌듯한 일이 있으셨나요?
                    <br />
                    너무 작고 사소한 일이라도 좋습니다.
                    <br />
                    글을 올리면 칭찬요정들이 찾아갈거에요~
                  </Subtitle>
                </TextGroup>
                <Icon src={Logo} alt="logo" />
              </ContentWrapper>
            </PraiseCard>

            <div style={{ margin: '28px 16px 0' }}>
              <RecentComments />
            </div>

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
        <FloatingButtonWrapper>
          <FloatingActionButton onClick={() => handleWriteClick(true)}>
            <Plus size={24} strokeWidth={2.5} />
            <Tooltip>칭찬글 쓰기</Tooltip>
          </FloatingActionButton>
        </FloatingButtonWrapper>
      )}
      // 컴포넌트 내부에서 사용
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
