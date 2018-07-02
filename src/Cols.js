/**
 * @fileoverview Rows container component
 * @author Pavel Mach·Ëek <pavex@ines.cz>
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default class Cols extends Component {


	static propTypes = {
		size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
	_baseCssClass = 'ui-layout__cols';





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
				<div className={this._baseCssClass + '__container'}>
					{children}
				</div>
			</div>
		);
	};


}