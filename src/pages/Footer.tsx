import styled from 'styled-components';

const FooterContainer = styled.footer`
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

const FooterContent = styled.div`
  width: 90%; /* 기본 너비를 90%로 설정하여 양쪽 여백 확보 */
  max-width: 1200px; /* 최대 너비 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  /* gap: 20px; */
  margin-bottom: 16px;
  flex-wrap: wrap; /* 모바일에서 줄바꿈 가능하도록 설정 */

  @media (max-width: 600px) {
    /* gap: 12px; 모바일에서 간격 줄임 */
    margin:  0px 0px 12px 0px; /* 모바일에서 양쪽 여백 추가 */
   
  }

  a {
    text-decoration: none;
    color: #666;
    font-size: 13px;
    color:#8A8A8A;
    padding: 0px 8px 8px; /* 터치 영역 확장 */

    @media (max-width: 600px) {
      font-size: 12px; /* 모바일에서 글자 크기 줄임 */
    }

    &:hover {
      color: #333;
    }
  }
`;

const FooterInfo = styled.div`
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

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <a href="/terms">서비스 이용약관</a>
          <a href="/privacy">개인정보 처리방침</a>
          <a href="/team">칭찬요정 팀 소개</a>
          <a href="/contact">이용 문의 및 버그 제보 🐞</a>
        </FooterLinks>
        <FooterInfo>
          <span>Copyright. © 2023. 칭찬요정 All rights reserved.</span>
        </FooterInfo>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
