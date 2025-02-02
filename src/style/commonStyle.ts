import styled from 'styled-components';

export const RowFlexBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #404040;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
  }
`;
