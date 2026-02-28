import React, { useState, useEffect } from 'react';
import FinnHub from "../api/FinnHub";
import WatchListAPI from "../api/WatchListAPI";

function PickOfTheDay () {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        const response = await FinnHub.getStockPrice('AAPL');
        setQuote(response?.data);
      } catch (error) {
        console.error("Error fetching stock price", error);
      }
    };

    fetchStockPrice();
  }, []);

  return (
    <div>
      <h1>PickOfTheDay Page</h1>
      {quote ? (
        <p>Stock Price: {JSON.stringify(quote)}</p>
      ) : (
        <p>Loading quote…</p>
      )}
    </div>
  );
}

export default PickOfTheDay;