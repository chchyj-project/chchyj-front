import styled from 'styled-components';
import Body from '../components/layout/Body.tsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  width: 400px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  text-align: center;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #333333;
  text-align: center;
  margin-bottom: 20px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 2px solid #b0e0e6;
  border-radius: 8px;
  resize: none;
  outline: none;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 15px;
  color: #333333;
  background-color: #f8f9fa;
`;

const NoteContainer = styled.div`
  margin-bottom: 20px;
`;

const Note = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #666666;
  margin-bottom: 5px;

  & svg {
    margin-right: 5px;
    color: #ff6b6b;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #b0e0e6;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #add8e6;
  }
`;

const CreatePraise = () => {
  return (
    <Body color={'#4D4D4D'}>
      <Container>
        <Wrapper>
          <Title>칭찬받고 싶은 내용을 입력하세요 😉</Title>
          <Subtitle>칭찬요정들이 찾아올거에요~</Subtitle>
          <Textarea placeholder="이런저런 내용 입력..."></Textarea>
          <NoteContainer>
            <Note>❤️ 칭찬글 입력시 하트 1개가 차감됩니다.</Note>
            <Note>✏️ 칭찬글은 입력 후 15분 이내에만 수정할 수 있습니다.</Note>
            <Note>❤️ 칭찬글 삭제 15분 이후에는 하트는 반환되지 않습니다.</Note>
            <Note>⏰ 욕설/비방 등은 동의없이 삭제될 수 있습니다.</Note>
          </NoteContainer>
          <Button>칭찬글 쓰기</Button>
        </Wrapper>
      </Container>
    </Body>
  );
};

export default CreatePraise;
