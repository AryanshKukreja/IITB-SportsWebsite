import React from "react";
import {BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ContactUs from "./components/Contact/ContactUs";
import Sports from "./components/sports/Sports";
import Aquatics from "./components/sports/SportsPages/aquatics/src/aquatics/aquatics";
import SAC from "./components/Contact/SAC";
import Council from "./components/Contact/SportsCouncil";
import Webteam from "./components/Contact/webteam";
import BookingPage from "./components/turf-booking/BookingPage";
import AdminPage from "./components/turf-booking/AdminPage";
import GC from "./components/Gc/GC";
import SportsCalendar from "./components/EventsTimeline";
import CourtStatus from "./components/CourtStatus/CourtStatus";
import "./App.css";
import AdminCourtManagement from "./components/admin/AdminCourtManagement";
import Football from './components/sports/SportsPages/football/football/Football';
import Badminton from './components/sports/SportsPages/badminton/src/badminton/badminton';
import Basketball from './components/sports/SportsPages/basketball/src/aquatics/basketball';
import Squash from './components/sports/SportsPages/squash/squash/squash';
import Tabletennis from './components/sports/SportsPages/tabletennis/tabletennis/tabletennis';
import Tennis from './components/sports/SportsPages/tennis/Tennis';
import Volleyball from "./components/sports/SportsPages/volleyball/volleyball/volleyball"; 
import Wtlift from "./components/sports/SportsPages/wtlift/wtlift/wtlift";
import IndianGames from "./components/sports/SportsPages/indiangames/indiangames/IndianGames";
import Hockey from "./components/sports/SportsPages/hockey/hockey/Hockey";
import Cricket from "./components/sports/SportsPages/cricket/cricket/Cricket";
import BoardGames from "./components/sports/SportsPages/boardgame/src/aquatics/boardgames";
import AdventureClub from "./components/sports/SportsPages/adventure club/adventureclub";
import Yogastha from "./components/sports/SportsPages/yogastha/yogastha";
import Chess from "./components/sports/SportsPages/chess/chess";
import Rubics from "./components/sports/SportsPages/rubics/rubics";
import Frisbee from "./components/sports/SportsPages/frisbee/frisbee";

function App() {
  // Dynamic basename for GitHub Pages vs local development
  const basename = process.env.NODE_ENV === 'production' ? '/Sports-Website' : '';

  return (
    <Router basename={basename}>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Root path routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/sports" element={<HomePage />} />
            
            {/* All your existing routes */}
            <Route path="/sports/" element={<HomePage />} />
            <Route path="/sports/contact" element={<ContactUs />} />
            <Route path="/sports/explore" element={<Sports/>} />
            <Route path="/sports/aquatics" element={<Aquatics />} />
            <Route path="/sports/volleyball" element={<Volleyball />} />
            <Route path="/sports/SAC" element={<SAC/>} />
            <Route path="/sports/Council" element={<Council/>} />
            <Route path="/sports/Webteam" element={<Webteam/>} />
            <Route path="/sports/CourtStatus" element={<CourtStatus/>} />
            <Route path="/sports/turfbooking" element={<BookingPage/>} />
            <Route path="/sports/GC" element={<GC/>} />
            <Route path="/sports/admin-turf-booking-raj" element={<AdminPage/>} />
            <Route path="/sports/events-timeline" element={<SportsCalendar/>} />
            <Route path="/sports/football" element={<Football />} />
            <Route path="/sports/badminton" element={<Badminton />} />
            <Route path="/sports/basketball" element={<Basketball />} />
            <Route path="/sports/squash" element={<Squash />} />
            <Route path="/sports/tabletennis" element={<Tabletennis />} />
            <Route path="/sports/tennis" element={<Tennis />} />
            <Route path="/sports/volleyball" element={<Volleyball />} />
            <Route path="/sports/weightlifting" element={<Wtlift />} />
            <Route path="/sports/indiangames" element={<IndianGames />} />
            <Route path="/sports/hockey" element={<Hockey />} />
            <Route path="/sports/cricket" element={<Cricket />} />
            <Route path="/sports/boardgames" element={<BoardGames />} />
            <Route path="/sports/admin-court-management" element={<AdminCourtManagement/>} />
            <Route path= "/sports/adventureclub" element={<AdventureClub/>}/>
            <Route path= "/sports/yoga" element={<Yogastha/>}/>
            <Route path= "/sports/chess" element={<Chess/>}/>
            <Route path= "/sports/rubik" element={<Rubics/>}/>
            <Route path="/sports/frisbee" element={<Frisbee />} />
            {/* Alternative routes without /sports prefix for easier navigation */}
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/explore" element={<Sports/>} />
            <Route path="/CourtStatus" element={<CourtStatus/>} />
            <Route path="/turfbooking" element={<BookingPage/>} />
            <Route path="/GC" element={<GC/>} />
            <Route path="/events-timeline" element={<SportsCalendar/>} />
            
            
            {/* Catch-all route for unmatched paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;