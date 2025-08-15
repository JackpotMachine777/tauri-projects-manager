function SearchBar({ searchBarClassName = "projects-search-bar", searchTerm, onSearchChange, projectsCount, placeholder, itemType = "project(s)" }) {
    return (
      <div
        id="search-container"
        className={searchBarClassName}
      >
        <input
          type="text"
          placeholder={placeholder || "Search projects by name or path..."}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {projectsCount > 0 && (
          <small>
            Found {projectsCount} {itemType}!
          </small>
        )}
      </div>
    );
}

export default SearchBar;
