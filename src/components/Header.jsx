import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header({ selectedFile, selectedFolder, onToggleTheme }) {
  return (
    <header className="header">
      <div className="title">
        <h2 className="fileExplorerTxt">📁 React Explorer</h2>
      </div>
      <div className="fileDetails">
        {selectedFile ? (
          <h2>Selected File: {selectedFile}</h2>
        ) : selectedFolder ? (
          <h2>Folder: {selectedFolder}</h2>
        ) : (
          <p>Select a folder or file.</p>
        )}
      </div>
      <button onClick={onToggleTheme} className="theme-btn">
        <FontAwesomeIcon icon="fa-solid fa-moon"/>
      </button>
    </header>
  );
}
export default Header;
