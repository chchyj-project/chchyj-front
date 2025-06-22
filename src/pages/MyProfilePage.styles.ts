import styled from 'styled-components';
import styleToken from '../style/styleToken.ts';

export const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;


export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid white;
  background-color: white;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const ProfileSection = styled.div`
  padding: 24px;
  flex: 1;
  background-color: #f5f5f5;
`;

export const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: #303030;
`;

export const Subtitle = styled.p`
  color: #303030;
  font-size: 20px;
  margin-bottom: 28px;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
  height: 80px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatNumber = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${styleToken.color.primary};
`;

export const HeartNumber = styled.div`
  width: 18px;
  height: 18px;
  color: #fff;
  font-size: 12px;
  border-radius: 9px;
  text-align: center;
  line-height: 1.2;
  border: 1px solid #fff;
  margin-left: -12px;
  margin-top: -4px;
  background: ${styleToken.color.primary};
`;

export const Img = styled.img`
  margin-top: -4px;
`;

export const HeartNumberBox = styled.div`
  display: flex;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

export const MenuList = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 8px;
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  width: 340px;
  height: 51px;
  border: none;
  background: none;
  font-size: 17px;
  color: #303030;
  cursor: pointer;
  text-align: left;
  padding: 10px;
  transition: background-color 0.2s;
  color: #303030;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: #f8f9fa;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const EditButton = styled.button`
  width: 82px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  font-size: 11px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  svg {
    margin-right: 2px;
  }
  &:hover {
    background: #f5f5f5;
  }
`;

export const MarkerIcon = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 4px;
`;

export const MenuItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const MenuText = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-size: 14px;
`;

export const HeartIcon = styled.span`
  font-size: 20px;
  margin-right: 4px;
  color: #87ceeb;
`;

export const Logo = styled.div`
  img {
    width: 80px;
    height: 30px;
  }
`;

export const Secession = styled.p`
  text-align: right;
  font-size: 17px;
  color: #8a8a8a;
  padding-right: 8px;
`;

export const New = styled.div`
  width: 22px;
  height: 22px;
  color: #fff;
  background-color: ${styleToken.color.primary};
  border-radius: 12px;
  font-size: 12px;
  text-align: center;
  line-height: 1.5;
  border: 1px solid #fff;
  margin-right: -12px;
`;
