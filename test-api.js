async function testAPI() {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/products');
        const data = await response.json();
        console.log('API Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('API Error:', error);
    }
}

testAPI();