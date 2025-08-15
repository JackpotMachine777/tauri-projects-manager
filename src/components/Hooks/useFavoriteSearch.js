import { useState, useMemo } from "react";

export const useFavoriteSearch = (folders) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredFolders = useMemo(() => {
      if (!searchTerm.trim()) return folders;

      const term = searchTerm.toLowerCase();
      return folders.filter(folderPath => {
        const folderName = folderPath.split("/").pop().toLowerCase();
        return folderName.includes(term) || folderPath.toLowerCase().includes(term);
      });
    }, [folders, searchTerm]);

    return { 
      searchTerm, 
      setSearchTerm, 
      filteredFolders,
      hasResults: filteredFolders.length > 0,
      isSearching: searchTerm.trim().length > 0
    };
};
