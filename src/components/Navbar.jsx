import React from 'react'
import './../../src/index.css'

export default function Navbar({ theme, onToggleTheme }) {
    return (
        <nav className="navbar">
            <div className='navbar-container'>
                <h1 className="navbar-title">Weather Tracker</h1>
                <div className='navbar-actions'>
                    <button
                        className="btn btn-outline theme-toggle-btn"
                        onClick={onToggleTheme}
                        aria-label="Toggle theme"
                        title="Toggle theme"
                    >
                        {theme === "dark" ? <i className="fa-solid fa-sun"></i> :
                            <i className="fa-solid fa-moon"></i>}
                    </button>
                    <button className="btn btn-outline refresh-btn" onClick={() => window.location.reload()} title="Refresh Page">
                        <i className="fa-solid fa-rotate" ></i>
                    </button>
                </div>
            </div>
        </nav>
    )
}
