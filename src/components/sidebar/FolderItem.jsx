import "./FolderItem.css";
import React from "react";
import { FiFolder, FiFolderMinus, FiFolderPlus } from "react-icons/fi";

const FolderItem = ({ name, expanded, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="folderItem"
    >
      {expanded ? <FiFolderMinus /> : <FiFolderPlus />}
      <FiFolder className="folderIcon" />
      <span className="folderName">{name}</span>
    </div>
  );
};

export default FolderItem;

