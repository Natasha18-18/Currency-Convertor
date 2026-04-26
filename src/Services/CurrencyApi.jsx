export const fetchRates = async (base) => {
    try {
        const res = await fetch(`/api/latest?from=${base}`);
        const data = await res.json();
        return data.rates || {};
    } catch (err) {
        console.log("Rates error:", err);
        return {};
    }
};

export const fetchSymbols = async () => {
    try {
        const res = await fetch(`/api/currencies`);
        const data = await res.json();
        return data || {};
    } catch (err) {
        console.log("Symbols error:", err);
        return {};
    }
};