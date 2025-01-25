import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('/api/data')
      .then(response => setData(response.data.message))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600">React Frontend</h1>
      <p>Data from Flask: {data}</p>
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Click Me
      </button>
    </div>
  );
}

export default App;