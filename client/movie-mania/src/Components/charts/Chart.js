import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const CustomChart = (props) =>{
    const {graphType, graphTitle, graphData , graphLabels} = props
    return(
        <Chart type = {graphType} data={{                                          
            labels: graphLabels,
            datasets: [
                {
                  label: graphTitle,
                  data: graphData,
                  backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 109, 64, 1)',
                    'rgba(125, 169, 34, 1)',
                    'rgba(225, 99, 251, 1)',
                    'rgba(225, 99, 101, 1)',
                    
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 109, 64, 0.6)',
                    'rgba(125, 169, 34, 0.8)',
                    'rgba(225, 99, 251, 0.3)',
                    'rgba(225, 99, 101, 0.4)',                        
                  ],
                  borderWidth: 1,
                  hoverOffset:20,
                  offset: [20,0,0,0,0,0,0,0,0,0]                     
                },
              ],
        }} />
    )
}



export default CustomChart