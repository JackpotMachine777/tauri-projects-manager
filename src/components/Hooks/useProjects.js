import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

export const useProjects = (folderPath) => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const scan = async () => {
            if (!folderPath) {
                setProjects([]);
                return;
            }

            setLoading(true);
            try {
                const result = await invoke('scan_projects', { folderPath });
                setProjects(result);
                setError(null);
            } catch (err) {
                setError(err.toString());
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };

        scan();
    }, [folderPath]);

    return { projects, error, loading };
};
