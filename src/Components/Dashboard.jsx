import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ openTic, closeTic, progressTic }) => {
  const data = {
    labels: ["Open Tickets", "Closed Tickets", "In Progress Tickets"],
    datasets: [
      {
        label: "Ticket Dashboard",
        data: [openTic, closeTic, progressTic],
        backgroundColor: [
          "rgba(25, 163, 7, 0.5)",
          "rgba(255, 0, 0, 0.7)",
          "rgba(255, 196, 0.5)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        // grid: {
        //   color: 'transparent', // Set grid color to transparent
        // },
        stepSize: 10,  
        ticks: {
          borderColor: 'transparent', // Set tick border color to transparent
          borderWidth: 0,
          callback: function (value) {
            return value.toFixed(0);
          },
        },
        beginAtZero: true,
        
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel.toFixed(0); 
        },
      },
    },
  };

  return (
    <div className=" bg-white grid place-content-center  rounded-lg shadow-lg ">
      <h1 className="font-semibold text-xl text-center">TICKET-GRAPH</h1>
      <Bar  data={data} options={options} />
    </div>
  );
};

export default Dashboard;
