const sequelize = require('../config/database');
const User = require('../models/user');

async function initializeDatabase() {
    try {
        // Sync database
        await sequelize.sync({ force: true });

        // Create test user with password '123'
        const testUser = await User.create({
            username: 'testuser',
            password: '123'  // Plain text password now
        });

        console.log('Test user created successfully');
        console.log('Username:', testUser.username);
        console.log('Password:', testUser.password);
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await sequelize.close();
    }
}

initializeDatabase();
