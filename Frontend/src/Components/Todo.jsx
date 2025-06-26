import React, { useState } from "react";
import { useEffect } from "react";

function Todo({ refresh }) {
  const [todo, setTodo] = useState("");
  const [todoData, setTododata] = useState([]);
  const [editID, setEditID] = useState(null);
  const [saveId, setSaveId] = useState("");
  const todofunction = async () => {
    try {
      const response = await fetch(`http://localhost:3000/gettodo`, {
        method: "GET",
        credentials:"include"
      });
      const result = await response.json();

      if (response.ok) {
        setTododata(result.todoData.reverse());
      }
      console.log(result.todoData);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const AddTodo = async () => {
  try {
    const response = await fetch("http://localhost:3000/posttodo", {
      method: "POST",
      body: JSON.stringify({ todo }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include"
    });

    const result = await response.json();

    if (response.ok) {
      await todofunction();
      setTodo("");
    }
  } catch (error) {
    console.error("Failed to add todo:", error);
  }
};

  const handleEdit = (item) => {
    setTodo(item.todo);
    setEditID(item._id);
    setSaveId(item._id);
  };
  const updateTodo = async () => {
    const updateduser = { todo };
    const response = await fetch(`http://localhost:3000/todo/${saveId}`, {
      method: "PATCH",
      body: JSON.stringify(updateduser),
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include"
    });
    const result = await response.json();

    if (response.ok) {
      await todofunction()
      setSaveId("")
      setTodo("");
      setEditID(null);
    }
    if (!response.ok) {
      console.log("Can't Update");
    }
  };

  const DeleteTodo = async (id) => {
    const response = await fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE",
      credentials:"include"
    });
    const result = await response.json();

    if (response.ok) {
      await todofunction()
    }
    if (!response.ok) {
      console.log("Cant delete");
    }
  };

  useEffect(() => {
    todofunction();
  }, [refresh]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
      <div className="flex gap-2 mb-4">
  <textarea
    value={todo}
    onChange={(e) => setTodo(e.target.value)}
    rows={todo.length?5:1}
    cols={60}
    maxLength={200}
    placeholder="Enter task"
    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300"
  />
  <button
    onClick={editID ? updateTodo : AddTodo}
    className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold p-2 rounded cursor-pointer"
  >
    {editID ? "Update" : "Add"}
  </button>
</div>
      <div className="max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400">
  <ul className="space-y-2">
    {todoData?.map((element, index) => (
      <li key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded">
        <span className="text-gray-800">
          {element.todo ? element.todo.slice(0, 65) : ""}...
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => DeleteTodo(element._id)}
            className="text-red-500 hover:text-red-600 cursor-pointer"
          >
            ❌
          </button>
          <button
            onClick={() => handleEdit(element)}
            className="text-blue-500 hover:text-blue-600 cursor-pointer"
          >
            ✏️
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>

    </div>
  );
}

export default Todo;
