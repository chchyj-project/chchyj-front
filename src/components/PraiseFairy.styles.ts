import styled from 'styled-components';

export const FairyContainer = styled.div`
  width: 5rem; /* w-20 */
  height: 5rem; /* h-20 */
  flex-shrink: 0;
`;

export const CircleWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 9999px; /* rounded-full */
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const BlueCircle = styled.div`
  width: 4rem; /* w-16 */
  height: 4rem; /* h-16 */
  border-radius: 9999px; /* rounded-full */
  background-color: #dbeafe; /* bg-blue-100 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FaceContainer = styled.div`
  width: 2rem; /* w-8 */
  height: 2rem; /* h-8 */
  position: relative;
`;

export const Face = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 9999px; /* rounded-full */
  background-color: white;
  border: 2px solid #93c5fd; /* border-2 border-blue-300 */
`;

export const Mouth = styled.div`
  position: absolute;
  bottom: 0.25rem; /* bottom-1 */
  left: 50%;
  transform: translateX(-50%);
  width: 1rem; /* w-4 */
  height: 0.5rem; /* h-2 */
  background-color: #f87171; /* bg-red-400 */
  border-radius: 9999px; /* rounded-full */
`;

export const LeftEye = styled.div`
  position: absolute;
  top: 50%;
  left: 25%;
  width: 0.25rem; /* w-1 */
  height: 0.25rem; /* h-1 */
  background-color: black;
  border-radius: 9999px; /* rounded-full */
`;

export const RightEye = styled.div`
  position: absolute;
  top: 50%;
  right: 25%;
  width: 0.25rem; /* w-1 */
  height: 0.25rem; /* h-1 */
  background-color: black;
  border-radius: 9999px; /* rounded-full */
`;

export const Hat = styled.div`
  position: absolute;
  top: -0.5rem; /* -top-2 */
  left: 50%;
  transform: translateX(-50%);
  width: 1.5rem; /* w-6 */
  height: 1.5rem; /* h-6 */
  background-color: #60c3fb; /* bg-blue-400 */
  border-radius: 9999px; /* rounded-full */
`;
