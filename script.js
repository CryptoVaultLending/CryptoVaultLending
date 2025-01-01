// Funzione per calcolare il valore della criptovaluta
async function convertCrypto() {
    const crypto1 = document.getElementById('crypto1').value;
    const crypto2 = document.getElementById('crypto2').value;

    // API URL per Binance
    const apiUrl = `https://api.binance.com/api/v3/ticker/price?symbol=${crypto1}${crypto2}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Aggiunta di un guadagno del 0.5% al prezzo
        let price = parseFloat(data.price);
        price = price * 1.005; // Aumento del 0.5%

        // Mostrare il risultato
        document.getElementById('result').innerHTML = `1 ${crypto1} è uguale a ${price.toFixed(4)} ${crypto2}`;
    } catch (error) {
        document.getElementById('result').innerHTML = 'Errore nel recupero dei dati.';
    }
}
