import { AxiosResponse } from 'axios';
import { axiosInstance } from './axiosConfig';

export type KakaoLoginReturnType = {
  isNewUser: boolean;
  userSocialId?: number;
  accessToken?: string;
};

const ACCESS_TOKEN_NAME = 'praise-fairy';
const USER_NAME = 'user';

class AuthService {
  private registerLoginSuccess(accessToken: string) {
    console.log('accessToken>>', accessToken);
    localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
    // 필요 시 사용자 이름을 저장하는 로직 추가
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
  }

  isUserLogin() {
    return !!localStorage.getItem(ACCESS_TOKEN_NAME);
  }

  getUserName() {
    return localStorage.getItem(USER_NAME) ?? '로그인 오류';
  }

  async kakaoLogin(code: string, redirectUri: string) {
    console.log(
      'kakaoLogin called with code:',
      code,
      'redirectUri:',
      redirectUri,
    );
    try {
      const response = await this.executeKakao<KakaoLoginReturnType>({
        code,
        redirectUri,
      });
      console.log('response>>', response);

      const { isNewUser, userSocialId, accessToken } = response.data;
      console.log('Parsed response>>', {
        isNewUser,
        userSocialId,
        accessToken,
      });

      if (isNewUser && !userSocialId) {
        console.log('New user detected, userSocialId:', userSocialId);
        window.location.href = `/login/nickname?userSocialId=${userSocialId}`;
      } else if (accessToken) {
        console.log('Access token obtained:', accessToken);
        this.registerLoginSuccess(accessToken);
        window.location.href = `/home?userSocialId=${userSocialId}`;
      } else {
        console.error('ERROR: Invalid KakaoLogin response', response);
        throw new Error('ERROR: Invalid KakaoLogin response');
      }
    } catch (error) {
      console.error('Kakao login error:', error);
      throw error;
    }
  }

  private async executeKakao<T>({
    code,
    redirectUri,
  }: {
    code: string;
    redirectUri: string;
  }): Promise<AxiosResponse<T>> {
    try {
      // Axios 요청을 await하여 결과를 기다립니다.
      const result = await axiosInstance.post<T>('/auth/kakao', {
        code,
        redirectUri,
      });
      debugger;
      // 결과를 콘솔에 출력하여 디버깅을 용이하게 합니다.
      console.log('executeKakao result:', result);

      // 결과를 반환합니다.
      return result;
    } catch (error) {
      // 오류 발생 시 콘솔에 오류를 출력하고, 오류를 다시 던집니다.
      console.error('executeKakao error:', error);
      throw error;
    }
  }
}

export default new AuthService();
