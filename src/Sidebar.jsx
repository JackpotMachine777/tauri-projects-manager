import { useFavoriteSearch } from "./components/Hooks/useFavoriteSearch";
import SearchBar from "./components/Search/SearchBar";

function Sidebar({ folders, onSelect }) {
    const { searchTerm, setSearchTerm, filteredFolders, hasResults, isSearching } = useFavoriteSearch(folders);

    return (
      <div className="sidebar">
        <h3>Favorite Folders</h3>
        
        {folders.length > 0 && (
          <SearchBar 
            searchBarClassName="favorites-search-bar"
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            projectsCount={filteredFolders.length}
            placeholder="Search favorite folders..."
            itemType="folder(s)"
          />
        )}

        {folders.length === 0 ? (
          <p className="no-favorites">No favorite folders yet!</p>
        ) : isSearching && !hasResults ? (
          <p className="no-results">No folders matching "{searchTerm}"</p>
        ) : (
          <ul>
              {filteredFolders.map((path) => (
                <li key={path} onClick={() => onSelect(path)}>
                  <strong>{path.split("/").pop()}</strong>
                  <br />
                  <small className="favorites-list-path">{path}</small>
                </li>
              ))}
          </ul>
        )}
      </div>
    );
}

export default Sidebar;
