import React, { Component } from 'react';


export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    	hasError: false,
    	error: null,
    	info: null,

    };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ 
    	hasError: true,
    	error: error,
    	info: info
    });

  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
      	<div>
      		<h1>Something went wrong!!</h1>
      		<br /><br />
      		<h1>The ERROR message</h1>
      		{this.state.error.toString()}
      		<br /><br />
      		<h1>The Info message</h1>
      		{this.state.info.componentStack}
      	</div>
    );
    }
    return this.props.children;
  }
}
