# 🌦️ Weather Tracker - Real-Time Weather Dashboard

A comprehensive, professional weather tracking application developed as part of the **IBM SkillBuild** internship program through **Edunet Foundation**. This modern React-based dashboard provides real-time weather information with an intuitive user interface and advanced features.

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.6-646CFF.svg)](https://vitejs.dev/)
[![OpenWeather API](https://img.shields.io/badge/API-OpenWeather-orange.svg)](https://openweathermap.org/api)
[![License](https://img.shields.io/badge/License-MIT-green.svg)]()

---

## 📋 Project Overview

**Weather Tracker** is a sophisticated weather monitoring application that delivers comprehensive meteorological data through a clean, responsive interface. Built with modern web technologies, it showcases proficiency in React development, API integration, and user experience design.

### 🎯 Project Context
- **Program**: IBM SkillBuild Internship
- **Partner**: Edunet Foundation
- **Focus**: Frontend Development & API Integration
- **Technology Stack**: React.js, Vite, OpenWeather API

---

## ✨ Key Features

### 🔍 **Advanced Search Capabilities**
- **Multi-city search** - Search weather by city name globally
- **ZIP code search** - Quick location lookup using postal codes
- **Coordinate-based search** - Precise location targeting using latitude/longitude
- **Smart search validation** - Input validation and error handling

### 🌍 **Location Services**
- **Auto-location detection** - Automatic GPS-based location detection
- **IP-based fallback** - Secondary location detection via IP geolocation
- **Location privacy** - User consent-based location access

### 📊 **Comprehensive Weather Data**
- **Real-time weather conditions** - Current temperature, humidity, pressure
- **3-day forecast** - Extended weather predictions with detailed breakdowns
- **Wind information** - Wind speed, direction, and visual indicators
- **Visibility & cloud coverage** - Complete atmospheric conditions
- **Sunrise/sunset times** - Solar information for planning

### 🎨 **Modern User Interface**
- **Responsive design** - Seamless experience across all devices
- **Dark/Light theme toggle** - User preference-based theming
- **Interactive weather cards** - Detailed weather information display
- **Animated weather icons** - Visual weather representation
- **Loading animations** - Professional loading states and transitions

### 🔧 **Advanced Functionality**
- **Detailed weather sidebar** - Expandable detailed weather view with:
  - Smart weather tips and recommendations
  - Resizable interface
  - Comprehensive weather metrics
  - Activity suggestions based on conditions
- **Local data persistence** - Weather data stored locally for offline access
- **Toast notifications** - User-friendly feedback system
- **Interactive maps integration** - Direct links to Google Maps for locations
- **Data refresh capabilities** - Manual and automatic data updates

### 🎯 **Smart Features**
- **Weather-based recommendations** - Intelligent tips based on current conditions
- **Multiple location tracking** - Monitor weather for multiple cities simultaneously
- **Duplicate prevention** - Smart detection of already-added locations
- **Error handling** - Robust error management with user-friendly messages

---

## 🛠️ Technical Stack

### **Frontend Technologies**
- **React 19.1.1** - Modern React with latest features and hooks
- **Vite 7.1.6** - Fast build tool and development server
- **JavaScript ES6+** - Modern JavaScript features and syntax
- **CSS3** - Advanced styling with CSS custom properties and animations
- **HTML5** - Semantic markup and accessibility features

### **External APIs & Services**
- **OpenWeatherMap API** - Comprehensive weather data provider
- **Geolocation API** - Browser-based location services
- **IP Geolocation API** - IP-based location fallback service

### **Development Tools**
- **ESLint** - Code quality and consistency
- **Vite Plugin React** - React development optimization
- **FontAwesome** - Professional icon library

### **Additional Libraries**
- **Axios** - HTTP client for API requests
- **React Hooks** - State management and lifecycle handling

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16+ recommended)
- npm or yarn package manager
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yashwanth252005/weather-tracker.git
   cd weather-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file in root directory
   echo "VITE_API_KEY=your_openweather_api_key_here" > .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📱 Usage Guide

### Basic Operations
1. **Automatic Location**: Grant location permission for instant local weather
2. **Manual Search**: Use the search form to add weather for any location
3. **View Details**: Click "More Info" on any weather card for comprehensive data
4. **Forecast**: Toggle 3-day forecast for extended planning
5. **Theme**: Switch between light and dark modes using the theme toggle

### Search Options
- **City Name**: Enter city name (e.g., "London", "New York")
- **ZIP Code**: Enter postal code (e.g., "10001", "SW1A 1AA")
- **Coordinates**: Enter latitude and longitude for precise locations

---

## 🎥 Demo & Documentation

### Repository
👉 **[GitHub Repository](https://github.com/yashwanth252005/Weather-Tracker)**

---

## 🏗️ Project Architecture

```
src/
├── components/           # Reusable UI components
│   ├── WeatherCard.jsx  # Individual weather display cards
│   ├── WeatherForm.jsx  # Search input form
│   ├── WeatherSidebar.jsx # Detailed weather view
│   ├── WeatherLoader.jsx # Loading animations
│   ├── Toast.jsx        # Notification system
│   ├── Navbar.jsx       # Navigation header
│   └── Footer.jsx       # Application footer
├── hooks/               # Custom React hooks
│   └── useToast.js     # Toast notification management
├── assets/             # Static assets and images
├── App.jsx            # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles and themes
```

---

## 🌟 Key Learning Outcomes

### Technical Skills Developed
- **React Development**: Advanced component architecture and state management
- **API Integration**: RESTful API consumption and error handling  
- **Responsive Design**: Cross-device compatibility and user experience
- **Modern JavaScript**: ES6+ features, async/await, and modern patterns
- **Build Tools**: Vite configuration and optimization
- **Version Control**: Git workflow and collaborative development

### Professional Skills Enhanced
- **Problem Solving**: Complex feature implementation and debugging
- **User Experience**: Interface design and usability considerations
- **Code Quality**: Clean code practices and maintainable architecture
- **Documentation**: Technical documentation and code commenting

---

## 📧 Contact & Support

**Developer**: Yashwanth E S  
**LinkedIn**: [linkedin.com/in/yashwanth-es](https://in.linkedin.com/in/yashwanth-es)  
**Program**: IBM SkillBuild through Edunet Foundation

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **IBM SkillBuild** - For providing the internship opportunity and learning platform
- **Edunet Foundation** - For facilitating the program and mentorship
- **OpenWeatherMap** - For providing comprehensive weather data API
- **React Community** - For excellent documentation and community support

---

*Built with ❤️ during IBM SkillBuild Internship Program*
