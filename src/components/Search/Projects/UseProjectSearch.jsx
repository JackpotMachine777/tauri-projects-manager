import { useState, useMemo } from "react";

export const UseProjectSearch = (projects) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProjects = useMemo(() => {
        if (!searchTerm.trim()) return projects;

        const term = searchTerm.toLowerCase();
        return projects.filter(project => 
            project.name.toLowerCase().includes(term) || 
            project.path.toLowerCase().includes(term)
        );
    }, [projects, searchTerm]);

    return { 
        searchTerm, 
        setSearchTerm, 
        filteredProjects,
        hasResults: filteredProjects.length > 0,
        isSearching: searchTerm.trim().length > 0
    };
};
