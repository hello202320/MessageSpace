import React from 'react';

const FileRenderer = ({file}) => {
	const fileType = getFileType(file)
	const fileURL = URL.createObjectURL(file)
	if (fileType === 'image'){
		return(
			<img src={fileURL} alt='Uploaded Image'/>
		)
	}
	else if (fileType === 'video'){
		return(
			<video controls>
				<source src={fileURL} type={file.type}/>
				Your browser does not support the media tags
			</video>
		)
	}
	else if (fileType === 'audio'){
		return(
			<audio controls>
				<source src={fileURL} type={file.type}/>
				Your browser does not support the media tags
			</audio>
		)
	}
	else {
		return(
			<a href={fileURL}><img src='./images.png'></img> </a>
		)
	}

}

export function getFileType(file) {
	if (file.type.startsWith('image/')){
		return 'image'
	}
	else if (file.type.startsWith('video/')){
		return 'video'
	}
	else if (file.type.startsWith('audio/')){
		return 'audio'
	}
	else {
		return 'other'
	}
}

export default FileRenderer;