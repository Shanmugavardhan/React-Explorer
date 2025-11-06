import React from "react";
import "./FileCard.css";
import {
  FiFileText,
  FiImage,
  FiMusic,
  FiVideo,
  FiFolder,
} from "react-icons/fi";

/**
 * Returns the correct icon based on file type or extension
 */
const getFileIcon = (name, type) => {
  const baseStyle = {
    color: "var(--text-color)",
    transition: "all 0.3s ease",
  };

  if (type === "folder") {
    return <FiFolder style={{ ...baseStyle, color: "var(--text-color)" }} />;
  }

  const ext = name.split(".").pop().toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext))
    return <FiImage style={{ ...baseStyle, color: "var(--text-color)" }} />;
  if (["mp3", "wav", "ogg"].includes(ext))
    return <FiMusic style={{ ...baseStyle, color: "var(--text-color)" }} />;
  if (["mp4", "mkv", "mov"].includes(ext))
    return <FiVideo style={{ ...baseStyle, color: "var(--text-color)" }} />;

  // Default file icon
  return <FiFileText style={{ ...baseStyle, color: "var(--text-color)" }} />;
};

/**
 * FileCard Component
 * - Displays a folder or file icon
 * - Handles click for both file/folder
 */
const FileCard = ({ name, type, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`card ${type}`}
      title={type === "folder" ? `Open ${name}` : name}
    >
      <div className="icon">{getFileIcon(name, type)}</div>
      <p className="name">{name}</p>
    </div>
  );
};

export default FileCard;
