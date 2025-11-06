import "./FileList.css";
import FileCard from "./FileCard";
import fileStructure from "../../data/fileStructure.json";
import { useState, useEffect, useRef } from "react";

const getFilesFromPath = (structure, path) => {
  if (!path) return [];

  // Split path by "/" while preserving keys with spaces or colons
  const parts = path.split("/").filter(Boolean);
  let current = structure;

  // Traverse the structure according to path
  for (const part of parts) {
    if (!current || !current[part]) return [];
    current = current[part];
  }

  // ✅ CASE 1: If the final node is an array — directly return files
  if (Array.isArray(current)) {
    return current;
  }

  // ✅ CASE 2: If it's an object — collect all direct files inside any arrays
  if (typeof current === "object") {
    const files = [];
    for (const key in current) {
      if (Array.isArray(current[key])) {
        files.push(...current[key]);
      }
    }
    return files;
  }

  // Fallback (shouldn't happen)
  return [];
};


const FileList = ({ folderPath, onFileClick }) => {
  const [visibleFiles, setVisibleFiles] = useState([]); // holds only the files that are 'currently rendered' on the screen.
  const [allFiles, setAllFiles] = useState([]); //holds the complete list of files for the currently selected 'folderPath'.
  const observerRef = useRef(null);
  const BATCH_SIZE = 40;
  useEffect(() => {
    if (!folderPath) return;
    const files = getFilesFromPath(fileStructure, folderPath);
    setAllFiles(files);
    setVisibleFiles(files.slice(0, BATCH_SIZE)); //takes only a slice of the array (say 20) and sets in visibleFiles.
  }, [folderPath]);
  
    //here im using the lazy loading effect
  
  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleFiles((prev) => {
          const nextCount = prev.length + BATCH_SIZE;
          return allFiles.slice(0, nextCount);
        });
      }
    });
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [allFiles]);
  return (
    <div className="list">
      {visibleFiles.length > 0 ? (
        <div className="visibleFiles">
          {visibleFiles.map((file) => (
            <FileCard
              key={file}
              name={file}
              onClick={() => onFileClick(folderPath, file)}
            />
          ))}
        </div>
      ) : (
        <p> This folder must be empty.</p>
      )}
      {/* Sentinel element for lazy loading*/}
      <div ref={observerRef} className="lazy"></div>
    </div>
  );
};
export default FileList;
