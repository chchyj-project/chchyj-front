import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
`;

const Panel = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 93vh; // 화면 높이의 80%
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto; // 내용이 넘칠 경우 스크롤 가능하도록 설정
`;

const PanelContent = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  flex-grow: 1;
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

export default function WriteSlidingPanel({
  isWriteMode,
  handleWriteClick,
}: any) {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/*<Button onClick={() => setIsOpen(true)}>청찬요정</Button>*/}
      <AnimatePresence>
        {isWriteMode && (
          <Panel
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <PanelContent>
              <h2>청찬요정</h2>
              <p>청찬받고 싶은 내용을 입력하세요 😉</p>
              <StyledTextarea placeholder="이러쿵저러쿵 이렇게 저렇게 글을 써봅니다. 어떻게 쓸까요?" />
              <Button onClick={() => handleWriteClick(false)}>닫기</Button>
            </PanelContent>
          </Panel>
        )}
      </AnimatePresence>
    </div>
  );
}
