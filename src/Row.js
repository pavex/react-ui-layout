/**
 * @fileoverview Single layout row component
 * @author Pavel Mach·Ëek <pavex@ines.cz>
 */
import React from 'react';
import PropTypes from 'prop-types';


export default class Row extends React.Component {


//
	static propTypes = {
		size: PropTypes.number,
		align: PropTypes.oneOf(['top', 'bottom']),
		padding: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
	};





//
	static defaultProps = {
		size: null,
		align: null,
		padding: null
	};






//
	render() {
		return (
			<div className="px-layout-row-content">
				{this.props.children}
			</div>
		);
	};


}