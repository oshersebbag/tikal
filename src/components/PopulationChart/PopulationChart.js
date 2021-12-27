import './PopulationChart.css';
import React, { useState, useEffect } from 'react';
import dataServices from '../../services/data.services';

function PopulationChart() {
    const [data, setData] = useState([]);
    const REQUESTED_PLANETS = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];

    const fetchPlanets = async () => {
        const planets = await dataServices.getChartData(REQUESTED_PLANETS);
        setData(planets);
    }

    useEffect(() => {
        fetchPlanets();
    });


    function nFormatter(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    }

    return (
        <div className="population_chart_wrapper">
            {data.length === 0 ?
                <div className="loader_wrapper"><div className="loader"></div></div>
                :
                <div className="task2_wrapper">
                    <div className="task_title">
                        <div className="task-number">TASK2</div>
                        <div className="task-description">create a bar chart that compares the home planets’ own population, <br />
                            without using any charts libraries.
                        </div>
                    </div>

                    <div className="chart_wrapper">
                        {data.map((item, i) =>

                            <div className="planet_wrapper" key={i}>

                                <div className="population_wrapper">{nFormatter(item.population)}</div>
                                <div className="svg_wrapper">
                                    <svg className="mysvg" height={item.height}>
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#75590a" stopOpacity="1" />
                                                <stop offset="100%" stopColor="#302507" stopOpacity="1" />
                                            </linearGradient>
                                        </defs>
                                        <rect width="100%" height={item.height} rx="7" ry="7" fill="url(#gradient)" className="chart_rect" />Sorry, your browser does not support inline SVG.
                                    </svg>
                                </div>

                                <div className="name_wrapper">{item.name}</div>

                            </div>)}
                    </div>
                    <div className="log-msg">* The chart is presented in logarithmic scale </div>
                </div>
            }

        </div>
    );
}

export default PopulationChart;