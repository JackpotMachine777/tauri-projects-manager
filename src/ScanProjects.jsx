import { invoke } from "@tauri-apps/api/core";
import { useProjects } from "./components/Hooks/useProjects";
import { UseProjectSearch } from "./components/Search/Projects/UseProjectSearch";
import SearchBar from "./components/Search/SearchBar";
import "./App.css";

function ScanProjects({ folderPath }) {
    const { projects, error, loading } = useProjects(folderPath);
    const { searchTerm, setSearchTerm, filteredProjects, hasResults, isSearching } = UseProjectSearch(projects);

    const openInVSCode = async (path) => {
        try {
            await invoke('open_in_vscode', { path });
        } catch (err) {
            console.error("Failed to open in VSCode:", err);
        }
    };

    if (loading) {
        return <p>Scanning projects...</p>;
    }

    return (
        <>
            {error && <p className="error-message">Error! - {error}</p>}
            
            {projects.length > 0 && (
                <SearchBar
                    searchBarClassName="projects-search-bar"
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    projectsCount={filteredProjects.length}
                />
            )}

            {projects.length === 0 && !error ? (
                <p className="error-message">Cannot find any projects inside this folder!</p>
            ) : isSearching && !hasResults ? (
                <p className="error-message">Cannot find any projects matching your search "{searchTerm}"!</p>
            ) : (
                <div className="projects-list-container">
                    <ul className="projects-list">
                        {filteredProjects.map((project) => (
                            <li key={project.path}>
                                <div>
                                    <strong>{project.name}</strong> ({project.kind})
                                    <br />
                                    <small className="project-list-path">{project.path}</small>
                                </div>

                                <button onClick={() => openInVSCode(project.path)}>
                                    Open in VS Code
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default ScanProjects;
