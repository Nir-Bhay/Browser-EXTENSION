const goalDisplay = document.getElementById('goal');
const loggedDisplay = document.getElementById('logged');
const goalInput = document.getElementById('goal-input');
const setGoalButton = document.getElementById('set-goal');
const logWaterButton = document.getElementById('log-water');
const resetButton = document.getElementById('reset');
const progressBar = document.getElementById('progress-bar');
const historyLog = document.getElementById('history-log');
const reminderInterval = document.getElementById('reminder-interval');
const setReminderButton = document.getElementById('set-reminder');
const quoteDisplay = document.getElementById('quote');
const themeToggle = document.getElementById('toggle-theme');

const STORAGE_GOAL = 'hydration_goal';
const STORAGE_LOGGED = 'hydration_logged';
const STORAGE_HISTORY = 'hydration_history';
const STORAGE_THEME = 'hydration_theme';

const motivationalQuotes = [
  "Drink water like it's your superpower!",
  "Stay hydrated, stay productive!",
  "Water is the key to a healthy life!",
  "Drink more, feel better!",
  "Hydration fuels success!",
];

// Initialize app
function initialize() {
  const goal = localStorage.getItem(STORAGE_GOAL) || 8;
  const logged = localStorage.getItem(STORAGE_LOGGED) || 0;
  const history = JSON.parse(localStorage.getItem(STORAGE_HISTORY)) || [];
  const theme = localStorage.getItem(STORAGE_THEME) || 'light';

  goalDisplay.textContent = goal;
  loggedDisplay.textContent = logged;
  updateProgress(logged, goal);
  renderHistory(history);
  updateTheme(theme);
}

// Update progress bar
function updateProgress(logged, goal) {
  const percentage = (logged / goal) * 100;
  progressBar.style.width = `${percentage > 100 ? 100 : percentage}%`;
}

// Render history
function renderHistory(history) {
  historyLog.innerHTML = history.map(
    (entry, index) => `<li>Day ${index + 1}: ${entry} glasses</li>`
  ).join('');
}

// Toggle dark mode
themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.classList.toggle('dark') ? 'dark' : 'light';
  localStorage.setItem(STORAGE_THEME, currentTheme);
});

// Log water
logWaterButton.addEventListener('click', () => {
  let logged = parseInt(localStorage.getItem(STORAGE_LOGGED)) || 0;
  const goal = parseInt(localStorage.getItem(STORAGE_GOAL)) || 8;

  logged += 1;
  localStorage.setItem(STORAGE_LOGGED, logged);
  loggedDisplay.textContent = logged;
  updateProgress(logged, goal);

  if (logged >= goal) {
    alert("Great job! You've hit your hydration goal!");
  }

  updateQuote();
});

// Update quote
function updateQuote() {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  quoteDisplay.textContent = motivationalQuotes[randomIndex];
}

// Save reminders
setReminderButton.addEventListener('click', () => {
  const interval = parseInt(reminderInterval.value);
  alert(`Reminders set every ${interval} minutes!`);
});

// Reset
resetButton.addEventListener('click', () => {
  localStorage.setItem(STORAGE_LOGGED, 0);
  loggedDisplay.textContent = 0;
  updateProgress(0, localStorage.getItem(STORAGE_GOAL));
});

// Run initialization
initialize();
