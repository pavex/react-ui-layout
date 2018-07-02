/**
 * @fileoverview Single row container component
 * @author Pavel Mach·Ëek <pavex@ines.cz>
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default class Col extends Component {


	static propTypes = {
		size: PropTypes.number,
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
	_baseCssClass = 'ui-layout__col';





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
		let {size, style, padding, align, verticalAlign, children} = this.props;
		padding = padding === true ? 12 : padding;
		return (
			<div className={this._getCssClass()}
				style={{...{padding, textAlign: align, verticalAlign}, ...style, ...{width: size}}}				
			>
				{children}
			</div>
		);
	};


}