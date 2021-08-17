import React, { useState, useCallback, useEffect } from "react";
import "./styles.css";
import TodoInput from "./components/todoInput/index.js";
import TodoItem from "./components/todoItem/index.js";
export default function App() {
  const [todolist, setTodoList] = useState([]);

  // useEffect(() => {
  //   const todoData = JSON.parse(localStorage.getItem("todoData") || []);
  //   setTodoList(todoData);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("todoData", JSON.stringify(todolist));
  // }, [todolist]);

  const addItem = (value) => {
    const item = { id: Date.now(), content: value, completed: false };
    setTodoList([item, ...todolist]);
  }; //TODO 加useCallback

  const handleCheckBox = (id) => {
    todolist.map((item, index) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setTodoList([...todolist]);
  }; //TODO 加useCallback

  const handleDelete = (id) => {
    todolist.map((item, index, arr) => {
      if (item.id === id) {
        arr.splice(index, 1);
      }
      return item;
    });
    setTodoList([...todolist]);
    console.log(todolist);
  };

  const handleSelectAll = () => {
    if (
      todolist.every((item, index) => {
        return item.completed === false;
      })
    ) {
      todolist.map((item) => {
        item.completed = !item.completed;
        return item;
      });
      setTodoList([...todolist]);
    } else if (
      todolist.every((item, index) => {
        return item.completed === true;
      })
    ) {
      todolist.map((item) => {
        item.completed = !item.completed;
        return item;
      });
      setTodoList([...todolist]);
    } else {
      todolist.map((item) => {
        item.completed = true;
        return item;
      });
      setTodoList([...todolist]);
    }
  };
  return (
    <div className="App">
      <TodoInput addItem={addItem} handleSelectAll={handleSelectAll} />
      <ul className="todo-list">
        {todolist.map((item, index) => {
          return (
            <TodoItem
              data={item}
              key={index}
              handleCheckBox={handleCheckBox}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
    </div>
  );
}
