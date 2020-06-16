import React from 'react';
import './Dialog.css';

export default function Dialog(props) {
	return (
		<div className="dialog-cont">
			<div className="close-button" onClick={() => props.cancel()}>
				&times;
			</div>
			<div className="message mt-2">{props.message}</div>
			<div className="options mt-2">
				<button className="btn btn-success" onClick={() => props.confirm(props.id)}>
					Confirm
				</button>
				<button className="btn btn-danger ml-4" onClick={() => props.cancel()}>
					Cancel
				</button>
			</div>
		</div>
	);
}
