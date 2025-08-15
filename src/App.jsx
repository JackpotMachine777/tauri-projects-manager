import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import FolderPicker from "./FolderPicker";
import ScanProjects from "./ScanProjects";
import Sidebar from "./Sidebar";

function App(){
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [favFolders, setFavFolders] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() =>{
        invoke("load_fav")
            .then((folders) => {
                setFavFolders(folders);
                setLoaded(true);
            })
            .catch((err) => console.error(`Failed to load favorites: ${err}`));
    }, []);

    useEffect(()=>{
        if(loaded){
            invoke("save_fav", {folders: favFolders})
            .catch((err) =>{
                console.error(`Failed to save favorites: ${err}`);
            });
        }
        
    }, [favFolders])

    const addToFav = (folderPath) =>{
        if(!favFolders.includes(folderPath)) 
            setFavFolders([...favFolders, folderPath]);
    }

    return (
        <div className="App">
          <Sidebar folders={favFolders} onSelect={setSelectedFolder} />

          <div className="projects-container">
            <h1>Programming Projects Manager</h1>

            <FolderPicker 
                onFolderSelect={setSelectedFolder} 
                onAddToFav={addToFav} 
                favoriteFolders={favFolders}
                selectedFolder={selectedFolder}
            />
            
            {selectedFolder && <ScanProjects folderPath={selectedFolder} />}
          </div>
        </div>
    );
}

export default App;