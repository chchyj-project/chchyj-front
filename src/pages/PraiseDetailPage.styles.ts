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
  padding: 20px;
  min-height: 200px; /* 최소 높이 설정으로 레이아웃 안정성 확보 */
  overflow-x: hidden; /* 가로 스크롤 방지 */
  flex: 1; /* 남은 공간 모두 사용 */
`;

export const CommentItem = styled.div<{ isOwn: boolean }>`
  display: flex;
  margin-bottom: 24px;
  justify-content: ${(props) => (props.isOwn ? 'flex-end' : 'flex-start')};
  gap: 8px;
  width: 100%; /* 명시적으로 전체 너비 설정 */
  box-sizing: border-box;
`;

export const ProfileImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #495057;
  flex-shrink: 0;
`;

export const CommentBubble = styled.div<{ isOwn: boolean }>`
  background-color: ${(props) => (props.isOwn ? '#E0F2FF' : '#f1f3f5')};
  border-radius: 12px;
  padding: 12px;
  max-width: calc(100% - 60px); /* 더 여유있게 설정 */
  word-break: break-word; /* 긴 단어 줄바꿈 */
  overflow-wrap: break-word; /* 추가적인 줄바꿈 보장 */
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const CommentAuthorInfo = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #343a40;
`;

export const CommentContent = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #333;
  margin: 0;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const FixedBottomBar = styled.div`
  position: absolute; /* fixed에서 absolute로 변경 */
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: white;
  padding: 12px 20px 24px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  z-index: 100;
  box-sizing: border-box;
  flex-shrink: 0; /* 크기 고정 */
`;

export const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

export const CommentInput = styled.input`
  flex-grow: 1;
  height: 44px;
  padding: 0 16px;
  border: 1px solid #dee2e6;
  border-radius: 22px;
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: #4dabf7;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: #4dabf7;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #339af0;
  }

  &:disabled {
    background-color: #ced4da;
    cursor: not-allowed;
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

export const Nickname = styled.div`
  font-size: 15px;
  color: #222;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

export const InfoHeader = styled.div`
  padding: 16px 20px;
  font-size: 14px;
  color: #555;
  // border-bottom: 1px solid #e2e5e9;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: bold;
    color: #333;
  }
`;

export const TimelineContainer = styled.div`
  padding: 20px;
`;

export const TimelineItem = styled.div`
  display: flex;
  position: relative;
  padding-left: 30px;
  margin-bottom: 24px;

  &:before {
    content: '';
    position: absolute;
    left: 8px;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: #dee2e6;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:last-child:before {
    height: 0;
  }
`;

export const TimelineDot = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #4dabf7;
  border: 3px solid #fff;
  z-index: 1;
`;

export const TimelineItemContent = styled.div`
  width: 100%;
`;

export const TimelineItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const TimelineItemNickname = styled.div`
  font-size: 15px;
  font-weight: 700;
`;

export const TimelineCard = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 12px 16px;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
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

export const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const FloatingButtonWrapper = styled.div`
  position: absolute; /* fixed에서 absolute로 변경 */
  bottom: 140px; /* FixedBottomBar 위쪽에 위치 */
  right: 20px;
  width: 56px; /* 버튼 크기만큼만 */
  height: 56px;
  pointer-events: none;
  z-index: 101; /* FixedBottomBar보다 위에 */
  display: flex;
  justify-content: center;
  align-items: center;
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