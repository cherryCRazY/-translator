



let tableLab7=document.getElementById("lab7");
let tableLab8=document.getElementById("lab8");


const lexamaArray = []
let idArray = new Map();
let conArray = new Map();
let labelArray = new Map();
let stekD=[];
let stekObj=[];
let labelMap= new Map();

let OP=[',','/','*','(',')',';','?',':','+','-','{','}','[',']'];
let Sign=['+',"-"];
let Signs=['||','&&','<','<=','!=','==','>','>=','+','-','*','/','='];//,'{','}','(',')']

let row=0;
let error=false ;
var fs= false;
var openedFile= false;

let n_n=0;
let N_N=''


try {
     fs=require('fs');
    }
   catch(e){
   alert(e);
    }


    



    function resetAllGlobalStats(){
        lab1.innerHTML='';
        lab3.innerHTML='';   
        lexamaArray.length=0;
        idArray = new Map();
        conArray = new Map();
        labelArray = new  Map();
        labelArray.entries = [];
        idArray.entries = [];
        conArray.entries = [];
        polizArray=[];
        stekD=[];
        tableLab7.innerHTML='';
        stekD=[];
        stekObj=[];
        labelMap= new Map();
        n_n=0;
        N_N="";
        error=false;
        polisDisplays=[];
        polizStek=[]; 
        tableID = new Map();
        polizArrayDis=[];
        consol.innerHTML='';
        tableLab8.innerHTML='';

    }





/*                      func from  buttom click                    */
//*****************************************************************/
//*****************************************************************/

	let StartFunction=function(){
	    interpret(myCodeMirror.doc.getValue());
	};


	let saveFile=function(){
        console.log(openedFile)
	    if(!openedFile) return;
         alert('Saved your file');
	    fs.writeFile(openedFile,myCodeMirror.doc.getValue(),function (err) {
    	    if (err) writeInBlock(consol,err);
            alert('Saved your file');
    	    });
	};
    

	let openFile = function () {    
	    let input = document.createElement("input");
	    input.type = "file";
        console.dir(input);
	    input.onchange = function () {
            console.dir(input.value);
            openedFile = this.value;
            console.dir(openedFile);
	        let fr = new FileReader();
	         fr.onload = function (info) {
	            let full = info.target.result;
	            myCodeMirror.doc.setValue(full)

	            interpret(myCodeMirror.doc.getValue());
	         };
	       	
	      fr.readAsText(this.files[0]);
	    };
	    input.click();
	}; 

//*****************************************************************/





/*                     main func                                    */
//*****************************************************************/

            
    function interpret(code) {
        resetAllGlobalStats();
        labWork1(code);
        console.log(lexamaArray);
        lex=next_lex();
        if(labWork2()){
            if(labWork3(lexamaArray)){
                labWork7();
                setTimeout(labWork8,0);
            }
        }
    };

//*****************************************************************/






/* function to move for array     */
///////////////////////////////////////////////////////////

function next_lex(arr=lexamaArray) {
    let n=n_n++;
    if(n>=arr.length) return 0;
    else {
        N_N+=arr[n].value;
        row=arr[n].row;
        return arr[n].inPutNum
    }  
};

///////////////////////////////////////////////////////////





/*        global func to writeInBlock                  */
///////////////////////////////////////////////////////////

function writeInBlock(block,message){
    try {
        let outPutText=document.createTextNode(message);
        let temp=document.createElement('p');
        temp.appendChild(outPutText);
        block.appendChild(temp);

    } catch(e) {

        console.log(e);
    }
       
}

//////////////////////////////////////////////////////////////





