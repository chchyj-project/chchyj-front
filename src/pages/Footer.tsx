import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #f8f8f8; /* 배경 색상 */
  padding: 20px 0; /* 위아래 여백 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  color: #666; /* 텍스트 색상 */
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; /* 링크 간 간격 */
  margin-bottom: 10px;

  a {
    text-decoration: none;
    color: #666; /* 링크 색상 */
    font-size: 14px;
    &:hover {
      color: #333; /* 마우스 오버 시 색상 */
    }
  }
`;

const FooterInfo = styled.div`
  text-align: center;
  font-size: 12px;
  color: #999; /* 저작권 정보 색상 */
  line-height: 1.5;

  span {
    display: block; /* 한 줄씩 출력 */
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <a href="/terms">서비스 이용약관</a>
        <a href="/privacy">개인정보 처리방침</a>
        <a href="/team">칭찬요정 팀 소개</a>
        <a href="/contact">이용 문의 및 버그 제보 🐞</a>
      </FooterLinks>
      <FooterInfo>
        <span>Copyright. © 2023. 칭찬요정 All rights reserved.</span>
      </FooterInfo>
    </FooterContainer>
  );
};

export default Footer;
