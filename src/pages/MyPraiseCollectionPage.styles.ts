import styled from 'styled-components';

export const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background: #f5f9ff;
  min-height: 100vh;
  padding-bottom: 80px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
  position: relative;
  border-bottom: 1px solid #e0e8f5;
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
  border-bottom: 1px solid #e0e8f5;
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 16px;
  background: none;
  border: none;
  border-bottom: 3px solid
    ${(props) => (props.active ? '#60c3fb' : 'transparent')};
  color: ${(props) => (props.active ? '#60c3fb' : '#718096')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
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
