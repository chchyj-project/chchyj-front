import styled from 'styled-components';

const Common = {
  colors: {
    red: '#b11313',
    skyblue: '#60c3fb',
    backgroundSkyblue: '#E0F2FF',
    backgroundSkyblue2: '#EDF0FF',
    mainBlue: '#2559F3',
    beige100: '#DECBB8',
    beige200: '#E9C2A1',
    green: '#CECCC2',
    yellow: '#F9E000',
    white: '#fff',
    black: '#222',
    gray: '#D9D9D9',
    textBlack: '#505050',
    seekBarBgColor: 'rgba(233, 194, 161, 0.2)',
    seekBarMarkColor: '#E9C2A1',
    grey: '#CCCCCC',
    placeholder: '#bdbdbd',
  },
};
export const AppContainer = styled.div`
  max-width: 390px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transform: translateZ(0);

  @media (max-width: 500px) {
    max-width: none;
    width: 100vw;
    box-shadow: none;
  }

  @media (max-width: 390px) {
    box-shadow: none;
  }
`;

export default Common;
