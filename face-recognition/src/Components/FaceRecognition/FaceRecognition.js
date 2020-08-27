import React from "react";

const FaceRecognition = ({ imageUrl }) => {
	return (
		<div classname='center'>
			<img alt='' src={imageUrl} />
		</div>
	);
};

export default FaceRecognition;
