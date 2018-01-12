/** @format */

/**
 * External dependencies
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { select as d3Select } from 'd3-selection';

/**
 * Internal dependencies
 */

export default class Sparkline extends Component {
	static propTypes = {
		className: PropTypes.string,
		data: PropTypes.number.isRequired,
		margin: PropTypes.object,
		maxValue: PropTypes.number.isRequired,
	};

	static defaultProps = {
		margin: {
			top: 4,
			right: 4,
			bottom: 4,
			left: 4,
		},
	};

	state = {
		width: 0,
		xScale: {},
	};

	componentDidMount() {
		window.addEventListener( 'resize', this.handleResize );
		this.handleResize();
	}
	componentDidUpdate() {
		this.redrawChart();
	}
	componentWillReceiveProps() {
		this.updateScales();
	}
	// Remove listener
	componentWillUnmount() {
		window.removeEventListener( 'resize', this.handleResize );
		delete this.node;
	}

	setNodeRef = node => {
		this.node = node;
	};

	updateScales = newWidth => {
		const { margin, maxValue } = this.props;
		const width = newWidth || this.state.width;
		this.setState(
			{
				xScale: d3ScaleLinear()
					.domain( [ 0, maxValue ] )
					.range( [ margin.left, width - margin.right ] ),
				width,
			},
			this.redrawChart
		);
	};

	handleResize = () => {
		this.updateScales( this.node.offsetWidth );
	};

	redrawChart = () => {
		const { width } = this.state;
		d3Select( this.node )
			.selectAll( 'svg' )
			.remove();
		const newNode = d3Select( this.node )
			.append( 'svg' )
			// .attr( 'class', 'sparkline__viewbox' )
			.attr( 'viewBox', `0 0 ${ width } ${ 20 }` );
		// .attr( 'preserveAspectRatio', 'xMidYMid meet' )
		// .append( 'g' );
		this.drawSparkline( newNode );
	};

	drawSparkline = context => {
		// const { xScale } = this.state;
		const { data } = this.props;
		return context
			.append( 'text' )
			.attr( 'y', 10 )
			.text( data );
	};

	render() {
		const classes = classNames( this.props.className );
		return <div className={ classes } ref={ this.setNodeRef } />;
	}
}
