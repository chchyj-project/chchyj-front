import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Common from "../style/Common";

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  min-height: 64px;
  max-height: 320px;
  height: fit-content;
  overflow: scroll;
  background: rgba(217, 217, 217, 0.3);
  border-radius: 5px;
  border: none;
  color: ${Common.colors.black};
  outline: none;
  &::placeholder {
    color: ${Common.colors.placeholder};
  }
`;
interface textBoxProps {
  initValue?: string;
  placeholder?: string;
  styles?: any;
}
function TextBox({ initValue, placeholder }: textBoxProps) {
  const [value, setValue] = useState("");
  useEffect(() => {
    initValue && setValue(initValue);
  }, [initValue]);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValue(value);
  };
  return (
    <div>
      <TextArea
        onChange={handleChange}
        defaultValue={value}
        placeholder={placeholder}
      ></TextArea>
    </div>
  );
}

export default TextBox;
