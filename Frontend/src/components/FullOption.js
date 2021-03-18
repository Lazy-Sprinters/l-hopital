import React, { useState, ComponentProps } from 'react';
import { PieChart } from 'react-minimal-pie-chart';


function FullOption(props) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(undefined);

  const data = props.data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: 'grey',
      };
    }
    return entry;
  });

  const lineWidth = 60;

  return (
    <PieChart
      style={{
        fontFamily:
          '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
        fontSize: '0.5vw',
        // boxShadow: "-10px 25px 50px #a5a89f",
        // borderRadius:'50%',
        fontStyle:'bold',
        height:'16.75vw',
        marginTop:'2vw'
      }}
      data={data}
      radius={PieChart.defaultProps.radius - 6}
      lineWidth={60}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      segmentsShift={(index) => (index === selected ? 6 : 1)}
      animate
      label={({ dataEntry }) => dataEntry.value ? dataEntry.label : null}
       // Math.round(dataEntry.percentage) + '%'}
      labelPosition={100 - lineWidth/2 -10}
      labelStyle={{
        fill: '#000',
        // opacity: 0.75,
        pointerEvents: 'none',
      }}
      onClick={(_, index) => {
        setSelected(index === selected ? undefined : index);
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
    />
  );
}

export default FullOption;