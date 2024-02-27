const load = document.querySelector(".a-load");
const input = document.querySelector(".key-v");
const icon = document.querySelector(".bi");
const btnSwitch = document.querySelector(".switch");
const btncopy = document.querySelector(".button_copy");
const result_p = document.querySelector(".p_result");

input.style.visibility = "hidden";

let matrix = [
  ["a", "e", "i", "o", "u"],
  ["ai", "enter", "imes", "ober", "ufat"],
];

const abc = [ "a",  "b",  "c",  "d",  "e",  "f",  "g",  "h",  "i",  "j",  "k",  "l",  "m",
  "n",  "ñ",  "o",  "p",  "q",  "r",  "s",  "t",  "u",  "v",  "w",  "x",  "y",  "z",
];

btnSwitch.addEventListener("click", (e) => {
  document.body.classList.toggle("dark");
  btnSwitch.classList.toggle("active");
});

icon.addEventListener("click", (e) => {
  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("bi-eye");
    icon.classList.add("bi-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("bi-eye-slash");
    icon.classList.add("bi-eye");
  }
});

function showInput(e) {
  const input = document.querySelector(".key-v");
  if (e.selectedIndex == 2) {
    input.style.visibility = "visible";
    icon.style.visibility = "visible";
  } else {
    input.style.visibility = "hidden";
    icon.style.visibility = "hidden";
  }
}

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
    btncopy.style.visibility = "hidden";
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
function encrip(e) {
  /*se encarga de encriptar el texto ingresado por el usuario*/
  let cadena = document.querySelector(".textbox").value;
  let droplist = document.querySelector("#droplist-cod");
  var flag,
    result = "";

  if (e.value == "Encriptar") {
    flag = true;
  } else {
    flag = false;
  }
  if (statusString()) {
    load.style.visibility = "hidden";
    btncopy.style.visibility = "visible";
    switch (droplist.selectedIndex) {
      case 0:
        result = encrip_default(cadena, flag);
        break;
      case 1:
        result = encrip_cesar(cadena, flag);
        break;
      case 2:
        result = encrip_vigenere(cadena, flag);
        break;
    }
    result_p.style.visibility = "visible";
    showResult(result);
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

function encrip_default(cadena, op) {
  let i = 0,
    newString = "",
    flag = false,
    a = 0;
  switch (op) {
    case true:
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
      return newString;
    case false:
      while (a != cadena.length) {
        for (let i = 0; i <= matrix[0].length; i++) {
          if (cadena.includes(matrix[1][i])) {
            cadena = cadena.replace(matrix[1][i], matrix[0][i]);
          }
        }
        a++;
      }
      return cadena;
  }
}

function encrip_cesar(cadena, op) {
  let result = "";
  let i = 0;
  while (i != cadena.length) {
    let char = cadena[i];
    if (char.match(/[a-z]/i)) {
      let cod = cadena.charCodeAt(i);
      if (cod >= 97 && cod <= 122) {
        if (op == true) {
          char = String.fromCharCode(((cod - 97 + 3) % 26) + 97);
        } else {
          char = String.fromCharCode(((cod - 97 - 3) % 26) + 97);
        }
      }
    }
    result += char;
    i++;
  }
  return result;
}
function encrip_vigenere(cadena, flag) {
  var key = input.value;
  key = key.replace(/ /g, "");
  var string = cadena.replace(/ /g, "");
  let result = "";
  let keyComplete = "",
    a = 0;
  let esp = [];

  if (revision(key, string)) {
    for (var i = 0; i < cadena.length; i++) {
      if (cadena[i] == " ") {
        esp[a] = i;
        a++;
      }
    }
    for (var i = 0; i < string.length; i++) {
      keyComplete += key.charAt(i % Number(key.length));
    }
    for (var i = 0; i < string.length; i++) {
      let charr = string.charAt(i);
      let posm = getPosition(charr);

      charr = keyComplete.charAt(i);

      let posk = getPosition(charr);

      let newValue = change(posm, posk, flag);

      result += abc[newValue];
    }
    for (var i = 0; i < esp.length; i++) {
      result = result.slice(0, esp[i]) + " " + result.slice(esp[i]);
    }
    return result;
  }

  function getPosition(char) {
    let position = abc.indexOf(char);
    return position;
  }

  function change(posm, posk, flag) {
    let y = (posm + posk) % 27;
    if (!flag && !(posm - posk) >= 0) {
      y = (posm - posk + 27) % 27;
    }
    return y;
  }

  function revision(key, string) {
    const re = /^([a-zñ?]+([]*[a-zñ?]?['-]?[a-zñ?]+)*)$/;
    console.log(key.length + " " + string.length);
    var flag = true;
    if (!re.test(key)) {
      flag = false;
      alert("La palabra clave debe ser unicamente con letras");
    }
    if (key.length > string.length) {
      alert(
        "La palabra clave contener menos caracteres que el mensaje que desea des/encriptar"
      );
      flag = false;
    }
    return flag;
  }
}
