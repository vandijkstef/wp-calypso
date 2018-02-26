/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { localize } from 'i18n-calypso';
import { connect } from 'react-redux';
import page from 'page';

/**
 * Internal dependencies
 */
import HeaderCake from 'components/header-cake';
import Card from 'components/card';
import CTACard from './cta-card';
import { recordTracksEvent } from 'state/analytics/actions';
import config from 'config';
import GoogleLoginButton from 'components/social-buttons/google';

class SelectBusinessType extends Component {
	static propTypes = {
		recordTracksEvent: PropTypes.func.isRequired,
		siteId: PropTypes.string.isRequired,
		translate: PropTypes.func.isRequired,
	};

	trackCreateMyListingClick = () => {
		this.props.recordTracksEvent(
			'calypso_test_google_my_business_select_business_type_create_my_listing_button_click'
		);
	};

	trackOptimizeYourSEOClick = () => {
		this.props.recordTracksEvent(
			'calypso_test_google_my_business_select_business_type_optimize_your_seo_button_click'
		);
	};

	goBack = () => {
		page.back( `/stats/day/${ this.props.siteId }` );
	};

	handleGoogleResponse = () => {
		page.redirect( `/google-my-business/show-list-of-locations/${ this.props.siteId }` );
	};

	render() {
		const { translate, siteId } = this.props;

		return (
			<div className="select-business-type">
				<HeaderCake isCompact={ false } alwaysShowActionText={ false } onClick={ this.goBack }>
					{ translate( 'Google My Business' ) }
				</HeaderCake>

				<Card className="select-business-type__explanation">
					<div className="select-business-type__explanation-main">
						<h1>{ translate( 'Which type of business are you?' ) }</h1>

						<h2>
							{ translate(
								'Google My Business lists your local business on Google Search and Google Maps. ' +
									'It works for businesses that have a physical location or serve a local area.'
							) }
						</h2>
					</div>

					<img
						src="/calypso/images/google-my-business/business-local.svg"
						alt="Local business illustration"
					/>
				</Card>

				<Card>
					<div className="select-business-type__cta-card-main">
						<h2>
							{ translate( 'Physical Location or Service Area', {
								comment:
									'In the context of a business activity, brick and mortar or online service',
							} ) }
						</h2>
						<p>
							{ translate(
								'My business has a physical location customers can visit, ' +
									'or provides goods and services to local customers, or both.'
							) }
						</p>
					</div>
					<div className="select-business-type__cta-card-button-container">
						<GoogleLoginButton
							clientId={ config( 'google_oauth_client_id' ) }
							scope="https://www.googleapis.com/auth/plus.business.manage"
							responseHandler={ this.handleGoogleResponse }
							uxMode={ 'popup' }
							redirectUri={ '' }
						/>
					</div>
				</Card>

				<CTACard
					headerText={ translate( 'Online Only', {
						comment: 'In the context of a business activity, as opposed to a brick and mortar',
					} ) }
					mainText={ translate(
						"Don't provide in-person services? Learn more about reaching your customers online."
					) }
					buttonText={ translate( 'Optimize Your SEO', { comment: 'Call to Action button' } ) }
					buttonIcon="external"
					buttonHref={ '/settings/traffic/' + siteId }
					buttonTarget="_blank"
					buttonOnClick={ this.trackOptimizeYourSEOClick }
				/>
			</div>
		);
	}
}

export default connect( undefined, { recordTracksEvent } )( localize( SelectBusinessType ) );
