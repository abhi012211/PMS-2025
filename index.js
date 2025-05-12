import dotenv from 'dotenv';
dotenv.config()
import app from './app.js';
import db from './config/db.js'
const PORT = process.env.PORT || 5000;
// Connect to the database
db().then(() => {
    // console.log('Connected to the database');
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process with failure
});
