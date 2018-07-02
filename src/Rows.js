/**
 * @fileoverview Rows container component
 * @author Pavel Mach·Ëek <pavex@ines.cz>
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default class Rows extends Component {


	static propTypes = {
		size: PropTypes.number,
		stretch: PropTypes.bool,
		className: PropTypes.string,
		style: PropTypes.object
	};





	static defaultProps = {
		size: null,
		stretch: false,
		className: null,
		style: null
	};





/** @private @type {string} */
	_baseCssClass = 'ui-layout__rows';





/**
 * @private
 * @return {string}
 */
	_getCssClass() {
		let {size, stretch, className} = this.props;
		let classlist = [];
		classlist.push(this._baseCssClass);
		if (stretch && !size) {
			classlist.push(this._baseCssClass + '--stretch');
		}
		if (className) {
			classlist.push(className);
		}
		return classlist.join(' ');
	};





//
	render() {
		let {size, style, children} = this.props;
		return (
			<div className={this._getCssClass()}
				style={{...style, ...{height: size}}}
			>
				{children}
			</div>
		);
	};


}