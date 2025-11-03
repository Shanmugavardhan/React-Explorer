import React from "react";
import "./FileCard.css";
import { FiFileText, FiImage, FiMusic, FiVideo, FiFile } from "react-icons/fi";

const getFileIcon = (name) => {
  const ext = name.split(".").pop().toLowerCase();
  if (["jpg", "jpeg", "png", "gif"].includes(ext))
    return <FiImage style={{color: 'var(--text-color)'}} />;
  if (["mp3", "wav", "ogg"].includes(ext))
    return <FiMusic style={{color: 'var(--text-color)'}} />;
  if (["mp4", "mkv"].includes(ext)) return <FiVideo style={{color: 'var(--text-color)'}} />;
  if (["pdf", "txt", "doc", "md", "docx"])
    return <FiFileText style={{color: 'var(--text-color)'}} />;
  return <FiFile style={{color: 'var(--text-color)'}} />;
};
const FileCard = ({ name, onClick }) => {
  return (
    <div onClick={onClick} className="card">
      <div className="icon">{getFileIcon(name)}</div>
      <p>{name}</p>
    </div>
  );
};
export default FileCard;
