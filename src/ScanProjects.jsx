import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function ScanProjects({ folderPath }){
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() =>{
        const scan = async () =>{
            try{
                const result = await invoke('scan_projects', {folderPath});
                setProjects(result);
                setError(null);
            } catch(err){
                setError(err.toString());
            }
        };
        if(folderPath) scan();
    }, [folderPath]);

    const openInVSCode = async (path) =>{
        try{
            await invoke('open_in_vscode', {path});
        } catch(err){
            setError(err.toString());
        }
    }
        
    return (
        <div>
            <h3>Projects in {folderPath}</h3>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <ul className="projects-list">
                {projects.map((project) => {
                  return (
                    <li key={project.path}>
                      {project.name} ({project.kind})
                      <button onClick={() => openInVSCode(project.path)}>Open in VSCode</button>
                    </li>
                  );
                })}
            </ul>
        </div>
        
    );
}

export default ScanProjects;