import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: #f8f8f8;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Arial', sans-serif;
  font-size: 13px;
  color: #666;
  height: auto;
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;

  a {
    text-decoration: none;
    color: #666;
    font-size: 13px;
    color: #8a8a8a;

    &:hover {
      color: #333;
    }
  }
`;

export const FooterInfo = styled.div`
  text-align: center;
  font-size: 12px;
  color: #999;
  line-height: 12px;
  width: 100%;
  /* padding: 0 15px; 양쪽 여백 추가 */

  span {
    display: block;
  }
`;
