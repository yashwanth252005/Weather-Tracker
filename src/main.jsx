import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  return saved || "light";
};

const Root = () => {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const onToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <StrictMode>
      <Navbar onToggleTheme={onToggleTheme} theme={theme} />
      <App theme={theme} setTheme={setTheme} />
      <Footer />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<Root />);
