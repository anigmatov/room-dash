// Function to send GET request with correct endpoint and payload
function sendGetRequest(endpoint, value) {
  const deviceId = "72";
  const lampId = "1";
  let url;

  switch(endpoint) {
      case 'power':
          url = `http://172.25.25.20/api/switch_cond3/cond2_status/${deviceId}/${value}`;
          break;
      case 'mode':
          url = `http://172.25.25.20/api/switch_cond3/cond2_mode/${deviceId}/${value}`;
          break;
      case 'fan':
          url = `http://172.25.25.20/api/switch_cond3/cond2_fan/${deviceId}/${value}`;
          break;
      case 'temperature':
          url = `http://172.25.25.20/api/switch_cond3/cond2_settemp/${deviceId}/${value}`;
          break;
      case 'lamp':
          url = `http://172.25.25.20/api/switch_light/${lampId}/${value}`;
          break;
      default:
          console.error('Unknown endpoint:', endpoint);
          return;
  }

  fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      console.log(`GET request to ${endpoint} successful:`, data);
  })
  .catch(error => {
      console.error('Error with GET request:', error);
  });
}

// Initialize the round slider
$("#slider").roundSlider({
  radius: 80,
  circleShape: "half-top",
  sliderType: "min-range",
  min: 16,
  max: 30,
  value: 22,
  showTooltip: true,
  handleSize: 20,
  handleShape: "dot",
  lineColor: "#0056b3",
  circleColor: "#0056b3",
  tooltipColor: "#fff",
  step: 1,
  change: function(e) {
      sendGetRequest('temperature', e.value);
  },
  drag: function(e) {
      sendGetRequest('temperature', e.value);
  }
});

// Button click handlers
$("#decrease-btn").on('click', function() {
  let currentValue = $("#slider").roundSlider("option", "value");
  if (currentValue > 16) {
      updateSliderValue(currentValue - 1);
  }
});

$("#increase-btn").on('click', function() {
  let currentValue = $("#slider").roundSlider("option", "value");
  if (currentValue < 30) {
      updateSliderValue(currentValue + 1);
  }
});

$("#power-icon").on('click', function() {
  $(this).toggleClass("active");
  let isOn = $(this).hasClass("active");
  $(this).html(isOn ? '<i class="fa-solid fa-toggle-on"></i>' : '<i class="fa-solid fa-toggle-off"></i>');
  sendGetRequest('power', isOn ? 1 : 0);
});

$("#mode-icon").on('click', function() {
  $(this).toggleClass("active");
  let isCool = $(this).hasClass("active");
  $(this).html(isCool ? '<i class="fas fa-fire"></i>' : '<i class="fas fa-snowflake"></i>');
  $(this).css({
      "background-color": isCool ? "#e57373" : "#e9f5ff",
      "color": isCool ? "#fff" : "#201E43"
  });
  sendGetRequest('mode', isCool ? 'HEAT' : 'COOL');
});

$("#fan-icon").on('click', function() {
  let modes = ['AUTO', 'LOW', 'MEDIUM', 'HIGH'];
  let currentMode = $(this).data('mode') || 'AUTO';
  let currentIndex = modes.indexOf(currentMode);
  let nextIndex = (currentIndex + 1) % modes.length;
  let nextMode = modes[nextIndex];
  
  $(this).data('mode', nextMode);
  $(this).html(nextMode === 'AUTO' ? '<i class="fa-solid fa-battery-full"></i>' : 
                            nextMode === 'LOW' ? '<i class="fa-solid fa-battery-quarter"></i>' : 
                            nextMode === 'MEDIUM' ? '<i class="fa-solid fa-battery-three-quarters"></i>' : 
                            '<i class="fa-solid fa-battery-full"></i>');
  
  sendGetRequest('fan', nextMode);
});

$("#lamp-status").on('click', function() {
  let isOn = $(this).text().includes("On");
  $(this).html(isOn ? '<i class="fas fa-lightbulb"></i> Off' : '<i class="fas fa-lightbulb"></i> On');
  sendGetRequest('lamp', isOn ? 0 : 1);
});

// Function to update the slider value and send GET request
function updateSliderValue(newValue) {
  $("#slider").roundSlider("option", "value", newValue);
  sendGetRequest('temperature', newValue);
}

const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = function (event) {
  document.getElementById('current-temp').innerText = `${event.data} °C`;
};

// Update time and date
function updateTimeAndDate() {
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');
  const now = new Date();
  
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const minutesPadded = minutes.toString().padStart(2, '0');
  const secondsPadded = seconds.toString().padStart(2, '0');
  const timeString = `${hours}:${minutesPadded}:${secondsPadded}`;

  const days = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
  const dayName = days[now.getDay()];

  let monthName;
  switch (now.getMonth()) {
      case 0: monthName = 'Yanvar'; break;
      case 1: monthName = 'Fevral'; break;
      case 2: monthName = 'Mart'; break;
      case 3: monthName = 'Aprel'; break;
      case 4: monthName = 'May'; break;
      case 5: monthName = 'Iyun'; break;
      case 6: monthName = 'Iyul'; break;
      case 7: monthName = 'Avgust'; break;
      case 8: monthName = 'Sentyabr'; break;
      case 9: monthName = 'Oktyabr'; break;
      case 10: monthName = 'Noyabr'; break;
      case 11: monthName = 'Dekabr'; break;
  }

  const date = now.getDate();
  const year = now.getFullYear();

  timeElement.textContent = timeString;
  dateElement.textContent = `${dayName}, ${monthName} ${date}, ${year}`;
}

// Call updateTimeAndDate every second
setInterval(updateTimeAndDate, 1000);

// Wi-Fi popup functionality
document.querySelector(".wifi").addEventListener("click", function() {
  document.getElementById("wifi-popup").style.display = "block";
});

document.querySelector(".popup .close").addEventListener("click", function() {
  document.getElementById("wifi-popup").style.display = "none";
});
