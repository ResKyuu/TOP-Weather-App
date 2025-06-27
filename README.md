# TOP Weather App

A weather application built for The Odin Project curriculum. Search for any city and get a 5-day weather forecast with a clean, modern interface.

## What it does

- Search weather by city name
- Shows current temperature, humidity, and high/low temps
- Browse through 5-day forecast with navigation buttons
- Switch between Fahrenheit and Celsius
- Works on desktop and mobile

## Built with

- HTML, CSS, and vanilla JavaScript
- Visual Crossing Weather API
- Glass morphism design with animated background

## Setup

1. Clone this repo
2. Get a free API key from [Visual Crossing Weather](https://www.visualcrossing.com/weather-api)
3. Replace `weatherApiKey` in `weather-scripts.js` with your key
4. Open `index.html` in your browser

## How to use

1. Type a city name and hit search
2. Use the left/right arrow buttons to see different days
3. Click the °F/°C toggle to change temperature units

## Features

**Weather Data:**

- Current temperature and conditions
- Humidity percentage
- Daily high and low temperatures
- 5-day forecast navigation
- Weather condition icons

**Interface:**

- Responsive design for all screen sizes
- Smooth animations and transitions
- Error handling for invalid searches
- Clean glass-style cards

## File structure

```
├── index.html           # Main page
├── style.css           # All styling and animations
├── weather-scripts.js  # JavaScript functionality
└── svgs/              # Weather icons and UI elements
```

## API

Uses the Visual Crossing Weather API to fetch:

- 5-day weather forecasts
- Current conditions
- Temperature data in Fahrenheit (converted to Celsius when needed)
- Weather icons and descriptions

## Browser support

Works in modern browsers that support:

- CSS Grid and Flexbox
- ES6+ JavaScript features
- CSS backdrop-filter for glass effects

---

Part of [The Odin Project](https://www.theodinproject.com/) JavaScript curriculum.
