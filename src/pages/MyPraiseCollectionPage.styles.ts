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
  background-color: ${Common.colors.backgroundSkyblue2};
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
  // padding: 0 16px;
  margin-bottom: 8px;
`;

// 댓글 수 표시
export const CommentCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${Common.colors.mainBlue};
  font-size: 11px;
`;

// 3) 말풍선 박스
export const PraiseBubble = styled.div`
  position: relative;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
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
  font-size: 11px;
`;

export const PraiseContent = styled.p`
  color: #4a5568;
  font-size: 14px;
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
// 새로운 댓글 스타일 컴포넌트들을 기존 스타일 파일에 추가

// 기존 CommentItemWrapper 스타일 교체
export const CommentItemWrapper = styled.div`
  margin-bottom: 16px;
`;

// 새로운 카드 스타일
export const CommentCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const CommentCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// 기존 UserProfileImage 스타일 업데이트
export const UserProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${Common.colors.mainBlue};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  flex-shrink: 0;
`;

export const UserDetails = styled.div<{
  $theme?: 'light' | 'dark' | 'primary' | 'secondary';
  $size?: 'small' | 'medium' | 'large';
}>`
  display: flex;
  flex-direction: column;

  /* 크기별 스타일 */
  ${(props) => {
    switch (props.$size) {
      case 'small':
        return `
          gap: 2px;
          font-size: 12px;
        `;
      case 'large':
        return `
          gap: 8px;
          font-size: 16px;
        `;
      default:
        return `
          gap: 4px;
          font-size: 14px;
        `;
    }
  }}

  /* 테마별 스타일 */
  ${(props) => {
    switch (props.$theme) {
      case 'dark':
        return `
          background: #2d3748;
          color: white;
          padding: 8px;
          border-radius: 6px;
        `;
      case 'primary':
        return `
          background: ${Common.colors.backgroundSkyblue};
          color: ${Common.colors.mainBlue};
          padding: 6px;
          border-radius: 4px;
        `;
      case 'secondary':
        return `
          background: #f1f5f9;
          color: #64748b;
          padding: 6px;
          border-radius: 4px;
        `;
      default:
        return `
          background: transparent;
          color: inherit;
        `;
    }
  }}
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
`;

export const CommentDate = styled.span`
  font-size: 12px;
  color: #a0aec0;
`;

export const LikeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const LikeCount = styled.span`
  font-size: 12px;
  color: ${Common.colors.mainBlue};
  font-weight: 500;
`;

export const CommentText = styled.p`
  color: #4a5568;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  padding: 0;
`;

// 기존에 사용하지 않게 될 스타일들 (제거하거나 주석 처리)
/*
export const CommentHeader = styled.div`
  // 더 이상 사용하지 않음
`;

export const CommentBubble = styled.div`
  // 더 이상 사용하지 않음 - 카드 스타일로 변경
`;

export const LikeInfo = styled.div`
  // LikeSection으로 대체됨
`;
*/

// 기존 UserDetails는 그대로 두고 새로운 확장 버전 생성
export const EnhancedUserDetails = styled.div<{
  $layout?: 'vertical' | 'horizontal' | 'grid';
  $spacing?: 'tight' | 'normal' | 'loose';
  $background?: boolean;
  $shadow?: boolean;
  $hover?: boolean;
}>`
  display: flex;
  transition: all 0.2s ease;

  /* 레이아웃 */
  ${(props) => {
    switch (props.$layout) {
      case 'horizontal':
        return `
          flex-direction: row;
          align-items: center;
        `;
      case 'grid':
        return `
          display: grid;
          grid-template-columns: auto 1fr;
        `;
      default:
        return `
          flex-direction: column;
        `;
    }
  }}

  /* 간격 */
  gap: ${(props) => {
    switch (props.$spacing) {
      case 'tight':
        return '2px';
      case 'loose':
        return '12px';
      default:
        return '6px';
    }
  }};

  /* 배경 */
  ${(props) =>
    props.$background &&
    `
    background: white;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  `}

  /* 그림자 */
  ${(props) =>
    props.$shadow &&
    `
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  `}
  
  /* 호버 효과 */
  ${(props) =>
    props.$hover &&
    `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  `}
`;

// 특화된 사용자 정보 컴포넌트
export const UserProfileDetails = styled(EnhancedUserDetails)`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${Common.colors.mainBlue};
    border-radius: 2px;
  }
`;

// 댓글 전용 UserDetails
export const CommentUserDetails = styled(UserDetails)`
  position: relative;
  padding-left: 16px;
  background: ${Common.colors.backgroundSkyblue2};
  color: ${Common.colors.mainBlue};
  border-radius: 12px;
  padding: 16px;
`;
