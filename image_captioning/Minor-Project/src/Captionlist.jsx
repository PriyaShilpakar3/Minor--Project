import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CaptionList = () => {
  const [captions, setCaptions] = useState([]);

  useEffect(() => {
    const fetchCaptions = async () => {
      try {
        const res = await axios.get('http://localhost:8000/captions/');
        setCaptions(res.data);
      } catch (err) {
        console.error('Failed to fetch captions:', err);
      }
    };
    fetchCaptions();
  }, []);

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-bold">All Captions</h2>
      {captions.map((item) => (
        <div key={item.id} className="p-4 border rounded">
          <img
            src={`data:image/jpeg;base64,${item.image}`}
            alt="Uploaded"
            className="w-full max-w-sm mb-2"
          />
          <p><strong>Email:</strong> {item.email}</p>
          <p><strong>Caption:</strong> {item.caption}</p>
          <p><strong>Feedback:</strong> {item.feedback || 'No feedback yet'}</p>
        </div>
      ))}
    </div>
  );
};

export default CaptionList;
