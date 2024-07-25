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

// $("#slider").roundSlider({
//   radius: 80,
//   circleShape: "half-top",
//   sliderType: "min-range",
//   min: 16,
//   max: 30,
//   value: 22,
//   showTooltip: true,
//   handleSize: 20,
//   handleShape: "dot",
//   lineColor: "#0056b3",
//   circleColor: "#0056b3",
//   tooltipColor: "#000",
//   tooltipBorderColor: "#0056b3",
//   tooltipFontSize: "16px",
//   startAngle: 180,
//   endAngle: 360,
//   step: 1
// });

// // Function to update slider value
// function updateSliderValue(newValue) {
//   $("#slider").roundSlider("value", newValue);
// }

// // Button click handlers
// $("#decrease-btn").on('click', function() {
//   let currentValue = $("#slider").roundSlider("value");
//   if (currentValue > 16) {
//     updateSliderValue(currentValue - 1);
//   }
// });

// $("#increase-btn").on('click', function() {
//   let currentValue = $("#slider").roundSlider("value");
//   if (currentValue < 30) {
//     updateSliderValue(currentValue + 1);
//   }
// });

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
  tooltipColor: "#000",
  tooltipBorderColor: "#0056b3",
  tooltipFontSize: "16px",
  startAngle: 180,
  endAngle: 360,
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

// Update time and date every second
setInterval(updateTimeAndDate, 1000);
