import { useState, useEffect } from "react";
import { fetchRates, fetchSymbols } from "../Services/CurrencyApi";
import "./CurrencyConvertor.css";

function CurrencyConvertor() {
    const [amount, setAmount] = useState("1");
    const [from, setFrom] = useState("INR");
    const [to, setTo] = useState("USD");

    const [result, setResult] = useState(null);
    const [rates, setRates] = useState({});
    const [currencies, setCurrencies] = useState({});
    const [loading, setLoading] = useState(true);

    // LOAD CURRENCIES
    useEffect(() => {
        const loadSymbols = async () => {
            const data = await fetchSymbols();
            setCurrencies(data || {});
        };
        loadSymbols();
    }, []);

    // LOAD RATES
    useEffect(() => {
        const loadRates = async () => {
            setLoading(true);
            const data = await fetchRates(from);
            setRates(data || {});
            setLoading(false);
        };
        loadRates();
    }, [from]);

    // CONVERT LOGIC (FIXED)
    useEffect(() => {
        const num = parseFloat(amount);
        const rate = rates[to];

        if (!isNaN(num) && rate) {
            setResult(num * Number(rate));
        } else {
            setResult(null);
        }
    }, [amount, to, rates]);

    // SWAP
    const swap = () => {
        setFrom(to);
        setTo(from);
    };

    return (
        <div className="main-container">
            <div className="overlay"></div>

            <div className="card">

                <h1 className="title">💱 Currency Converter</h1>
                <p className="subtitle">Live exchange rates</p>

                {/* AMOUNT */}
                <div className="input-box">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                    />
                </div>

                {/* DROPDOWNS */}
                <div className="row">

                    {/* FROM */}
                    <div className="box">
                        <label>From</label>
                        <select
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        >
                            {Object.keys(currencies || {}).length > 0 ? (
                                Object.keys(currencies).map((code) => (
                                    <option key={code} value={code}>
                                        {code}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Loading...</option>
                            )}
                        </select>
                    </div>

                    {/* SWAP */}
                    <button className="swap" onClick={swap}>
                        ⇄
                    </button>

                    {/* TO */}
                    <div className="box">
                        <label>To</label>
                        <select
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        >
                            {Object.keys(currencies || {}).length > 0 ? (
                                Object.keys(currencies).map((code) => (
                                    <option key={code} value={code}>
                                        {code}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Loading...</option>
                            )}
                        </select>
                    </div>

                </div>

                {/* RESULT */}
                <div className="result">
                    {loading
                        ? "Loading..."
                        : result !== null
                            ? `${amount} ${from} = ${result.toFixed(2)} ${to}`
                            : "--"}
                </div>

            </div>
        </div>
    );
}

export default CurrencyConvertor;