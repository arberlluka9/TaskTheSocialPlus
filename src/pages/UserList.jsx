import React, { useEffect, useState } from "react";
import { Card, Input, Row, Col, Spin, Typography, Button, Flex } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserSearchTerm } from "../features/searchSlice"; 
import { toggleTheme } from "../features/themeSlice"; 

const { Title } = Typography;

const UserList = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const dispatch = useDispatch();
  const userSearchTerm = useSelector((state) => state.search.userSearchTerm);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    setLoading(true); 
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error))
      .finally(() => setLoading(false));
  }, []);
    const filteredUsers = users.filter((user) => {
    const searchLower = userSearchTerm.toLowerCase();
    const isPhoneSearch = /^\d+$/.test(userSearchTerm.replace(/\D/g, ""));

    const cleanedSearchTerm = isPhoneSearch
      ? userSearchTerm.replace(/\D/g, "")
      : userSearchTerm.toLowerCase(); 
    
    const cleanedPhone = user.phone.replace(/\D/g, ""); 
  
    return (
      user.name.toLowerCase().includes(searchLower) || 
      user.email.toLowerCase().includes(searchLower) || 
      user.company.name.toLowerCase().includes(searchLower) || 
      user.website.toLowerCase().includes(searchLower) || 
      user.company.catchPhrase.toLowerCase().includes(searchLower) || 
      (isPhoneSearch ? cleanedPhone.includes(cleanedSearchTerm) : false) 
    );
  });
  
  const themeStyles = {
    light: {
      backgroundColor: "#ffffff",
      color: "#000000",
    },
    dark: {
      backgroundColor: "#1f1f1f",
      color: "#ffffff",
    },
  };

  return (
    <div
      style={{
        padding: "24px",
        minHeight: "100vh",
        ...themeStyles[theme], 
      }}
    >

    <Flex
        justify="center"
        align="center"
        style={{
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
    >
        <Button
         type="primary"
         onClick={() => dispatch(toggleTheme())}
         style={{
         marginBottom: "24px",
         position: "absolute",
         right: "24px",
        }}
    >
Toggle {theme === "light" ? "Dark" : "Light"} Mode
</Button>

    <Title
      level={2}
      style={{ textAlign: "center", marginBottom: "24px", color: themeStyles[theme].color }}
    >
      User List
    </Title>
    
      </Flex>
      <Input
        placeholder="Search..."
        value={userSearchTerm} 
        onChange={(e) => dispatch(setUserSearchTerm(e.target.value))} 
        style={{ marginBottom: "24px" }}
      />

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {filteredUsers.map((user) => (
            <Col key={user.id} xs={24} sm={12} md={8} lg={8}>
            <Card
            hoverable
            style={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: themeStyles[theme].backgroundColor,
                color: themeStyles[theme].color,
            }}
            
             title={<Link to={`/user/${user.id}/posts`}>{user.name}</Link>}
            
            >
            <Link to={`/user/${user.id}/posts`} style={{ textDecoration: "none", color: "inherit" }}> 
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Company: {user.company.name}</p>
                <p>Catchphrase: {user.company.catchPhrase}</p>
                <p>BS: {user.company.bs}</p>
                <p>Address: {user.address.street} {user.address.suite}, {user.address.city}</p>
            </Link>
            <p>
             Website: <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a>
            </p>
            </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default UserList;
