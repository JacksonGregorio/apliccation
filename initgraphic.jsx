import { createChart } from 'lightweight-charts';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

const initialData = [
  { time: '2018-10-11', value: 52.89 },
  { time: '2018-10-12', value: 51.65 },
  { time: '2018-10-13', value: 51.56 },
  { time: '2018-10-14', value: 50.19 },
  { time: '2018-10-15', value: 51.86 },
  { time: '2018-10-16', value: 51.25 },
];
const currentDate = new Date(initialData[initialData.length - 1].time);

export const App = (props) => {
  const {
    colors: {
      backgroundColor = 'white',
      lineColor = '#2962FF',
      textColor = 'black',
    } = {},
  } = props;

  const [chartLayoutOptions, setChartLayoutOptions] = useState({});
  const series1 = useRef(null);
  const series2 = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setChartLayoutOptions({
      background: {
        color: backgroundColor,
      },
      textColor,
    });
  }, [backgroundColor, textColor]);

  // Função para gerar um novo ponto aleatório
  const generateRandomPoint = () => {
    currentDate.setDate(currentDate.getDate() + 1);
    return {
      time: currentDate.toISOString().slice(0, 10),
      value: 53 - 2 * Math.random(),
    };
  };

  // Efeito para iniciar a atualização da série
  useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        const next = generateRandomPoint();
        series1.current.update(next);
        series2.current.update(next);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [started]);

  useLayoutEffect(() => {
    const chart = createChart(document.getElementById('chart'), {
      ...chartLayoutOptions,
      width: 600,
      height: 300,
    });

    const newSeries1 = chart.addLineSeries({ color: lineColor });
    newSeries1.setData(initialData);
    series1.current = newSeries1;

    // Adicionando a série de linha vermelha
    const newSeries2 = chart.addLineSeries({ color: 'red' });
    newSeries2.setData(initialData);
    series2.current = newSeries2;

    chart.timeScale().fitContent();
    return () => {
      chart.remove();
    };
  }, [chartLayoutOptions, lineColor]);

  return (
    <>
      <button type="button" onClick={() => setStarted((current) => !current)}>
        {started ? 'Stop updating' : 'Start updating series'}
      </button>
      <div id="chart"></div>
    </>
  );
};
