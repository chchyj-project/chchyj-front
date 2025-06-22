import styled, { css } from 'styled-components';
import Common from '../style/Common.ts';
import styleToken from '../style/styleToken.ts';
import { Content } from '../style/commonStyle.ts';

export const Container = styled.div`
  background: white;
  height: 100vh; /* 화면 전체 높이 고정 */
  width: 390px !important; /* 강제 적용 */
  min-width: 390px !important; /* 최소 너비도 보장 */
  margin: 0 auto; /* 가운데 정렬 */
  box-sizing: border-box;
  overflow: hidden; /* 전체 스크롤 방지 */
  position: relative;
  display: flex;
  flex-direction: column;
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
  padding: 24px 20px;
  margin-bottom: 8px; 
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

export const ContentBox = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const StyledContent = styled(Content)`
  font-size: 15px;
  line-height: 1.6;
  color: #333;
  word-break: break-word;
  white-space: pre-wrap;
  margin: 0;
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
`;

export const CommentItem = styled.div<{ isOwn: boolean }>`
  background-color: white;
  border-radius: 4px;
  margin-bottom: 16px;
  padding: 10px 16px;
  width: 100%;
  box-sizing: border-box;
  border: 0.5px solid ${Common.colors.grey};
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
  color: #999;
`;

export const CommentContent = styled.p`
  font-size: 10px;    s
  line-height: 12px;
  color: #333;
  margin: 0;
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