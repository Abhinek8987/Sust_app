import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './App.css';  // Import your custom CSS

function Home() {
    const [theme, setTheme] = useState('light'); // State for theme mode
    const [data, setData] = useState([
        { name: 'Monday', el: 400, wa: 20, amt: 2400 },
        { name: 'Tuesday', el: 200, wa: 30, amt: 2210 },
        { name: 'Wed', el: 1800, wa: 50, amt: 2290 },
        { name: 'Thursday', el: 1200, wa: 40, amt: 2000 },
        { name: 'Friday', el: 800, wa: 40, amt: 2181 },
        { name: 'Saturday', el: 2400, wa: 80, amt: 2500 },
        { name: 'Sunday', el: 2412, wa: 80, amt: 2100 },
    ]);

    const [alerts, setAlerts] = useState([]);
    const [waterMessages, setWaterMessages] = useState([]);
    const [averageCost, setAverageCost] = useState(1201);  // New state for average cost

    const checkLimits = (value, type) => {
        const limitEl = 2000;
        const limitWaterHigh = 90;
        const limitWaterLow = 50;

        if (type === 'electricity') {
            if (value > limitEl) {
                setAlerts(prev => [...prev, "Electricity usage exceeds the limit of 2000W!"]);
            }
        } else if (type === 'water') {
            if (value > limitWaterHigh) {
                setWaterMessages(prev => [...prev, "High water usage detected: Extra rinse applied."]);
            } else if (value < limitWaterLow) {
                setWaterMessages(prev => [...prev, "Low water usage detected: Underload or check water supply."]);
            }
        }
    };

    const randomizeData = () => {
        setAlerts([]);
        setWaterMessages([]);

        const newData = data.map((day) => {
            // Ensure newEl and newWa are greater than 0
            const newEl = Math.floor(Math.random() * 3000) + 1;  // Minimum of 1
            const newWa = Math.floor(Math.random() * 100) + 1;   // Minimum of 1

            checkLimits(newEl, "electricity");
            checkLimits(newWa, "water");

            return {
                ...day,
                el: newEl,
                wa: newWa,
            };
        });

        setData(newData);

        // Generate random average cost between 1200 and 3000
        const newCost = Math.floor(Math.random() * (3000 - 1200 + 1)) + 1200;
        setAverageCost(newCost);  // Update the average cost state
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            randomizeData();
        }, 30000);  // Update data every 30 seconds

        return () => clearInterval(intervalId);
    }, [data]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <main className={`main-container ${theme}`}>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
                {/* Theme Toggle Button */}
                <button onClick={toggleTheme} className="theme-toggle-btn">
                    Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>CUSTOMER NAME</h3>
                        <BsPeopleFill className='card_icon' />
                    </div>
                    <h2>ANETTE FERNANDES</h2>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>CATEGORIES</h3>
                        <BsFillGrid3X3GapFill className='card_icon' />
                    </div>
                    <h1>01</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>AVERAGE COST</h3>
                        <BsFillArchiveFill className='card_icon' />
                    </div>
                    <h1>{averageCost}</h1> {/* Display the random average cost */}
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>ALERTS</h3>
                        <BsFillBellFill className='card_icon' />
                    </div>
                    <h1>{alerts.length}</h1>
                </div>
            </div>

            {/* Alerts Section */}
            <div className="alerts-section">
                {alerts.length > 0 && (
                    <div className="alert-box">
                        {alerts.map((alert, index) => (
                            <p key={index} className="alert-text">
                                {alert}
                            </p>
                        ))}
                    </div>
                )}

                {waterMessages.length > 0 && (
                    <div className="water-messages">
                        {waterMessages.map((message, index) => (
                            <p key={index} className="water-message-text">
                                {message}
                            </p>
                        ))}
                    </div>
                )}
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="el" fill="#8884d8" animationEasing="ease-in-out" animationDuration={1500} />
                        <Bar dataKey="wa" fill="#82ca9d" animationEasing="ease-in-out" animationDuration={1500} />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="el" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="wa" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </main>
    );
}

export default Home;
