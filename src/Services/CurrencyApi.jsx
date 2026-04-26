const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const safeFetch = async (url) => {
    const res = await fetch(url);
    const text = await res.text();

    try {
        return JSON.parse(text);
    } catch (err) {
        console.log("Not JSON Response:", text);
        return null;
    }
};

// GET RATES
export const fetchRates = async (base) => {
    try {
        const data = await safeFetch(
            `${BASE_URL}/${API_KEY}/latest/${base}`
        );

        return data?.conversion_rates || {};
    } catch (err) {
        console.log("Rates error:", err);
        return {};
    }
};

// GET SYMBOLS
export const fetchSymbols = async () => {
    try {
        const data = await safeFetch(
            `${BASE_URL}/${API_KEY}/latest/USD`
        );

        return data?.conversion_rates || {};
    } catch (err) {
        console.log("Symbols error:", err);
        return {};
    }
};