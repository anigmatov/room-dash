function updateTimeAndDate() {
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  const minutesPadded = minutes.toString().padStart(2, '0');
  const timeString = `${hours12}:${minutesPadded} ${ampm}`;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[now.getDay()];

  let monthName;
  switch (now.getMonth()) {
      case 0: monthName = 'January'; break;
      case 1: monthName = 'February'; break;
      case 2: monthName = 'March'; break;
      case 3: monthName = 'April'; break;
      case 4: monthName = 'May'; break;
      case 5: monthName = 'June'; break;
      case 6: monthName = 'July'; break;
      case 7: monthName = 'August'; break;
      case 8: monthName = 'September'; break;
      case 9: monthName = 'October'; break;
      case 10: monthName = 'November'; break;
      case 11: monthName = 'December'; break;
  }

  const date = now.getDate();
  const year = now.getFullYear();
  const dateString = `${dayName}, ${monthName} ${date}, ${year}`;

  timeElement.textContent = timeString;
  dateElement.textContent = dateString;
}

async function fetchData() {
  try {
      const response = await fetch("/poll");
      if (response.ok) {
          const data = await response.json();
          const temperatureElem = document.getElementById("temperatureValue");
          const currentTempElem = document.getElementById("current-temp");
          const statusLinesElem = document.getElementById("statusLines");

          temperatureElem.innerText = data.temperature ? data.temperature + "°C" : "N/A";
          currentTempElem.innerText = data.temperature ? data.temperature + "°C" : "N/A";

          if (data.statusInfo) {
              const statusParts = data.statusInfo.split(",");
              let power = statusParts.find(part => part.startsWith("POWER")).split(":")[1];
              let mode = statusParts.find(part => part.startsWith("MODE")).split(":")[1];
              let fan = statusParts.find(part => part.startsWith("FAN")).split(":")[1];
              let targetTemp = statusParts.find(part => part.startsWith("TARGET_TEMP")).split(":")[1];

              let powerText = power == "1" ? "On" : "Off";
              let modeText = mode == "1" ? "Cool" : "Heat";
              let fanText = fan == "0" ? "Low" : fan == "1" ? "Medium" : "High";

              statusLinesElem.innerHTML = `
                <div class="status-line">Power: ${powerText}</div>
                <div class="status-line">Mode: ${modeText}</div>
                <div class="status-line">Fan: ${fanText}</div>
                <div class="status-line">Target Temp: ${targetTemp}°C</div>
              `;
          } else {
              statusLinesElem.innerHTML = "N/A";
          }
      } else {
          console.error("Failed to fetch data:", response.status);
      }
  } catch (error) {
      console.error("Fetch error:", error);
  }
}

function toggleTemperatureUnit() {
  const tempElement = document.getElementById('circular-temp');
  const currentTemp = tempElement.textContent;
  const isCelsius = currentTemp.includes('°C');

  let newTemp;
  if (isCelsius) {
      const celsiusValue = parseFloat(currentTemp.replace('°C', ''));
      newTemp = (celsiusValue * 9/5) + 32 + '°F';
  } else {
      const fahrenheitValue = parseFloat(currentTemp.replace('°F', ''));
      newTemp = ((fahrenheitValue - 32) * 5/9).toFixed(2) + '°C';
  }

  tempElement.textContent = newTemp;
}

document.getElementById('circular-temp').addEventListener('click', toggleTemperatureUnit);

document.getElementById('decrease-temp').addEventListener('click', () => {
  const tempElement = document.getElementById('target-temp');
  let tempValue = parseInt(tempElement.textContent);
  tempValue -= 1;
  tempElement.textContent = tempValue + '°C';
});

document.getElementById('increase-temp').addEventListener('click', () => {
  const tempElement = document.getElementById('target-temp');
  let tempValue = parseInt(tempElement.textContent);
  tempValue += 1;
  tempElement.textContent = tempValue + '°C';
});

// Fetch data every 5 seconds
setInterval(fetchData, 5000);

// Initial fetch
fetchData();

// Update time and date every second
setInterval(updateTimeAndDate, 1000);
updateTimeAndDate();
