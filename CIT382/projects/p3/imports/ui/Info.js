import React, { Component } from 'react';
import { Image, Menu, Header, Segment, Accordion, Icon } from 'semantic-ui-react';



//This code is from Accordion - Semantic UI website
export default class Info extends Component {

 state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
	
 render() {
    const { activeIndex } = this.state

    return (
      <Accordion>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Compilers
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            A JavaScript compiler takes JavaScript Code, Transforms it and returns JavaScript code in a different format. The most common
            {' '}use case is to take ES6 syntax and transform it into syntax that older browers are capable of interpreting.
            {' '}Babel is the compiler most commonly used with React.
          </p>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Bundlers
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            Bundlers take JavaScript and Css code written as separate modules (often hundreds of them),
            {' '}and combine them together into a few files better optimized for the browers. Some bundlers
            {' '}commonly used in React applications include Webpack and Browserify.
          </p>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
          <Icon name='dropdown' />
          CDN
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <p>
            CDN stands for Content Delivery Network. CDNs deliver cached, static content from a network of a servers across the globe.
          </p>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Elements
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          <p>
            React elements are the building blocks of React applications. One might confuse elements with a more widely known concept of "components".
            {' '}An element describes what you want to see on the screen. React elements are immutable.
          </p>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 4} index={4} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Components
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 4}>
          <p>
            React components are small, reusable pieces of code that return a React element to be rendered to the page. 
            {' '}The simplest version of React component is a plain JavaScript function that returns a React element.
          </p>
        </Accordion.Content>
		
		(note that I got this code directly from the website)
      </Accordion>
    );
}
}




/*
	constructor(props){ 
		super(props);
		this.state = {
			activeIndex: 0
		}

	handleOnClick = (e, )

	}
	render() {
        return (
            <Segment>
                <Header as="h1">Information Page</Header>
				
            </Segment>
        );
    }*/

