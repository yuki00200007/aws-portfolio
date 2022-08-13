import { TextField } from "@mui/material";
import React from "react";
import "./Message.css";

export function Message() {
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");

  const onReset = () => {
    setName("");
    setMessage("");
  };
  const onSubmit = () => {
    alert(`${name} has submitted ${message}`);
  };
  return (
    <div className="container">
      <div style={{ height: "100px" }}></div>
      Leave a message
      <div className="content">
        <TextField
          margin="normal"
          fullWidth
          size="small"
          label="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          rows={10}
          multiline
          size="small"
          label="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="btn-bar">
        <div className="start-btn" onClick={onSubmit}>
          Submit
        </div>
        <div className="start-btn" onClick={onReset}>
          Reset
        </div>
      </div>
    </div>
  );
}
