const encrip = document.getElementById("Encriptar").addEventListener("click", encrypt );
const desencrip = document.getElementById("Desencriptar").addEventListener("click", decrypt );
const copyButton = document.getElementById("copy").addEventListener("click", copyText);
const copy = document.getElementById("copy");
const textarea = document.getElementById("textarea");
const counter = document.getElementById('count');
const result = document.getElementById("content");
const data = document.getElementById("empty");
const maxCharLength = 200;

let text,textEncrypt,textDecrypt = "";
copy.style.display = 'none';
textarea.value = '';


const letterMap = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
};



textarea.addEventListener('input', function() {
  const textLength = textarea.value.length;

  if (textLength > maxCharLength) {
    textarea.value = textarea.value.slice(0, maxCharLength); 
  } else {
    counter.textContent = textLength + ' / ' + maxCharLength;
  }
});


  
function encrypt(){
    text = textarea.value;
    if (text === '') return;
    let string = cleanText(text.toLowerCase()).split('');
    textEncrypt = replaceLetters(string);
    cleanInput();
    hide();
    result.innerHTML += textEncrypt;
    copy.style.display = 'block';
 
}


function replaceLetters(string) {
    for (let i = 0; i < string.length; i++) {
        if (letterMap[string[i]]) string[i] = letterMap[string[i]];
    }
    return string.join('');
}



function decrypt() {
    text = textarea.value;
    if (text === '') return '';
    let string = cleanText(text.toLowerCase());
    let words = CreateArray(string, " ");

    words = words.map(word => {
        for (let key in letterMap) {
            word = word.replaceAll(letterMap[key], key);
        }
        return word;
    });

    textDecrypt = words.join(' ');
    cleanInput();
    hide();
    result.innerHTML += textDecrypt;
    copy.style.display = 'block';
}




function CreateArray(text,separation){
    return text.split(separation);
}


function cleanText(text){
    let acentos = {'á': 'a','é': 'e','í': 'i','ó': 'o','ú': 'u'};
    return text.replace(/[áéíóú]/g, letra => acentos[letra] || letra);  
}


function checkWord(letter) {
    let newLetter = letter;
    if (letter in letterMap) newLetter = letterMap[letter];
    else return letter;
    return newLetter;
}

 
function cleanInput(){
    textarea.value='';
    result.innerHTML = '';
}

function copyText(){
    let mens = result.innerText;
    navigator.clipboard.writeText(mens).then(function() {
    }).catch(function(err) {
        console.error("Error: ", err);
    });
}

function hide(){
    data.style.display = 'none';
}