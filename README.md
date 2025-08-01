# 🚀 Tauri Programming Projects Manager

A desktop app built with 🦀 Tauri and ⚛️ React for managing your programming projects folders.  
Quickly scan project directories, recognize project types, and organize your favorite project folders in one place.

---

## ✨ Features

- 📁 Select any folder containing your projects  
- 🧠 Automatically detect project types (📦 Node.js, 🦀 Rust, 🐍 Python, 🧠 C++, 🌐 HTML, ⚙️ Dotfiles, and more)  
- ⭐ Save and manage favorite project folders for quick access  
- 🔍 Scan projects inside selected folders and 📝 open them directly in VSCode  
- 🧼 Clean and minimal UI with 🔄 reactive folder scanning  

---

## 🛠 Technologies

- 🦀 [Tauri](https://tauri.app) — lightweight desktop app framework  
- ⚛️ [React](https://react.dev/) — frontend library for building UI  
- 🦀 [Rust](https://rust-lang.org/) — backend logic, scanning project folders and managing favorites  
- 🧩 [@tauri-apps/api](https://v2.tauri.app/reference/javascript/api/) — Tauri JS API for filesystem and dialog interaction  

---

## 🧱 Build & Run

```bash
# install dependencies
npm install

# dev mode
npm run tauri dev

# build release
NO_STRIP=true npm run tauri build --release
```

## 🧪 Tested on
This application has been tested on:
- 🐧 Arch Linux (Hyprland environment)