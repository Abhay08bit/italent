import React from 'react';
import BarChart from 'react-bar-chart';
 
const data = [
  {text: '2015', value: 500}, 
  {text: '2016', value: 300},
  {text: '2017', value: 700}, 
  {text: '2018', value: 800},
  {text: '2019', value: 900},
  {text: '2020', value: 1300}   
];
 
const margin = {top: 20, right: 20, bottom: 30, left: 40};
 
class IBarChart extends React.Component {
  state = { 
    width: 400,
    height: 200 
  };
  
 
  componentDidMount = () => {
    window.onresize = () => {
     this.setState({width: this.refs.root.offsetWidth}); 
    };
  }
 
  handleBarClick(element, id){ 
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  }
 
  render() {
    return (
        <div ref='root'>
            <div style={{width: '50%'}}> 
                <BarChart
                  width={this.state.width}
                  height={this.state.height}
                  margin={margin}
                  data={data}
                  onBarClick={this.handleBarClick}/>
            </div>
        </div>
    );
  }
}

export default IBarChart;