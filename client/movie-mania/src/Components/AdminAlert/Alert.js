import React from "react";

function Alert({message, show}) {
  return (
    <div className="alert absolute alert-light" role="alert" style={{display: show ? "block": "none" }}>
    {message}
  </div>
  );
}

export default Alert;