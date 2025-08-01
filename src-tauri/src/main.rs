// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs, path::PathBuf};
use serde::Serialize;
use std::process::Command;
use dirs;

#[tauri::command]
fn read_projects_dir(path: String) -> Result<Vec<String>, String>{
    let dir_path = PathBuf::from(path);

    if !dir_path.exists() || !dir_path.is_dir(){
        return Err("Directory does not exist or its not a folder".into());
    }

    let mut projects = Vec::new();

    let entries = fs::read_dir(dir_path).map_err(|e| e.to_string())?;
    for entry in entries{
        let entry = entry.map_err(|e| e.to_string())?;
        let file_type = entry.file_type().map_err(|e| e.to_string())?;
        if file_type.is_dir(){
            if let Some(name) = entry.file_name().to_str(){
                projects.push(name.to_string());
            }
        }
    }

    Ok(projects)
}

#[tauri::command]
fn save_fav(folders: Vec<String>) -> Result<(), String>{
    let path = get_favorites_path();

    println!("[save_fav] Saving favorites to: {:?}", path);
    println!("[save_fav] Folders: {:?}", folders);

    let json = serde_json::to_string_pretty(&folders)
    .map_err(|e|{
        println!("[save_fav] JSON serialize error: {}", e);
        e.to_string()
    })?;
    fs::write(path, json).map_err(|e|{ 
        println!("[save_fav] Write error: {}", e);
        e.to_string()
    })?;

    println!("[save_fav] Successfully saved favorites.");
    Ok(())
}

#[tauri::command]
fn load_fav() -> Result<Vec<String>, String>{
    let path = get_favorites_path();
    println!("Loading favorites from: {:?}", path);
    if path.exists(){
        let data = fs::read_to_string(path).map_err(|e| e.to_string())?;
        println!("Favorites file content: {}", data);
        let folders: Vec<String> = serde_json::from_str(&data).map_err(|e| e.to_string())?;
        Ok(folders)
    } else{
        println!("Favorites file does not exist.");
        Ok(vec![])
    }
}

#[tauri::command]
fn get_favorites_path() -> PathBuf {
    dirs::home_dir()
        .expect("Could not get home directory")
        .join("favorites.json")
}

#[derive(Serialize)]
struct ProjectInfo{
    name: String,
    path: String,
    kind: String,
}

#[tauri::command]
fn scan_projects(folder_path: String) -> Vec<ProjectInfo>{
    let mut projects =Vec::new();

    if let Ok(entries) = fs::read_dir(&folder_path){
        for entry in entries.flatten(){
            let path = entry.path();
            if path.is_dir(){
                let project_name = path.file_name().unwrap_or_default().to_string_lossy().to_string();
                let project_path = path.to_string_lossy().to_string();

                let kind = if path.join("package.json").exists(){
                    "📦 Node"
                } else if path.join("Cargo.toml").exists(){
                    "🦀 Rust"
                } else if path.join(".html").exists() || path.join("src/index.html").exists() {
                    "🌐 HTML"
                } else if path.join(".bashrc").exists(){
                    "⚙️ Dotfiles"
                } else if path.join("main.cpp").exists(){
                    "🧠 C++"
                } else if path.join("main.py").exists(){
                    "🐍 Python"
                }
                else{
                    "❓ unknown"
                }.to_string();

                projects.push(ProjectInfo{
                    name: project_name,
                    path: project_path,
                    kind
                });
            }
        }
    }
    projects
}

#[tauri::command]
fn open_in_vscode(path: String) -> Result<(), String>{
    Command::new("code")
        .arg(&path)
        .spawn()
        .map_err(|e| e.to_string())?;

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            read_projects_dir, 
            scan_projects, 
            open_in_vscode, 
            save_fav, load_fav, 
            get_favorites_path
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

