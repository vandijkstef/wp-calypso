/** @format */

/**
 * External dependencies
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import D3Base from 'woocommerce/components/d3/base';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';

/**
 * Internal dependencies
 */
import { formatValue } from 'woocommerce/app/store-stats/utils';

const HorizontalBar = ( { className, data, extent, margin, currency, height, width } ) => {
	const numberFormat = currency ? 'currency' : 'number';
	const drawChart = ( svg, { scale, height: calculatedHeight } ) => {
		const xPos = scale( data );
		svg
			.append( 'rect' )
			.attr( 'x', 0 )
			.attr( 'y', 0 )
			.attr( 'width', xPos )
			.attr( 'height', calculatedHeight );

		const text = svg
			.append( 'text' )
			// Render text offscreen to aquire its length
			.attr( 'x', -9999 )
			.attr( 'y', -9999 )
			.attr( 'text-anchor', 'end' )
			.attr( 'fill', 'white' )
			.text( formatValue( data, numberFormat, currency ) );

		const isOffsetText = xPos - ( text.node().getComputedTextLength() + 5 ) <= 0;

		text
			.attr( 'class', isOffsetText ? 'is-offset-text' : '' )
			.attr( 'text-anchor', isOffsetText ? 'start' : 'end' )
			.attr( 'x', isOffsetText ? xPos + 5 : xPos - 5 )
			.attr( 'y', calculatedHeight / 2 + margin.top );

		return svg;
	};

	const getParams = node => ( {
		width: width || node.offsetWidth,
		height: height || node.offsetHeight,
		scale: d3ScaleLinear()
			.domain( extent )
			.range( [ 0, node.offsetWidth - margin.right ] ),
	} );

	return (
		<D3Base
			className={ classNames( 'horizontal-bar', className ) }
			drawChart={ drawChart }
			getParams={ getParams }
		/>
	);
};

HorizontalBar.propTypes = {
	className: PropTypes.string,
	currency: PropTypes.string,
	data: PropTypes.number.isRequired,
	extent: PropTypes.arrayOf( PropTypes.number ).isRequired,
	height: PropTypes.number,
	margin: PropTypes.shape( {
		top: PropTypes.number,
		right: PropTypes.number,
		bottom: PropTypes.number,
		left: PropTypes.number,
	} ),
	width: PropTypes.number,
};

HorizontalBar.defaultProps = {
	margin: {
		top: 4,
		right: 4,
		bottom: 4,
		left: 4,
	},
};

export default HorizontalBar;
