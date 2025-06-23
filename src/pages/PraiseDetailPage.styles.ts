import styled, { css } from 'styled-components';
import Common from '../style/Common.ts';
import styleToken from '../style/styleToken.ts';
import { Content } from '../style/commonStyle.ts';
import tail from '../images/tail.png';

export const Container = styled.div`
  background: white;
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;

  @media (min-width: 501px) {
    flex-shrink: 0;
    min-width: 390px;
  }
`;
export const MainContent = styled.div`
  flex: 1;
  overflow-y: auto; /* 세로 스크롤 허용 */
  overflow-x: hidden; /* 가로 스크롤 방지 */
  padding-bottom: 20px; /* 하단 여백 */
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 12px 16px 0px 16px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const PostContainer = styled.article`
  margin: 20px;
  margin-bottom: 8px;

  @media (min-width: 501px) {
    flex-shrink: 0;
    width: calc(100% - 40px);
  }
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const PostTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #222;
  margin-bottom: 4px;
`;

export const PostDate = styled.span`
  font-size: 13px;
  color: #999;
`;
export const ContentDetailBox = styled.div`
  position: relative;
  background-color: #fff;
  border: 1px solid #e1e2e4;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  min-height: auto;
  height: auto;
  width: 100%;
  box-sizing: border-box;
  overflow: visible;
  word-wrap: break-word;
  overflow-wrap: break-word;

  &::after {
    content: '';
    position: absolute;
    bottom: -13px;
    left: 16px;
    width: 12px;
    height: 15px;
    background: #fff url(${tail}) no-repeat;
    background-size: 100%;
  }
`;

export const StyledContent = styled(Content)`
  font-size: 15px;
  line-height: 1.6;
  color: #333;
  word-break: break-word;
  white-space: pre-wrap;
  margin: 0;
  width: 100%;
  
  /* 텍스트 제한 해제 - 전체 내용 표시 */
  display: block;
  -webkit-line-clamp: unset;
  -webkit-box-orient: unset;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  text-overflow: unset;
  max-height: unset;
  overflow: visible;
`;

export const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: ${styleToken.color.primary};
  padding: 8px 0;
`;

export const CommentListContainer = styled.div`
  padding: 0 20px 20px 20px;
  min-height: 200px;
  overflow-x: hidden;
  flex: 1;

  @media (min-width: 501px) {
    width: 100%;
    box-sizing: border-box;
  }
`;

export const CommentItem = styled.div<{ isOwn: boolean; canRecommend?: boolean }>`
  background-color: ${({ canRecommend }) => canRecommend ? '#f0f8ff' : 'white'};
  border-radius: 4px;
  margin-bottom: 16px;
  padding: 5px 10px 10px 10px;
  width: 100%;
  box-sizing: border-box;
  border: 0.5px solid ${Common.colors.grey};

  @media (min-width: 501px) {
    max-width: 100%;
    flex-shrink: 0;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const CommentAuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
`;

export const CommentAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CommentAuthorName = styled.div`
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  color: #222;
`;

export const CommentDate = styled.div`
  font-size: 8px;
  line-height: 10px;
  font-weight: 400;
  color: #999;
`;

export const CommentContent = styled.p`
  font-size: 11px;    
  line-height: 12px;
  color: #333;
  margin-top: 4px;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const CommentBubble = styled.div<{ isOwn: boolean }>`
  width: 100%;
`;

export const LikeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`;

export const LikeButton = styled.button<{ isLiked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: #4285f4;
  transition: all 0.2s;
  
  svg {
    fill: #4285f4;
    color: #4285f4;
  }

  &:hover {
    background-color: rgba(66, 133, 244, 0.1);
  }
`;

export const LikeCount = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #4285f4;
`;

export const RecommendSection = styled.div`
  display: flex;
  align-items: center;
  height: 28px; /* ThumbUpWrapper와 같은 높이로 설정 */
`;

export const ThumbUpWrapper = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${Common.colors.mainBlue};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0; /* 크기 고정 */

  &:hover {
    transform: scale(1.1);
    background-color: #3367d6;
  }
`;

export const ThumbUpIcon = styled.img`
  width: 10px;
  height: 10px;
`;

export const FloatingButtonContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
`;

export const Tooltip = styled.div`
  background-color: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  pointer-events: none;
  position: relative;
  
  /* 말풍선 꼬리 */
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #333;
  }
`;

export const FloatingButton = styled.button`
  background: ${Common.colors.mainBlue};
  border: none;
  border-radius: 16px;
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.3);
  color: white;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  font-family: 'Jalnan', 'NanumSquareRound', sans-serif;

  /* 말풍선 꼬리 - 틈 없이 버튼에 붙여서 배치 */
  &::after {
    content: '';
    position: absolute;
    bottom: -9px;
    right: 0px; /* 버튼의 오른쪽 변과 일직선 */
    width: 0;
    height: 0;
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent;
    border-right: 32px solid ${Common.colors.mainBlue}; /* 큰 삼각형으로 왼쪽 향하게 */
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(66, 133, 244, 0.4);
    background: #3367d6;
    
    &::after {
      border-right-color: #3367d6;
    }
  }

  &:active {
    transform: translateY(-1px);
  }
`;