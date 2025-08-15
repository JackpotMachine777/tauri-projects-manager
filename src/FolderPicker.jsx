import { useState, useEffect } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import "./App.css";

export default function FolderPicker({selectedFolder, onFolderSelect, onAddToFav, favoriteFolders = []}){
    const [folderPath, setFolderPath] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setFolderPath(selectedFolder);
    }, [selectedFolder])

    async function pickFolder(){
        setError(null);
        const selected = await open({directory: true});
        if(!selected) return;

        setFolderPath(null);
        setFolderPath(selected);
        onFolderSelect(selected);
    }

    return (
        <div className="folder-picker">
          <button onClick={pickFolder}>Select folder with your projects</button>

          {folderPath && !favoriteFolders.includes(folderPath) &&(
            <div className="selected">
                <p>Chosen folder: {folderPath}</p>

                <button onClick={() =>{
                    onAddToFav(folderPath); 
                    onFolderSelect(folderPath);
                }}>
                    Add to favorites
                </button>
            </div>
          )}

          {error && <p className="error-message">Error! - {error}</p>}
        </div>
    );
}