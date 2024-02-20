var load = document.querySelector(".a-load");
let matrix = [
  ["a", "e", "i", "o", "u"],
  ["ai", "enter", "imes", "ober", "ufat"],
];

function statusString(e) {
  /*Comprueba si la cadena tiene acentos o mayusculas. En caso de tenerlas salta un aviso error*/
  var string;
  try {
    string = e.value.trim();
  } catch (error) {
    string = document.querySelector(".textbox").value;
  }
  let flag = true;
  var img = document.querySelector(".container_puppet");
  var p = document.querySelector(".container_p");

  if (string != "") {
    load.style.visibility = "visible";
    img.style.display = "none";
    p.style.display = "none";
    for (let i = 0; i < string.length; i++) {
      if (
        string[i] === string[i].toUpperCase() &&
        string[i] !== string[i].toLowerCase()
      ) {
        flag = false;
        break;
      }
      if (/[áéíóúÁÉÍÓÚ]/.test(string)) {
        flag = false;
        break;
      }
    }
  } else {
    load.style.visibility = "hidden";
    img.style.display = "";
    p.style.display = "";
  }
  showAlert(flag);
  document.querySelector(".p_result").innerHTML = "";
  return flag;
}

function encrip() {
  /*se encarga de encriptar el texto ingresado por el usuario*/
  let i = 0,
    newString = "",
    flag = false,
    cadena = document.querySelector(".textbox").value;

  if (statusString()) {
    load.style.visibility = "hidden";
    while (i != cadena.length) {
      for (let k = 0; k <= matrix[0].length; k++) {
        if (cadena[i] == matrix[0][k]) {
          newString += matrix[1][k];
          flag = true;
        }
      }
      if (!flag) {
        newString += cadena[i];
      }
      flag = false;
      i++;
    }
    showResult(newString);
  }
}
function desencrip() {
  /*se encarga de desencriptar el texto ingresado por el usuario*/
  let a = 0,
    cadena = document.querySelector(".textbox").value;
  if (statusString()) {
    load.style.visibility = "hidden";
    while (a != cadena.length) {
      for (let i = 0; i <= matrix[0].length; i++) {
        if (cadena.includes(matrix[1][i])) {
          cadena = cadena.replace(matrix[1][i], matrix[0][i]);
        }
      }
      a++;
    }
    showResult(cadena);
  }
}

function showAlert(flag) {
  var div = document.querySelector(".alert");
  if (!flag) {
    div.style.display = "";
    div.style.visibility = "visible";
  } else {
    div.style.display = "none";
    div.style.visibility = "hidden";
  }
}

function showResult(cadena) {
  var p = document.querySelector(".p_result");
  p.innerHTML = `${cadena}`;
}

function copyresult() {
  let txt = document.querySelector(".p_result");
  navigator.clipboard.writeText(txt.textContent);
}
