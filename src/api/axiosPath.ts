const KAKAO_SDK_KEY = '8c946e5ca141521d38aac749171cf9e5';
const REST_API_KEY = '260a65641d17d98694c972d649d8f725';
const REDIRECT_URI = 'http://localhost:3000/login/callback';
const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
const WINE_LOG = 'https://i.my.me.wine.wandookongproject.com/api/wine-log';

const axiosPath = { KAKAO_SDK_KEY, REDIRECT_URI, WINE_LOG, KAKAO_URL };

export default axiosPath;
