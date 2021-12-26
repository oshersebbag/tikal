import './TopVehicle.css';
import React, { useState, useEffect } from 'react';
import dataServices from '../../services/data.services';

function TopVehicle() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTopVehicle();

  }, []);

  const getTopVehicle = async () => {
    let topVehicle = await dataServices.getTopVehicle();
    setData(topVehicle);
  }


  function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="top_wrapper">
      {data.length === 0 ?
        <div className="loader_wrapper"><div className="loader"></div></div>
        :
        <div className="table_wrapper">
          <div className="task_title">
            <div className="task-number">TASK1</div>
            <div className="task-description">Use the Star Wars API to find:<br />
              Which vehicle names have the highest sum of population for all its pilots’ home planets?
            </div>
          </div>
          <table className="vehicle_table">
            <tbody>
              <tr>
                <th>Vehicle name</th>
                {data.map((item, i) => <td key={i}><div>{item.name}</div></td>)}
              </tr>
              <tr>
                <th>Related planets and population</th>
                {data.map((item, i) => <td key={i}>{item.homeworldsInfo.map((item, j) => <div key={j}>{item.name} - {numberWithCommas(item.population)}</div>)}</td>)}

              </tr>
              <tr>
                <th>Related pilot names</th>
                {data.map((item, i) => <td key={i}>{item.pilots.map((item, j) => <div key={j}>{item.name}</div>)}</td>)}
              </tr>
            </tbody>
          </table>
        </div>

      }

    </div>
  );
}

export default TopVehicle;