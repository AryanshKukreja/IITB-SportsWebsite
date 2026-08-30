# Blueprint for Live GC Scorecard & Admin Panel

This document outlines the detailed technical specifications and implementation plan to build a live General Championship (GC) Scorecard page and an Admin Panel. 

The application utilizes **React** for the frontend, **Firebase Realtime Database** for real-time state synchronization, and custom CSS for a premium, typography-focused editorial/dossier aesthetic.

---

## 1. Firebase Realtime Database Schema

To support live matches and dynamic updates of overall and sport-wise GC standings, structure the database as follows:

```json
{
  "gc": {
    "standings": {
      "boys": [
        { "name": "H2", "points": 99.5 },
        { "name": "H3", "points": 82.5 }
      ],
      "girls": [
        { "name": "H10", "points": 116 },
        { "name": "H15B", "points": 100 }
      ]
    },
    "sportsData": {
      "boys": {
        "Aquatics": [
          { "name": "H3", "points": 10 },
          { "name": "H18", "points": 6 }
        ]
      },
      "girls": {
        "Aquatics": [
          { "name": "H10", "points": 10 },
          { "name": "H15A", "points": 6 }
        ]
      }
    },
    "matches": {
      "match_id_1": {
        "id": "match_id_1",
        "sport": "Football",
        "category": "boys",
        "stage": "Semi-Final 1",
        "status": "live",
        "teamA": "H3",
        "teamB": "H2",
        "scoreA": "2",
        "scoreB": "1",
        "venue": "Gymkhana Ground",
        "time": "7:00 PM, Today",
        "liveUpdates": [
          {
            "timestamp": 1724993120000,
            "message": "Goal scored by H3! Dynamic header from close range.",
            "scoreA": "2",
            "scoreB": "1"
          }
        ]
      }
    },
    "config": {
      "adminPasscode": "GC_IITB_2026"
    }
  }
}
```

---

## 2. Component Design & Routing

### 2.1 Router Additions
In [`App.js`](file:///d:/IIT%20BOMABY/ISC%20WEB%20cons/IITB-SportsWebsite/client/src/App.js):
- Add routes for GC Admin Dashboard:
  - `<Route path="/gc-admin" element={<GcAdmin />} />`

### 2.2 Live Match Ticker / Scorecards (Frontend)
Modify [`GC.js`](file:///d:/IIT%20BOMABY/ISC%20WEB%20cons/IITB-SportsWebsite/client/src/components/Gc/GC.js):
- Replace static variables (`sportsData`, `girlsSportsData`, `standings`, `girlsStandings`) with React state hook variables initialized with the original hardcoded values as fallback data.
- Setup real-time listeners (`onValue` from `firebase/database`) targeting the `/gc` node:
  - Synchronize `standings` and `sportsData`.
  - Listen to `/gc/matches` and fetch all active/upcoming/completed matches.
- **New Section: "Live & Upcoming Battles"**
  - Position it prominently below the intro screen or overall standing podium.
  - Display cards for active matches with a pulsing red `● LIVE` indicator.
  - Display a live scoreboard showing current points/score (e.g. `H3 2 - 1 H2`).
  - Render an expandable dropdown to show the `liveUpdates` chronological text feed.
  - Style with the existing CSS palette: dark navy panels (`--panel`), thin borders (`--rule`), and JetBrains Mono monospace typography.

### 2.3 GC Admin Dashboard (`GcAdmin.jsx`)
Create a new component [`GcAdmin.jsx`](file:///d:/IIT%20BOMABY/ISC%20WEB%20cons/IITB-SportsWebsite/client/src/components/Gc/GcAdmin.jsx):
- **Authentication**:
  - A passcode-based login interface. It reads the passkey from `/gc/config/adminPasscode` in Firebase. If it matches, the session is saved in `sessionStorage` or state.
- **Controls**:
  - **Overall Standings Manager**: Form to edit overall hostel rankings and points for boys/girls.
  - **Sport-wise Point Manager**: Select a sport (e.g., Badminton, Aquatics), edit/reorder hostels, and assign points.
  - **Matches Manager**:
    - **Add Match Form**: Select Sport, Category (Boys/Girls), Stage, Hostels (Team A / Team B), Venue, Time.
    - **Update Live Match**: List of active matches with inputs to change `scoreA`, `scoreB`, toggle status (`live` / `upcoming` / `completed`), add a text commentary update, or delete a match.
  - **Bootstrap Database Button**: A button visible only to admins that populates the database with the initial hardcoded standings and sport-wise data if the Firebase nodes are empty.

---

## 3. Step-by-Step Implementation

### Step 1: Database Initialization
Check if the firebase database node `gc` has data. If not, write initial standings and sport-wise rankings (boys & girls) from the current `GC.js` static data.

### Step 2: Implement GcAdmin Component
Create [`GcAdmin.jsx`](file:///d:/IIT%20BOMABY/ISC%20WEB%20cons/IITB-SportsWebsite/client/src/components/Gc/GcAdmin.jsx) and [`GcAdmin.css`](file:///d:/IIT%20BOMABY/ISC%20WEB%20cons/IITB-SportsWebsite/client/src/components/Gc/GcAdmin.css) in `client/src/components/Gc/`.
Implement the control forms and write state values directly to Firebase Realtime Database using `ref`, `set`, `push`, and `update` functions.

### Step 3: Connect GC.js to Firebase
Refactor [`GC.js`](file:///d:/IIT%20BOMABY/ISC%20WEB%20cons/IITB-SportsWebsite/client/src/components/Gc/GC.js) to:
1. Import `db` from `../../firebase`.
2. Set up `useEffect` to listen to `/gc/standings`, `/gc/sportsData`, and `/gc/matches`.
3. Add a section in JSX showing active and recent matches.

---

## 4. Verification and Testing

1. **Bootstrap Database**: Open `/gc-admin`, login using the default passcode, and trigger the bootstrap script. Verify that the Realtime Database console shows standings and sportsData populated.
2. **Real-time Synchronization**: Open two browser tabs side-by-side: one on `/GC` and another on `/gc-admin`. Add a match or update a score in the admin panel and verify it reflects instantly on the main GC page without reloading.
3. **Commentary Flow**: Verify that adding commentary updates to a live match works and displays in reverse chronological order on the client page.
