const weatherApiKey = "J84WEBWE969TB7ZLUHWPUAGHS";
const weatherSearchInput = document.querySelector(".citySearchInput");
const weatherSearchButton = document.querySelector(".confirmCitySeach");
const weatherContents = document.querySelector(".weatherContents");
const weatherItems = document.querySelector(".weatherItems");
const weatherItemNextBtn = document.querySelector(".weatherNextButton");
const weatherItemPreviousBtn = document.querySelector(".weatherPreviousButton");
const tempUnitToggleBtn = document.querySelector(".tempUnitToggle");
const fahrenheitOption = document.querySelector(".unit-option:first-child");
const celsiusOption = document.querySelector(".unit-option:last-child");
let tempUnitState = 0;
let weatherDateIndex = 0;
let currentWeatherData = null;

//elements for displaying error handling
const errorTextEl = document.querySelector(".errorText");
const errorTextDiv = document.querySelector(".errorTextContainer");

weatherSearchButton.addEventListener("click", () => {
  if (weatherSearchInput.value !== "" && weatherSearchInput !== "undefined") {
    const [startDate, endDate] = getCurrentDateFormated();
    const seachUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherSearchInput.value}/${startDate}/${endDate}/?key=${weatherApiKey}`;
    testApi(seachUrl);
  } else {
    errorTextEl.textContent = "Search Term cannot be empty!";
    toggleShow([errorTextDiv]);
    toggleHidden([weatherContents]);
  }
});

async function testApi(seachUrl) {
  try {
    const response = await fetch(seachUrl, { mode: "cors" });
    if (!response.ok) {
      throw new Error(`HTTP request Error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    currentWeatherData = responseData;
    setWeatherInformation(tempUnitState);
    setWeatherLocation(responseData);

    toggleShow([weatherContents]);
    toggleHidden([errorTextDiv]);
  } catch {
    errorTextEl.textContent = `Couldnt find any results with given City name!`;
    toggleShow([errorTextDiv]);
    toggleHidden([weatherContents]);
  }
}

function getCurrentDateFormated() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const currentDateFormatted = `${year}-${month}-${day}`;

  const futureDate = new Date(date);
  futureDate.setDate(date.getDate() + 4);
  const futureYear = futureDate.getFullYear();
  const futureMonth = String(futureDate.getMonth() + 1).padStart(2, "0");
  const futureDay = String(futureDate.getDate()).padStart(2, "0");
  const futureDateFormatted = `${futureYear}-${futureMonth}-${futureDay}`;

  return [currentDateFormatted, futureDateFormatted];
}

function setWeatherIcon(iconId) {
  const weatherIconEl = document.querySelector(".weatherIcon");
  weatherIconEl.src = `./svgs/${iconId}.svg`;
}

function setWeatherInformation(tempUnitState) {
  const currentTempTextEl = document.querySelector(".weatherCurrentTemp");
  const currentHumindityEl = document.querySelector(".weatherCurrentHumidity");
  const highestTempEl = document.querySelector(".weatherCurrentHighestTemp");
  const lowestTempEl = document.querySelector(".weatherCurrentLowestTemp");
  const dateTimeEl = document.querySelector(".weatherDayDate");

  setWeatherIcon(currentWeatherData.days[weatherDateIndex].icon);

  // Update with cleaner labels
  currentHumindityEl.textContent = `Humidity ${currentWeatherData.days[weatherDateIndex].humidity}%`;
  dateTimeEl.textContent = `${currentWeatherData.days[weatherDateIndex].datetime}`;

  if (tempUnitState === 0) {
    currentTempTextEl.textContent = `${currentWeatherData.days[weatherDateIndex].temp}°F`;
    highestTempEl.textContent = `High ${currentWeatherData.days[weatherDateIndex].tempmax}°F`;
    lowestTempEl.textContent = `Low ${currentWeatherData.days[weatherDateIndex].tempmin}°F`;
  } else {
    const [currentTempCelcius, maxTempCelcius, minTempCelcius] =
      changeMetricCelcius();
    currentTempTextEl.textContent = `${currentTempCelcius}°C`;
    highestTempEl.textContent = `High ${maxTempCelcius}°C`;
    lowestTempEl.textContent = `Low ${minTempCelcius}°C`;
  }
}

function setWeatherLocation(responseData) {
  const locationText = document.querySelector(".locationText");
  locationText.textContent = responseData.resolvedAddress;
}

function toggleShow(arr) {
  arr.forEach((element) => {
    element.classList.remove("hidden");
    element.classList.add("show");
  });
}

function toggleHidden(arr) {
  arr.forEach((element) => {
    element.classList.remove("show");
    element.classList.add("hidden");
  });
}

weatherItemNextBtn.addEventListener("click", () => {
  if (weatherDateIndex !== 4) {
    weatherDateIndex += 1;
  } else {
    weatherDateIndex = 0;
  }
  setWeatherInformation(tempUnitState);
});

weatherItemPreviousBtn.addEventListener("click", () => {
  if (weatherDateIndex === 0) {
    weatherDateIndex = 4;
  } else {
    weatherDateIndex -= 1;
  }
  setWeatherInformation(tempUnitState);
});

tempUnitToggleBtn.addEventListener("click", () => {
  if (tempUnitState === 0) {
    tempUnitState += 1;
    setWeatherInformation(tempUnitState);
    updateTempUnitToggleState(tempUnitState);
  } else {
    tempUnitState = 0;
    setWeatherInformation(tempUnitState);
    updateTempUnitToggleState(tempUnitState);
  }
});

function changeMetricCelcius() {
  let currentTempCelcius = (
    ((currentWeatherData.days[weatherDateIndex].temp - 32) * 5) /
    9
  ).toFixed(1);
  let maxTempCelcius = (
    ((currentWeatherData.days[weatherDateIndex].tempmax - 32) * 5) /
    9
  ).toFixed(1);
  let minTempCelcius = (
    ((currentWeatherData.days[weatherDateIndex].tempmin - 32) * 5) /
    9
  ).toFixed(1);

  return [
    parseFloat(currentTempCelcius),
    parseFloat(maxTempCelcius),
    parseFloat(minTempCelcius),
  ];
}

function updateTempUnitToggleState(tempUnitState) {
  if (tempUnitState === 0) {
    // Fahrenheit is active
    fahrenheitOption.classList.add("active");
    celsiusOption.classList.remove("active");
  } else {
    // Celsius is active
    fahrenheitOption.classList.remove("active");
    celsiusOption.classList.add("active");
  }
}
