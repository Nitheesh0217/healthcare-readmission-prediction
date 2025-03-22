// Animation utilities for modern design elements
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const slideRight = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
};

const slideLeft = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Chart configuration presets
const chartColors = {
  primary: '#3498db',
  secondary: '#2c3e50',
  success: '#2ecc71',
  warning: '#f39c12',
  danger: '#e74c3c',
  light: '#ecf0f1',
  dark: '#34495e'
};

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const label = context.label || '';
          const value = context.raw || 0;
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percentage = Math.round((value / total) * 100);
          return `${label}: ${percentage}% (${value})`;
        }
      }
    }
  }
};

// Theme configuration
const theme = {
  colors: chartColors,
  fonts: {
    body: "'Roboto', sans-serif",
    heading: "'Roboto', sans-serif",
    monospace: "monospace"
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '50%'
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 8px 15px rgba(0, 0, 0, 0.1)'
  },
  animations: {
    fadeIn,
    slideUp,
    slideRight,
    slideLeft,
    staggerContainer
  },
  charts: {
    lineChartOptions,
    barChartOptions,
    pieChartOptions
  }
};

export default theme;
