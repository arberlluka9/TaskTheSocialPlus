import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { Provider } from "react-redux";
import { store } from "./app/store";
import UserList from "./pages/UserList";
import UserPosts from "./pages/UserPosts";
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> 
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} /> 
          <Route path="/user/:userId/posts" element={<UserPosts />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);