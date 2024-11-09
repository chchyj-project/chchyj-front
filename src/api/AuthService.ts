import { AxiosResponse } from 'axios';
import { axiosInstance } from './axiosConfig';
// import axiosPath from "./axiosPath";

export type KakaoLoginResponse = {
  isNewUser: boolean;
  userSocialId?: number;
  accessToken?: string;
};
const ACCESS_TOKEN_NAME = 'praise-fairy';
const USER_NAME = 'user';

class AuthService {
  // constructor() {
  //   this.api = {
  //     Login: axiosPath.Login,
  //   };
  // }

  // executeService(username, password) {
  //   return axiosInstance.post(this.api.Login, {
  //     id: username,
  //     passwd: password,
  //   });
  // }

  private registerLoginSuccess(accessToken: string) {
    console.log('accessToken>>', accessToken);
    localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
    // 유저 이름은 localStorage에 저장하기 보다는, 필요한 화면에서 api 콜하는게 나을 거 같아서 삭제했는데,
    // 여기서 받는게 좋을거같으면 추가할게요~!
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
  }

  isUserLogin() {
    return !!localStorage.getItem(ACCESS_TOKEN_NAME);
  }

  getUserName() {
    // 로그인이 안됐을때, 유저 이름 표시하는 부분이 있으면, 빈 값보다 나을거 같아서..
    return localStorage.getItem(USER_NAME) ?? '로그인 오류';
  }
  async kakaoLogin(code: string, redirectUri: string) {
    try {
      const response = await this.executeKakao({
        code,
        redirectUri,
      });

      const { isNewUser, userSocialId, accessToken } = response;

      if (isNewUser && userSocialId) {
        window.location.href = `/login/nickname?userSocialId=${userSocialId}`;
      } else if (accessToken) {
        this.registerLoginSuccess(accessToken);
      } else {
        throw new Error('ERROR: Invalid KakaoLogin response');
      }

      return response;
    } catch (error) {
      console.error('Kakao login error:', error);
      throw error;
    }
  }

  private async executeKakao({
    code,
    redirectUri,
  }: {
    code: string;
    redirectUri: string;
  }): Promise<KakaoLoginResponse> {
    try {
      const response: AxiosResponse<KakaoLoginResponse> =
        await axiosInstance.post('/auth/kakao', {
          code,
          redirectUri,
        });
      return response.data; // response.data로 실제 데이터 반환
    } catch (error) {
      console.error('Execute kakao error:', error);
      throw error;
    }
  }
}

export default new AuthService();
