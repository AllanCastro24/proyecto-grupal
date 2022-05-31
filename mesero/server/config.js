const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'localhost',
    user: 'test',
    password: 'test',
    port: 3306,
    database: 'app_test'
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;