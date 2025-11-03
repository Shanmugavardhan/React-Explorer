import "./DirectoryTree.css";
import React, { useState } from "react";
import FolderItem from "./FolderItem";
import FileItem from "./FileItem";
import fileStructure from "../../data/fileStructure.json";

const DirectoryTree = ({ onSelectFolder }) => {
  const [expandedFolders, setExpandedFolders] = useState({});

  // Toggle expand/collapse state
  const toggleFolder = (path) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  // Recursive function to render folders
  const renderTree = (structure, path = "") => {
    return Object.keys(structure).map((key) => {
      const currentPath = path ? `${path}/${key}` : key;
      const isExpanded = expandedFolders[currentPath];
      const node = structure[key];
      const isFolder =
        typeof node === "object" && !Array.isArray(structure[key]);

      return (
        <div key={currentPath} className="folderContainer">
          {isFolder ? (
            <>
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
                  {renderTree(node, currentPath)}
                  {Array.isArray(node)
                    ? node.map((file) => (
                        <FileItem
                          key={file}
                          name={file}
                          onClick={() => onSelectFile(currentPath, file)}
                        />
                      ))
                    : null}
                </div>
              )}
            </>
          ) : (
            Array.isArray(node) &&
            node.map((file) => (
              <FileItem
                key={`${currentPath}/${file}`}
                name={file}
                onClick={() => onSelectFile(currentPath, file)}
              />
            ))
          )}
        </div>
      );
    });
  };

  return (    
    <div className="directoryTree">
      <div className="treeContainer">{renderTree(fileStructure)}</div>
    </div>
  );
};

export default DirectoryTree;
