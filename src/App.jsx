import Header from "./components/Header";
import "./App.css";
import "./theme.css";
import DirectoryTree from "./components/sidebar/DirectoryTree";
import FileList from "./components/FileGrid/FileList";
import { useEffect, useState } from "react";

function App() {
  const [selectedFolder, setSelectedFolder] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  // Light & Dark Theme
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <Header
        selectedFile={selectedFile}
        selectedFolder={selectedFolder}
        onToggleTheme={toggleTheme}
      />
      <div className="fullPanel">
        {/* Sidebar */}
        <div className="leftPanel">
          <DirectoryTree
            onSelectFolder={(path) => {
              setSelectedFolder(path);
              setSelectedFile("");
            }}
            onSelectFile={(folderPath, fileName) => {
              setSelectedFolder(folderPath);
              setSelectedFile(fileName);
            }}
          />
        </div>

        {/* Right Panel */}
        <div className="rightPanel">
          <div className="fileList">
            {selectedFolder && (
              <FileList
                folderPath={selectedFolder}
                onFileClick={(folderPath, fileName) => {
                  setSelectedFile(fileName);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
