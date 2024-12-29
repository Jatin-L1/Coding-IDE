import React from "react";
import MonacoEditor from "react-monaco-editor";
import "./IDE.css";

const IDE = ({ code = "", setCode = () => {}, onRun = () => {} }) => {
  const handleEditorChange = (newValue) => {
    setCode(newValue);
  };

  return (
    <div className="ide-container">
      <MonacoEditor
        width="100%"
        height="400"
        language="python"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
      />
      <div className="button-container">
        <button className="run-code-button" onClick={onRun}>
          Run Code
        </button>
      </div>
    </div>
  );
};

export default IDE;
