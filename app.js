/* ========== EarthlyTrack.ng Script ========== */

/* 🌙 Dark Mode Toggle */
const toggleBtn = document.createElement("button");
toggleBtn.textContent = "🌙";
toggleBtn.style.position = "fixed";
toggleBtn.style.bottom = "20px";
toggleBtn.style.right = "20px";
toggleBtn.style.padding = "0.6rem 1rem";
toggleBtn.style.border = "none";
toggleBtn.style.borderRadius = "50%";
toggleBtn.style.background = "#2e8b57";
toggleBtn.style.color = "white";
toggleBtn.style.cursor = "pointer";
toggleBtn.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
document.body.appendChild(toggleBtn);

let darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setDarkMode(isDark) {
  if (isDark) {
    document.documentElement.style.setProperty("--color-bg", "#121212");
    document.documentElement.style.setProperty("--color-text", "#f0f0f0");
    document.documentElement.style.setProperty("--color-primary", "#57d9a3");
    document.documentElement.style.setProperty("--color-secondary", "#4dabf7");
    document.documentElement.style.setProperty("--color-accent", "#ffb86b");
    document.documentElement.style.setProperty("--color-card", "#1e1e1e");
    document.documentElement.style.setProperty("--color-border", "#333333");
    toggleBtn.textContent = "☀️";
  } else {
    document.documentElement.style = "";
    toggleBtn.textContent = "🌙";
  }
}

toggleBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  setDarkMode(darkMode);
});

/* 🌐 Smooth Scroll for Nav Links */
document.querySelectorAll("nav a").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* 📊 Fetch & Display Climate Data */
async function fetchClimateData() {
  try {
    // Example API (Open-Meteo for free weather data - Lagos, Nigeria)
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=6.5244&longitude=3.3792&current_weather=true");
    const data = await response.json();

    const climateDiv = document.getElementById("dashboard");
    if (!climateDiv) return;

    // Extract weather data
    const weather = data.current_weather;
    const html = `
      <div class="feature-card">
        <h3>🌡️ Temperature</h3>
        <p>${weather.temperature}°C</p>
      </div>
      <div class="feature-card">
        <h3>💨 Windspeed</h3>
        <p>${weather.windspeed} km/h</p>
      </div>
      <div class="feature-card">
        <h3>🧭 Wind Direction</h3>
        <p>${weather.winddirection}°</p>
      </div>
      <div class="feature-card">
        <h3>⏱️ Last Update</h3>
        <p>${new Date(weather.time).toLocaleString()}</p>
      </div>
    `;

    climateDiv.innerHTML = html;

  } catch (error) {
    console.error("Error fetching climate data:", error);
    const climateDiv = document.getElementById("dashboard");
    if (climateDiv) {
      climateDiv.innerHTML = `<p style="color:red;">⚠️ Failed to load climate data. Please try again later.</p>`;
    }
  }
}

// Call function on load
fetchClimateData();
