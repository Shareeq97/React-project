import React from 'react';

const imageUpload = async (e) => {
	localStorage.clear();
	const photos = [];
	await Promise.all([...e.target.files].map(async (file) => {
		return await getBase64(file).then(base64 => {
			localStorage[file.name] = base64;
			photos.push(file.name);
		});
	}));
	
	return photos;
};

const getBase64 =  (file) => {
	return new Promise((resolve,reject) => {
	   const reader = new FileReader();
	   reader.onload = () => resolve(reader.result);
	   reader.onerror = error => reject(error);
	   reader.readAsDataURL(file);
	});
}

const Header = ({ getPhotos }) => {
	return (
		<div>
	    	<label for="files">Select Files: </label>
			<input type="file" id="imageFile" name='imageFile' multiple onChange={(e) => {
				imageUpload(e).then((res) => getPhotos(res));
			}} />
		</div>	
	);
}

export default Header;
	