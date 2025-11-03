import "./Header.css";
function Header({ selectedFile, selectedFolder, onToggleTheme }) {
  return (
    <header className="header">
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
        <i className="fas fa-moon"></i>
        <span>Theme</span>
      </button>
    </header>
  );
}
export default Header;
