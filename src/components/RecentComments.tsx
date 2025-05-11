import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { axiosInstance } from '../api/axiosConfig.ts';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  CommentSection,
  CommentTitle,
  StyledSlider,
  CommentCard,
  UserInfo,
  UserName,
  CommentTime,
  CommentText,
  ClickableText,
  ProgressBarContainer,
  ProgressSegment,
} from './RecentComments.styles.ts';

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
      return await axiosInstance.get('/replies/latest');
    };
    fetchRecentComment()
      .then((response) => {
        setRecentComments(response.data.list);
      })
      .catch((error) => {
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
      <CommentTitle>하트가 필요한 댓글 목록</CommentTitle>
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
                <CommentText>
                  <ClickableText
                    onClick={() => moveToDetail(comment.articleId.toString())}
                  >
                    {comment.content}
                  </ClickableText>
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
