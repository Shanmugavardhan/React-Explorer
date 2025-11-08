import "./FileList.css";
import FileCard from "./FileCard";
import fileStructure from "../../data/fileStructure.json";
import { useState, useEffect, useRef } from "react";

const getFilesFromPath = (structure, path) => {
  if (!path) return { folders: [], files: [] };

  const parts = path.split("/").filter(Boolean);
  let current = structure;

  for (const part of parts) {
    if (!current || !current[part]) return { folders: [], files: [] };
    current = current[part];
  }

  // ✅ CASE 1: Folder directly contains files (array)
  if (Array.isArray(current)) {
    return { folders: [], files: current };
  }

  // ✅ CASE 2: Folder contains nested folders (object)
  if (typeof current === "object") {
    const folders = Object.keys(current);
    return { folders, files: [] };
  }

  return { folders: [], files: [] };
};

const FileList = ({ folderPath, onFileClick }) => {
  const [visibleFiles, setVisibleFiles] = useState([]); // holds only the files that are 'currently rendered' on the screen.
  const [allFiles, setAllFiles] = useState([]); //holds the complete list of files for the currently selected 'folderPath'.
  const observerRef = useRef(null);
  const BATCH_SIZE = 40;
  useEffect(() => {
    if (!folderPath) return;
    const { folders, files } = getFilesFromPath(fileStructure, folderPath);
    const combinedItems = [
      ...folders.map((name) => ({ name, type: "folder" })),
      ...files.map((name) => ({ name, type: "file" })),
    ];
    setAllFiles(combinedItems);
    setVisibleFiles(combinedItems.slice(0, BATCH_SIZE));
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
          {visibleFiles.map((item) => (
            <FileCard
              key={item.name}
              name={item.name}
              type={item.type}
              onClick={() => {
                if (item.type === "folder") {
                  onFileClick(`${folderPath}/${item.name}`, ""); // navigate deeper
                } else {
                  onFileClick(folderPath, item.name);
                }
              }}
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
