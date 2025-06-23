import { createGlobalStyle } from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Common from './style/Common';

// 폰트 파일 import
import SUITFont from './assets/fonts/SUIT-Variable.woff2';

export const GlobalStyle = createGlobalStyle`
    /* Jalnan 폰트 */
    @font-face {
        font-family: 'Jalnan';
       src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');

        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    
    /* 백업 폰트: Jalnan이 로드되지 않을 경우 사용 */
    @font-face {
        font-family: 'NanumSquareRound';
        src: url('https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareRound/NanumSquareRoundB.woff') format('woff');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
    }
    
    @font-face {
        font-family: 'SUIT';
        src: url(${SUITFont}) format('woff2');
        font-weight: 100 900;
        font-style: normal;
        font-display: swap;
    }
    
     a,
    abbr,
    acronym,
    address,
    applet,
    article,
    aside,
    audio,
    b,
    big,
    blockquote,
    body,
    canvas,
    caption,
    center,
    cite,
    code,
    dd,
    del,
    details,
    dfn,
    div,
    dl,
    dt,
    em,
    embed,
    fieldset,
    figcaption,
    figure,
    footer,
    form,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    header,
    hgroup,
    html,
    i,
    iframe,
    img,
    ins,
    kbd,
    label,
    legend,
    li,
    mark,
    menu,
    nav,
    object,
    ol,
    output,
    p,
    pre,
    q,
    ruby,
    s,
    samp,
    section,
    small,
    span,
    strike,
    strong,
    sub,
    summary,
    sup,
    table,
    tbody,
    td,
    tfoot,
    th,
    thead,
    time,
    tr,
    tt,
    u,
    ul,
    var,
    video {
        border: 0;
        font-size: 100%;
        margin: 0;
        padding: 0;
        vertical-align: baseline;
    }
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol,
    ul {
        list-style: none;
    }
    blockquote,
    q {
        quotes: none;
    }
    blockquote:after,
    blockquote:before,
    q:after,
    q:before {
        content: "";
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'SUIT', "sans-serif";
    }
    body {
        background-color: ${Common.colors.gray};
      margin: 0 auto;
      padding: 0;
      overflow-x: hidden; /* 가로 스크롤 방지 */
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      
      /* 스크롤바 숨김 */
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE/Edge */
    }
    
    body::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
    
    html {
      /* 스크롤바 숨김 */
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE/Edge */
    }
    
    html::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
    ul,
    ol,
    li {
        list-style: none;
    }
    a {
        color: ${Common.colors.black};
        text-decoration: none;
    }
    button {
        color: ${Common.colors.black};
        background-color: transparent;
        border: none;
        outline: none;
    }
    p {
        margin-block-start: 0px;
        margin-block-end: 0px;
    }
`;
