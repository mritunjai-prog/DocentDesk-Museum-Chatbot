import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Keyboard navigation detection for accessibility
document.body.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("using-keyboard");
  }
});

document.body.addEventListener("mousedown", () => {
  document.body.classList.remove("using-keyboard");
});

// Add skip to main content link
const skipLink = document.createElement("a");
skipLink.href = "#main";
skipLink.className = "skip-to-main";
skipLink.textContent = "Skip to main content";
document.body.insertBefore(skipLink, document.body.firstChild);

createRoot(document.getElementById("root")!).render(<App />);
