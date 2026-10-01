const DEMO_EMAIL = "demo@feedbackdesk.com";
const DEMO_PASSWORD = "demo123";
const STORAGE_KEY = "feedback-desk-items";
const SESSION_KEY = "feedback-desk-session";

const loginScreen = document.querySelector("#login-screen");
const workspace = document.querySelector("#workspace");
const loginForm = document.querySelector("#login-form");
const loginError = document.querySelector("#login-error");
const feedbackForm = document.querySelector("#feedback-form");
const feedbackList = document.querySelector("#feedback-list");
const emptyState = document.querySelector("#empty-state");
const clearButton = document.querySelector("#clear-button");
const toast = document.querySelector("#toast");
let feedbackItems = readFeedback();
let toastTimer;

function readFeedback() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch (error) { return []; }
}

function saveFeedback() { localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackItems)); }

function showWorkspace() {
  loginScreen.hidden = true;
  workspace.hidden = false;
  document.querySelector("#today-label").textContent = new Intl.DateTimeFormat("en", { month: "short", day: "2-digit", year: "numeric" }).format(new Date()).toUpperCase();
  renderFeedback();
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2800);
}

function renderFeedback() {
  feedbackList.innerHTML = feedbackItems.map((item) => `
    <article class="feedback-item" data-testid="feedback-item-${item.id}">
      <h3 data-testid="feedback-item-title-${item.id}">${escapeHtml(item.title)}</h3>
      <p data-testid="feedback-item-message-${item.id}">${escapeHtml(item.message)}</p>
      <div class="item-meta"><span class="tag">NEW</span><span>${item.date}</span></div>
    </article>
  `).join("");
  emptyState.hidden = feedbackItems.length > 0;
  clearButton.hidden = feedbackItems.length === 0;
  document.querySelector("#feedback-count").textContent = feedbackItems.length;
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" }[character]));
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#email").value.trim().toLowerCase();
  const password = document.querySelector("#password").value;
  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    loginError.textContent = "Those details do not match the demo account.";
    loginError.hidden = false;
    return;
  }
  loginError.hidden = true;
  sessionStorage.setItem(SESSION_KEY, "signed-in");
  showWorkspace();
});

document.querySelector("#logout-button").addEventListener("click", () => {
  sessionStorage.removeItem(SESSION_KEY);
  workspace.hidden = true;
  loginScreen.hidden = false;
  loginForm.reset();
  showToast("You have been logged out.");
});

feedbackForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#feedback-title").value.trim();
  const message = document.querySelector("#feedback-message").value.trim();
  feedbackItems.unshift({ id: Date.now(), title, message, date: new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date()) });
  saveFeedback();
  feedbackForm.reset();
  document.querySelector("#character-count").textContent = "0 / 500";
  renderFeedback();
  showToast("Feedback added to your inbox.");
});

document.querySelector("#feedback-message").addEventListener("input", (event) => {
  document.querySelector("#character-count").textContent = `${event.target.value.length} / 500`;
});

clearButton.addEventListener("click", () => {
  if (!window.confirm("Clear all feedback from this browser?")) return;
  feedbackItems = [];
  saveFeedback();
  renderFeedback();
  showToast("All feedback has been cleared.");
});

if (sessionStorage.getItem(SESSION_KEY) === "signed-in") showWorkspace();