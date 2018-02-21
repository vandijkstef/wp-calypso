/** @format */

/**
 * External dependencies
 */

import React from 'react';
import PropTypes from 'prop-types';
import { extent as d3Extent } from 'd3-array';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { line as d3Line } from 'd3-shape';
import classNames from 'classnames';
import D3Base from 'woocommerce/components/d3/base';

const HorizontalBar = ( { className, data } ) => {
	const drawChart = svg => {
		return svg.append( 'text' ).text( data );
	};

	const getParams = () => ( {
		width: 20,
		height: 20,
	} );

	return (
		<D3Base
			className={ classNames( 'horizontal-bar', className ) }
			drawChart={ drawChart }
			getParams={ getParams }
		/>
	);
};

export default HorizontalBar;
