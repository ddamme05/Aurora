import React from "react";
import { useMediaQuery, useTheme } from "@mui/material"; 
import NavGenerator from "../components/Dashboard/NavGenerator";
import {QuizGen} from "../components/Dashboard/QuizGen";
import FavCategory from "../components/Dashboard/FavCategory";
import RecentTitle from "../components/Dashboard/RecentQuizzes/RecentTitle";
import RecentQuizzesList from "../components/Dashboard/RecentQuizzes/RecentQuizzesList";
import SuggestedTitle from "../components/Dashboard/SuggestedQuizzes/SuggestedTitle";
import SuggestedQuizzesList from "../components/Dashboard/SuggestedQuizzes/SuggestedQuizzesList";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Footer from "../components/Footer";

//import Footer from "../components/Footer";
import "../styles/dashboard.css"
import { Button } from "@material-ui/core";
import LogoutButton from "../components/LogoutButton";


const styles = {
  pcContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '82vh', // Adjust the height based on your requirement
  },
  leftColumn: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',  
    alignItems: 'flex-start',
    position: 'relative',
    right: '5em',
    top: '5em',
  },
  rightColumn: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  recentColumn:{
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    height: '80vh', 
  },
  suggestedColumn:{
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    height: '80vh', 

  },
};

const mobileStyles = {
  pcContainer: {
    flexDirection: "column", // Stack columns on smaller screens

  },
  leftColumn: {
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    top: "0em",
    paddingTop: "0",
    left: "5em",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "row",
    //justifyContent: "center",
    padding: "1em 0 0 5em",
    maxHeight: "auto",
  },
  recentColumn:{
    position: "relative",
    right: '1em',
    bottom: '7em',
  },
  suggestedColumn: {
    position: "relative",
    right: '6em',
    bottom: '7em',
  },
};
export default function Dashboard() {


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 
  return (
    <>
      

      <div className="scrollUpAnimation">
        <div className="dash-header">
        <div className="dash-header-left"></div>
        <div className="dash-header-mid">
          <Button
            color="inherit"
            href="/generator"
            disableRipple
            sx={{
              fontSize: "1rem",
              fontWeight: "100",
              opacity: "0.7",
              textTransform: "none",
              "&:hover": {
                opacity: "1.0",
                backgroundColor: "transparent",
              }
            }}
          >
            <KeyboardDoubleArrowUpIcon /> Generator <KeyboardDoubleArrowUpIcon />
          </Button>
        </div>
        <div className="dash-header-right">
          <LogoutButton />
        </div>
      </div>
        
        <div style={{ ...styles.pcContainer, ...(isMobile && mobileStyles.pcContainer) }} className="dash-main-container">
          <div style={{ ...styles.leftColumn, ...(isMobile && mobileStyles.leftColumn)}} className= "dash-main-left">
            <div >
              <div >
                <QuizGen />
              </div>
            </div>
            {/* <div className="quizzes-generated">
              <div className="quizzes-generated-content">
                <FavCategory />
              </div>
            </div> */}
            
          </div>
          <div style={{...styles.rightColumn, ...(isMobile && mobileStyles.rightColumn)}} className="dash-main-right">
            <div style={{...styles.recentColumn, ...(isMobile && mobileStyles.recentColumn)}}>
              <div className="headers">
                 <RecentTitle />
              </div>
            
            <RecentQuizzesList />
            </div>
            <div style={{...styles.suggestedColumn, ...(isMobile && mobileStyles.suggestedColumn)}}>
            <div className="headers">
                 <SuggestedTitle />
              </div>
                <SuggestedQuizzesList />
              </div>
          </div>
      </div>    
      {/* <Footer /> */}
      </div>
    </>
  );
}