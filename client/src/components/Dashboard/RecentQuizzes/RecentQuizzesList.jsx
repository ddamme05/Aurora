import React, { useEffect, useState, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Link } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import { AuthContext } from "../../../AuthContext";

const RecentQuizzesList = () => {
  const authContext = useContext(AuthContext);
  const userId = authContext.currentUser?.id;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const itemsPerPage = isMobile ? 5 : 8;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Load initial quizzes
    loadQuizzes();
  }, []);

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Detach scroll event listener on component unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const loadQuizzes = () => {
    // Fetch quizzes from your backend API with pagination
    axios
      .get(`/api/quizzes/${userId}`, {
        params: {
          page: currentPage,
          perPage: itemsPerPage,
        },
      })
      .then((response) => {
        setRecentQuizzes((prevQuizzes) => [...prevQuizzes, ...response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleScroll = () => {
    // Check if the user has reached the bottom of the page
    const isBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (isBottom) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div
      style={{
        maxHeight: "690px",
        overflowY: "auto",
        scrollbarWidth: "none", // Hide the scrollbar on big screens
        msOverflowStyle: "none", // Hide the scrollbar for IE and Edge
        "&::-webkit-scrollbar": {
          display: "none", // Hide the scrollbar for Webkit browsers
        }
      }}
    >
      {recentQuizzes.map((quiz, index) => (
        <Link to={`/portal/${quiz.id}`} key={quiz.id} style={{ textDecoration: "none" }}>
          <Card
            key={index}
            variant="outlined"
            style={{
              marginBottom: "10px",
              backgroundColor: "rgba(212, 212, 212, .05)",
              color: "white",
              borderRadius: "20px",
              width: "40vh",
              height: "7vh",
              marginLeft: "47px",
              ...(isMobile && {
                width: "20vh",
              }),
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="h2"
                style={{
                  fontSize: "30px",
                  color: "rgba(255, 255, 255, .9)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  transition: "all 0.3s",
                  textAlign: 'center',
                  ...(isMobile && {
                    fontSize: "1.3em",
                  }),
                }}
              >
                {quiz.category}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default RecentQuizzesList;