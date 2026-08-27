# 🌐 Social Media Platform (Facebook Clone) - Work In Progress

> A highly scalable, logic-heavy social media web application.

## 🚀 Overview
This project is an in-depth exploration of modern frontend architecture, state management, and edge-case handling. Rather than a simple UI recreation, this application focuses on solving real-world software engineering challenges such as race conditions, dynamic routing, optimistic UI updates, and efficient database normalization.

## 🛠️ Tech Stack
* **Framework:** Next.js
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Backend/Database:** Firebase (Auth, Firestore)
* **Media Storage:** Cloudinary
* **State Management:** React Context API & Custom Hooks

## ✨ Key Features & Technical Highlights (So Far)
* **Advanced Loading Pipelines:** Engineered anti-flicker skeleton loaders mapped meticulously against database fetching states to ensure a seamless UX, accounting for rapid network responses.
* **Intelligent Data Binding (Frontend Joins):** Relational data mapping between User Profiles and Posts. Post avatars and usernames sync dynamically across the entire application upon profile updates, preventing the need for expensive batch writes.
* **Custom Abstractions:** Extensive use of modular Custom Hooks (e.g., `usePostByUser`, `useUserProfile`) to strictly isolate the UI layer from underlying business and fetching logic.
* **Robust Media Uploads:** Cloudinary integration for handling, optimizing, and previewing image uploads seamlessly.
* **Secure Authentication & Routing:** Persistent user sessions, layout synchronizations, and protected route states.

## 🚧 Current Development Status
*This project is currently in active development.*

**Completed:**
- [x] Complex UI Architecture & Multi-tab Routing
- [x] Authentication & Session Management
- [x] Profile Data Handling & Cloudinary Integration
- [x] Post Creation & Feed Rendering
- [x] Layout Stabilization & Flicker-free Skeleton Loaders

**Up Next (TODO):**
- [ ] Nested Interactions
- [ ] Bookmark Logic (Optimistic UI implementation)
- [ ] Real-time Notifications
- [ ] List Virtualization for infinite scrolling performance

## 💡 Developer Note
Built with a strong emphasis on practical problem solving and robust system design. Every feature prioritizes clean architecture and resilience over quick implementations.