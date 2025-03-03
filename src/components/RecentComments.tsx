import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { axiosInstance } from '../api/axiosConfig.ts';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const CommentSection = styled.div`
  padding: 20px 0;
  background-color: #fff;
  border: 1px solid #d3e9ff;
  width: 100%;
`;

const CommentTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  padding: 0 18px;
  margin-bottom: 20px;
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    padding: 0 18px;
    box-sizing: border-box;

    &[aria-hidden='true'] {
      pointer-events: none;
      * {
        visibility: visible !important;
        pointer-events: none !important;
      }
    }
  }
`;

// CommentCard 컴포넌트 수정
const CommentCard = styled.div<{ $isActive?: boolean }>`
  width: 100%;
  padding: 15px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eee;
  box-sizing: border-box;
  touch-action: pan-y pinch-zoom;

  /* 비활성 슬라이드일 때 포커스 방지 */
  ${(props) =>
    !props.$isActive &&
    `
    pointer-events: none;
    user-select: none;
  `}
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserName = styled.span`
  font-weight: bold;
  font-size: 14px;
`;

const CommentTime = styled.span`
  color: #666;
  font-size: 12px;
  margin-left: 10px;
`;

const CommentText = styled.p`
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
`;

const ProgressBarContainer = styled.div`
  width: 30%;
  margin: 20px auto 0;
  display: flex;
`;

const ProgressSegment = styled.div<{ $isActive: string }>`
  flex: 1;
  height: 3px;

  background-color: ${(props) =>
    props.$isActive === 'true' ? '#000' : '#E5E5E5'};
  transition: background-color 0.3s ease;
`;

type Comment = {
  id: number;
  createdAt: string; // ISO 8601 형식의 날짜 문자열
  userId: number;
  nickname: string;
  content: string;
  articleId: number;
  replyStatus: string;
};

const RecentComments = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [recentComments, setRecentComments] = useState<Comment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentComment = async () => {
      const response = await axiosInstance.get('/replies/latest');
      console.log(response);
      return response;
    };
    fetchRecentComment()
      .then((response) => {
        console.log('Success:', response.data);
        setRecentComments(response.data.list);
      })
      .catch((error) => {
        console.log('Error details:', error.response.data);
        // 더 자세한 에러 정보 확인
      });
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    swipeToSlide: true,
    touchThreshold: 10,
    accessibility: true, // 추가
    focusOnSelect: false, // 추가
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex);
    },
  };

  const moveToDetail = (id: string) => {
    navigate(`/post/${id}`);
  };

  return (
    <CommentSection>
      <CommentTitle>최신 댓글 목록</CommentTitle>
      <StyledSlider {...settings}>
        {recentComments &&
          recentComments.length > 0 &&
          recentComments.map((comment, index) => (
            // 슬라이드 컨테이너에 key와 inert 속성 추가
            <div key={comment.id || index} tabIndex={-1}>
              <CommentCard $isActive={index === currentSlide}>
                <UserInfo>
                  <div>
                    <UserName>{comment.nickname}</UserName>
                    <CommentTime>
                      {dayjs(comment.createdAt).format('YYYY.MM.DD')}
                    </CommentTime>
                  </div>
                </UserInfo>
                <CommentText
                  onClick={() => moveToDetail(comment.articleId.toString())}
                >
                  {comment.content}
                </CommentText>
              </CommentCard>
            </div>
          ))}
      </StyledSlider>
      <ProgressBarContainer>
        {recentComments &&
          recentComments.length > 0 &&
          recentComments.map((_, index) => (
            <ProgressSegment
              key={index}
              $isActive={index === currentSlide ? 'true' : 'false'}
            />
          ))}
      </ProgressBarContainer>
    </CommentSection>
  );
};

export default RecentComments;
