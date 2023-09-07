
const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Use port 3000 by default

app.get('/api', (req, res) => {
  const { slack_name, track } = req.query;

  // Get the current day of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDay = daysOfWeek[currentDate.getUTCDay()];

  // Get the current UTC time with +/-2 minutes validation
  const currentUTC = new Date();
  currentUTC.setMinutes(currentUTC.getUTCMinutes() - 2);

  // Construct the JSON response
  const response = {
    slack_name,
    current_day: currentDay,
    utc_time: currentUTC.toISOString(),
    track,
    github_file_url: 'https://github.com/JesusOfLagos/HNG-Stage-One/blob/main/app.js',
    github_repo_url: 'https://github.com/JesusOfLagos/HNG-Stage-One',
    status_code: 200,
  };

  res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
