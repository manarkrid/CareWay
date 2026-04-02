const mysql = require('mysql2/promise');

async function alterTable() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'careway'
        });
        console.log('Connected to MySQL.');
        await connection.execute(`ALTER TABLE users ADD COLUMN resetToken VARCHAR(255) NULL`);
        await connection.execute(`ALTER TABLE users ADD COLUMN resetTokenExpiry DATETIME NULL`);
        console.log('Columns added successfully.');
        await connection.end();
    } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
            console.log('Columns already exist.');
        } else {
            console.error('Error adding columns:', error);
        }
        process.exit(0);
    }
}
alterTable();
