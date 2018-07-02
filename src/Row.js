/**
 * @fileoverview Single row container component
 * @author Pavel Mach·Ëek <pavex@ines.cz>
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default class Row extends Component {


	static propTypes = {
		size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		stretch: PropTypes.bool,
		style: PropTypes.object,
		cellStyle: PropTypes.object,
		padding: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
		align: PropTypes.oneOf([null, 'left', 'center', 'right']),
		verticalAlign: PropTypes.oneOf([null, 'top', 'middle', 'bottom'])
	};





	static defaultProps = {
		size: null,
		stretch: false,
		style: null,
		containerStyle: null,
		padding: null,
		align: null,
		verticalAlign: null
	};





/** @private @type {string} */
	_baseCssClass = 'ui-layout__row';





/**
 * @private
 * @return {string}
 */
	_getCssClass() {
		let {size, stretch} = this.props;
		let classlist = [];
		classlist.push(this._baseCssClass);
		if (stretch && !size) {
			classlist.push(this._baseCssClass + '--stretch');
		}
		return classlist.join(' ');
	};





//
	render() {
		let {size, style, padding, align, verticalAlign, containerStyle, children} = this.props;
		padding = padding === true ? 12 : padding;
		return (
			<div className={this._getCssClass()}
				style={{...style}}
			>
				<div className={this._baseCssClass + '__container'}
					style={{...{padding, textAlign: align, verticalAlign}, ...containerStyle, ...{height: size}}}
				>
					{children}
				</div>
			</div>
		);
	};


}