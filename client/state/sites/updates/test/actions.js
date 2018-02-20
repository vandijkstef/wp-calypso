/** @format */

/**
 * External dependencies
 */
import { expect } from 'chai';
import sinon from 'sinon';

/**
 * Internal dependencies
 */
import {
	siteUpdatesReceiveAction,
	siteUpdatesRequestAction,
	siteUpdatesRequestSuccessAction,
	siteUpdatesRequestFailureAction,
} from '../actions';
import {
	SITE_UPDATES_RECEIVE,
	SITE_UPDATES_REQUEST,
	SITE_UPDATES_REQUEST_SUCCESS,
	SITE_UPDATES_REQUEST_FAILURE,
} from 'state/action-types';

describe( 'actions', () => {
	const siteId = 2916284;
	const spy = sinon.spy();

	beforeEach( () => {
		spy.reset();
	} );

	describe( '#siteUpdatesReceiveAction()', () => {
		test( 'should return a site updates receive action object', () => {
			const updates = {
				plugins: 1,
			};
			const action = siteUpdatesReceiveAction( siteId, updates );

			expect( action ).to.eql( {
				type: SITE_UPDATES_RECEIVE,
				siteId,
				updates,
			} );
		} );
	} );

	describe( '#siteUpdatesRequestAction()', () => {
		test( 'should return a site updates request action object', () => {
			const action = siteUpdatesRequestAction( siteId );

			expect( action ).to.eql( {
				type: SITE_UPDATES_REQUEST,
				siteId,
			} );
		} );
	} );

	describe( '#siteUpdatesRequestSuccessAction()', () => {
		test( 'should return a site updates request success action object', () => {
			const action = siteUpdatesRequestSuccessAction( siteId );

			expect( action ).to.eql( {
				type: SITE_UPDATES_REQUEST_SUCCESS,
				siteId,
			} );
		} );
	} );

	describe( '#siteUpdatesRequestFailureAction()', () => {
		test( 'should return a site updates request failure action object', () => {
			const error = 'There was an error while getting the update data for this site.';
			const action = siteUpdatesRequestFailureAction( siteId, error );

			expect( action ).to.eql( {
				type: SITE_UPDATES_REQUEST_FAILURE,
				siteId,
				error,
			} );
		} );
	} );
} );
