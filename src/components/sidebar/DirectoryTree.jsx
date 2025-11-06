import "./DirectoryTree.css";
import React, { useState } from "react";
import FolderItem from "./FolderItem";
import FileItem from "./FileItem";
import fileStructure from "../../data/fileStructure.json";

const DirectoryTree = ({ onSelectFolder, onSelectFile }) => {
  const [expandedFolders, setExpandedFolders] = useState({});

  // Toggle expand/collapse
  const toggleFolder = (path) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  /**
   * Recursively render the file structure.
   * - Treat objects as folders
   * - Treat arrays as folders that directly contain files
   */
  const renderTree = (structure, path = "") => {
    return Object.keys(structure).map((key) => {
      const currentPath = path ? `${path}/${key}` : key;
      const node = structure[key];
      const isExpanded = expandedFolders[currentPath];

      // CASE 1: Folder (object or array)
      if (typeof node === "object") {
        const isArrayFolder = Array.isArray(node);

        return (
          <div key={currentPath} className="folderContainer">
            <FolderItem
              name={key}
              expanded={isExpanded}
              onClick={() => {
                toggleFolder(currentPath);
                onSelectFolder(currentPath);
              }}
            />

            {isExpanded && (
              <div className="expandedFolder">
                {/* If it's an array, render files inside it */}
                {isArrayFolder &&
                  node.map((file) => (
                    <FileItem
                      key={`${currentPath}/${file}`}
                      name={file}
                      onClick={() => onSelectFile(currentPath, file)}
                    />
                  ))}

                {/* If it's an object, recursively render its children */}
                {!isArrayFolder && renderTree(node, currentPath)}
              </div>
            )}
          </div>
        );
      }

      // CASE 2: Fallback (non-object node - rare)
      return null;
    });
  };

  return (
    <div className="directoryTree">
      <div className="treeContainer">{renderTree(fileStructure)}</div>
    </div>
  );
};

export default DirectoryTree;
