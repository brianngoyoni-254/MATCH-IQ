#  Match IQ

Match IQ is a single-page, interactive sports quiz application that tests users’ knowledge of football and general sports intelligence. It delivers a timed, gamified experience with score tracking, streaks, and persistent user statistics stored in the browser.

---

## Project Overview

Match IQ is designed as a **Minimum Viable Product (MVP)** focused on delivering a complete quiz experience with:

* A structured quiz flow
* Real-time scoring and feedback
* Persistent performance tracking
* External API integration for dynamic questions

The goal is to demonstrate core frontend development skills using **JavaScript**, including state management, asynchronous data handling, and DOM manipulation.

---

## Key Features

###  Two-Stage Quiz System

* **Stage 1:** 10 football knowledge questions (locally stored)
* **Stage 2:** 10 general sports IQ questions (fetched via API)
* Automatic progression between stages

---

###  Timed Question System

* Each question has a **15-second countdown**
* If time runs out, the question is skipped automatically
* Encourages fast decision-making and engagement

---

### Score & Streak Tracking

* Tracks:

  * Current score
  * Final score
  * Correct answer streak
  * Highest streak achieved

---

### Persistent User Statistics

Using `localStorage`, the app saves:

* Total quiz attempts
* Previous scores history
* Highest score achieved

Data persists even after page refresh or browser restart.

---

### External API Integration

* Uses **Open Trivia DB API**
* Fetches additional sports-related questions dynamically
* Demonstrates:

  * `fetch()`
  * `async/await`
  * JSON data transformation

---

### Interactive Dashboard

The dashboard displays:

* Total attempts
* Highest score
* List of previous scores
* Reset functionality to clear stored data

---

###  Single Page Application (SPA)

* Built with:

  * HTML
  * CSS
  *  JavaScript
* No page reloads during gameplay
* Fully dynamic UI updates

---

## Tech Stack

| Technology       | Purpose                 |
| ---------------- | ----------------------- |
| HTML5            | Structure               |
| CSS3             | Styling and UI design   |
| JavaScript (ES6) | Application logic       |
| LocalStorage API | Persistent data storage |
| Fetch API        | External data retrieval |

---

##  Project Structure

```bash
Match-IQ/
│── index.html      # Main UI structure
│── style.css       # Styling and layout
│── script.js       # Game logic
│── README.md       # Project documentation
```

---

## How to Run the Project

1. Download or clone the repository:

   ```bash
   git clone https://github.com/your-username/match-iq.git
   ```

2. Open the project folder

3. Launch `index.html` in any modern browser

4. Click **Start Quiz** to begin

---

## Core Functionalities Demonstrated

* DOM manipulation
* Event handling
* State management
* Timers and intervals
* Asynchronous API calls
* Local storage CRUD operations
* Dynamic UI rendering

---

## Application Flow

1. User starts the quiz
2. Football questions are displayed (Stage 1)
3. API questions are loaded automatically (Stage 2)
4. User score and streak are tracked in real time
5. Final results are displayed
6. Score is saved to local storage

---

##  Data Management

### Simulated API Actions:

* **GET:** Fetch trivia questions from external API
* **POST:** Save score data to localStorage
* **DELETE:** Reset stored statistics

---

##  MVP Summary

Match IQ is a single-page sports quiz application that challenges users with football and general sports questions, featuring timed gameplay, scoring logic, and persistent leaderboard tracking using browser storage.

---

##  Future Improvements

* User authentication system
* Global leaderboard
* Difficulty levels (Easy / Medium / Hard)
* Category selection (Football, NBA, F1, etc.)
* Sound effects and animations
* Mobile app version (React Native)

---

## Author

**BRIAN NGOYONI**

