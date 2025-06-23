import styled from 'styled-components';
import Slider from 'react-slick';
import styleToken from '../style/styleToken.ts';

export const CommentSection = styled.div`
  padding: 15px 16px;
  background-color: #fff;
  border: 0.5px solid ${styleToken.color.primary};
  border-radius: 8px;
  width: 330px;
`;

export const CommentTitle = styled.h2`
  font-size: 10px;
  font-weight: 600;
  color: ${styleToken.color.primary};
  margin-bottom: 8px;
  line-height: 14px;
  display: flex;
  align-items: center;
  letter-spacing: -0.05em;
`;

export const StyledSlider = styled(Slider)`
  .slick-slide {
    box-sizing: border-box;

    &[aria-hidden='true'] {
      pointer-events: none;
      * {
        visibility: visible !important;
        pointer-events: none !important;
      }
    }
  }
`;

export const CommentCard = styled.div<{ $isActive?: boolean }>`
  width: calc(100% - 8px);
  padding: 12px 41px;
  background: ${styleToken.color.bannerSkyblue};
  border-radius: 8px;
  box-sizing: border-box;
  margin: 0 4px;
  touch-action: pan-y pinch-zoom;
  min-height: 84px;
  display: flex;
  flex-direction: column;

  /* 비활성 슬라이드일 때 포커스 방지 */
  ${(props) =>
    !props.$isActive &&
    `
    pointer-events: none;
    user-select: none;
  `}
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const UserName = styled.span`
  font-weight: bold;
  font-size: 14px;
`;

export const CommentTime = styled.span`
  color: #8a8a8a;
  font-size: 8px;
  margin-left: 10px;
`;

export const CommentText = styled.p`
  font-size: 11px;
  line-height: 1.4;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ClickableText = styled.span`
  cursor: pointer;
`;

export const ProgressBarContainer = styled.div`
  width: 60%;
  margin: 8px auto 0;
  display: flex;
`;

export const ProgressSegment = styled.div<{ $isActive: string }>`
  flex: 1;
  height: 3px;
  background-color: ${(props) =>
    props.$isActive === 'true' ? `${styleToken.color.primary}` : '#E5E5E5'};
  transition: background-color 0.3s ease;
`;
