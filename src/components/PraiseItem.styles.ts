import styled from 'styled-components';
import styleToken from '../style/styleToken.ts';
import { Content, RowFlexBetween } from '../style/commonStyle.ts';
import { ContainerProps } from '../types/MainPage.ts';
import tail from '../images/tail.png';

export const Container = styled.div<ContainerProps>`
  margin-bottom: ${(props) => (props.$islast ? '0px' : '8px')};
  padding-bottom: 24px;
  background-color: #fff;
  border-bottom: 0.5px solid #e1e2e4;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
  color: #303030;
`;

export const Date = styled.span`
  font-size: 11px;
  padding: 10px 0;
  color: #c3c3c3;
`;

export const CommentInfo = styled.div`
  font-size: 14px;
  color: ${styleToken.color.primary};
`;

interface WritingCommentWrapperProps {
  $backgroundColor?: string;
  $fontColor?: string;
}

export const WritingCommentWrapper = styled.div<WritingCommentWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px;
  font-size: 12px;
  color: ${(props) => (props.$fontColor || styleToken.color.secondary)};
  border: 1px solid ${styleToken.color.secondary};
  border-radius: 20px;
  cursor: pointer;
  background-color: ${(props) => props.$backgroundColor || 'transparent'};

  svg {
    margin-right: 4px;
  }
`;

export const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; // Date와 CommentActions 사이의 간격
`;

export const ContentBox = styled.div`
  position: relative;
  border: 1px solid #e1e2e4;
  border-radius: 12px;
  width: 100%;
  height: 95px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const Tail = styled.div`
  position: absolute;
  bottom: -13px;
  left: 16px;
  width: 12px;
  height: 15px;
  background: #fff url('${tail}') no-repeat;
  background-size: 100%;
`;

export const CommentIcon = styled.img`
  width: 17px;
  height: 16px;
  margin-right: 4px;
`;

export const CommentBox = styled.div`
  display: flex;
  align-items: center;
`;

export const HeartIcon = styled.img`
  width: 17px;
  height: 16px;
`;
