import express, { Request, Response } from 'express';
import { utcToZonedTime, format } from 'date-fns-tz';

const app = express();
const port = process.env.PORT || 3000; // Use port 3000 by default

app.get('/api', (req: Request, res: Response) => {
  const { slack_name, track } = req.query;

  // Get the current day of the week
  const timeZone = 'UTC';
  const currentDate = new Date();
  const currentDay = format(utcToZonedTime(currentDate, timeZone), 'dddd', { timeZone });

  // Get the current UTC time with +/-2 minutes validation
  const currentUTC = new Date();
  currentUTC.setMinutes(currentUTC.getUTCMinutes() - 2);

  // Format the UTC time as "2023-09-07T21:21:16Z"
  const formattedUTC = format(currentUTC, 'yyyy-MM-dd\'T\'HH:mm:ssXXX', { timeZone });

  // Construct the JSON response
  const response = {
    slack_name,
    current_day: currentDay,
    utc_time: formattedUTC,
    track,
    github_file_url: 'https://github.com/username/repo/blob/main/file_name.ext',
    github_repo_url: 'https://github.com/username/repo',
    status_code: 200,
  };

  res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
