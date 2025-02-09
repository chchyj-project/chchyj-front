import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { axiosInstance } from '../api/axiosConfig.ts';

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
  }

  .slick-prev,
  .slick-next,
  .slick-dots {
    display: none !important;
  }
`;

const CommentCard = styled.div`
  width: 100%;
  padding: 15px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eee;
  box-sizing: border-box;
  touch-action: pan-y pinch-zoom;
`;

const ProgressBar = styled.div`
  width: calc(100% - 36px);
  height: 2px;
  background-color: #e5e5e5;
  margin: 20px auto 0;
  position: relative;
`;

const Progress = styled.div<{ width: number }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: #000;
  transition: width 0.3s ease;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
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

const PlayButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  cursor: pointer;

  &::after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 0 10px 15px;
    border-color: transparent transparent transparent #ffffff;
  }
`;

interface CommentProps {
  userName: string;
  avatarUrl: string;
  timestamp: string;
  content: string;
}

const ProgressBarContainer = styled.div`
  width: 30%;
  margin: 20px auto 0;
  display: flex;
`;

const ProgressSegment = styled.div<{ isActive: boolean }>`
  flex: 1;
  height: 3px;

  background-color: ${(props) => (props.isActive ? '#000' : '#E5E5E5')};
  transition: background-color 0.3s ease;
`;

const RecentComments = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [recentComments, setRecentComments] = useState([]);

  useEffect(() => {
    const fetchRecentComment = async () => {
      const response = await axiosInstance.get('/replies/me');
      setRecentComments(response.data);
    };
    fetchRecentComment();
  });
  const sampleComments: CommentProps[] = [
    {
      userName: '제니 ☆',
      avatarUrl: '/api/placeholder/40/40',
      timestamp: '01. 12. 10:32',
      content: '밥 잘 챙겨먹고!!!',
    },
    {
      userName: '리사 ♡',
      avatarUrl: '/api/placeholder/40/40',
      timestamp: '01. 12. 10:35',
      content: '오늘도 화이팅!',
    },
    {
      userName: '지수 ★',
      avatarUrl: '/api/placeholder/40/40',
      timestamp: '01. 12. 10:40',
      content: '잘하고 있어요~',
    },
    {
      userName: '로제 ✧',
      avatarUrl: '/api/placeholder/40/40',
      timestamp: '01. 12. 10:45',
      content: '좋은 하루 보내세요!',
    },
    {
      userName: '로제 ✧',
      avatarUrl: '/api/placeholder/40/40',
      timestamp: '01. 12. 10:45',
      content: '좋은 하루 보내세요!',
    },
    {
      userName: '로제 ✧',
      avatarUrl: '/api/placeholder/40/40',
      timestamp: '01. 12. 10:45',
      content: '좋은 하루 보내세요!',
    },
    {
      userName: '로제 ✧',
      avatarUrl: '/api/placeholder/40/40',
      timestamp: '01. 12. 10:45',
      content: '좋은 하루 보내세요!',
    },
  ];

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
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex);
    },
  };

  return (
    <CommentSection>
      <CommentTitle>최신 댓글 목록</CommentTitle>
      <StyledSlider {...settings}>
        {sampleComments.map((comment, index) => (
          <div key={index}>
            <CommentCard>
              <UserInfo>
                <div>
                  <UserName>{comment.userName}</UserName>
                  <CommentTime>{comment.timestamp}</CommentTime>
                </div>
              </UserInfo>
              <CommentText>{comment.content}</CommentText>
            </CommentCard>
          </div>
        ))}
      </StyledSlider>
      <ProgressBarContainer>
        {sampleComments.map((_, index) => (
          <ProgressSegment key={index} isActive={index === currentSlide} />
        ))}
      </ProgressBarContainer>
    </CommentSection>
  );
};

export default RecentComments;
