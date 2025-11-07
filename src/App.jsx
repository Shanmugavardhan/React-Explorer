import Header from "./components/Header";
import "./App.css";
import "./theme.css";
import DirectoryTree from "./components/sidebar/DirectoryTree";
import FileList from "./components/FileGrid/FileList";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

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

  // Resizable split pane
  useEffect(() => {
    const divider = document.getElementById("divider");
    if (!divider) return;

    const leftPanel = divider.previousElementSibling;
    const rightPanel = divider.nextElementSibling;

    const onMouseMove = (e) => {
      e.preventDefault(); // Prevent text selection
      const container = divider.parentElement;
      const containerRect = container.getBoundingClientRect();
      let newLeftWidth = e.clientX - containerRect.left;

      // Constraints
      const minWidth = 150; // Minimum width for panels in pixels
      if (newLeftWidth < minWidth) newLeftWidth = minWidth;
      if (newLeftWidth > containerRect.width - minWidth) {
        newLeftWidth = containerRect.width - minWidth;
      }

      leftPanel.style.width = `${newLeftWidth}px`;
      rightPanel.style.flex = "1"; // Let right panel fill remaining space
    };

    const onMouseUp = () => {
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseDown = (e) => {
      e.preventDefault(); // Prevent text selection
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    divider.addEventListener("mousedown", onMouseDown);

    return () => {
      divider.removeEventListener("mousedown", onMouseDown);
      // In case mouse is released outside the window
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <>
      <Header
        selectedFile={selectedFile}
        selectedFolder={selectedFolder}
        onToggleTheme={toggleTheme}
        theme = {theme}
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

        <div className="divider" id="divider"></div>

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
          <div className="menuBar">
            <p>hello world</p>
            <div className="sizeButtons">
              <div className="iconBox">
                <FontAwesomeIcon
                  icon="fa-solid fa-tv"
                  className="sizeIcon small"
                />
              </div>
              <div className="iconBox">
                <FontAwesomeIcon
                  icon="fa-solid fa-tv"
                  className="sizeIcon medium"
                />
              </div>
              <div className="iconBox">
                <FontAwesomeIcon
                  icon="fa-solid fa-tv"
                  className="sizeIcon large"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
