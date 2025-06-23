// Home.tsx - 무한 스크롤 제거, 전체 데이터 한 번에 로드

import Logo from '../images/character.png';
import PraiseItem from '../components/PraiseItem.tsx';
import FixedHeader from '../components/FixedHeader.tsx';
import { useEffect, useState } from 'react';
import '../pages/Login/slick.css';
import { PageContainer, Subtitle, TitleStyle } from '../style/MainPage.ts';
import Footer from '../components/Footer.tsx';
import WriteSlidingPanel from '../components/modal/WriteSlidingPanel.tsx';
import RecentComments from '../components/RecentComments.tsx';
import { useArticleStore } from '../store/useArticleStore.ts';
import React from 'react';
import { Plus } from 'lucide-react';
import { axiosInstance } from '../api/axiosConfig.ts';
import {
  PraiseCard,
  ContentWrapper,
  TextGroup,
  Icon,
  MainButton,
  PraiseList,
  ListGap,
  FloatingButtonWrapper,
  FloatingActionButton,
  Tooltip,
  LoadingIndicator,
  LoadingContainer,
} from './HomePage.styles.ts';
import Common from '../style/Common.ts';
import ReactDOM from 'react-dom';

const Home = () => {
  const {
    articles,
    isWriteMode,
    bgColor,
    setArticles,
    setWriteMode,
    setNickname,
    setBgColor,
    selectedArticleId,
    setSelectedArticleId,
  } = useArticleStore();

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 전체 게시글을 가져오는 함수
  const fetchAllArticles = async () => {
    try {
      setIsLoading(true);

      // 먼저 총 개수를 알기 위해 limit=1로 요청
      const countResponse = await axiosInstance.get(
        `/articles?offset=0&limit=1&sort=createdAt&order=desc`,
      );

      if (countResponse.data && countResponse.data.pageInfo) {
        const totalCount = countResponse.data.pageInfo.totalCount;
        console.log('총 게시글 수:', totalCount);

        if (totalCount > 0) {
          // totalCount를 limit으로 사용하여 모든 데이터 한 번에 가져오기
          const allResponse = await axiosInstance.get(
            `/articles?offset=0&limit=${totalCount}&sort=createdAt&order=desc`,
          );

          if (allResponse.data && Array.isArray(allResponse.data.list)) {
            console.log(`전체 ${allResponse.data.list.length}개 게시글 로드 완료`);
            return allResponse.data.list;
          }
        }
      }

      return [];
    } catch (error) {
      console.error('게시글 가져오기 오류:', error);
      return [];
    }
  };

  // 초기 데이터 로딩
  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    setNickname(storedNickname);

    if (isInitialLoad) {
      console.log('전체 데이터 로딩 시작');

      const loadAllData = async () => {
        try {
          const allArticles = await fetchAllArticles();

          if (allArticles.length > 0) {
            setArticles(allArticles);
            console.log(`${allArticles.length}개의 게시글 로드 완료`);
          } else {
            setArticles([]);
            console.log('게시글이 없습니다');
          }

          setIsInitialLoad(false);
        } catch (error) {
          console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
          setArticles([]);
        } finally {
          setIsLoading(false);
        }
      };

      loadAllData();
    }
  }, [setArticles, setNickname, isInitialLoad]);

  const handleWriteClick = (isWriteMode: boolean) => {
    // FixedHeader의 배경색은 항상 흰색으로 유지
    setBgColor('white');

    // 전체 페이지 배경색 변경
    if (isWriteMode) {
      document.body.style.backgroundColor = Common.colors.gray;
    } else {
      document.body.style.backgroundColor = '';
    }

    setWriteMode(isWriteMode);
  };

  // 컴포넌트 언마운트시 body 배경색 초기화
  useEffect(() => {
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  // 새 게시글이 추가되었을 때 목록을 새로고침하는 로직
  useEffect(() => {
    if (selectedArticleId && !isWriteMode) {
      console.log('새 게시글 추가됨. 목록을 새로고침합니다.', selectedArticleId);

      // selectedArticleId 초기화 (먼저 해서 무한루프 방지)
      setSelectedArticleId(null);

      // 전체 데이터 다시 로드
      const reloadAllData = async () => {
        try {
          console.log('전체 데이터 리로드 시작');
          setIsLoading(true);

          const freshArticles = await fetchAllArticles();
          console.log('새로고침된 데이터:', freshArticles);

          if (freshArticles.length > 0) {
            setArticles(freshArticles);
            console.log(`${freshArticles.length}개의 최신 게시글 로드 완료`);
          } else {
            setArticles([]);
            console.log('새로고침 후 게시글이 없습니다');
          }
        } catch (error) {
          console.error('데이터 리로드 중 오류:', error);
          setArticles([]);
        } finally {
          setIsLoading(false);
        }
      };

      // 약간의 지연 후 실행 (UI 안정화를 위해)
      setTimeout(() => {
        reloadAllData();
      }, 100);
    }
  }, [selectedArticleId, isWriteMode, setSelectedArticleId, setArticles]);

  return (
    <>
      <FixedHeader bgColor={bgColor} />
      <PageContainer>
        <PraiseCard>
          <ContentWrapper>
            <TextGroup>
              <TitleStyle>
                요정들 출동 완료! <br />
                당신을 발견했어요
              </TitleStyle>
              <Subtitle>
                오늘 하루 뿌듯한 일,
                <br />
                우리 요정들과 나눠보실래요?
              </Subtitle>
            </TextGroup>
            <Icon src={Logo} alt="logo" />
          </ContentWrapper>
          <MainButton onClick={() => handleWriteClick(true)}>
            <Plus
              size={18}
              strokeWidth={2.5}
              style={{ marginRight: '8px' }}
            />
            칭찬 받을래요
          </MainButton>
        </PraiseCard>

        <div style={{ margin: '16px 24px 0' }}>
          <RecentComments />
        </div>

        <PraiseList>
          {/* 게시글 목록 */}
          {articles.map((item, idx) => (
            <React.Fragment key={`article-${item.id || idx}`}>
              <div data-testid={`article-${idx}`}>
                <PraiseItem
                  index={idx}
                  islast={idx === articles.length - 1}
                  article={item}
                />
              </div>
              {idx !== articles.length - 1 && <ListGap />}
            </React.Fragment>
          ))}

          {/* 로딩/빈 목록 표시 */}
          <LoadingContainer data-testid="status-container">
            {isLoading && (
              <LoadingIndicator>불러오는 중...</LoadingIndicator>
            )}

            {!isLoading && articles.length === 0 && (
              <div>게시글이 없습니다. 첫 번째 글을 작성해보세요!</div>
            )}
          </LoadingContainer>
        </PraiseList>
      </PageContainer>
      <Footer />

      {!isWriteMode && ReactDOM.createPortal(
        <FloatingButtonWrapper>
          <FloatingActionButton onClick={() => handleWriteClick(true)}>
            <Plus size={24} strokeWidth={2.5} />
            <Tooltip>칭찬글 쓰기</Tooltip>
          </FloatingActionButton>
        </FloatingButtonWrapper>,
        document.body
      )}

      <WriteSlidingPanel
        isWriteMode={isWriteMode}
        handleWriteClick={handleWriteClick}
      />
    </>
  );
};

export default Home;
