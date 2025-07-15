import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';
import './events.css'; // Import the CSS file
import ISCEvents from './ISC_events.json';

// Helper to parse "DD MM YYYY" or "DD MM YYYY to DD MM YYYY"
function getDates(standardizedDate) {
  if (!standardizedDate) return [];
  if (standardizedDate.includes('to')) {
    const [start, end] = standardizedDate.split('to').map(s => s.trim());
    return [start, end];
  }
  // Ignore "full month", "last week", etc. for now
  if (standardizedDate.match(/^\d{2} \d{2} \d{4}$/)) {
    return [standardizedDate.trim()];
  }
  return [];
}

// Helper to generate all dates in a range
function getDateRange(start, end) {
  const result = [];
  let current = new Date(start);
  const last = new Date(end);
  while (current <= last) {
    result.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return result;
}

// Transform ISCEvents JSON to calendar event objects
function parseISCEvents(json) {
  let id = 1;
  const events = [];

  json.forEach(item => {
    const dates = getDates(item.StandardizedDate);
    if (dates.length === 2) {
      // Range
      const [startStr, endStr] = dates;
      const [sd, sm, sy] = startStr.split(' ').map(Number);
      const [ed, em, ey] = endStr.split(' ').map(Number);
      const start = new Date(sy, sm - 1, sd);
      const end = new Date(ey, em - 1, ed);
      getDateRange(start, end).forEach(dateObj => {
        events.push({
          id: id++,
          title: item.Event,
          date: dateObj.toISOString().split('T')[0],
          sport: item.Sport,
          /* description: item.Event */
        });
      });
    } else if (dates.length === 1) {
      // Single date
      const [d, m, y] = dates[0].split(' ').map(Number);
      if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
        const dateObj = new Date(y, m - 1, d);
        events.push({
          id: id++,
          title: item.Event,
          date: dateObj.toISOString().split('T')[0],
          sport: item.Sport,
          /* description: item.Event */
        });
      }
    }
    // Ignore "full month", "last week", etc.
  });

  return events;
}

// Full list of sports (dynamically from ISCEvents)
const allSports = Array.from(new Set(ISCEvents.map(e => e.Sport))).filter(Boolean).sort();

const sportColors = {
  "Aquatics": "#48D1CC",
  "Basketball": "#f97316",
  "Swimming": "#06b6d4",
  "Football": "#22c55e",
  "Tennis": "#eab308",
  "Cricket": "#84cc16",
  "Volleyball": "#f59e0b",
  "Hockey": "#8b5cf6",
  "Badminton": "#ec4899",
  "Table Tennis": "#ef4444",
  "Athletics": "#10b981",
  "Boxing": "#dc2626",
  "Gymnastics": "#d946ef",
  "Wrestling": "#7c3aed",
  "Archery": "#059669",
  "Council": "#6366f1",
  "Board Games": "#a3a3a3",
  "Weightlifting": "#b91c1c",
  "Squash": "#0ea5e9",
  "Indian Games": "#f43f5e",
  "Common Council": "#6366f1",
  "Common": "#6366f1",
  "Lawn Tennis": "#eab308",
  "LT": "#eab308",
  "TT": "#ef4444"
};

