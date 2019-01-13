


	const screenshot = function() {
		const canvas = document.createElement('canvas');
		const img = document.querySelector('#screenshot img');
		const video = document.querySelector('#screenshot video');
		console.log('Capturing screenshot');
	  canvas.width = video.videoWidth;
	  canvas.height = video.videoHeight;
	  canvas.getContext('2d').drawImage(video, 0, 0);
	  // Other browsers will fall back to image/png
	  
	  img.src = canvas.toDataURL('image/png',0.5);
		

          var base64 = canvas.toDataURL('image/png',0.5);
            fetch(base64)
	        .then(res => res.blob())
	        .then((blob) => {
	          localStorage.myfile = blob;
	          var fd = new FormData();
	          fd.append('upl',blob, 'image.png');

	          console.log('Got the blob',blob);
	          return fetch('http://5e2c9e95.ngrok.io/analyzeImage',{
	            method: 'post',
	            body: fd
	          })
	        })
	        .then((data) => data.json())
	        .then((data) => {
	        	console.log(data);
	        	speak(data.description.captions[0].text);
	        })
	        .catch((err) => {
	          console.log(err);
	        })

	};
