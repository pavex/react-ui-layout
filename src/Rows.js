/**
 * @fileoverview Rows container component
 * @author Pavel Mach·Ëek <pavex@ines.cz>
 */
import React from 'react';
import PropTypes from 'prop-types';


export default class Rows extends React.Component {


//
	static propTypes = {
		paddingCollapse: PropTypes.bool
	};





//
	static defaultProps = {
		paddingCollapse: true
	};





/** @private @type {bool} */
	_stretch = false;

/** @private @type {number} */
	_contentSize = 0;

/** @private @type {number} */
	_top = 0;

/** @private @type {number} */
	_bottom = 0;

/** @private @type {number} */
	_lastOffsetTop = 0;

/** @private @type {number} */
	_lastOffsetBottom = 0;





/**
 * @private
 * @param {React.Element}
 * @return {Object}
 */
	_getChildCollpsedRest(child) {
		let {align} = child.props;
		let offset = this._getChildRect(child);
//
		if (this.props.paddingCollapse) {
			if (align === 'bottom') {
				let maxOffset = Math.max(offset.bottom, this._lastOffsetBottom);
				offset.bottom = maxOffset - this._lastOffsetBottom;
			}
			else {
				let maxOffset = Math.max(offset.top, this._lastOffsetTop);
				offset.top = maxOffset - this._lastOffsetTop;
			}
		}
		return offset;
	};





/**
 * @private
 * @param {React.Element}
 * @return {Object}
 */
	_getChildRect(child) {
		let {padding, paddingTop, paddingRight, paddingBottom, paddingLeft} = child.props;
		let indent = padding === true ? 8 : null;
		let top = indent || padding || paddingTop || 0;
		let right = indent || padding || paddingRight || 0;
		let bottom = indent || padding || paddingBottom || 0;
		let left = indent || padding || paddingLeft || 0;
		return {top, right, bottom, left};
	};





/**
 * @private
 * @param {number}
 * @return {string}
 */	
	_getCalcString(width) {
		return 'calc(100% - ' + width + 'px)';
	};





/**
 * @private
 * @parma {React.Element}
 * @param {Object}
 */
	_setLastOffset(child, offset) {
		let {align, size} = child.props;
		if (align === 'bottom') {
			this._bottom += size;
			this._lastOffsetBottom = Math.max(this._lastOffsetBottom, offset.bottom);
		}
		else {
			this._top += size;
			this._lastOffsetTop = Math.max(this._lastOffsetTop, offset.top);
		}
	};





/**
 * @private
 * @parma {React.Element}
 * @param {Object}
 * @return {number|string}
 */
	_getHeight(child, offset) {
		let {size} = child.props;
		if (this._stretch === true) {
			throw new Error('Stretched row must be defined on last.');
		}
		if (!size) {
			this._stretch = true;
			return this._getCalcString(this._contentSize);
		}
		return size - offset.top - offset.bottom;
	};





/**
 * @private
 * @parma {React.Element}
 * @param {Object}
 */
	_getStyle(child) {
		let {align, size} = child.props;
		let offset = this._getChildCollpsedRest(child);
		this._contentSize += size;
//
		let height = this._getHeight(child, offset);
		let bottom = align === 'bottom' ? this._bottom + offset.bottom : null;
		let top = align !== 'bottom' ? this._top + offset.top : null;
//
		this._setLastOffset(child, offset);
		return {
			position: 'absolute',
			height,
			top,
			right: offset.right,
			bottom,
			left: offset.left
		};
	};





//
	_renderChildren() {
		this._stretch = false;
		this._contentSize = 0;
		this._left = 0;
		this._right = 0;
		this._lastOffsetRight = 0;
		this._lastOffsetLeft = 0;
//
		return React.Children.map(this.props.children, (child, index) => {
			let style = this._getStyle(child);
			return (
				<div className="px-layout-row-container" style={style}>{child}</div>
			);
		});
	};





//
	render() {
		return (
			<div className="px-layout-rows-container">
				<div className="px-layout-rows-content">
					{this._renderChildren()}
				</div>
			</div>
		);
	};


}