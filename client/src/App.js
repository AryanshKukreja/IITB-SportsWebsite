import PlayerDatabase from './components/PlayerDatabase/PlayerDatabase';
import React from "react";
import {BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from './ScrollToTop';
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
import FitnessClub from "./components/sports/SportsPages/fitness/FitnessClub";
import Chess from "./components/sports/SportsPages/chess/chess";
import Rubics from "./components/sports/SportsPages/rubics/rubics";
import Frisbee from "./components/sports/SportsPages/frisbee/frisbee";
import Athletics from "./components/sports/SportsPages/athletics/src/aquatics/aquatics";
import Yearbook from "./components/yearbook/yearbook";
import Feedback from "./components/Feedback/Feedback";
import AdminDashboard from "./components/FeedbackAdmin/Feedback-Admin";
import BlogsPage from "./components/Blogs/BlogPage";
import MatchPrediction from "./components/matchprediction/matchprediction";
import CertificatesPage from "./components/Certificates/Certificatespage";
import VerificationPage from "./components/Certificates/Verificationpage";
import AdminLogin            from "./components/AdminPanel/AdminLogin";
import SecyDashboard         from "./components/AdminPanel/SecyDashboard";
import ChairpersonDashboard  from "./components/AdminPanel/ChairpersonDashboard";
import DeanDashboard         from "./components/AdminPanel/DeanDashboard";
import SuperadminDashboard   from "./components/AdminPanel/SuperadminDashboard";
import BatchDetail           from "./components/AdminPanel/BatchDetail";

function App() {
  // Use a root basename during local development so the homepage renders at localhost,
  // while keeping the /sports base path on the deployed site.
  const basename = process.env.NODE_ENV === "development" ? "" : "/sports";

  return (
    <Router basename={basename}>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Root path - this will match /sports/ */}
            <Route path="/" element={<HomePage />} />
            
            {/* All your existing routes - remove /sports prefix since basename handles it */}
          <Route path="/players" element={<PlayerDatabase/>}/>
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/explore" element={<Sports/>} />
            <Route path="/aquatics" element={<Aquatics />} />
            <Route path="/volleyball" element={<Volleyball />} />
            <Route path="/SAC" element={<SAC/>} />
            <Route path="/Council" element={<Council/>} />
            <Route path="/Webteam" element={<Webteam/>} />
            <Route path="/CourtStatus" element={<CourtStatus/>} />
            <Route path="/turfbooking" element={<BookingPage/>} />
            <Route path="/GC" element={<GC/>} />
            <Route path="/admin-turf-booking-raj" element={<AdminPage/>} />
            <Route path="/events-timeline" element={<SportsCalendar/>} />
            <Route path="/football" element={<Football />} />
            <Route path="/badminton" element={<Badminton />} />
            <Route path="/basketball" element={<Basketball />} />
            <Route path="/squash" element={<Squash />} />
            <Route path="/tabletennis" element={<Tabletennis />} />
            <Route path="/tennis" element={<Tennis />} />
            <Route path="/weightlifting" element={<Wtlift />} />
            <Route path="/indiangames" element={<IndianGames />} />
            <Route path="/hockey" element={<Hockey />} />
            <Route path="/cricket" element={<Cricket />} />
            <Route path="/boardgames" element={<BoardGames />} />
            <Route path="/admin-court-management" element={<AdminCourtManagement/>} />
            <Route path="/adventureclub" element={<AdventureClub/>}/>
            <Route path="/yoga" element={<Yogastha/>}/>
            <Route path="/fitness" element={<FitnessClub/>}/>
            <Route path="/chess" element={<Chess/>}/>
            <Route path="/rubik" element={<Rubics/>}/>
            <Route path="/frisbee" element={<Frisbee />} />
            <Route path="/athletics" element={<Athletics />} />
            <Route path="/yearbook" element={<Yearbook />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/feedback-admin" element={<AdminDashboard />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/match-prediction" element={<MatchPrediction />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/certificate-verification/:certId" element={<VerificationPage />} /> 
            {/* Admin panel — not linked anywhere */}
            <Route path="/certificate-admin-gssa-0000"         element={<AdminLogin />} />
            <Route path="/certificate-admin-chairperson-1542"  element={<AdminLogin />} />
            <Route path="/certificate-admin-dean-3000"         element={<AdminLogin />} />
            <Route path="/certificate-admin-superadmin-73"     element={<AdminLogin />} />
            <Route path="/certificate-admin-gssa-0000/dashboard"        element={<SecyDashboard />} />
            <Route path="/certificate-admin-chairperson-1542/dashboard" element={<ChairpersonDashboard />} />
            <Route path="/certificate-admin-dean-3000/dashboard"        element={<DeanDashboard />} />
            <Route path="/certificate-admin-superadmin-73/dashboard"    element={<SuperadminDashboard />} />
            <Route path="/admin/batches/:batchId"              element={<BatchDetail />} />
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
