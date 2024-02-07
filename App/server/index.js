const app = require('./app');

const PORT = process.env.PORT || 6969;

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});