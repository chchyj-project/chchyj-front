import { createGlobalStyle } from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Common from './style/Common';

export const GlobalStyle = createGlobalStyle`
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
        font-family: "sans-serif";
    }
    body {
        background-color: ${Common.colors.gray};
      margin: 0;
      padding: 0;
      overflow-x: hidden; /* 가로 스크롤 방지 */
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
