// import "./styles.css";
import React, {useEffect, useState} from 'react'
import { render } from 'react-dom'
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

// const data = [
//   {
//     name: 'UI/UX',
//     pv: 7900,
//     uv: 1,
//   },
//   {
//     name: 'BD',
//     pv: 1000,
//     uv: 2,
//   },
//   {
//     name: 'Android',
//     pv: 9800,
//     uv: 3,

export default function TeamsRatingChart(props) {
    const [loading,setLoading]=useState(false)
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
                text: ''
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: ''
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
        colors: [
            '#00CC6F',
            '#FFCC00',
            '#FB275D',
            '#A657DD',
            '#4353FF',
            '#00CFF4',
            '#B129D2'
        ],
        credits: {
            enabled: false
        },
        series: [{
            name: 'Teams Rating',
            data: props.ratings,
            style: {
                fontSize: '14px',
                fontFamily: 'product_sansregular'
            },
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
                <HighchartsReact highcharts={Highcharts} options={options} />

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
