import styled from 'styled-components';
import Common from '../style/Common.ts';
import styleToken from '../style/styleToken.ts';
import { Content } from '../style/commonStyle.ts';
export const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background: white;
  min-height: 100vh;
  padding-bottom: 110px; // 하단 버튼 여백 증가
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 12px 16px 16px 16px;
  border-bottom: 1px solid #e2e5e9;
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
  border-bottom: 1px solid #e2e5e9;
  margin-bottom: 8px;
`;

export const PostTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #222;
`;

export const StyledContent = styled(Content)`
  font-size: 15px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 8px;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const PostDate = styled.span`
  font-size: 12px;
  color: #888;
  display: block;
  margin-top: 4px;
`;

export const CommentSection = styled.section`
  padding: 0 20px;
  margin-top: 4px;
`;

export const CommentItem = styled.div`
  padding: 22px 0;
  border-bottom: 1px solid #e2e5e9;
  position: relative;

  /* 마지막 요소의 border 제거 */
  &:last-child {
    border-bottom: none;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Nickname = styled.div`
  font-size: 15px;
  color: #222;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #888;
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s;

  &:hover {
    color: #666;
  }
`;

export const CommentContent = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 10px;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const BottomButton = styled.button`
  height: 58px;
  width: 90%;
  background-color: ${Common.colors.skyblue};
  color: ${styleToken.color.white};
  font-size: 17px;
  font-weight: 700;
  line-height: 19px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #70c1e2;
  }
`;

export const LikeButton = styled.button`
  padding: 6px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const FloatingButtonWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  right: 0;
  left: 0;
  max-width: 390px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
  pointer-events: none;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
`;

export const FloatingActionButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${Common.colors.skyblue};
  color: ${styleToken.color.white};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    background-color: #70c1e2;
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Tooltip = styled.div`
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
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
`;