export default function SportsCalendar() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedSport, setSelectedSport] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  // Load events from ISCEvents
  useEffect(() => {
    const parsed = parseISCEvents(ISCEvents);
    setEvents(parsed);
    setFilteredEvents(parsed);
  }, []);

  // Get start of week (Sunday)
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  // Initialize current week start
  useEffect(() => {
    setCurrentWeekStart(getWeekStart(new Date()));
  }, []);

  // Filter events based on selected sport and search term
  useEffect(() => {
    let result = [...events];
    
    if (selectedSport !== "All") {
      result = result.filter(event => event.sport === selectedSport);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredEvents(result);
  }, [selectedSport, searchTerm, events]);

  // Get events for current week
  const getWeekEvents = () => {
    const weekStart = new Date(currentWeekStart);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= weekStart && eventDate <= weekEnd;
    });
  };

  // Get events for specific day
  const getDayEvents = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return getWeekEvents().filter(event => event.date === dateString);
  };

  // Navigate weeks
  const goToPreviousWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newWeekStart);
  };

  const goToNextWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newWeekStart);
  };

  const goToToday = () => {
    setCurrentWeekStart(getWeekStart(new Date()));
  };

  // Handle legend sport click
  const handleSportClick = (sport) => {
    setSelectedSport(sport);
    // Scroll to the top of the page smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Generate week days
  const getWeekDays = () => {
    const days = [];
    const weekStart = new Date(currentWeekStart);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekDays = getWeekDays();
  const weekEvents = getWeekEvents();

  return (
    <div className="sports-calendar-container">
      <div className="sports-calendar-wrapper">
        {/* Header */}
        <div className="sports-calendar-header">
          <h1 className="sports-calendar-title">Sports Council Calendar</h1>
          <p className="sports-calendar-subtitle">Stay updated with all sporting events and activities</p>
        </div>
        
        {/* Filters */}
        <div className="sports-filters-section">
          <div className="sports-filters-container">
            <div className="sports-filter-group">
              <div className="sports-filter-item">
                <label className="sports-filter-label">
                  <Filter size={16} />
                  Filter by Sport
                </label>
                <select
                  className="sports-filter-select"
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                >
                  <option value="All">All Sports</option>
                  {allSports.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="sports-filter-item">
                <label className="sports-filter-label">
                  <Search size={16} />
                  Search Events
                </label>
                <input
                  type="text"
                  placeholder="Search events..."
                  className="sports-search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="sports-events-summary">
              <span className="sports-events-count">{weekEvents.length}</span>
              <span className="sports-events-text">events this week</span>
            </div>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="sports-calendar-nav">
          <div className="sports-nav-controls">
            <button onClick={goToPreviousWeek} className="sports-nav-button">
              <div className='chevron'>
                <ChevronLeft size={18} />
              </div>
              Previous Week
            </button>
            
            <button onClick={goToToday} className="sports-today-button">
              Today
            </button>
            
            <button onClick={goToNextWeek} className="sports-nav-button">
              Next Week
              <div className='chevron'>
                <ChevronRight size={18} />
              </div>
            </button>
          </div>
          
          <div className="sports-week-range">
            {formatDate(weekDays[0])} - {formatDate(weekDays[6])}, {weekDays[0].getFullYear()}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="sports-calendar-grid">
          {weekDays.map((day, index) => {
            const dayEvents = getDayEvents(day);
            const isToday = day.toDateString() === new Date().toDateString();
            
            return (
              <div key={index} className={`sports-day-column ${isToday ? 'sports-today' : ''}`}>
                <div className="sports-day-header">
                  <div className="sports-day-name">{dayNames[index]}</div>
                  <div className={`sports-day-number ${isToday ? 'sports-today-number' : ''}`}>
                    {day.getDate()}
                  </div>
                </div>
                
                <div className="sports-day-events">
                  {dayEvents.length === 0 ? (
                    <div className="sports-no-events-day">No events</div>
                  ) : (
                    dayEvents.map(event => (
                      <div 
                        key={event.id} 
                        className="sports-event-card"
                        style={{ borderLeftColor: sportColors[event.sport] }}
                      >
                        <div className="sports-event-title">{event.title}</div>
                        <div className="sports-event-details">
                          <div 
                            className="sports-event-sport-badge"
                            style={{ 
                              backgroundColor: `${sportColors[event.sport]}20`,
                              color: sportColors[event.sport]
                            }}
                          >
                            {event.sport}
                          </div>
                        </div>
                        <div className="sports-event-description">
                          {/* {event.description} */}
                        </div>
                      </div>
                    )))
                  }
                </div>
              </div>
            );
          })}
        </div>
        {/* Legend */}
        <div className="sports-legend">
          <div className="sports-legend-title">Sport Categories</div>
          <div className="sports-legend-items">
            {allSports.map(sport => (
              <div 
                key={sport} 
                className="sports-legend-item"
                onClick={() => handleSportClick(sport)}
                style={{ cursor: 'pointer' }}
              >
                <div 
                  className="sports-legend-color"
                  style={{ backgroundColor: sportColors[sport] }}
                ></div>
                <span>{sport}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}