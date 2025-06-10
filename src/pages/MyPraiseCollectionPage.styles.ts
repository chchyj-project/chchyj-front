import styled from 'styled-components';
import Common from '../style/Common';

export const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
  position: relative;
  // border-bottom: 1px solid ${Common.colors.grey};
  background-color: white;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: absolute;
  left: 16px;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #4a5568;
  margin: 0;
`;

export const BannerSection = styled.section`
  background-color: #c9ebff;
  padding: 24px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BannerText = styled.div`
  flex: 1;
  padding-right: 20px;
`;

export const BannerTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #111111;
  margin: 0 0 8px 0;
`;

export const BannerDescription = styled.p`
  font-size: 14px;
  color: #4a5568;
  line-height: 1.5;
  margin: 0;
`;

export const BannerImage = styled.div`
  width: 80px;
  height: 80px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const TabMenu = styled.div`
  display: flex;
  background-color: white;
  margin-bottom: 16px;
  // border-bottom: 3px solid ${Common.colors.grey};
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 16px;
  background: none;
  border: none;
  background-color: ${Common.colors.backgroundSkyblue};
  border-top: 3px solid
    ${(props) => (props.active ? Common.colors.mainBlue : Common.colors.grey)};
  color: black;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const PraiseListSection = styled.section`
  padding: 0 16px;
  flex: 1;
  padding-bottom: 20px;
`;

// MyPraiseCollectionPage.styles.ts

// 1) 리스트 아이템 전체 래퍼
export const PraiseItemWrapper = styled.div`
  margin-bottom: 24px;
`;

// 2) 메타 영역: 날짜 & 댓글
export const PraiseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 8px;
`;

// 댓글 수 표시
export const CommentCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #4a5568;
  font-size: 14px;
`;

// 3) 말풍선 박스
export const PraiseBubble = styled.div`
  position: relative;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

// 4) 아바타 (말풍선 우측 하단)
export const Avatar = styled.img`
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 40px;
  height: 40px;
  border: 2px solid white;
  border-radius: 50%;
  object-fit: cover;
`;

export const PraiseItem = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const PraiseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const Nickname = styled.div`
  font-weight: bold;
  color: #4a5568;
  font-size: 16px;
`;

export const DateInfo = styled.div`
  color: #a0aec0;
  font-size: 14px;
`;

export const PraiseContent = styled.p`
  color: #4a5568;
  font-size: 15px;
  line-height: 1.5;
  margin: 0;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  gap: 8px;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${(props) => (props.active ? '#60c3fb' : '#e0e8f5')};
  background-color: ${(props) => (props.active ? '#60c3fb' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#4a5568')};
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`;

export const EmptyImage = styled.div`
  width: 120px;
  height: 120px;
  margin-bottom: 16px;

  img {
    width: 100%;
  }
`;

export const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #4a5568;
  margin: 0 0 8px 0;
`;

export const EmptyDescription = styled.p`
  font-size: 14px;
  color: #718096;
  line-height: 1.5;
  margin: 0 0 16px 0;
`;

export const ActionButton = styled.button`
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3182ce;
  }
`;
