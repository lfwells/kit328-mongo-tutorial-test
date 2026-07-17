import { useState, useEffect } from 'react';
import './index.css';

export default function App() {
    // 1. Setup our state buckets for the data lifecycle
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Trigger the network request automatically when the page loads
    useEffect(() => {
        // Dynamically handles local dev ('/api') and production subfolders ('/kit328-mongo-tutorial-test/api')
        const API_BASE = `${import.meta.env.BASE_URL}api`.replace(/\/+/g, '/'); 

        fetch(`${API_BASE}/data`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Server returned code: ${res.status}`);
                }
                return res.json();
            })
            .then((payload) => {
                // Save the array returned from your Express api endpoint
                setTasks(payload.data || []);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Fetch failure:", err);
                setError(err.message);
                setIsLoading(false);
            });
    }, []); // <-- Crucial: The empty array tells React to run this exactly ONCE on mount

    return (
        <div className="app-container">
            <h1>KIT328 Mongo Frontend</h1>
            
            {/* 3. Conditional state rendering */}
            {isLoading && (
                <div className="status loading">
                    <p>Connecting to backend API and fetching records...</p>
                </div>
            )}

            {error && (
                <div className="status error" style={{ color: 'red', background: '#fee', padding: '1rem', borderRadius: '4px' }}>
                    <p><strong>Connection Error:</strong> {error}</p>
                </div>
            )}

            {!isLoading && !error && (
                <div className="data-display">
                    <h3>Live Database Records ({tasks.length})</h3>
                    {tasks.length === 0 ? (
                        <p>The MongoDB collection is currently empty. Seed some data to see it here!</p>
                    ) : (
                        <ul className="task-list">
                            {tasks.map((task, index) => (
                                <li key={task._id || index} style={{ margin: '0.5rem 0' }}>
                                    <strong>{task.title || 'Unnamed Task'}</strong> — 
                                    <span> {task.status || 'Pending'}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}