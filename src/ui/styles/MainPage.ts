import styled from '@emotion/styled';
import styleToken from './styleToken.ts';
import { IconProps } from '../../types/MainPage.ts';

export const AddtionalWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${styleToken.color.textSub};

  svg {
    margin-right: 4px;
  }
`;

export const Icon = styled.img<IconProps>`
  margin-left: 4px;
  width: ${(prop) => prop.size};
  height: ${(prop) => prop.size};
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
