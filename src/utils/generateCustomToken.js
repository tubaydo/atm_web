const generateCustomToken = async (tcno) => {
	const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({ tcno }),
	});
  
	if (!response.ok) {
	  throw new Error('Token oluşturulamadı');
	}
  
	const data = await response.json();
	return data.token; // Backend'den dönen token
  };
  