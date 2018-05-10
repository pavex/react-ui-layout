/**
 * @fileoverview Columns container component
 * @author Pavel Mach·Ëek <pavex@ines.cz>
 */
import React from 'react';
import PropTypes from 'prop-types';


export default class Cols extends React.Component {


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
	_left = 0;

/** @private @type {number} */
	_right = 0;

/** @private @type {number} */
	_lastOffsetLeft = 0;

/** @private @type {number} */
	_lastOffsetRight = 0;





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
 * @param {React.Element}
 * @return {Object}
 */
	_getChildCollpsedRest(child) {
		let {align} = child.props;
		let offset = this._getChildRect(child);
//
		if (this.props.paddingCollapse) {
			if (align === 'right') {
				let maxOffset = Math.max(offset.right, this._lastOffsetRight);
				offset.right = maxOffset - this._lastOffsetRight;
			}
			else {
				let maxOffset = Math.max(offset.left, this._lastOffsetLeft);
				offset.left = maxOffset - this._lastOffsetLeft;
			}
		}
		return offset;
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
		if (align === 'right') {
			this._right += size;
			this._lastOffsetRight = Math.max(this._lastOffsetRight, offset.right);
		}
		else {
			this._left += size;
			this._lastOffsetLeft = Math.max(this._lastOffsetLeft, offset.left);
		}
	};





/**
 * @private
 * @parma {React.Element}
 * @param {Object}
 * @return {number|string}
 */
	_getWidth(child, offset) {
		let {size} = child.props;
		if (this._stretch === true) {
			throw new Error('Stretched column must be defined on last.');
		}
		if (!size) {
			this._stretch = true;
			return this._getCalcString(this._contentSize);
		}
		return size - offset.left - offset.right;
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
		let width = this._getWidth(child, offset);
		let right = align === 'right' ? this._right + offset.right : null;
		let left = align !== 'right' ? this._left + offset.left : null;
//
		this._setLastOffset(child, offset);
		return {
			position: 'absolute',
			width,
			top: offset.top,
			right,
			bottom: offset.bottom,
			left
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
				<div className="px-layout-col-container" style={style}>{child}</div>
			);
		});
	};





//
	render() {
		return (
			<div className="px-layout-cols-container">
				<div className="px-layout-cols-content">
					{this._renderChildren()}
				</div>
			</div>
		);
	};


}