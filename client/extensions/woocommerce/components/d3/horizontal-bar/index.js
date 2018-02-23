/** @format */

/**
 * External dependencies
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import { extent as d3Extent } from 'd3-array';
// import { scaleLinear as d3ScaleLinear } from 'd3-scale';
// import { line as d3Line } from 'd3-shape';
import classNames from 'classnames';
import D3Base from 'woocommerce/components/d3/base';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';

const HorizontalBar = ( { className, data, extent, margin } ) => {
	const drawChart = ( svg, { scale, height } ) => {
		svg
			.append( 'rect' )
			.attr( 'x', 0 )
			.attr( 'y', 0 )
			.attr( 'width', scale( data ) )
			.attr( 'height', 12 )
			.attr( 'fill', 'blue' );

		const text = svg
			.append( 'text' )
			.attr( 'x', scale( data ) )
			.attr( 'y', height / 2 )
			.attr( 'text-anchor', 'end' )
			.attr( 'fill', 'white' )
			.text( data );

		const textWidth = text.node().getComputedTextLength();

		if ( scale( data ) - textWidth <= 0 ) {
			text.attr( 'fill', 'black' ).attr( 'text-anchor', 'start' );
		}

		return svg;
	};

	const getParams = node => ( {
		width: node.offsetWidth,
		height: 20,
		scale: d3ScaleLinear()
			.domain( extent )
			.range( [ margin.left, node.offsetWidth - margin.right ] ),
	} );

	return (
		<D3Base
			className={ classNames( 'horizontal-bar', className ) }
			drawChart={ drawChart }
			getParams={ getParams }
		/>
	);
};

HorizontalBar.defaultProps = {
	margin: {
		top: 4,
		right: 4,
		bottom: 4,
		left: 0,
	},
};

export default HorizontalBar;
