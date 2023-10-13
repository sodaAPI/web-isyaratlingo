import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartsUser() {
  const [userCounts, setUserCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/user");
        const users = response.data;

        const counts = {};

        users.forEach((user) => {
          const createdDate = new Date(user.createdAt);

          const monthYear = createdDate.toLocaleString("default", {
            year: "numeric",
            month: "long",
          });

          if (!counts[monthYear]) {
            counts[monthYear] = 1;
          } else {
            counts[monthYear]++;
          }
        });

        setUserCounts(counts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const months = Object.keys(userCounts);
  const userRegistrationCounts = Object.values(userCounts);

  // Define an array of background colors, one for each month
  const backgroundColors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    // Add more colors as needed
  ];

  const data = {
    labels: months,
    datasets: [
      {
        label: "User Registered",
        data: userRegistrationCounts,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Registrations by Month",
      },
    },
  };

  if (loading) {
    return (
      <span className="loading loading-spinner text-primary loading-lg"></span>
    );
  }

  return <Bar data={data} options={options} />;
}
