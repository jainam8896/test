import express from 'express';
import dotenv from 'dotenv';
import db from "./model/index.js";
import routes from "./route/index.js";
import swagger from "./src/common/config/swagger.config.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/', (req, res) => {
    res.json({
        status: true,
        app: process.env.APP_NAME,
        message: "API is running successfully 🚀"
    });
});

app.use('/', routes);
// swagger documentation
app.use("/api/documentation", swagger);

// Start Server After DB Connection
async function startServer() {
    try {
        await db.sequelize.authenticate();
        console.log('✅ Database connected successfully.');

        await db.sequelize.sync();
        console.log('✅ Database synced.');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('❌ Database connection failed:', error);
    }
}

startServer();
