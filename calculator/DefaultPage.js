import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class DefaultPage extends Component {
  static propTypes = {
    calculator: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Calculator />
    )
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    calculator: state.calculator,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultPage);

class CalculatorDisplay extends React.Component {

  constructor(){
        super();
        this.state = {
            calc: 0,
        };
        
    }

  render() {
    return (
      <div className="CalculatorDisplay">
        <h1>{this.state.calc}</h1>
      </div>
    )
  }
}
class CalculatorNumber extends React.Component {


  render() {
    return (
      <div className="CalculatorNumber">
        <button className="number" onClick={this.Click}>
          <h1>{this.props.value}</h1>
        </button>
      </div>
    )
  }

  Click = () =>
  {
    console.log([null,this.props.value]);
    this.props.callBackFromParent([null,this.props.value]);
  }
}
class CalculatorArithmitic extends React.Component {
  render() {
    return (
      <div className="CalculatorArithmetic">
        <button className="value" onClick={this.Click}>
          <h1>{this.props.value}</h1>
        </button>
      </div>
    )
  }

  Click = () =>
  {
    this.props.callBackFromParent([this.props.value,null]);
  }
}
class CalculatorEquals extends React.Component {
  render() {
    return (
      <div className="CalculatorEquals">
        <button onClick={this.Click()} className="value">
        <h1>=</h1>
        </button>
      </div>
    )
  }

  Click = () =>
  {
    this.props.callBackFromParent([this.props.value,null]);
  }
}
class CalculatorClear extends React.Component {
  render() {
    return (
      <div className="CalculatorClear">
        <button onClick={this.Click()} className="value">
          <h1>clear</h1>
        </button>
      </div>
    )
  }

  Click()
  {
    this.props.callBackFromParent(['0',null]);
  }
}

class Calculator extends React.Component {
  render() {
    return (
      <div className="Calculator">
        <CalculatorDisplay value={this.state.value}/>
        <CalculatorClear callBackFromParent={this.Callback}/> <CalculatorArithmitic value='/' callBackFromParent={this.Callback}/> <br />
        <CalculatorNumber value='0' callBackFromParent={this.Callback}/> <CalculatorNumber value='1' callBackFromParent={this.Callback}/> <CalculatorNumber value='2' callBackFromParent={this.Callback}/> <CalculatorArithmitic value='+' callBackFromParent={this.Callback}/> <br />
        <CalculatorNumber value='3' callBackFromParent={this.Callback}/> <CalculatorNumber value='4' callBackFromParent={this.Callback}/> <CalculatorNumber value='5' callBackFromParent={this.Callback}/> <CalculatorArithmitic value='-' callBackFromParent={this.Callback}/><br />
        <CalculatorNumber value='6' callBackFromParent={this.Callback}/> <CalculatorNumber value='7' callBackFromParent={this.Callback}/> <CalculatorNumber value='8' callBackFromParent={this.Callback}/> <CalculatorEquals callBackFromParent={this.Callback}/>
        
      </div>
    )
  }

  Callback = (childData) =>
  {
    if(childData[0] === null)
    {
      this.setState({value: this.state.value+childData[1]});
    }
    else
    {
      if(childData[0] === '+' || childData[0] === '-' || childData[0] === '/' || childData[0] === '*')
      {
        this.setState({old:   this.state.value,
                       value: 0,
                       arith: childData[0]});
      }
      else if(childData[0] === '0')
      {
        this.setState({value: 0});
      }
      else if(childData[0] === '=')
      {
        if(this.state.arith === '+')
        {
          this.setState({value: this.state.old+this.state.value});
        }
        else if(this.state.arith === '-')  
        {
          this.setState({value: this.state.old-this.state.value});
        }
        else if(this.state.arith === '/')  
        {
          this.setState({value: this.state.old/this.state.value});
        }
        else if(this.state.arith === '*')  
        {
          this.setState({value: this.state.old*this.state.value});
        }
      }
      
    }
    
  }

  constructor(){
        super();
        this.state = {
            value: 0,
            old: 0,
            arith: '',
        };
    }
}
