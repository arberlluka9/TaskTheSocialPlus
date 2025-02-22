# React + Vite: Users and Posts App

A React application built with **Vite** that fetches and displays users and their posts from the following APIs:

- **Users**: `https://jsonplaceholder.typicode.com/users`
- **Posts**: `https://jsonplaceholder.typicode.com/posts?userId={id}`

## Features

- **User List Page**: Displays a list of users with details such as name, email, company, and website.
- **User Posts Page**: Displays posts for a selected user, showing the title and body of each post.
- **Search Bar**: Allows searching users and posts by title or content.
- **UI Framework**: Uses Ant Design for styling and components.
- **State Management**: Redux is used to handle the search term globally across the app.

## Installation

### 1. Clone the Repository

bash
git clone https://github.com/your-repository-name.git
cd your-repository-name

Downlaod node.js from https://nodejs.org/en/download.

npm install before running it with npm run dev in Windows or npm start on macOS