import { Components, registerComponent, Utils } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import Chart from 'chart.js';

class IPV4GraphInstance extends Component {
  componentDidMount() {
    const ctx = document.getElementById('ipv4-graph__wrapper').getContext('2d');
    const inIpv4 = this.props.netv4Stats.in;
    const outIpv4 = this.props.netv4Stats.out;
    const private_inIpv4 = this.props.netv4Stats.private_in;
    const private_outIpv4 = this.props.netv4Stats.private_out;

    let getChartxAxisIn = [];
    let getChartyAxisIn = [];
    let getChartyAxisInTooltip = [];

    let getChartxAxisOut = [];
    let getChartyAxisOut = [];
    let getChartyAxisOutTooltip = [];

    let getChartxAxisPrivateIn = [];
    let getChartyAxisPrivateIn = [];
    let getChartyAxisPrivateInTooltip = [];

    let getChartxAxisPrivateOut = [];
    let getChartyAxisPrivateOut = [];
    let getChartyAxisPrivateOutTooltip = [];

    for (let i = 0; i < inIpv4.length; i++) {
      getChartxAxisIn.push(inIpv4[i][0]);
      getChartyAxisIn.push((inIpv4[i][1] / 1024).toFixed(2));
      getChartyAxisInTooltip.push(Utils.timeZoneFormat(inIpv4[i][0]));
    }

    for (let i = 0; i < outIpv4.length; i++) {
      getChartxAxisOut.push(Utils.timeZoneFormat(outIpv4[i][0]));
      getChartyAxisOut.push((outIpv4[i][1] / 1024).toFixed(2));
      getChartyAxisOutTooltip.push(Utils.timeZoneFormat(outIpv4[i][0]));
    }

    for (let i = 0; i < private_inIpv4.length; i++) {
      getChartxAxisPrivateIn.push(Utils.timeZoneFormat(private_inIpv4[i][0]));
      getChartyAxisPrivateIn.push((private_inIpv4[i][1] / 1024).toFixed(2));
      getChartyAxisPrivateInTooltip.push(Utils.timeZoneFormat(private_inIpv4[i][0]));
    }

    for (let i = 0; i < private_outIpv4.length; i++) {
      getChartxAxisPrivateOut.push(Utils.timeZoneFormat(private_outIpv4[i][0]));
      getChartyAxisPrivateOut.push((private_outIpv4[i][1] / 1024).toFixed(2));
      getChartyAxisPrivateOutTooltip.push(Utils.timeZoneFormat(private_outIpv4[i][0]));
    }

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            backgroundColor: 'rgba(0, 178, 89, 0.65)',
            borderColor: 'transparent',
            label: 'Public Inbound',
            data: getChartyAxisIn,
            pointRadius: 0,
          },
          {
            backgroundColor: 'rgba(3, 206, 104, 0.65)',
            borderColor: 'transparent',
            label: 'Public Outbound',
            data: getChartyAxisOut,
            pointRadius: 0,
          },
          {
            backgroundColor: 'rgba(108, 117, 125, 0.65)',
            borderColor: 'transparent',
            label: 'Private Inbound',
            data: getChartyAxisPrivateIn,
            pointRadius: 0,
          },
          {
            backgroundColor: 'rgba(183, 189, 193, 0.65)',
            borderColor: 'transparent',
            label: 'Private Outbound',
            data: getChartyAxisPrivateOut,
            pointRadius: 0,
          },
        ],
        labels: getChartxAxisIn,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: 'x-axis'
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            type: 'time',
            time: {
              unitStepSize: 3,
              displayFormats: {
                quarter: 'HH:MM'
              }
            },
            ticks: {
              stepSize: 2 // <----- This prop sets the stepSize
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              // forces step size to be 5 units
              stepSize: 0.5 // <----- This prop sets the stepSize
            },
            gridLines: {
              // borderDash: [6, 4],
              // color: "#dee2e6"
              display: false
            },
          }]
        }
      }
    });
  }

  render () {
    return (
      <div className="section-distributions bg-light mb-1">
        <h6 className="title-6">IPv4 Traffic (Kibit/s): Last 24 hrs</h6>
        <div className="ipv4-graph__wrapper">
          <canvas id="ipv4-graph__wrapper" height="300"></canvas>
        </div>
      </div>
    )
  }
}

registerComponent({ name: 'IPV4GraphInstance', component: IPV4GraphInstance });
