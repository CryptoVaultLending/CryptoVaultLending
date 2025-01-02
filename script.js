function comingSoonAlert() {
    alert("Our escrow service is coming soon! Stay tuned for updates.");
}

<script>
   async function convertCrypto() {
    const amount = document.getElementById('amount').value;
    let crypto1 = document.getElementById('crypto1').value.toLowerCase();
    let crypto2 = document.getElementById('crypto2').value.toLowerCase();

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

    if (cryptoMapping[crypto1]) {
        crypto1 = cryptoMapping[crypto1];
    } else {
        document.getElementById('result').innerText = "Invalid cryptocurrency for the first selection.";
        console.error("Invalid cryptocurrency for crypto1:", crypto1);
        return;
    }

    if (cryptoMapping[crypto2]) {
        crypto2 = cryptoMapping[crypto2];
    } else {
        document.getElementById('result').innerText = "Invalid cryptocurrency for the second selection.";
        console.error("Invalid cryptocurrency for crypto2:", crypto2);
        return;
    }

    if (amount && crypto1 && crypto2) {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto1},${crypto2}&vs_currencies=usd`;

        console.log("Fetching data from URL:", url);

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("Data fetched:", data);

            if (data[crypto1] && data[crypto2]) {
                const crypto1Price = data[crypto1].usd;
                const crypto2Price = data[crypto2].usd;
                let result = (amount * crypto1Price) / crypto2Price;

                const feePercentage = 0.005;
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
    } else {
        document.getElementById('result').innerText = "Please fill out all fields.";
    }
}
