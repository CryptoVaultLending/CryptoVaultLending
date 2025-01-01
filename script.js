<script>
    async function convertCrypto() {
        const amount = document.getElementById('amount').value;
        const crypto1 = document.getElementById('crypto1').value.toLowerCase(); // Convertito in minuscolo
        const crypto2 = document.getElementById('crypto2').value.toLowerCase(); // Convertito in minuscolo

        if (amount && crypto1 && crypto2) {
            const url = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto1},${crypto2}&vs_currencies=usd`;

            try {
                const response = await fetch(url);

                // Verifica se la risposta è ok
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                // Controlla che i dati delle criptovalute siano presenti
                if (data[crypto1] && data[crypto2]) {
                    const crypto1Price = data[crypto1].usd;
                    const crypto2Price = data[crypto2].usd;
                    const result = (amount * crypto1Price) / crypto2Price;

                    document.getElementById('result').innerText = 
                        `${amount} ${crypto1.toUpperCase()} is equivalent to ${result.toFixed(4)} ${crypto2.toUpperCase()}.`;
                } else {
                    document.getElementById('result').innerText = "Error fetching data for the selected cryptocurrencies.";
                }
            } catch (error) {
                document.getElementById('result').innerText = `Error fetching data: ${error.message}. Please try again later.`;
            }
        } else {
            document.getElementById('result').innerText = "Please fill out all fields.";
        }
    }
</script>
