import {
  FooterContainer,
  FooterContent,
  FooterLinks,
  FooterInfo,
} from './Footer.style';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <a href="/terms">서비스 이용약관</a>
          <a href="/team">칭찬요정 팀 소개</a>
          <a href="/contact">이용 문의 및 버그 제보</a>
        </FooterLinks>
        <FooterInfo>
          <span>Copyright. © 2023. 칭찬요정 All rights reserved.</span>
        </FooterInfo>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
