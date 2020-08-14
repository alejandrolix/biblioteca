function getPromise() {
    let promesa = new Promise(function(resolve, reject) {
        console.log("Promesa llamada...");

        setTimeout(function() {
            console.log("Resolviendo la promesa...");
            resolve(); // Promesa resuelta!. Ahora se devuelve!
        }, 3000); // Después de 3 segundos, acabamos la promesa
    });

    return promesa;
}

getPromise().then(function() {
    console.log("La promesa ha acabado!");
});

console.log("El programa continúa. No se espera a la promesa (operación asíncrona)");