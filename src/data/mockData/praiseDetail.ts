interface Comment {
  id: number;
  nickname: string;
  content: string;
  likes: number;
  createdAt: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  comments: Comment[];
}

// mockData/praiseData.ts
export const mockPost: Post = {
  id: 1,
  title: '꽃네랑',
  content:
    '오늘 피그마를 배웠어요. 프레임도 만들고 가이드도 만들고 넷 플릭스도 만들고 토스도 만들고 이미지도 넣고, 많이 배웠어요. 이제 기본적인건 할 수 있어요',
  createdAt: '2023.5.20.',
  author: '꽃네랑',
  comments: [
    {
      id: 1,
      nickname: '행복한 요정',
      content: '피그마 실력이 많이 늘었네요! 앞으로도 더 성장하실 것 같아요 👍',
      likes: 5,
      createdAt: '2023.5.20.',
    },
    {
      id: 2,
      nickname: '따뜻한 햇살',
      content: '열심히 공부하시는 모습이 보기 좋네요. 화이팅하세요!',
      likes: 3,
      createdAt: '2023.5.20.',
    },
    {
      id: 3,
      nickname: '응원요정',
      content: '다양한 기능을 배우셨네요! 앞으로가 더 기대됩니다 ✨',
      likes: 7,
      createdAt: '2023.5.20.',
    },
  ],
};
