import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = props => {
	const {
		data,
		colors: {
			backgroundColor = 'white',
			lineColor = '#2962FF',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chartInstance.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chartInstance = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
			});
			chartInstance.timeScale().fitContent();

			const areaSeries = chartInstance.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			areaSeries.setData(data);

			const initialData2WithTime = initialData2.map(item => ({
				time: Date.now(), // Adicionando a data atual em milissegundos
				value: item.value,
			}));

			const lineSeries = chartInstance.addLineSeries({ color: 'red' }); // Adicionando a série de linha vermelha
			lineSeries.setData(initialData2WithTime); // Configurando os dados para seguir initialData2WithTime

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chartInstance.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};

const initialData = [
	{ time: '2018-12-22', value: 32.51 },
	{ time: '2018-12-23', value: 31.11 },
	{ time: '2018-12-24', value: 27.02 },
	{ time: '2018-12-25', value: 27.32 },
	{ time: '2018-12-26', value: 25.17 },
	{ time: '2018-12-27', value: 28.89 },
	{ time: '2018-12-28', value: 25.46 },
	{ time: '2018-12-29', value: 23.92 },
	{ time: '2018-12-30', value: 22.68 },
	{ time: '2018-12-31', value: 22.67 },
];

const initialData2 = [
	{ time: '2018-12-22', value: 51 },
	{ time: '2018-12-23', value: 11 },
	{ time: '2018-12-24', value: 2 },
	{ time: '2018-12-25', value: 32 },
	{ time: '2018-12-26', value: 17 },
	{ time: '2018-12-27', value: 89 },
	{ time: '2018-12-28', value: 46 },
	{ time: '2018-12-29', value: 92 },
	{ time: '2018-12-30', value: 68 },
	{ time: '2018-12-31', value: 67 },
];

export function Grap(props) {
	return (
		<ChartComponent {...props} data={initialData}></ChartComponent>
	);
}
