import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from "react-icons/fa";


const TodoList = () => {
  const [textInput, setTextInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const apiTodo = 'https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Eunicegallardo';
  //GET usando UseEffect para que se renderize una sola vez y fetch para conectar el API al TodoList
  useEffect(() => {
    fetch(apiTodo).then(response => response.json()).then((data) => { console.log(data), setTodoList(data) }).catch(err => err)
  }, []);

  //PUT utilizando fetch
  function updateTodos() {
    let newTodo = { label: textInput, done: false };
    let updateTodoList = [...todoList, newTodo]; //Hacer una variable con un array para poder utilizar newTodo en la propiedad body en la linea 20
    let options = {
      method: "PUT",
      body: JSON.stringify(updateTodoList),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(apiTodo, options).then(response => response.json()).then(data => console.log(data)).catch(err => err);

    setTodoList(updateTodoList);
    setTextInput("");

  };

  // funcion que se utiliza en Onchange
  function handleChange(e) {
    setTextInput(e.target.value);
  };

  //funcion que se utiliza en OnKeyDown
  function handleTask(e) {
    if (e.key === "Enter") {
      if (textInput.trim() !== '') {
        updateTodos()
      };
    };

  };
  //Hacer un PUT utilizando fetch para borrar.
  //Borrar todas las tareas individualmente.
  function deleteTodo(position) {
  	fetch(apiTodo, {
			method: 'PUT',
			body: JSON.stringify(todoList.filter((_, i) => i !== position)),
			headers: {
				'Content-Type': 'application/json'
			}
		}).catch(err => err);
		setTodoList(todoList.filter((_, i) => i !== position));
  };
  //Borrar todas las tareas sin borrar el usuario.
  function deleteAllTodo() {
    fetch(apiTodo, {
      method: 'PUT',
      body: JSON.stringify([]),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(result => result.json()).then(data => console.log(data)).catch(err => err);
    setTodoList([])
  };

  return (
    <div className='container d-flex justify-content-center'>
      <ul>
        <li><input type="text" placeholder="What's my task today?" value={textInput} onChange={handleChange} onKeyDown={handleTask} /></li>
        {
          todoList.map((task, index) => {
            return <li>{task.label} <FaTrashAlt key={index} onClick={() => { deleteTodo(index) }}></FaTrashAlt></li>
          })
        }
        <div><p>{todoList.length} task</p></div>
        <div className='text-center'><button className='btn btn-dark' onClick={() => { deleteAllTodo() }}>Delete All</button></div>
      </ul>
    </div>
  )
}

export default TodoList