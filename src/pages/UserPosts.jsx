import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Input, Row, Col, Spin, Typography, Button, Flex } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPostSearchTerm } from "../features/searchSlice";
import { toggleTheme } from "../features/themeSlice"; 

const { Title, Paragraph } = Typography;

const UserPosts = () => {
  const { userId } = useParams();
  const navigate = useNavigate(); 
  const [userName, setUserName] = useState(""); 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); 
  const dispatch = useDispatch();
  const postSearchTerm = useSelector((state) => state.search.postSearchTerm);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    setLoading(true); 

    Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`),
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    ])
      .then(([userResponse, postsResponse]) => {
        setUserName(userResponse.data.name); 
        setPosts(postsResponse.data);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, [userId]);

  const filteredPosts = posts.filter((post) => {
    const searchLower = postSearchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.body.toLowerCase().includes(searchLower)
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
        justify="space-between"
        align="center"
        style={{
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
      >
        <Button
        type="text"
        onClick={() => navigate("/")} 
        style={{
        fontSize: "24px",
        color: "#1890ff",
        marginBottom: "24px",
    }}
    >
  <ArrowLeftOutlined />
</Button>
     <Title
        level={2}
        style={{ textAlign: "center", marginBottom: "24px", color: themeStyles[theme].color }}
      >
        {userName ? `${userName}'s Posts` : "Loading..."}
      </Title>
      <Button
        type="primary"
        onClick={() => dispatch(toggleTheme())} 
        style={{ marginBottom: "24px", float: "right" }}
      >
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </Button>
</Flex>
      <Input
        placeholder="Search posts by title or content..."
        value={postSearchTerm}
        onChange={(e) => dispatch(setPostSearchTerm(e.target.value))}
        style={{ marginBottom: "24px" }}
      />

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {filteredPosts.map((post) => (
            <Col key={post.id} xs={24} sm={12} md={8} lg={8}>
              <Card
                hoverable
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  backgroundColor: themeStyles[theme].backgroundColor,
                }}
                title={
                    <span style={{ color: "#1677ff" }}>{post.title}</span> // Set color to #1677ff
                  }
              >
                <Paragraph
                  ellipsis={{
                    rows: 3, 
                    expandable: true,
                  }}
                  style={{ color: themeStyles[theme].color }}
                >
                  {post.body}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default UserPosts;
