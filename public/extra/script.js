let btnConvertir = document.getElementById('btnConvertir');
btnConvertir.addEventListener('click', comprobarImporte);

function comprobarImporte() {
    let importe = document.getElementById('importe').value;

    if (importe === '' || isNaN(importe)) {
        Swal.fire({
            icon: 'error',
            title: 'Importe incorrecto',
            text: 'Debes introducir un importe numérico distinto de 0',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }
    else {
        obtenerDivisas();
    }
}

function obtenerDivisas() {
    fetch('https://api.exchangeratesapi.io/latest')
        .then((respuesta) => {
            return respuesta.json();
        })
        .then((resultado) => {
            mostrarDivisas(resultado);
        });
}

function mostrarDivisas(resultado) {
    let importe = document.getElementById('importe').value;
    let euros = Number(importe);
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

        Swal.fire({
           icon: 'success',
           title: 'Conversión Correcta'
        });
    }
}