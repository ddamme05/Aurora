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
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    height: 'auto',
    margin: '0', // Reset default margins
    padding: '0', // Reset default paddings
    alignItems: 'stretch', // This will stretch the items to fill the container height
  },
  
  leftColumn: {
    gridColumn: '1 / 2', // Occupy the first column
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    position: 'relative',
    padding: '0',
    marginLeft: '-10em',
    marginTop: '-10em',
  },
  
  rightColumn: {
    gridColumn: '2 / 3', // Occupy the second column
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Split the right column into two columns
  },
  recentColumn: {
    gridColumn: '1 / 2', // Occupy the first column of the right column
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
  },
  suggestedColumn: {
    gridColumn: '2 / 3', // Occupy the second column of the right column
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
  },
};


const mobileStyles = {
  pcContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr', // Single column layout for mobile
    gridTemplateRows: 'auto 1fr', // The header takes the space it needs, the rest is for content
    gridTemplateAreas: `
      'header'
      'content'
    `,
    height: '100vh',
    overflowY: 'hidden', // Corrected typo
  },
  leftColumn: {
    gridArea: 'header',
    marginTop: 'auto',
    marginLeft: 'auto',
  },
  rightColumn: {
    gridArea: 'content',
    marginTop: '-6em',
    gridTemplateColumns: '1fr 1fr', // Split the right column into two columns
    gridTemplateAreas: `
    'rec sug'
    `
  },
  recentColumn: {
    gridArea: 'rec',
    display: 'grid',
    flexDirection: 'row',
    height: 'auto',
  },
  suggestedColumn: {
    gridArea: 'sug', 
    display: 'grid',
    flexDirection: 'row',
    height: 'auto',
  },
};
export default function Dashboard() {


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); 
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