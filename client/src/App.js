import React from "react";
import {HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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

function App() {
  // Remove basename - HashRouter doesn't need it
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Root path routes */}
            <Route path="/" element={<HomePage />} />
            
            {/* Main routes - simplified structure */}
            <Route path="/sports" element={<Sports/>} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/courtstatus" element={<CourtStatus/>} />
            <Route path="/gc" element={<GC/>} />
            <Route path="/eventstimeline" element={<SportsCalendar/>} />
            <Route path="/turfbooking" element={<BookingPage/>} />
            <Route path="/contactus" element={<ContactUs />} />
            
            {/* Specific sports and sub-pages */}
            <Route path="/sports/aquatics" element={<Aquatics />} />
            <Route path="/sports/explore" element={<Sports/>} />
            
            {/* Contact sub-pages */}
            <Route path="/sac" element={<SAC/>} />
            <Route path="/council" element={<Council/>} />
            <Route path="/webteam" element={<Webteam/>} />
            
            {/* Admin route */}
            <Route path="/admin-turf-booking-raj" element={<AdminPage/>} />
            
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