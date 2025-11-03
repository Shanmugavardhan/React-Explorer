import "./FileItem.css";
import React from "react";
import { FiFileText } from "react-icons/fi";
const FileItem = ({ name, onClick }) => {
  return (
    <div onClick={onClick} className="fileItem">
      <FiFileText className="fileIcon" />
      <span className="fileName">{name}</span>
    </div>
  );
};
export default FileItem;
