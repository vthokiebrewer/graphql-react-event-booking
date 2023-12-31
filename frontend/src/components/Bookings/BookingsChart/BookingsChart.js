import React from 'react';

import { Bar } from 'react-chartjs';


const BOOKING_BUCKETS = {
  'Cheap': {
    min: 0,
    max: 100 
  },
  'Normal': {
    min: 100,
    max: 200,
  },
  'Expensive': {
    min: 200,
    max: 10000000
  }
};

const bookingsChart = props => {
  const chartData = {labels: [], datasets: []};
  let values = [];
  for (const bucket in BOOKING_BUCKETS) {
    const filteredBookingsCount = props.bookings.reduce((prev, current) => {
      if (
        current.event.price > BOOKING_BUCKETS[bucket].min &&
        current.event.price < BOOKING_BUCKETS[bucket].max
        ) {
        return prev + 1;
      }
      else {
        return prev;
      }
    }, 0);
    values.push(filteredBookingsCount);
    chartData.labels.push(bucket);
    chartData.datasets.push({
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        hightlightFill: "rgba(220,200,220,0.75)",
        highlightStroke: "rgba(220,200,220,0.5)",
        data: values
    }); 
    values = [...values];
    values[values.length - 1] = 0;
    
    
  }
  return <div className='bookings-controls'><Bar data={chartData} /></div>;
};

export default bookingsChart;