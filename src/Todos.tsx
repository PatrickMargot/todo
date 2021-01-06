import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

function Todos() {
  const [todos, setTodos] = useState<string[]>(() => {
    const localValue = localStorage.getItem("TODOS");

    return localValue !== null ? JSON.parse(localValue) : [];
  });

  const [todoName, setTodoName] = useState("");

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: string) => setTodos([todo, ...todos]);

  const removeTodo = (index: number) =>
    setTodos(todos.filter((_, i) => i !== index));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTodoName(event.target.value);

  return (
    <List>
      <ListItem>
        <TextField
          label="What's to do..."
          value={todoName}
          onChange={handleChange}
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              addTodo(todoName);
              setTodoName("");
            }}
            edge="end"
            disabled={todoName === ""}
          >
            <AddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {todos.map((todo, index) => (
        <>
          <Divider />
          <ListItem key={todo}>
            <ListItemText primary={todo} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => removeTodo(index)} edge="end">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </>
      ))}
    </List>
  );
}

export default Todos;
