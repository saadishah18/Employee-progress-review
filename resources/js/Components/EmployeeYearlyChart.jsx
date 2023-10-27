// import "./styles.css";
import React, {useEffect, useState} from 'react'
import {render} from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts'
import {value} from "lodash/seq";
export default function EmployeeYearlyChart(props) {
    const ratings =[];
    props.yearly_feedback.map((value,i) => {
        ratings.push([value.feedback_month,value.rating]);
    })
    const managers =[];
    props.yearly_feedback.map((value,i) => {
        managers.push([value.manager_name]);
    })
    const [loading, setLoading] = useState(false)
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: 0,
                style: {
                    fontSize: '14px',
                    color: '#3A3A3A',
                    fontFamily: 'product_sansregular'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Employee Yearly Rating'
            }
        },
        legend: {
            enabled: true
        },
        tooltip: {
            pointFormat: 'Monthly rating:  <b>{point.y:.1f} </b>'
        },
        plotOptions: {
            series: {
                borderRadius: 12,
                borderRadiusTop: 12,
            },
            column: {
                colorByPoint: true
            }
        },
        colors: [props.color],
        credits: {
            enabled: false
        },
        series: [{
            name: 'Teams Rating',
            data: ratings,
            style: {
                fontSize: '14px',
                fontFamily: 'product_sansregular'
            },
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]

    }

    /*    const api=()=>{
            setLoading(true)
        //    api call
            setLoading(false)

        }*/
    /* useEffect(()=>{
         api()
     },[])*/
    return (
        <div>
            {
                loading
                    ?
                    'Loading '
                    :
                    <HighchartsReact highcharts={Highcharts} options={options}/>

            }
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
