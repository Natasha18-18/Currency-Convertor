import { useState, useEffect } from "react";
import { fetchRates, fetchSymbols } from "../Services/CurrencyApi";
import "./CurrencyConvertor.css";

function CurrencyConvertor() {
    const [amount, setAmount] = useState("1");
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("INR");
    const [result, setResult] = useState(0);

    const [rates, setRates] = useState({});
    const [currencies, setCurrencies] = useState({});

    // Load currencies
    useEffect(() => {
        const loadSymbols = async () => {
            const data = await fetchSymbols();
            setCurrencies(data || {});
        };
        loadSymbols();
    }, []);

    // Load rates
    useEffect(() => {
        const loadRates = async () => {
            const data = await fetchRates(from);
            setRates(data || {});
        };
        loadRates();
    }, [from]);

    // Auto convert
    useEffect(() => {
        const num = Number(amount);
        if (rates[to] && num) {
            setResult(num * rates[to]);
        } else {
            setResult(0);
        }
    }, [amount, to, rates]);

    const handleSwap = () => {
        setFrom(to);
        setTo(from);
    };

    return (
        <div className="main-container">
            <div className="overlay"></div>

            <div className="container">
                <div className="card">
                    <h1 className="title">Currency Converter</h1>
                    <p className="subtitle">Convert currencies in real-time</p>

                    {/* Amount */}
                    <div className="input-group">
                        <label>Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                        />
                    </div>

                    {/* Dropdowns */}
                    <div className="row">
                        <div className="select-group">
                            <label>From</label>
                            <select
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            >
                                {Object.keys(currencies).map((code) => (
                                    <option key={code} value={code}>
                                        {code} - {currencies[code]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button className="swap-btn" onClick={handleSwap}>
                            ⇄
                        </button>

                        <div className="select-group">
                            <label>To</label>
                            <select
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            >
                                {Object.keys(currencies).map((code) => (
                                    <option key={code} value={code}>
                                        {code} - {currencies[code]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Result */}
                    <div className="result">
                        {result
                            ? `${amount} ${from} = ${result.toFixed(2)} ${to}`
                            : "--"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrencyConvertor;