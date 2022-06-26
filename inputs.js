var counter = 1;
function addInput(divName){
var input = document.createElement('input');
          //newdiv.innerHTML = '<div><input type="text></div>';
          input.type = 'text';
          //input.setAttribute('type', 'text');
          input.className = 'keyword';
          document.getElementById(divName).appendChild(input);
          counter++;
}