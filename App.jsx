
import React, { useState, useEffect } from 'react';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => setRates(data.rates));
  }, []);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  const swapCurrencies = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const convertCurrency = () => {
    if (rates[from] && rates[to]) {
      const rate = rates[to] / rates[from];
      const convertedAmount = amount * rate;
      setConvertedAmount(convertedAmount.toFixed(2));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Currency Converter</h1>
      </div>
      <form className="form">
        <label className="label">
          Amount:
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="input"
          />
        </label>
        <br />
        <label className="label">
          From:
          <select
            value={from}
            onChange={handleFromChange}
            className="select"
          >
            {Object.keys(rates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={swapCurrencies}
          className="swap-button h-full"
        >
          Swap
        </button>
        <label className="label">
          To:
          <select
            value={to}
            onChange={handleToChange}
            className="select"
          >
            {Object.keys(rates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button
          type="button"
          onClick={convertCurrency}
          className="button"
        >
          Convert
        </button>
      </form>
      <p className="result">
        {amount} {from} = {convertedAmount} {to}
      </p>
    </div>
  );
}

export default App;