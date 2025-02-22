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
# Getting Started

## Setup and Run the Project
Copy and paste the following commands into your terminal to set up and run the project:

# Clone the Repository
bash
git clone https://github.com/arberlluka9/TaskTheSocialPlus
cd TaskTheSocialPlus

# Install Node.js (Skip this if already installed)
 Download and install from: https://nodejs.org/en/download/
node -v  # Check if Node.js is installed
npm -v   # Check if npm is installed

# Install Dependencies
```bash
npm install
```

# Start the Development Server
```bash
npm run dev
```

# To Build for Production
```bash
npm run build
```

# To Preview the Production Build
```bash
npm run preview
```