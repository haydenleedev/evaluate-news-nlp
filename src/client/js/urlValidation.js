function urlValidation(url) {
    var validUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   return validUrl.test(url);
}

function onBlur() {
    var x = document.getElementById("text");
    x.value = x.value.toLowerCase();
  }

export { 
    urlValidation,
    onBlur
}
