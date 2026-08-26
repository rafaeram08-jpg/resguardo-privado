with open("src/index.css", "r") as f:
    content = f.read()

new_content = """@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
@import "tailwindcss";

:root {
  --bg-page: #F8FAFC;
  --bg-surface: rgba(255, 255, 255, 0.7);
  --bg-surface-solid: #FFFFFF;
  --text-primary: #020617;
  --text-secondary: #475569;
  --border-light: #E2E8F0;
  
  --accent-primary: #0F172A;
  --accent-blue: #2563EB;
  --accent-blue-subtle: #EFF6FF;
  
  /* Vibrant accents */
  --color-violet: #8B5CF6;
  --color-fuchsia: #D946EF;
  --color-emerald: #10B981;
  --color-cyan: #06B6D4;
  --color-amber: #F59E0B;
  
  --font-sans: 'Inter', sans-serif;
}

body {
  background-color: var(--bg-page);
  color: var(--text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  letter-spacing: -0.02em;
  font-weight: 600;
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(135deg, var(--accent-blue), var(--color-violet));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-alt {
  background: linear-gradient(135deg, var(--color-emerald), var(--color-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Ambient Background Blobs */
.gradient-blob {
  position: absolute;
  filter: blur(100px);
  z-index: 0;
  border-radius: 50%;
  opacity: 0.25;
  animation: float-blob 15s infinite ease-in-out alternate;
  pointer-events: none;
}

@keyframes float-blob {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(50px, -50px) scale(1.1); }
  100% { transform: translate(-30px, 30px) scale(0.9); }
}

.blob-1 { background-color: var(--color-violet); width: 500px; height: 500px; top: -100px; left: -100px; animation-delay: 0s; }
.blob-2 { background-color: var(--color-cyan); width: 600px; height: 600px; top: 20%; right: -200px; animation-delay: -3s; }
.blob-3 { background-color: var(--color-emerald); width: 400px; height: 400px; bottom: 10%; left: 10%; animation-delay: -6s; }
.blob-4 { background-color: var(--color-fuchsia); width: 450px; height: 450px; top: 60%; right: 10%; animation-delay: -2s; }

/* Buttons */
.btn-primary {
  background: linear-gradient(135deg, var(--accent-blue), var(--color-violet));
  color: #FFFFFF;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.5);
}

.btn-secondary {
  background-color: var(--bg-surface-solid);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}
.btn-secondary:hover {
  background-color: #F8FAFC;
  border-color: #CBD5E1;
  transform: translateY(-1px);
}

/* Cards */
.saas-card {
  background-color: var(--bg-surface);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.6);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.saas-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8);
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.8);
}

/* FABs */
.fab-chat, .fab-top, .fab-wa {
  background-color: var(--bg-surface-solid) !important;
  color: var(--text-primary) !important;
  border: 1px solid var(--border-light) !important;
  border-radius: 9999px !important;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: fixed;
  z-index: 95;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.fab-chat { bottom: 30px; right: 90px; width: 48px; height: 48px; }
.fab-top { bottom: 90px; right: 30px; width: 48px; height: 48px; }
.fab-wa { bottom: 30px; right: 30px; width: 48px; height: 48px; }
.fab-wa svg { width: 22px; height: 22px; color: #25D366; }
.fab-chat:hover, .fab-top:hover, .fab-wa:hover {
  border-color: var(--accent-blue) !important;
  transform: translateY(-4px) !important;
  box-shadow: 0 20px 25px -5px rgba(37,99,235,0.15) !important;
}

/* Chat Widget Overrides */
.chat-window {
  border-radius: 20px !important;
  background-color: var(--bg-surface-solid) !important;
  border: 1px solid var(--border-light) !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
  overflow: hidden;
}
.chat-header {
  background: linear-gradient(135deg, var(--accent-blue), var(--color-violet)) !important;
  color: #fff !important;
  border-bottom: none !important;
}
.chat-header h3 { font-weight: 600; font-size: 0.9rem !important; }
.chat-header button { color: rgba(255,255,255,0.8) !important; }
.chat-header button:hover { color: #fff !important; }
.chat-messages { background-color: var(--bg-page) !important; }
.chat-bubble { border-radius: 12px !important; font-size: 0.875rem !important; }
.chat-bubble.bot {
  background-color: var(--bg-surface-solid) !important;
  border: 1px solid var(--border-light) !important;
  color: var(--text-primary) !important;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02) !important;
}
.chat-bubble.user {
  background: linear-gradient(135deg, var(--accent-blue), var(--color-violet)) !important;
  color: #fff !important;
  border: none !important;
}
.chat-input-area {
  background-color: var(--bg-surface-solid) !important;
  border-top: 1px solid var(--border-light) !important;
  padding: 12px !important;
}
.chat-input-area input {
  border-radius: 12px !important;
  border: 1px solid var(--border-light) !important;
  background-color: var(--bg-page) !important;
  color: var(--text-primary) !important;
  padding: 10px 14px !important;
}
.chat-input-area input:focus {
  border-color: var(--accent-blue) !important;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.2) !important;
  outline: none !important;
}
.chat-input-area button {
  border-radius: 10px !important;
  background: linear-gradient(135deg, var(--accent-blue), var(--color-violet)) !important;
  color: #fff !important;
}

.section-padding { padding: 6rem 1.5rem; position: relative; z-index: 10; }
@media (min-width: 1024px) { .section-padding { padding: 8rem 3rem; } }
.text-balance { text-wrap: balance; }

.mobile-nav-overlay {
  position: fixed; inset: 0; background-color: var(--bg-surface-solid); z-index: 40;
  display: flex; flex-direction: column; padding: 5rem 1.5rem;
}

html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
.lenis.lenis-scrolling iframe { pointer-events: none; }
"""

with open("src/index.css", "w") as f:
    f.write(new_content)
