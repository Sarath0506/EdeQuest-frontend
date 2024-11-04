import React, { useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

const InstructorChart = ({ courses }) => {
    const [currentChart, setCurrentChart] = useState('Student');

    const getRandomColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
            colors.push(color);
        }
        return colors;
    };

    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            },
        ],
    };

    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    padding: 15,
                    font: {
                        size: 12,
                    },
                    color: '#ffffff',
                },
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-2xl font-bold text-white">Visualize</p>
            <div className="flex gap-4">
                <button
                    onClick={() => setCurrentChart('Student')}
                    className={`py-2 px-4 rounded-md ${currentChart === 'Student' ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                    Student
                </button>
                <button
                    onClick={() => setCurrentChart('Income')}
                    className={`py-2 px-4 rounded-md ${currentChart === 'Income' ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                    Income
                </button>
            </div>
            <div className="flex justify-center items-center h-72 w-72 mx-auto">
                <Pie data={currentChart === 'Student' ? chartDataForStudents : chartDataForIncome} options={options} />
            </div>
        </div>
    );
};

export default InstructorChart;
