let btnConvertir = document.getElementById('btnConvertir');
btnConvertir.addEventListener('click', () => {
    let txtEuros = document.getElementById('txtEuros').value;

    if (txtEuros === '' || isNaN(txtEuros)) {
        alert('Tiene que introducir un número');
    }
    else {
        obtenerDivisas();
    }
});

function obtenerDivisas() {
    let http = new XMLHttpRequest();
    http.open('GET', 'https://api.exchangeratesapi.io/latest', true);
    http.addEventListener('readystatechange', () => {
        if (http.readyState == 4 && http.status == 200) {
            let resultado = JSON.parse(http.responseText);

            mostrarDivisas(resultado);
        }
    });

    http.send();
}

function mostrarDivisas(resultado) {
    let txtEuros = document.getElementById('txtEuros').value;
    let euros = Number(txtEuros);
    let divisas = document.getElementById('divisas');
    let conversion = 0;

    if (divisas.innerHTML.length >= 1) {
        divisas.innerHTML = '';
    }

    for (let i = 1; i <= 4; i++) {
        let p = document.createElement('p');
        let txtParrafo = null;

        if (Number.isInteger(euros)) {
            txtParrafo = euros;
        }
        else {
            txtParrafo = euros.toFixed(2);
        }

        txtParrafo = txtParrafo + ' € son ';

        switch (i) {
            case 1:
                conversion = resultado.rates.USD * euros;
                txtParrafo = txtParrafo + conversion + ' dólares estadounidenses';
                break;

            case 2:
                conversion = resultado.rates.CHF * euros;
                txtParrafo = txtParrafo + conversion + ' francos';
                break;

            case 3:
                conversion = resultado.rates.GBP * euros;
                txtParrafo = txtParrafo + conversion + ' libras';
                break;

            case 4:
                conversion = resultado.rates.JPY * euros;
                txtParrafo = txtParrafo + conversion + ' yenes';
                break;
        }

        let texto = document.createTextNode(txtParrafo);

        p.appendChild(texto);
        divisas.appendChild(p);
    }
}