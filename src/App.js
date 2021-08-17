import React, { useState, useCallback, useEffect } from "react";
import "./styles.css";
import TodoInput from "./components/todoInput/index.js";
import TodoItem from "./components/todoItem/index.js";
export default function App() {
  const [todolist, setTodoList] = useState([]);
  const [isChecked, setChecked] = useState(false);

  //获取缓存
  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem("todoData") || []);
    setTodoList(todoData);
  }, []);

  //设置缓存
  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todolist));
  }, [todolist]);

  //添加元素
  const addItem = (value) => {
    const item = { id: Date.now(), content: value, completed: false };
    setTodoList([item, ...todolist]);
  }; //TODO 加useCallback

  //勾选元素
  const handleCheckBox = (id) => {
    todolist.map((item, index) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setTodoList([...todolist]);
    //关联全选checkbox
    if (
      todolist.every((item, index) => {
        return item.completed === true;
      }) &&
      todolist.length !== 0
    ) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }; //TODO 加useCallback

  //删除元素
  const handleDelete = (id) => {
    todolist.map((item, index, arr) => {
      if (item.id === id) {
        arr.splice(index, 1);
      }
      return item;
    });
    setTodoList([...todolist]);
    //关联全选checkbox
    if (
      todolist.every((item, index) => {
        return item.completed === true;
      }) &&
      todolist.length !== 0
    ) {
      setChecked(true);
      console.log("全对");
    } else {
      setChecked(false);
    }
  };

  //全选元素
  const handleSelectAll = () => {
    if (
      //全部未选
      todolist.every((item, index) => {
        return item.completed === false;
      })
    ) {
      todolist.map((item) => {
        item.completed = !item.completed;
        return item;
      });
      setTodoList([...todolist]);
      setChecked(true);
    } else if (
      //全部已选
      todolist.every((item, index) => {
        return item.completed === true;
      })
    ) {
      todolist.map((item) => {
        item.completed = !item.completed;
        return item;
      });
      setTodoList([...todolist]);
      setChecked(false);
    } else {
      //部分已选
      todolist.map((item) => {
        item.completed = true;
        return item;
      });
      setTodoList([...todolist]);
      setChecked(!isChecked);
    }
  };
  //JSX
  return (
    <div className="App">
      <TodoInput
        addItem={addItem}
        handleSelectAll={handleSelectAll}
        isChecked={isChecked}
      />
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
