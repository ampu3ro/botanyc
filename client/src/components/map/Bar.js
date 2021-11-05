import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import useResizeObserver from './useResizeObserver';
import { useTheme } from '@mui/styles';

const Bar = ({ data }) => {
  const wrapperRef = useRef();
  const dims = useResizeObserver(wrapperRef);

  const svgRef = useRef();
  const barRef = useRef();
  const yRef = useRef();

  const theme = useTheme();
  const fill = theme.palette.text.primary;

  useEffect(() => {
    if (!dims || !data) return;

    const dataBar = data.sort((a, b) => d3.descending(a.value, b.value));

    const dimsBar = {
      margin: { top: 25, right: 40, bottom: 0, left: 0 },
      width: dims.width,
      height: dims.height,
    };

    const x = d3
      .scaleLinear()
      .range([dimsBar.margin.left, dimsBar.width - dimsBar.margin.right])
      .domain([0, d3.max(dataBar, (d) => d.value)]);

    const y = d3
      .scaleBand()
      .range([dimsBar.margin.top, dimsBar.height - dimsBar.margin.bottom])
      .domain(dataBar.map((d) => d.label))
      .paddingInner(0.5);

    const bars = d3.select(barRef.current);

    bars
      .selectAll('rect')
      .data(dataBar)
      .join('rect')
      .attr('x', (d) => x(0))
      .attr('y', (d) => y(d.label))
      .attr('height', y.bandwidth())
      .attr('width', (d) => x(d.value))
      .style('fill', fill);

    bars
      .selectAll('text')
      .data(dataBar)
      .join('text')
      .attr('x', (d) => x(d.value) + 3)
      .attr('y', (d) => y(d.label) + y.bandwidth() / 2 + 4)
      .text((d) => parseInt(d.value).toLocaleString('en'))
      .style('font-size', '8pt')
      .style('fill', fill);

    d3.select(yRef.current)
      .selectAll('text')
      .data(dataBar)
      .join('text')
      .attr('class', 'MuiTypography-body1')
      .attr('x', (d) => 0)
      .attr('y', (d) => y(d.label) - 4)
      .text((d) => d.label)
      .style('fill', fill);
  }, [data, dims, fill]);

  return (
    <div ref={wrapperRef}>
      <svg ref={svgRef} width="100%" height={`${(20 * data.length) / 5}vh`}>
        <g ref={barRef} />
        <g ref={yRef} />
      </svg>
    </div>
  );
};

export default Bar;
