import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser()); // Add cookie parser middleware
app.use((req, res, next) => { // set headers to each response
  // Set specific origin instead of wildcard when using credentials
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Required for credentials

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
})

app.use('/auth', authRoutes)

app.use('/', (req, res, next) => {
  res.status(200).send('<p>Hello from our backend.</p>');
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});