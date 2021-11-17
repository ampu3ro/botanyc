import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { grey, green } from '@mui/material/colors';
import useResizeObserver from './useResizeObserver';

const Bar = ({ data, condensed }) => {
  const wrapperRef = useRef();
  const dims = useResizeObserver(wrapperRef);

  const svgRef = useRef();
  const barRef = useRef();
  const tipRef = useRef();

  const height = `${((condensed ? 2 : 20) * data.length) / 5}vh`;

  useEffect(() => {
    if (!dims || !data) return;

    const dataBar = data.sort((a, b) => d3.descending(a.value, b.value));

    const dimsBar = {
      margin: { top: 0, right: 0, bottom: 10, left: 0 },
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
      .paddingInner(condensed ? 0.2 : 0.5);

    const bars = d3.select(barRef.current);

    const fill = grey[800];
    const fillSel = green[500];
    const fillHover = grey[500];
    const fillHoverSel = green[200];

    const rect = bars
      .selectAll('rect')
      .data(dataBar)
      .join('rect')
      .attr('x', (d) => x(0))
      .attr('y', (d) => y(d.label))
      .attr('height', y.bandwidth())
      .attr('width', (d) => x(d.value))
      .attr('fill', (d) => (d.selected ? fillSel : fill));

    d3.select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('z-index', 9999)
      .style('opacity', 0);

    if (condensed) {
      rect
        .on('mouseover', function (e, d) {
          d3.select(this).attr('fill', (d) =>
            d.selected ? fillHoverSel : fillHover
          );
          d3.select('#tooltip')
            .style('left', `${e.pageX + 5}px`)
            .style('top', `${e.pageY - 40}px`)
            .style('opacity', 0.9)
            .style('background-color', 'white')
            .style('padding', '10px')
            .html(`<b>${d.label}:</b> <span>${d.value.toLocaleString()}</span>`)
            .style('font-size', '10pt');
        })
        .on('mouseout', function (e) {
          d3.select(this).attr('fill', (d) => (d.selected ? fillSel : fill));
          d3.select('#tooltip').style('opacity', 0);
        });
    } else {
      bars
        .selectAll('.yLabel')
        .data(dataBar)
        .join('text')
        .attr('class', 'yLabel')
        .attr('x', (d) => 0)
        .attr('y', (d) => y(d.label) - 4)
        .text((d) => d.label)
        .style('fill', fill);

      bars
        .selectAll('.xLabel')
        .data(dataBar)
        .join('text')
        .attr('class', 'xLabel')
        .attr('x', (d) => x(d.value) + 3)
        .attr('y', (d) => y(d.label) + y.bandwidth() / 2 + 4)
        .text((d) => parseInt(d.value).toLocaleString())
        .style('font-size', '8pt')
        .style('fill', fill);
    }
  }, [data, dims, condensed]);

  return (
    <div ref={wrapperRef}>
      <svg ref={svgRef} width="100%" height={height}>
        <g ref={barRef} />
        <g ref={tipRef} />
      </svg>
    </div>
  );
};

export default Bar;
