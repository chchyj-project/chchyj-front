import styled from 'styled-components';
import { motion } from 'framer-motion';
import styleToken from '../../style/styleToken.ts';

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const PanelWrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
`;

export const Panel = styled.div`
  background: white;
  width: 390px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const PanelContent = styled.div`
  padding: 0 20px 20px;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-family: 'SUIT Black','SUIT ExtraBold','SUIT',sans-serif;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.4;
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px;
  border: 1px solid ${styleToken.color.secondary};
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 12px;
  font-family: inherit;
  background-color: #f8f9ff;
  
  /* 스크롤바 숨김 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  &::placeholder {
    color: #999;
    line-height: 1.5;
  }
  
  &:focus {
    border-color: ${styleToken.color.primary};
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.1);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.variant === 'primary' ? `
    background: ${styleToken.color.primary};
    color: white;
    border: none;
    
    &:hover {
      background: #3367d6;
      transform: translateY(-1px);
    }
    
    &:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
    }
  ` : `
    background: white;
    color: #666;
    border: 1px solid #ddd;
    
    &:hover {
      background: #f5f5f5;
    }
  `}
`;

export const InfoText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${styleToken.color.primary};
  padding: 8px 12px;
  border-radius: 8px;
`; 