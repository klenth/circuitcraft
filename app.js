const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback for any other route, serve the React app
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'build', 'index.html');
    res.sendFile(indexPath);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});