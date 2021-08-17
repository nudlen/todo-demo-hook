import React, { useRef } from "react";
import "./styles.css";

export default function TodoInput(props) {
  const inputContent = useRef(null);
  const { addItem, handleSelectAll } = props;
  const handleSubmit = () => {
    const inputValue = inputContent.current.value.trim();

    if (inputValue.length === 0) {
      alert("please enter something");
      return;
    }
    addItem(inputValue);
    inputContent.current.value = "";
  };

  return (
    <div className="todo-input">
      <input
        type="checkbox"
        className="select-all"
        onChange={handleSelectAll}
      />
      <input
        type="text"
        className="input-place"
        placeholder="请输入待办事宜"
        ref={inputContent}
      />
      <button onClick={handleSubmit}>提交</button>
    </div>
  );
}
