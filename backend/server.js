const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.set('trust proxy', true);

app.use(cors({
    origin: '*', // Allows any origin to hit the local endpoints
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 1. Create a dedicated isolated API router namespace
const apiRouter = express.Router();

// 2. Attach routes neatly to the router container
apiRouter.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' 
    });
});

apiRouter.get('/data', async (req, res) => {
    try {
        const tasks = await mongoose.connection.db.collection('tasks').find({}).toArray();
        res.json({ message: "Hello from the student API!", data: tasks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Bind the router footprint universally to the '/api' base path
app.use('/api', apiRouter);

// Database Connection backoff loop remains exactly the same below...

// Database Connection with backoff retry loop logic
const connectWithRetry = () => {
    console.log('Attempting MongoDB connection footprint setup...');
    mongoose.connect(MONGO_URI)
        .then(() => console.log('🚀 MongoDB connected successfully.'))
        .catch(err => {
            console.error('❌ Database connection failure. Retrying in 5 seconds...', err);
            setTimeout(connectWithRetry, 5000);
        });
};
connectWithRetry();

app.listen(PORT, () => {
    console.log(`Server running in production footprint on port ${PORT}`);
});