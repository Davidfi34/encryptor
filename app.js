const encrip = document.getElementById("Encriptar").addEventListener("click", Encrypt );
const desencrip = document.getElementById("Desencriptar").addEventListener("click", Decrypt );
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


  
function Encrypt(){
    text = textarea.value;
    if (text === '') return;
    let newText = cleanText(text.toLowerCase());
    let arraytext = CreateArray(newText," ");
    let EncryptedArray = [];
        
    for (let i = 0; i < arraytext.length; i++) {
            let word = arraytext[i];
            let wordEncrypted = '';
    
        for (let j = 0; j < word.length; j++) {
                let letter = checkWord(word[j]);
                wordEncrypted += `${letter}`
        } 
        EncryptedArray.push(wordEncrypted);
    } 
    textEncrypt = EncryptedArray.join(' ');
    cleanInput();
    hide();
    result.innerHTML += textEncrypt;
    copy.style.display = 'block';
    return textEncrypt;
}



function Decrypt() {
    text = textarea.value;
    if (text === '') return '';
    let newText = cleanText(text.toLowerCase());
    let words = CreateArray(newText," ");

    words = words.map(word => {
        let wordDecrypted = '';
        while (word.length > 0) {
            let found = false;

            for (let key in letterMap) {
                if (word.startsWith(letterMap[key])) {
                    wordDecrypted += key;
                    word = word.slice(letterMap[key].length);
                    found = true;
                    break;
                }
            }
            if (!found) {
                wordDecrypted += word[0];
                word = word.slice(1);
            }
        }
        return wordDecrypted;
    });


    textDecrypt = words.join(' ');
    cleanInput();
    hide();
    result.innerHTML += textDecrypt;
    copy.style.display = 'block';
    return textDecrypt;
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