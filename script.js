function comingSoonAlert() {
    alert("Our escrow service is coming soon! Stay tuned for updates.");
}

async function convertCrypto() {
    const amount = parseFloat(document.getElementById('amount').value);
    let crypto1 = document.getElementById('crypto1').value.trim().toLowerCase();
    let crypto2 = document.getElementById('crypto2').value.trim().toLowerCase();

    // Mappa delle criptovalute
    const cryptoMapping = {
        'btc': 'bitcoin',
        'eth': 'ethereum',
        'usdt': 'tether',
        'sol': 'solana',
        'doge': 'dogecoin',
        'xrp': 'ripple',
        'ltc': 'litecoin',
        'bnb': 'binancecoin',
        'trx': 'tron',
    };

    // Validazione input
    if (!amount || amount <= 0) {
        document.getElementById('result').innerText = "Please enter a valid amount.";
        return;
    }

    if (cryptoMapping[crypto1]) {
        crypto1 = cryptoMapping[crypto1];
    } else {
        document.getElementById('result').innerText = "Invalid cryptocurrency for the first selection.";
        return;
    }

    if (cryptoMapping[crypto2]) {
        crypto2 = cryptoMapping[crypto2];
    } else {
        document.getElementById('result').innerText = "Invalid cryptocurrency for the second selection.";
        return;
    }

    // Costruzione URL per API
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto1},${crypto2}&vs_currencies=usd`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Network error: ${response.status}`);
        }

        const data = await response.json();

        if (data[crypto1] && data[crypto2]) {
            const crypto1Price = data[crypto1].usd;
            const crypto2Price = data[crypto2].usd;
            let result = (amount * crypto1Price) / crypto2Price;

            // Applicazione commissione (0.25%)
            const feePercentage = 0.0025; // 0,25%
            result = result * (1 - feePercentage);

            document.getElementById('result').innerText =
                `${amount} ${crypto1.toUpperCase()} is equivalent to ${result.toFixed(4)} ${crypto2.toUpperCase()}.`;
        } else {
            document.getElementById('result').innerText = "Error fetching data for the selected cryptocurrencies.";
        }
    } catch (error) {
        document.getElementById('result').innerText = `Error fetching data: ${error.message}. Please try again later.`;
        console.error("Fetch error:", error);
    }
}
