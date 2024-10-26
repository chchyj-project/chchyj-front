const headerHeight = 80;
const menuHeight = 80;
const COLOR_PROPERTIES = {
  primary: '#c9ecff', // 주요 색상 (Primary)
  secondary: '#60c3fb', // 보조 색상 (Secondary)
  background: '#ffffff', // 배경 색상
  text: '#000000', // 기본 텍스트 색상
  textLight: '#737373', // 밝은 텍스트 색상
  border: '#dddddd', // 테두리 색상
  danger: '#e74c3c', // 경고 색상 (예: 오류, 알림 등)
  success: '#2ecc71', // 성공 색상
  info: '#3498db', // 정보 색상
  warning: '#f39c12', // 경고 색상
  white: '#ffffff', // 흰색
  black: '#000000', // 검은색
  shadow: 'rgba(0, 0, 0, 0.1)', // 그림자 색상
};

const SIZE_PROPERTIES = {
  headerHeight: `${headerHeight}px`,
  menuHeight: `${menuHeight}px`,
};

const styleToken = {
  size: SIZE_PROPERTIES,
  color: COLOR_PROPERTIES,
};

export default styleToken;
