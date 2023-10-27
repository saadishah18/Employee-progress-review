// import "./styles.css";
import React from 'react'
import {render} from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'



export default function EmployeeWorkingChart(props) {
    let chart_data = [];
    props?.count?.department_users_count.map((user,i) => {
        if(i == 0){
            chart_data.push({name: user.name, y: parseInt(user.y),sliced: false,
                selected: false,});
        }
        else{
            chart_data.push({name: user.name, y: parseInt(user.y)});
        }
    })

    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: '',
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
            point: {
                valueSuffix: '%',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                },
                showInLegend: true,
            },
        },
        credits: {
            enabled: false,
        },
        series: [
            {
                name: '',
                colorByPoint: true,
                innerSize: '80%',
                data: chart_data,
            },

        ],
        colors: props.count.colors,
    }

    return (
        <div className="relative">
            <HighchartsReact highcharts={Highcharts} options={options}/>
            <div
                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center items-center flex-col">
                <h5 className="text-black font-bold text-4xl">{props.count.total_users}</h5>
                <span className="text-gray1 text-base">Total Employee</span>
            </div>
        </div>
        // <BarChart
        //   width={1000}
        //   height={400}
        //   data={data}
        //   margin={{
        //     top: 5,
        //     right: 30,
        //     left: 20,
        //     bottom: 5,
        //   }}
        // >
        //   <CartesianGrid strokeDasharray="1" />
        //   <XAxis dataKey="name" />
        //   <YAxis dataKey="uv" />
        //   <Bar dataKey="uv" fill="#82ca9d" />
        // </BarChart>
    )
}
