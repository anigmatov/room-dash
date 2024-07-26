// VAQT VA KUN

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
  const dateString = `${dayName}, ${date} ${monthName}, ${year}`;

  timeElement.textContent = timeString;
  dateElement.textContent = dateString;
}

//  VAQT VA KUN TUGADI

// TEMPERATURA TANLASH

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
      // Update the slider's value in the tooltip when it changes
      $("#slider").roundSlider("option", "tooltipFormat", e.value + "°C");
  }
});

// Function to update slider value
function updateSliderValue(newValue) {
  $("#slider").roundSlider("option", "value", newValue);
}

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

//  TEMPERATURA TANLASH TUGADI


//  STATUS VA MODE

$("#power-icon").on('click', function() {
  $(this).toggleClass("active");
  let isOn = $(this).hasClass("active");
  $(this).html(isOn ? '<i class="fa-solid fa-toggle-off"></i>' : '<i class="fa-solid fa-toggle-on"></i>');
});

// Toggle Mode (Cool/Heat)
$("#mode-icon").on('click', function() {
  $(this).toggleClass("active");
  let isCool = $(this).hasClass("active");
  $(this).html(isCool ? '<i class="fas fa-fire"></i>' : '<i class="fas fa-snowflake"></i>');
  $(this).css({
      "background-color": isCool ? "#e57373" : "#e9f5ff",
      "color": isCool ? "#fff" : "#201E43"
  });
});

// Toggle Fan Modes
$("#fan-icon").on('click', function() {
  let modes = ["<i class='fa-solid fa-battery-quarter'></i>", "<i class='fa-solid fa-battery-half'></i>", "<i class='fa-solid fa-battery-three-quarters'></i>", "<i class='fa-solid fa-battery-full'></i>"];
  let currentMode = $(this).data("mode") || 0;
  currentMode = (currentMode + 1) % modes.length;
  $(this).data("mode", currentMode);
  $(this).html(modes[currentMode]);
});

// Toggle Lamp Status
$("#lamp-status").on('click', function() {
  $(this).toggleClass("on");
  let isOn = $(this).hasClass("on");
  $(this).html(isOn ? '<i class="fas fa-lightbulb"></i> On' : '<i class="fas fa-lightbulb"></i> Off');
});

//  STATUS VA MODE TUGADI


//  WI-FI POPUP

$(document).ready(function() {
  // Open the popup when the "WI FI" div is clicked
  $('.popup-wifi').on('click', function() {
      $('#wifi-popup').css('display', 'flex'); // Show the popup
  });

  // Close the popup when the "x" span is clicked
  $('.close').on('click', function() {
      $('#wifi-popup').css('display', 'none'); // Hide the popup
  });

  // Close the popup when clicking outside of the popup content
  $(window).on('click', function(event) {
      if ($(event.target).is('#wifi-popup')) {
          $('#wifi-popup').css('display', 'none'); // Hide the popup
      }
  });
});

//  WI-FI POPUP TUGADI

// Update time and date every second
setInterval(updateTimeAndDate, 1000);
