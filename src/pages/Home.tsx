// Home.tsx에 무한 스크롤 기능을 추가한 버전 (문제 해결)

import styled from 'styled-components';
import styleToken from '../style/styleToken.ts';
import Logo from '../images/character.png';
import PraiseItem from './PraiseItem.tsx';
import FixedHeader from '../components/FixedHeader.tsx';
import { useEffect, useRef, useState, useCallback } from 'react';
import '../pages/Login/slick.css';
import { PageContainer, Subtitle, TitleStyle } from '../style/MainPage.ts';
import Footer from './Footer.tsx';
import WriteSlidingPanel from './WriteSlidingPanel.tsx';
import RecentComments from '../components/RecentComments.tsx';
import { useArticleStore } from '../store/useArticleStore.ts';
import React from 'react';
import { Plus } from 'lucide-react';
import { axiosInstance } from '../api/axiosConfig.ts';

// 스타일 컴포넌트들은 그대로 유지합니다.
const PraiseCard = styled.div`
  background-color: #e5ecff;
  margin: 69px 0 0 0;
  padding: 18.99px 24px;
  text-align: left;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 65px;
  }
`;

const ContentWrapper = styled.div`
  color: #111111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  box-sizing: border-box;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Icon = styled.img`
  width: 82.96px;
  height: 117.64px;
  margin-top: -5px;
  @media (max-width: 480px) {
    width: 82.96px;
    height: 117.64px;
  }
`;
const MainButton = styled.button`
  width: 100%;
  background: ${styleToken.color.primary};
  height: 56px;
  border-radius: 8px;
  font-family: 'Jalnan', sans-serif;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PraiseList = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: ${styleToken.color.background};
  margin: 24px;
`;

const ListGap = styled.div`
  //  background-color: ${styleToken.color.backgroundSecondary};
  height: 10px;
  margin: 4px 0;
`;

const FloatingButtonWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  right: 0;
  left: 0;
  max-width: 390px;
  width: 100%;
  padding: 0 24px;
  margin: 0 auto;
  box-sizing: border-box;
  pointer-events: none;
  z-index: 100;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 430px) {
    padding: 0 24px;
  }
`;

const FloatingActionButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${styleToken.color.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  margin-right: 0;

  @media (max-width: 390px) {
    width: 50px;
    height: 50px;
  }

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
  font-family: 'Jalnan', sans-serif;
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

// 로딩 인디케이터 스타일 추가
const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  font-size: 14px;
  color: #666;
`;

// 별도의 로딩 컨테이너 (별도로 위치 지정 가능)
const LoadingContainer = styled.div`
  padding: 20px 0;
  text-align: center;
  min-height: 60px;
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

  // 무한 스크롤을 위한 상태들
  const [offset, setOffset] = useState(0); // 다음 데이터를 가져올 시작점
  const [limit] = useState(10); // 한 번에 가져올 항목 수
  const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 여부
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 (UI 표시용)
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 초기 로딩 여부

  // 추가: 로딩 중 중복 요청 방지를 위한 플래그
  const isLoadingRef = useRef(false);
  // 마지막으로 로드한 시간 추적
  const lastLoadTimeRef = useRef(0);

  // 마지막 항목에 대한 참조 생성
  const observer = useRef<IntersectionObserver | null>(null);

  // offset/limit 정보를 포함해 게시글을 가져오는 함수
  const fetchArticlesWithPagination = async (
    offsetValue: number,
    limitValue: number,
  ) => {
    try {
      // offset/limit 기반 API 호출
      const response = await axiosInstance.get(
        `/articles?offset=${offsetValue}&limit=${limitValue}`,
      );

      console.log(
        `API 응답 (offset: ${offsetValue}, limit: ${limitValue}):`,
        response.data,
      );

      if (response.data && Array.isArray(response.data.list)) {
        return response.data.list;
      } else {
        console.error('API 응답 형식이 예상과 다릅니다:', response.data);
        return [];
      }
    } catch (error) {
      console.error('게시글 가져오기 오류:', error);
      return [];
    }
  };

  const loadMoreArticles = useCallback(async () => {
    // 이미 로딩 중이거나, 더 이상 데이터가 없거나, 마지막 로드 후 500ms가 지나지 않았으면 무시
    if (
      isLoadingRef.current ||
      !hasMore ||
      Date.now() - lastLoadTimeRef.current < 500
    ) {
      return;
    }

    try {
      // 로딩 상태 설정
      isLoadingRef.current = true;
      setIsLoading(true);
      lastLoadTimeRef.current = Date.now();

      // 현재 offset 계산 (현재까지 로드된 데이터 수)
      const currentOffset = offset;
      console.log(
        `추가 데이터 로딩 시작 - offset: ${currentOffset}, limit: ${limit}`,
      );

      // 새로운 게시글 가져오기 (다음 offset부터)
      const newArticles = await fetchArticlesWithPagination(
        currentOffset,
        limit,
      );

      // 결과가 없거나 예상보다 적게 왔다면 더 이상 데이터가 없음
      if (newArticles.length === 0) {
        console.log('더 이상 불러올 데이터가 없습니다');
        setHasMore(false);
      } else {
        console.log(`${newArticles.length}개의 새 게시글 로드됨`);

        // 기존 배열에 새 항목 추가
        setArticles([...articles, ...newArticles]);

        // 다음 요청을 위해 offset 업데이트 (현재 offset + 가져온 항목 수)
        setOffset(currentOffset + newArticles.length);

        // 가져온 항목 수가 요청한 limit보다 적으면 더 이상 데이터가 없음
        if (newArticles.length < limit) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
    } finally {
      // 로딩 상태 해제
      setIsLoading(false);
      // 약간의 지연 후 로딩 플래그 해제 (너무 빠른 연속 호출 방지)
      setTimeout(() => {
        isLoadingRef.current = false;
      }, 300);
    }
  }, [articles, hasMore, limit, offset, setArticles, setOffset]);

  const lastArticleElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      // 로딩 중이면 Observer 설정 건너뛰기
      if (isLoadingRef.current) return;

      // 기존 Observer 연결 해제
      if (observer.current) observer.current.disconnect();

      // 새 Observer 설정
      observer.current = new IntersectionObserver(
        (entries) => {
          // 요소가 보이고 더 불러올 데이터가 있고 로딩 중이 아닐 때만 실행
          if (entries[0].isIntersecting && hasMore && !isLoadingRef.current) {
            console.log(
              '마지막 요소가 화면에 보입니다. 추가 데이터를 로드합니다.',
            );
            loadMoreArticles();
          }
        },
        {
          root: null, // viewport 기준
          rootMargin: '100px', // 요소가 화면에 진입하기 100px 전에 감지
          threshold: 0.1, // 10%만 보여도 감지
        },
      );

      // 노드가 있으면 관찰 시작
      if (node) {
        observer.current.observe(node);
        console.log('마지막 요소에 Observer 연결:', node);
      }
    },
    [hasMore, loadMoreArticles],
  );

  // 초기 데이터 로딩
  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    setNickname(storedNickname);

    if (isInitialLoad) {
      console.log('초기 데이터 로딩 시작');

      const loadInitialData = async () => {
        try {
          setIsLoading(true);
          isLoadingRef.current = true;

          // offset을 0으로 초기화
          setOffset(0);

          // 초기 데이터 로드 (offset 0부터 시작)
          const initialArticles = await fetchArticlesWithPagination(0, limit);
          console.log(
            '초기 데이터 로드 완료:',
            initialArticles?.length || 0,
            '개 항목',
          );

          // 배열이 아니거나 비어있으면 빈 배열로 설정
          if (!initialArticles || initialArticles.length === 0) {
            setArticles([]);
            setHasMore(false);
          } else {
            setArticles(initialArticles);
            // limit 개수만큼 가져왔다면 더 있을 가능성이 있음
            setHasMore(initialArticles.length >= limit);
            // 다음 요청을 위한 offset 설정 (가져온 항목 수)
            setOffset(initialArticles.length);
          }

          setIsInitialLoad(false);
        } catch (error) {
          console.error(
            '초기 데이터를 불러오는 중 오류가 발생했습니다:',
            error,
          );
          // 오류 발생 시 빈 배열로 설정
          setArticles([]);
          setHasMore(false);
          setOffset(0);
        } finally {
          setIsLoading(false);
          // 약간의 지연 후 로딩 플래그 해제
          setTimeout(() => {
            isLoadingRef.current = false;
          }, 300);
        }
      };

      loadInitialData();
    }
  }, [
    limit,
    setArticles,
    setNickname,
    setOffset,
    isInitialLoad,
    setIsInitialLoad,
  ]);

  const handleWriteClick = (isWriteMode: boolean) => {
    if (isWriteMode) {
      setBgColor('#4D4D4D');
    } else {
      setBgColor('white');
    }
    setWriteMode(isWriteMode);
  };
  // 컴포넌트 마운트/언마운트시 처리
  useEffect(() => {
    // 컴포넌트 마운트 시 실행할 코드
    console.log('스크롤 컴포넌트 마운트');

    // 컴포넌트 언마운트 시 Observer 정리
    return () => {
      console.log('스크롤 컴포넌트 언마운트 - Observer 정리');
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // 스크롤 이벤트를 통한 추가 보호장치
  useEffect(() => {
    // 스크롤 이벤트를 통해 문서 끝에 도달했는지 확인
    const handleScroll = () => {
      // 화면 하단에 도달했는지 확인 (200px 여유)
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // 하단에 가까워졌을 때 (200px 내외)
      if (
        scrollHeight - scrollTop - clientHeight < 200 &&
        hasMore &&
        !isLoadingRef.current
      ) {
        console.log('스크롤 이벤트: 페이지 하단 도달, 추가 데이터 로드');
        loadMoreArticles();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loadMoreArticles]); // Home.tsx에 무한 스크롤 기능을 추가한 버전 (문제 해결)
  return (
    <>
      <FixedHeader bgColor={bgColor} />
      {!isWriteMode && (
        <>
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
              {articles.map((item, idx) => {
                // 마지막에서 두 번째 요소까지만 ref 연결 (미리 로드하기 위해)
                const isNearLastItem = idx === articles.length - 2;
                return (
                  <React.Fragment key={`article-${item.id || idx}-${offset}`}>
                    <div
                      ref={isNearLastItem ? lastArticleElementRef : null}
                      data-testid={`article-${idx}`}
                    >
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

              {/* 별도의 로딩 트리거 요소 (항상 존재) */}
              <LoadingContainer
                ref={articles.length < 2 ? lastArticleElementRef : null}
                data-testid="loading-trigger"
              >
                {isLoading && (
                  <LoadingIndicator>불러오는 중...</LoadingIndicator>
                )}

                {!hasMore && articles.length > 0 && (
                  <LoadingIndicator>더 이상 글이 없습니다</LoadingIndicator>
                )}

                {!isLoading && articles.length === 0 && (
                  <div>게시글이 없습니다. 첫 번째 글을 작성해보세요!</div>
                )}
              </LoadingContainer>
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
