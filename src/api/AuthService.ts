import { AxiosResponse } from 'axios';
import { axiosInstance } from './axiosConfig';
import { ACCESS_TOKEN_NAME, USER_NAME } from '../constant/constant.ts';
// eslint-disable-next-line no-debugger

export type KakaoLoginReturnType = {
  isNewUser: boolean;
  userSocialId?: number;
  accessToken?: string;
};

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

      const { isNewUser, accessToken } = response.data;
      console.log('Parsed response>>', {
        isNewUser,
        accessToken,
      });

      if (typeof accessToken === 'string') {
        console.log('accessToken>>>', accessToken);
        localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
      }

      if (isNewUser) {
        window.location.href = `/login/nickname`;
      } else {
        try {
          const nickNmRes = await this.getUserInfo();
          const { nickname: nicknameVal } = nickNmRes;
          console.log('getUserInfo response:', nicknameVal); // 응답 전체 구조 확인

          if (nickNmRes && nicknameVal) {
            const nickname = nicknameVal;
            console.log('Received nickname:', nickname);

            if (typeof nickname === 'string' && nickname.length > 0) {
              localStorage.setItem('nickname', nickname);
              window.location.href = `/home?userSocialId=${encodeURIComponent(nickname)}`;
            } else {
              console.error('Invalid nickname format:', nickname);
              throw new Error('Invalid nickname received');
            }
          } else {
            console.error('Invalid getUserInfo response:', nickNmRes);
            throw new Error('Failed to get user info');
          }
        } catch (userInfoError) {
          console.error('Error getting user info:', userInfoError);
          throw userInfoError;
        }
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

  private async getUserInfo(): Promise<AxiosResponse<any, any>> {
    try {
      // Axios 요청을 await하여 결과를 기다립니다.
      const result = await axiosInstance.get('/users/me');

      // 결과를 콘솔에 출력하여 디버깅을 용이하게 합니다.
      console.log('executeKakao result:', result);

      // 결과를 반환합니다.
      return result.data;
    } catch (error) {
      // 오류 발생 시 콘솔에 오류를 출력하고, 오류를 다시 던집니다.
      console.error('executeKakao error:', error);
      throw error;
    }
  }
}

export default new AuthService();
