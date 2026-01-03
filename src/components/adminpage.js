import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export const AdminPage = () => {
    const {LoggedIn,Role}=useSelector((state)=>{
        return state.userslice
    })
    
    const navigate=useNavigate()

    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        assigned: 0,
        pending: 0
    });

    useEffect(() => {
        if(!LoggedIn || Role!=="admin"){
            navigate("/")
        }else{
              const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:9000/api/allcomp", {
                    headers: {
                        "Authorization": token
                    }
                });
                const result = await res.json();
                if (result.statuscode === 1) {
                    const data = result.compdata;
                    const completed = data.filter(item => item.Status === "completed").length;
                    const assigned = data.filter(item => item.Status === "Assigned to worker").length;
                    const pending = data.length - completed - assigned;

                    setStats({
                        total: data.length,
                        completed,
                        assigned,
                        pending
                    });
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
        }
      
    }, [LoggedIn,Role]);

    const pieData = {
        labels: ['Completed', 'Assigned', 'Pending'],
        datasets: [
            {
                label: '# of Complaints',
                data: [stats.completed, stats.assigned, stats.pending],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const barData = {
        labels: ['Total Complaints'],
        datasets: [
            {
                label: 'Completed',
                data: [stats.completed],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Assigned',
                data: [stats.assigned],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
                label: 'Pending',
                data: [stats.pending],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            }
        ],
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-lg-12 text-center mb-4">
                    <h2>Admin Dashboard - Complaint Statistics</h2>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-8 mb-4">
                    <div className="card shadow p-4">
                        <h4 className="text-center">Status Distribution</h4>
                        <Pie data={pieData} />
                    </div>
                </div>
                <div className="col-lg-7 col-md-10 mb-4">
                    <div className="card shadow p-4">
                        <h4 className="text-center">Complaint Overview</h4>
                        <Bar 
                            data={barData} 
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            stepSize: 1
                                        }
                                    }
                                }
                            }} 
                        />
                    </div>
                </div>
            </div>
            <div className="row mt-4 text-center">
                <div className="col-md-3">
                    <div className="card bg-primary text-white p-3 shadow">
                        <h3>{stats.total}</h3>
                        <p>Total</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-success text-white p-3 shadow">
                        <h3>{stats.completed}</h3>
                        <p>Completed</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-info text-white p-3 shadow">
                        <h3>{stats.assigned}</h3>
                        <p>Assigned</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-danger text-white p-3 shadow">
                        <h3>{stats.pending}</h3>
                        <p>Pending</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
