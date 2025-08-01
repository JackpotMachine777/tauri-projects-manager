function Sidebar({ folders, onSelect }) {
  return (
    <div className="sidebar">
      <h3>Favorite Folders</h3>
      <ul>
        {folders.map((path) => (
          <li key={path} onClick={() => onSelect(path)}> {path.split("/").pop()}</li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;