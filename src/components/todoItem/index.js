import React from "react";

export default function TodoItem(props) {
  const { data, handleCheckBox, handleDelete } = props;
  return (
    <div>
      <input
        type="checkbox"
        checked={data.completed}
        onChange={() => handleCheckBox(data.id)}
      />
      <span
        style={{ textDecoration: data.completed ? "line-through" : "none" }}
      >
        {data.content}
      </span>
      <button onClick={() => handleDelete(data.id)}>删除</button>
    </div>
  );
}
