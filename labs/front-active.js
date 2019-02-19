
let accButtons = document.getElementsByClassName('accordion');
let panels     = document.getElementsByClassName('panel');
let text  =document.getElementById("codeArea");
let lab1=document.getElementById("lab1");
let consol=document.getElementById('console');    
let addSet=document.getElementById("adSet")
let footer=document.getElementById("footer")


/*          replace textArea                             */
//////////////////////////////////////////////////////////

  let redactor=document.getElementById('codeArea');

  var myCodeMirror = CodeMirror(function(elt) {
      redactor.parentNode.replaceChild(elt, redactor);
    }, {value: redactor.value});

    myCodeMirror.setOption("theme","monokai");
    myCodeMirror.setOption("mode","pascal");

    myCodeMirror.display.wrapper.className='cm-s-monokai  CodeMirror  main-box  codeArea'



//////////////////////////////////////////////////////////


//        acardion
//////////////////////////////////////////////

for(let i = 0; i < accButtons.length; i++){
  accButtons[i].onclick = function(){
    this.nextElementSibling.classList.toggle('show');
    for(let x = 0; x < panels.length; x++){ 
        if(i==x) continue;
        panels[x].classList.remove('show');
   }    
  }
}
    
////////////////////////////////////////////////


//    add additional settings
/////////////////////////////////////////

addSet.onclick=function(){

    footer.classList.toggle('show');
}


////////////////////////////////////////