let cadena = "Hola mundo";
let caracter = "!";

let indice = 5; // Índice donde deseas insertar el caracter en la cadena

// Insertar el caracter en el medio de la cadena sin afectar la cadena original
let cadena_con_caracter = cadena.slice(0, indice) + caracter + " " + cadena.slice(indice);

console.log("Cadena original:", cadena);
console.log("Cadena con caracter insertado:", cadena_con_caracter);
