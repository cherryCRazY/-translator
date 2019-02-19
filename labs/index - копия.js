

console.log(myCodeMirror)
myCodeMirror.display.wrapper.className='cm-s-monokai  CodeMirror  main-box  codeArea'
console.log(myCodeMirror)
let accButtons = document.getElementsByClassName('accordion');
let panels     = document.getElementsByClassName('panel');
let text  =document.getElementById("codeArea");
let lab1=document.getElementById("lab1");
let consol=document.getElementById('console');    
let addSet=document.getElementById("adSet")
let footer=document.getElementById("footer")
let tableLab7=document.getElementById("lab7");
let tableLab8=document.getElementById("lab8");


for(let i = 0; i < accButtons.length; i++){
  accButtons[i].onclick = function(){
    this.nextElementSibling.classList.toggle('show');
    for(let x = 0; x < panels.length; x++){ 
        if(i==x) continue;
        panels[x].classList.remove('show');
   }    
  }
}
    

  console.log(footer);
  console.log(addSet);

addSet.onclick=function(){

    footer.classList.toggle('show');
}

const lexamaArray = []
let idArray = new Map();
let conArray = new Map();
let labelArray = new Map();

let OP=[',','/','*','(',')',';','?',':','+','-','{','}','[',']'];
let Sign=['+',"-"];
let Signs=['||','&&','<','<=','!=','==','>','>=','+','-','*','/','='];//,'{','}','(',')']

let row=0;
let error=false ;

/********************************************************************/

let labWork1 =(function (code){
        console.log(code)


    /*             States of input Char          */
    /********************************************/

        let State21 = new Map([
            ['name',21],
            ['Final','op']
            ]);

        let State20 = new Map([
            ['name',20],
            ['Final','op']
            ]);
        let State19 = new Map([
            ['AndChar',State20],
            ['name',19],
            ['Final',false]
            ]); 

        let State18 = new Map([
            ['name',18],
            ['Final','op']
            ]);

        let State17 = new Map([
            ['OrChar',State18],
            ['name',17],
            ['Final',false]
            ]);

        let State16 = new Map([
            ['name',16],
            ['Final','op']
            ]);

        let State15 = new Map([
            ['EqChar',State16],
            ['name',15],
            ['Final','op']
            ]);  

        let State14 = new Map([
            ['name',14],
            ['Final','op']
            ]); 

        let State13 = new Map([
            ['EqChar',State14],
            ['name',13],
            ['Final',false]
            ]); 

        let State12 = new Map([
            ['name',12],
            ['Final','op']
            ]); 

        let State11 = new Map([
            ['EqChar',State12],
            ['name',11],
            ['Final','op']
            ]); 

        let State10 = new Map([
            ['name',10],
            ['Final','op']
            ]); 

        let State9 = new Map([
            ['EqChar',State10],
            ['name',9],
            ['Final',"op"]
            ]);

        let State8 = new Map([
            ['name',8],
            ['Final','con']
            ]); 
        State8.set('Num',State8);
        let State7 = new Map([
            ['Num',State8],
            ['name',7],
            ['Final',false]
            ]);

        let State6 = new Map([
            ['Num',State8],
            ['Sign',State7],
            ['name',6],
            ['Final',false]
            ]);

        let State5 = new Map([
            ['E',State6],
            ['name',5],
            ['Final','con']
            ]);

        State5.set('Num',State5)

        let State4 = new Map([
            ['Num',State5],
            ['name',4],
            ['Final',false]
            ]);

        let State3 = new Map([
            ['Dot',State5],
            ['E',State6],
            ['name',3],
            ['Final','con']
        ]);
        State3.set('Num',State3);

        let State2 = new Map([
            ['Final','id'],
            ['name',2]
        ]);

        State2.set('Letter',State2);
        State2.set('Num',State2);
        State2.set('E',State2);

        var State1 = new Map([
            ['Letter',State2] ,
            ['E',State2],
            ['Num' ,State3] ,
            ['Dot',State4] ,
            ['OP',State21] ,
            ['LessChar',State9] ,
            ['MoreChar',State11] ,
            ['NotChar',State13] ,
            ['EqChar',State15] ,
            ['OrChar',State17] ,
            ['AndChar',State19],
            ['Sign',State21],
            ['name',1],
            ['Final',false]
        ]);

    /********************************************/


     /*            Variables for  this lab work    */
    /*********************************************/

        let lex='';
        let  maps = State1;
        let label_control=false;
        let var_control=false;
        let error=false ;
        let minus_const_control=false;
        let pred_lex=lexamaArray[lexamaArray.length-1];


        maps=State1;
        lex='';
        row=0;
        label_control=false;
        var_control=false;
        error=false; 
        minus_const_control=false;

    /*********************************************/


    /*              inputLex                     */
    /********************************************/
        let inputLex = new Map([
            ['program',1],
            ['var',2],
            ['{',3],
            ['}',4],
            [';',5],
            [':',6],
            ['num',7],
            ['label',8],
            ['read',9],
            ['write',10],
            ['while',11],
            ['do',12],
            ['goto',13],
            ['if',14],
            ['?',15],
            ['||',16],
            ['&&',17],
            ['<',18],
            ['<=',19],
            ['!=',20],
            ['==',21],
            ['>',22],
            ['>=',23],
            ['.',24],
            ['+',25],
            ['-',26],
            ['*',27],
            ['/',28],
            ['(',29],
            [')',30],
            //['!',31],
            ['=',32],
            [',',33],
            ['id',34],
            ['con',35],
            ['lab',36],
            ['[',37],
            [']',38],
        ]);

    /********************************************/


    /*      functions to detect type of char     */
    /********************************************/

        function isE(char){
            return (char.charCodeAt(0) == 69) ? true : false ;
        }


        function isLetter(char){
        	return (char.match( /\w/ ) && !(char.match( /\d/ ))) ? true : false ;
        }


        function isNum(char){
        	return (char.match( /\d/ ) ) ? true : false ;
        }


        function isDot(char){
        	return char == '.' ? true: false;  
        }


        function isOP(char){
        	return (OP.indexOf(char)>-1) ? true : false ;
        }

        function isSign(char){
        	return (Sign.indexOf(char)>-1)? true:false ; 
        }


        function isLessChar(char){
        	return char=="<" ? true : false ;
        }


        function isMoreChar(char){
        	return char==">" ? true : false ;
        }


        function isNotChar(char){
        	return char=="!" ? true : false ;
        }


        function isEqChar(char){
        	return char=="=" ? true : false ; 
        }


        function isOrChar(char){
        	return char=="|" ? true : false ;
        }


        function isAndChar(char){
        	return char=="&" ? true : false ; 
        }


        function isSpace(char){
            return (char.charCodeAt(0)==32 || char.charCodeAt(0)==13 || char.charCodeAt(0)==9) ? true :false;
        }


        function Classification(char){
               if       (isE(char))             symb = 'E'
            else if     (isLetter(char))  		symb = 'Letter';
            else if 	(isNum(char)) 			symb = 'Num';
            else if 	(isDot(char)) 			symb = 'Dot';
            else if     (isSign(char))          symb = 'Sign';
            else if 	(isOP(char)) 			symb = 'OP';
            else if 	(isLessChar(char))  	symb = 'LessChar';
            else if 	(isMoreChar(char))  	symb = 'MoreChar';
            else if 	(isNotChar(char)) 		symb = 'NotChar';
            else if 	(isEqChar(char)) 		symb = 'EqChar';
            else if 	(isOrChar(char)) 		symb = 'OrChar';
            else if 	(isAndChar(char))   	symb = 'AndChar';
            else if     (isSpace(char))         symb = 'Space';
            else 								symb = 'Other';
        	return symb;
        }

    /************************************************/


    /*      function to  add words in lexamaArray     */
    /************************************************/

        function Add(row,value,inPutNum,code,lex) {
             this.value=value;
             this.row=row;
             this.inPutNum=inPutNum;
             this.code=code;
             this.lex=lex;
        }


        function addLexam(str,row){ 
            if(lex == ';'|| lex=="{") label_control=false;
            if(lex == '{') var_control= true;
        	if(str == 'id'){
            	if(inputLex.has(lex)) { 
                        if(lex=="label") label_control=true;
                        let TRM = new Add(row,lex,inputLex.get(lex),'','reserved words');
                        lexamaArray.push(TRM); 
            			return lexamaArray
                    }
            	else { 
                        if((idArray.has(lex))&&(labelArray.has(lex))) {
                            writeInBlock(consol,`both ${lex} in idArray and labelArray`);
                             error=true;
                         }
                        let t=idArray; let c=34; let cm='id';
                        if(label_control||labelArray.has(lex)) {t=labelArray; c=36;cm='lab'}
                        if(var_control==false&&t.has(lex)==true) {
                            writeInBlock(consol,`Variable ${lex} has already been declared ${row}`);
                             error=true;
                         }
            			else if(t.has(lex)) {
            				    let TRM = new Add(row,lex,c,t.get(lex),cm);
            				    lexamaArray.push(TRM);
            				    return lexamaArray;
                            }
            			else { if(var_control){
                                writeInBlock(consol,` ${lex} is not defined,row : ${row}`)
                                error=true;
                                }
                                else{
                                     t.set(lex,t.size+1);
            				        let TRM = new Add(row,lex,c,t.get(lex),cm);
            				        lexamaArray.push(TRM);
            				        return lexamaArray;
                                }

            				}	
            		}

        		}	
             if(str=='con'){
        		if(conArray.has(lex)) {
            		let TRM = new Add(row,lex,35,conArray.get(lex),'con');
            		lexamaArray.push(TRM);
            		return lexamaArray;
            	}	
            	else { 
                    conArray.set(lex,conArray.size+1);
            		let TRM = new Add(row,lex,35,conArray.get(lex),'con');
            		lexamaArray.push(TRM);
            		return lexamaArray;

            	}		

        	}
            if(lex=='-'){
                if((pred_lex==34||pred_lex==35||pred_lex==30)&&lex=='-') {
                     minus_const_control=false;
                   let TRM = new Add(row,lex,inputLex.get(lex),'','c');
                    lexamaArray.push(TRM);
                    return lexamaArray;
                }
                else { 
                    minus_const_control=true;
                    return 
                }
            }
            if(str=='op'){ 
                if(Signs.includes(lex)){
                    let TRM = new Add(row,lex,inputLex.get(lex),'','sign');
                    lexamaArray.push(TRM);
                }
                else{
                    let TRM = new Add(row,lex,inputLex.get(lex),'','auxiliary signs');
                    lexamaArray.push(TRM);
                }
            	return lexamaArray;
            }
        }

    /************************************************/



    /*      function to detect State(Class) of char
                     and routing                    */
    /************************************************/

        function Classes(symb,row,r){
            for( var[key,value] of maps ){
                    if(symb==key) {  return value;  }           
                }
            if(maps.get("Final")) {
                addLexam(maps.get("Final"),row);
                pred_lex=lexamaArray[lexamaArray.length -1].inPutNum
                if(!minus_const_control) lex='';
                else {
                    minus_const_control=false;
                    return State1.get(symb);
                }
                return State1 ;
            }
            else{   console.log(lex.charAt(0));
                    lex=r;
                    writeInBlock(consol,`Unidentified word ${r} in line ${row}!!!`);
                    error = true;
                    return 
                }
                
        }

    /************************************************/



    /*    finiteAvtomat (main fucntion on local */
    /************************************************/

        function finiteAvtomat(code){
            console.log('kek')
                let classOfChar,nextSymbol;
                let arr = code.split('\n');

                for (let j = 0; j < arr.length; j++) {
                    let stroka = arr[j]; 
                    console.log(stroka.split(''))   
                    if(error) break;
                    row++
                    for (let i = 0; i < stroka.length;i++ ) {

                        if(maps == undefined) error=true;

                        if(error){ 
                            writeInBlock(consol,`Unidentified word ${lex} in line ${row}!!!!`);
                            new Error(`Unidentified word ${lex} in line ${row}!!`)
                            break ;
                        }

                        classOfChar=Classification(stroka[i]);

                        if((maps.get('name') ==3 || maps.get('name') ==5 || maps.get('name') == 8 ) && classOfChar =="Letter") {
                            writeInBlock(consol,`Unidentified word ${lex} in line ${row}`);
                            new Error(`Unidentified word ${lex} in line ${row}`);
                            error = true ;
                        }

                        if(classOfChar=="Space"&&lex.length==0&&maps==State1) continue ;

                        maps=Classes(classOfChar,row,stroka[i+1]);

                        if(classOfChar==="Space") continue;

                        lex+=stroka[i];

                        if(lex.length==1) maps=State1.get(classOfChar);
                        if(i==(stroka.length-1)) {
                            try {
                                addLexam(maps.get('Final'),row);
                                lex=''
                                maps=State1;
                            } catch(e) {
                                // statements
                                console.log(e);
                            }
                           
                        }
                    }
                }           
                console.log(lexamaArray);
               // lab1.innerHTML+='<div class="lab-content">'
                for(let i=0;i<lexamaArray.length;i++){
                lab1.innerHTML +=`<div>
                            <p class="lab1"> ${lexamaArray[i].row} </p>
                            <p class="lab1"> ${lexamaArray[i].value} </p>
                            <p class="lab1"> ${lexamaArray[i].inPutNum} </p>
                            <p class="lab1"> ${lexamaArray[i].code} </p>
                            <p class="lab1"> ${lexamaArray[i].lex} </p>
                        </div>`;
                } 
        }   
    /************************************************/
      finiteAvtomat(code);  

});


/********************************************************************/


    
 /*                     the Other Part                               */
/********************************************************************/


var fs= false;
var openedFile =false;
var fs =false;

  var openedFile=false;
  try {
     fs=require('fs');
  }
   catch(e){
   alert(e);
}

let n_n=0;
let N_N=''
    


   /* let polizItems=['id','+','-','*','/','con','='];
    let uselessLeftPart=['<сп.ид>','<сп.ид1>','<лог.множ>'];
    let polisDisplays=[];*/
    
    let polizStek=[]; 
    let tableID = new Map();
    let polizArrayDis=[];




function resetAllGlobalStats(){
    openedFile=this.value;
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
    if(!openedFile) return;
    fs.writeFile(openedFile,myCodeMirror.options.value,function (err) {
    if (err) writeInBlock(consol,err);
    });
};
    

let openFile = function () {    
    let input = document.createElement("input");
    input.type = "file";

    input.onchange = function () {
        let fr = new FileReader();
         fr.onload = function (info) {
            console.dir(info)
            console.dir(myCodeMirror);
            console.dir(myCodeMirror.doc.getValue());
            console.dir(myCodeMirror.doc.setValue('adsasd elseads asd'));
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
        if(Control_s()){
            Magaz_avtomat(lexamaArray);
            labWork7();
            setTimeout(lab8,0);
        }
    };

//*****************************************************************/


/* function to move for array     */
function next_lex(arr=lexamaArray) {
    let n=n_n++;
    if(n>=arr.length) return 0;
    else {
        N_N+=arr[n].value;
        row=arr[n].row;
        return arr[n].inPutNum
    }  
};






/*                      The Other part                             */
//*****************************************************************/


///////////////////////////////////////////////
/*          used func in LAB2                */
////////////////////////////////////////////////


    function LabList(){
        let found =false;
        lex=next_lex();   
        if (lex==36){
            found=true;
            lex=next_lex();
            while(lex==33&&found){
                lex=next_lex();
                if(lex==36) lex=next_lex();
                else found=false;

            }
        }
        else writeInBlock(consol,`Expected identifier : ${row}`);

     return found;
    };


    function IdList(){
        let found =false;
        lex=next_lex();   
        if (lex==34){
            found=true;
            lex=next_lex();
            while(lex==33&&found){
                lex=next_lex();
                if(lex==34) lex=next_lex();
                else found=false;

            }
        }
        else writeInBlock(consol,`Expected identifier: ${row}`);

     return found;
    };


    function Declaration(){
        let found=false;
        if( lex==7){
            if(IdList()){
                found=true;

            }
            else writeInBlock(consol,`Invalid list of argument  : ${row}`)

        }
        else if(lex==8){
            if(LabList()){
                found=true;
            }
            else writeInBlock(consol,`Invalid list of labels : ${row}`)

        }
        else writeInBlock(consol,`Don't found type of variable : ${row}`)

        return found;       
    };


    function ListDelacaration(){
        let found = false ;
        if(Declaration()){
            found = true ;
            while(lex==5&&found){
                lex=next_lex();
                if (Declaration()) {}//writeInBlock(consol,'Declaration good');
                else found=false;
            }
        }
        return found;
    };


    function Logic_Plural() {
        let found=false;
            if(lex==29){ 
                lex=next_lex();
                if(Logic_Expression()) found =true;
                else {
                    writeInBlock(consol,`Invalid Logic Plural : ${row}`);   
                    return false;
                }
                
                if(lex==30) {
                  lex=next_lex();
                  found = true ;
                }
                else {
                    writeInBlock(consol,`missing ) after Logic Plural : ${row}`)
                    found = false ;
                }
           }
           else {
            if(Expression()){
                if(lex==18||lex==19||lex==20||lex==21||lex==22||lex==23){
                    lex=next_lex();
                    if(Expression()){
                        found=true;

                    }
                    else writeInBlock(consol,`Invalid Expression after logic sign ${row} `)

                }
                else writeInBlock(consol,`Missing logic sign ${row}`)

            }
            else writeInBlock(consol,`Invalid Expression in Logic Plural ${row}`)
           }

        return found;
    };


    function Logic_Term(){
        let found =false 
        if(Logic_Plural()){
            found=true
            while(lex==17){
                lex=next_lex();
                if(Logic_Plural()) {}
                else {
                    writeInBlock(consol,`Invalid Logic Plural after  sign: ${row}`) 
                    return false;
                }
            }

        }
        else {
            writeInBlock(consol,`Invalid Logic Plural : ${row}`);
             found=false;
        }
        return found;
    };
      

    function Logic_Expression(){
       let found =false 
        if(Logic_Term()){
            found=true;
            while(lex==16){
                lex=next_lex();
                if(Logic_Term()) {}
                else {
                    writeInBlock(consol,`Invalid Logic Term after  sign : ${row}`) 
                    return false;
                }
            }

        }
        else {
            writeInBlock(consol,`Invalid Logic Term  : ${row}`);
        return false;
        }
        return found;
    };


    function Plural() {
        let found=false;
        if(lex==29) {    
            lex=next_lex();
            if(Expression()) {}
            else {
                writeInBlock(consol,`Invalid Expression: ${row}`);
                 return false;
                }
            if(lex==30){ 
                lex=next_lex(); 
                return true; 
            }
            else {  console.log(lex)
                    writeInBlock(consol,`missing ) : ${row}`)
                    return false ;
                }
        }
        else if (lex==34||lex==35) {
            lex=next_lex();
            return true ;
            
        }
        else {
            writeInBlock(consol,`Invalid id con or ( : ${row}`); 
            return false
        } 
    };


    function Term(){
        let found =false 
        if(Plural()){
            found=true
            while(lex==27 || lex==28){
                lex=next_lex();
                if(Plural()) {}
                else {
                    writeInBlock(consol,`Invalid Prular after  sign : ${row}`) 
                    return false;
                }
            }

        }
        else {writeInBlock(consol,`Invalid Prular : ${row}`); found=false;}
        return found;
    };


    function Expression(){
        let found =false 
        if(Term()){
            found=true;
            while(lex==25 || lex==26){
                lex=next_lex();
                if(Term()) {}
                else {
                    writeInBlock(consol,`Invalid Term after  sign: ${row}`) 
                    return false;
                }
            }

        }
        else {writeInBlock(consol,`Invalid Term : ${row}`);return false}
        return found;
    };


    function OperatorBlock(){
        let found=false;
        if(lex==3){
             lex=next_lex();
                if(ListOperator()) {
                    if(lex==4)  found=true;          
                    else writeInBlock(consol,`Close braket in ${row}`)
                 }
                else writeInBlock(consol,`Not correct ListOperator ${row}`)
                }   
        /*else{
             if(Operator()) found =true;
             else writeInBlock(consol,`Невірний оператор в ${row} lex=${lex}`)
            }*/
        return found;
    };


    function OperatorAssignment(){
        let found =false;
        lex=next_lex();
        if(lex==32){
            lex=next_lex();
            if(Expression()) found=true;

        } 
        else writeInBlock(consol,`Invalid  = in assignment: ${row}`)
        return found;
    };


    function OperatorInPut(){
        let found=false;
        lex=next_lex();
        if(lex==29){
            if(IdList()){
                if(lex==30) { found=true;lex=next_lex();}
                else writeInBlock(consol,`Invalid  ) ${row}`)

            }
            else writeInBlock(consol,`Invalid list of argument in OperatorInPut ${row}`)
        }
        else writeInBlock(consol,`Missing ( ${row}`)
      return found;  
    };


    function OperatorOutPut(){
        let found=false;
        lex=next_lex();
        if(lex==29){
            if(IdList()){
                //
                if(lex==30) { 
                    found=true;
                    lex=next_lex();
                }
                else writeInBlock(consol,`Missing ) ${row}`)

            }
            else writeInBlock(consol,`Invalid list of argument in OperatorOutPut ${row}`)
        }
        else writeInBlock(consol,`Missing ( ${row}`)
      return found;     
    };


    function OperatorLoop(){
        let found=false;
        lex=next_lex();
        if(Logic_Expression()){
            if(lex==12){
                lex=next_lex();
                if(OperatorBlock()) { lex=next_lex();found=true;}
                else writeInBlock(consol,`Invalid OperatorBlock in OperatorLoop:${row}`)

            }
            else writeInBlock(consol,`Missing valuable word do : ${row}`)
        }
        else writeInBlock(consol,`Invalid Logic Expression : ${row}`)


     return found;
    };


    function OperatorConditional(){
        let found = false ;
        lex = next_lex();
        if(Logic_Expression()){
            if(lex==15){    
                lex=next_lex();
                if(OperatorBlock()){
                    lex=next_lex()
                    if(lex==6){
                        lex=next_lex()
                        if(OperatorBlock()) {
                            lex=next_lex();
                            found=true;
                        }
                        else writeInBlock(consol,`Invalid OperatorBlock  after  ':  :${row}`)


                    }
                    else writeInBlock(consol,`Missing  ':' after OperatorBlock : ${row}`)
                }
                else writeInBlock(consol,`Invalid OperatorBlock before : ${row}`)
            
            
            }
            else writeInBlock(consol,`Missing sign  ? in OperatorConditional : ${row}`)
        
        }
        else writeInBlock(consol,`Invalid Logic Expression in  OperatorConditional : ${row}`)
       
       return found; 
    };


    function OperatorUnconditional(){
        let found=false;
        lex=next_lex();
        lex==36 ? found=true : found=false;
        lex=next_lex();
        return found;
    };


    function OperatorLabel(){
        let found=false;
        lex=next_lex();
        lex==6 ? found=true : found=false;
        lex=next_lex();
        return found;
    };


    function Operator(){
        let found = false ;
        if      (lex==34)   found=OperatorAssignment();
        else if (lex==9)    found=OperatorInPut();
        else if (lex==10)   found=OperatorOutPut();
        else if (lex==11)   found=OperatorLoop();
        else if (lex==14)   found=OperatorConditional();
        else if (lex==13)   found=OperatorUnconditional();
        else if (lex==36)   found=OperatorLabel();
        else writeInBlock(consol,`Error ${lex} : ${row}`);
        return found;
    };



    function ListOperator(){
        let found=false;
        if(Operator()){
            if(lex==5){
                found=true;
                lex=next_lex();
                while(lex!=4&&found){
                    if(Operator()){ 
                        if(lex==5){
                            lex=next_lex();
                        }
                        else found=false;
                    }
                    else {
                        writeInBlock(consol,`Invalid Operator: ${row}`); 
                        found=false;
                    }

                };
            }
            else writeInBlock(consol,`Missing ';' : ${row}`)
        }
        else  writeInBlock(consol,`Invalid Operator: ${row}`)
     
        return found;
    };

//


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////


/*         LAB 2                */
/////////////////////////////////

    function Control_s() { 
        if(lex==1) {
            lex=next_lex();
            if(lex==34){
                lex=next_lex();
                if(lex==2){
                    lex=next_lex();
                    if(ListDelacaration()) { 
                        if(lex==3){
                            lex=next_lex();
                            if(ListOperator()){
                                if(lex==4){
                                    writeInBlock(consol,'It\'s Alive')
                                    return true;
                                }
                               else writeInBlock(consol,`Missing ':' ${row}`)
                            }
                            else writeInBlock(consol,`Invalid ListOperator: ${row}`);

                        }
                        else writeInBlock(consol,`Missing  '}' : ${row}`)   
                    
                    }       
                   else writeInBlock(consol,`Invalid ListDelacaration : ${row}`);

              }

                else writeInBlock(consol,` Missing valuable word var : ${row}`);
            }
            else writeInBlock(consol,`Missing  name of program : ${row}`);
        }
      else writeInBlock(consol,`Missing valuable word program: ${row}`);
    };


////////////////////////////




/*                      The Other part                             */
/*****************************************************************/




/*                      lab work N3                              */
/*****************************************************************/
    function Magaz_avtomat(arr) {
        var i = 0;
        var obj;

        // create obj
        function Avtom(state1, num_lex, state2, stack, error, vyhod, step) {
            this.state1 = state1;
            this.num_lex = num_lex;
            this.state2 = state2;
            this.stack = stack;
            this.error = error;
            this.vyhod = vyhod;
            this.step = step;

        }
        
        var mass = [];
        mass.push( new Avtom(1, 1, 2, 0, true, false) ); // îñíîâà-îñíîâ
        mass.push(new Avtom(2, 34, 3, 0, true, false));
        mass.push(new Avtom(3, 2, 101, 4, false, false));
        mass.push(new Avtom(4, 5, 101, 4, false, false));
        mass.push(new Avtom(4, 3, 201, 5, true, false));
        mass.push(new Avtom(5, 5, 6, 0, true, false));
        mass.push( new Avtom(6, 4, 0, 0, false, true,0));
        mass.push( new Avtom(6, 0, 201, 5, false, false,0));

        //mass.push( new Avtom(7, 5, 6, 0, true, false));

        mass.push( new Avtom(101, 7, 102, 0, false, false));
        mass.push( new Avtom(101, 8, 104, 0, true, false));
        mass.push( new Avtom(102, 34, 103, 0, true, false));
        mass.push( new Avtom(103, 33, 102, 0, false, false));
        mass.push( new Avtom(103, 0, 0, 0, false, true,0));
        mass.push( new Avtom(104, 36, 105, 0, true, false));
        mass.push( new Avtom(105, 33, 104, 0, false, false));
        mass.push( new Avtom(105, 0, 0, 0, false, true,0));

        mass.push( new Avtom(201, 34, 202, 0, false, false));
        mass.push( new Avtom(201, 9,  204, 0, false, false));
        mass.push( new Avtom(201, 10, 204, 0, false, false));
        mass.push( new Avtom(201, 11, 401, 207, false, false));
        mass.push( new Avtom(201, 14, 401, 209, false, false));
        mass.push( new Avtom(201, 36, 212, 0, false, false));
        mass.push( new Avtom(201, 13, 213, 0, true, false));
      // assigment 

        mass.push( new Avtom(202, 32, 301, 203, true, false));  // нада false поставить на виход
        mass.push( new Avtom(203, 0, 0, 0, false, true, 0));

      // read
        mass.push( new Avtom(204, 29, 205, 0, true, false));
        mass.push( new Avtom(205, 34, 206, 0, true, false));
        mass.push( new Avtom(206, 33, 205, 0, false, false));
        mass.push( new Avtom(206, 30, 0, 0, true, true));

       //while
        mass.push( new Avtom(207, 12, 501, 208, true, false));
        mass.push( new Avtom(208, 0, 0, 0, true, true,0));

        // if 
        mass.push( new Avtom(209, 15, 501, 210, true, false));
        mass.push( new Avtom(210, 6, 501, 211, true, false));
        mass.push( new Avtom(211, 0, 0, 0, false, true,0));
        // lab 
        mass.push( new Avtom(212, 6, 0,0, true,true));
        //goto 
        mass.push( new Avtom(213, 36, 0,0, true,true));
        //exspression
        mass.push( new Avtom(301, 34, 303,0, false,false));
        mass.push( new Avtom(301, 35, 303,0, false,false));
        mass.push( new Avtom(301, 29, 301,302, true,false));
        mass.push( new Avtom(302, 30, 303,0, true,false));
        mass.push( new Avtom(303, 25, 301,0, false,false));
        mass.push( new Avtom(303, 26, 301,0, false,false));
        mass.push( new Avtom(303, 27, 301,0, false,false));
        mass.push( new Avtom(303, 28, 301,0, false,false));
        mass.push( new Avtom(303, 0, 0,0, false,true,0));
        //logic_exspression
        mass.push( new Avtom(401, 29, 401,404, false,false));
        mass.push( new Avtom(401, 0, 301,402, false,false,0));
        mass.push( new Avtom(402, 18, 301,403, false,false));
        mass.push( new Avtom(402, 19, 301,403, false,false));
        mass.push( new Avtom(402, 20, 301,403, false,false));
        mass.push( new Avtom(402, 21, 301,403, false,false));
        mass.push( new Avtom(402, 22, 301,403, false,false));
        mass.push( new Avtom(402, 23, 301,403, true,true));
        mass.push( new Avtom(403, 16, 401,0, false,false));
        mass.push( new Avtom(403, 17, 401,0, false,false));
        mass.push( new Avtom(403, 0, 0,0, false,true,0));
        mass.push( new Avtom(404, 30, 403,0, true,false));
        //oper_block
        mass.push( new Avtom(501, 3, 201,502, false,false));
        //mass.push( new Avtom(501, 0, 201,504, false,false,0));
        mass.push( new Avtom(502, 5, 503,0,false,false));
        mass.push( new Avtom(503, 4, 504,0,false,false));
        mass.push( new Avtom(503, 0, 201,502,false,false,0));//trr
        mass.push( new Avtom(504, 0, 0,0, false,true,0));

        var i = 0;
        var stak = [];
        avtomat(arr);
        

        function avtomat(arr) {
            var  start = 1;
            var vyhod = 0;
            do {
                if(i>arr.length) {
                    writeInBlock(consol,'Перевище')
                }
                //console.log(i+"=i")
               // console.log(arr[i].inPutNum);
                vyhod = nextState(start, arr[i].inPutNum);
                 //writeInBlock(consol,'поточний стан'+vyhod);
                var vyvid = document.createElement("p");
                if (stak.length === 0 && vyhod !== 1002) {
                    var text = document.createTextNode(" Transition from " + start + " to  " + vyhod + ". In stek - "+"Current lexema - "+arr[i].inPutNum +'_|'+arr[i-1].value +'|_next lex=|'+arr[i].value);
                } 
                else if(vyhod ===  1002){
                    var text = document.createTextNode("LastLex -  end. It's Alive!");
                } 
                else {
                    var text = document.createTextNode("Transition from " + start + " to " + vyhod + ". In stek - " + stak + ". Current lexema - " + arr[i].inPutNum+'_|'+arr[i-1].value +'|_next lex=|'+arr[i].value);
                    }

                var lab3=document.getElementById("lab3");
                vyvid.appendChild(text);
                lab3.appendChild(vyvid);

                if (vyhod === 1002) {
                    if (i + 1 === arr.length) {
                        writeInBlock(consol,"Success!!!");
                        return;
                    }
                }
                if (vyhod === 1003) {
                    writeInBlock(consol,"Syntax error on stroka " + arr[i].row + "!");
                    return;
                }
                if (vyhod === 1001) {
                    writeInBlock(consol,"Unexpected end of programm on stroka " + arr[i-1].row + "!");
                    return;
                }
                
                if( vyhod == 1004){
                    writeInBlock(consol,"Syntax error on stroka " + arr[i].row + "!");
                    return;

                }

                start = vyhod;
            } while (true)
      
        }

        function nextState(state, nomer) {
            var nextState
            var k = 0;
            for (k; k < mass.length; k++) {
                if (mass[k].state1 == state) {
                    if (mass[k].num_lex === 0 || mass[k].num_lex === nomer) {
                       // console.log(mass[k], arr[i]);
                        if (mass[k].stack !== 0) {
                            stak.push(mass[k].stack);
                            //console.log(stak);
                            if (mass[k].stack2 !== undefined) {
                                stak.push(mass[k].stack2);
                               // console.log(stak);
                            }

                        }
                        if (mass[k].step === undefined || mass[k].step === 1) {
                            i++;
                        } else {/* console.log(mass[k]);*/}
                        if (i >= arr.length) {
                            return 1001;
                           // console.log(i);
                        }
                        if (mass[k].vyhod) {
                            if (stak.length > 0) {
                                nextState = stak.pop();
                                return nextState;
                            } else {
                                return 1002;
                            }
                        }
                        if (mass[k].num_lex == 0 && mass[k].error) {
                            return 1003;
                        }
                        //console.log(mass[k].state2);
                        return mass[k].state2;
                    } else {
                       // console.log(mass[k], arr[i]);
                        if (mass[k].error) {
                           // console.log(mass[k], arr[i], stak);
                            return 1003;
                        }
                    }

                }
            }
            return 1004;
        };

    };       
//  
//////////////////////////////////////////////////////////////////////  
   


/*                      The Other part                             */
/*****************************************************************/
/*  intermediary lab work(useless for main function interpret() ) */
/*****************************************************************/
   
    /*var tableLab5=document.getElementById("lab5");
    tableLab5.value="";
    var partToFind='';
    var findInLeftPart='';
    let inputArray = [...lexamaArray];

    let lolkek;
    let polizArray=[];
    let n=0;
    let nothing=0;
    error=false;
    function next(arr){
             n++;
             nothing++;
            if(n<lexamaArray.length){
                row=lexamaArray[n].row;
                lolkek=lexamaArray[n];
                return lexamaArray[n].lex;
            }
            else return 0;
        }
      
        var operOBJ;
        function lab5(){
            let arrayStek=['#']; 
            let lex;
            let k=0;
            lex=next();
            while(inputArray.length>0){
                let sign = tableArray[findElementRow(tableArray,arrayStek[arrayStek.length-1])][findElementColumn(tableArray,lex)]
                if( sign =='<' || sign == "="){
                        arrayStek.push(lex);
                        inputArray.shift();
                        try {
                            if( lex='id' && lexamaArray[nothing+1].lex == "=") operOBJ=lexamaArray[nothing];
                        } catch(e) {
                            console.log(e);
                        }
                        
                        lex=next();
                }           
                else if(sign === undefined ) {
                      writeInBlock(consol,`Неможливо редукувати:знак ${sign}
                                наступний символ ${inputArray[k].lex}
                            Помилка знайдена в строці:${row}`);
                    break;
                }
                else {
                    if(sign == ">"){
                        var boolean=true;
                        let  i=1;
                        while (boolean) {
                            if(tableArray[findElementRow(tableArray,arrayStek[arrayStek.length-i-1])][findElementColumn(tableArray,arrayStek[arrayStek.length-i])] == "<"){ 
                                partToFind=arrayStek.slice(arrayStek.length-i).join(' ');
                                for(let i=0;i<MainArray.length;i++){
                                    if(Array.prototype.join.call(MainArray[i].right,' ') == partToFind){
                                       if(tableArray[findElementRow(tableArray,Array.prototype.join.call(MainArray[i].left,''))][findElementColumn(tableArray,lex)] != 'undefined' )  {
                                            findInLeftPart=Array.prototype.join.call(MainArray[i].left,'');
                                        }
                                    }

                                }
                                arrayStek.splice(arrayStek.length-i, arrayStek.length-(arrayStek.length-i),findInLeftPart);
                                boolean=false;
                                if(partToFind =='id = <выраж1>') {
                                    createPolis(partToFind,findInLeftPart,operOBJ);
                                }
                                    else createPolis(partToFind,findInLeftPart,lexamaArray[nothing-i]);
                              
                            }
                            else {
                                i++;
                                if(i>arrayStek.length) { 
                                    writeInBlock(consol,'ERROR'); 
                                    boolean=false;
                                    error=true;
                                } 
                            }

                        
                        }
                        
                
                      }
                      else error=true;
                    }
                    tableLab5.innerHTML+=(`<div>
                                            <p class="lab5">${k++}</p>
                                            <p class="lab5">${arrayStek.join(' ')}</p>
                                            <p class="lab5">${sign}</p><p class='lab5'>${lex}</p>
                                            <p class="lab5"> ${inputArray.length}</p> 
                                            <p class="lab5"> ${polisDisplays.join(' ')}</p> 
                                           </div> `);
                     if(error) {
                                writeInBlock(consol,`Неможливо редукувати |${partToFind}|
                                     знак ${sign} наступний символ ${lex}
                                     Помилка знайдена в строці:${row}`);
                                break;
                     }
                     
                }
               
        }

     
        function createPolis(arr,useless,obj){
            let bool=false;
            for(let i=0;i<polizItems.length;i++){
                if(arr.includes(polizItems[i])&&(!uselessLeftPart.includes(useless))) {
                    let x={};
                    x.input=polizItems[i];
                    x.row=row; 
                    x.value=obj.value;
                    polizArray.push(x);
                    bool=true;
                    polisDisplays.push(polizItems[i]);
                }
                {       }}
        }


        function calculatePoliz(){
            let k=0;
            for(let i=0;i<polizArray.length;i++){
                let second = polizStek[polizStek.length-2];
                console.log(polizArray[i]);
                let first = polizStek[polizStek.length-1];
                console.log()
                if(OP.includes(polizArray[i].input) || polizArray[i].input == '='){
                    if(polizArray[i].input == '='){
                        tableID.set(first,second);
                        polizStek.pop();
                        polizStek.pop();
                   }
                   else if(polizArray[i].input == '+'){
                    if(tableID.has(second)) second=+tableID.get(second); if(tableID.has(first)) first=+tableID.get(first);
                    polizStek[polizStek.length-2]=(second+first);
                     polizStek.pop();
                   }
                   else if(polizArray[i].input == '-'){
                     if(tableID.has(second)) second=+tableID.get(second); if(tableID.has(first)) first=+tableID.get(first);
                    polizStek[polizStek.length-2]=second-first;
                    polizStek.pop();
                   }
                    else if(polizArray[i].input == '*'){
                    if(tableID.has(second)) second=+tableID.get(second);if(tableID.has(first)) first=+tableID.get(first);
                       polizStek[polizStek.length-2]=second*first;
                       polizStek.pop();
                   }
                   else {  
                     if(tableID.has(second)) second=+tableID.get(second); if(tableID.has(first)) first=+tableID.get(first);
                    polizStek[polizStek.length-2]=second/first;
                    polizStek.pop();
                   }
                }
                else{
                    if(polizArray[i].input == 'con')  polizStek.push(+polizArray[i].value)
                    else polizStek.push(polizArray[i].value)
                }
                polisDisplays.shift();
                 tableLab6.innerHTML+=(`<div>
                                            <p class="lab6">${k++}</p>
                                            <p class="lab6">${polizStek.join(' ')}</p>
                                            <p class="lab6"> ${polisDisplays.join(' ')}</p> 
                                           </div> `);
            }
        }
    */

/*****************************************************************/    
///////////////////////////////////////////////////////////////////


/*        global func to writeInBlock                  */

function writeInBlock(block,message){
    try {
        console.log(block);
        console.log(message)
        let outPutText=document.createTextNode(message);
        let temp=document.createElement('p');
        temp.appendChild(outPutText);
        block.appendChild(temp);

    } catch(e) {
        // statements
        console.log(e);
    }
       
}


 
/*                      The Other part                             */
/*****************************************************************/


    let stekD=[];
    let stekObj=[];
    let labelMap= new Map();


    let labWork7=(function(){



        //////////////////////////////////////////////////////////////////////
        // Variables for next lab
        let priorityTable = new Map([
            ['(', 0],
            ['{', 0],
            [')', 1],
            ['}', 1],
            ['||',2],
            ['&&',3],
            ['<', 4],
            ['<=',4],
            ['!=',4],
            ['==',4],
            ['=', 4],
            ['>', 4],
            ['>=',4],
            ['+', 5],
            ['-', 5],
            ['*', 6],
            ['/', 6]    
            ]); 



        let readControl=false;
        let writeControl=false; 
        let ifControl=false;
        let whileControl=false;
        let counterInput=0;
        let counterOutput=0;
        /////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////////////////////
        //      used func for lab7 
        function createLabel(i){
            if(i)
                labelMap.set('m'+labelMap.size,i++);
            else labelMap.set('m'+labelMap.size,);
        }

        function processingSign(obj,iterator){
            console.log(obj.value+' '+iterator);
            let last=stekD[stekD.length-1];
            if(priorityTable.get(last) == undefined ){
                stekD.push(obj.value)
                console.log(obj.value);
            }
            else if(priorityTable.get(obj.value) == 0 ){
                    stekD.push(obj.value);
                }
            else if(priorityTable.get(obj.value) == 1 ){
                let j=stekD.length-1;
                while (j>0) {
                    let temp=stekD.pop();
                    if(priorityTable.get(temp) == 0)
                        break;
                    else {
                        polizArray.push(temp);
                        if(priorityTable.get(temp)<5&&temp!='=')
                            stekObj.push({value:temp,lex:'logic sign'})
                        else  stekObj.push({value:temp,lex:'sign'})
                    }
                    j--;
                }
            }
            else if(priorityTable.get(last) < priorityTable.get(obj.value)){
                stekD.push(obj.value);
            }
            else if(priorityTable.get(last) >= priorityTable.get(obj.value)){  
                let j=stekD.length-1;
                while (j>0) {
                    let temp=stekD.pop();
                    polizArray.push(temp);
                    if(priorityTable.get(temp)<5&&temp!='=')
                            stekObj.push({value:temp,lex:'logic sign'})
                    else  stekObj.push({value:temp,lex:'sign'})
                    j--;
                    if(priorityTable.get(stekD[j]) < priorityTable.get(obj.value)){
                        stekD.push(obj.value);
                        break;
                     }   
                }   
            }
        };


        function processingReservedWordsOrAuxiliary(obj,iterator){
            if(obj.value == 'if'){
            stekD.push('if');
            }
            else if(obj.value == '?' ){
                let j=stekD.length;
                while(j>0){
                    let temp = stekD.pop();
                    if(temp == 'if'){
                        createLabel();
                        polizArray.push('m'+(labelMap.size-1));
                        stekObj.push({value:'m'+(labelMap.size-1),code:'',lex:'auxiliry lab'});
                        polizArray.push('CTBM');
                        stekObj.push({value:'CTBM',lex:'auxiliry words' })
                        stekD.push('if'+'m'+(labelMap.size-1))
                        break;

                    }
                    else{
                        polizArray.push(temp);
                        stekObj.push(obj);
                    }
                 j--;   
                }

            }
            else if(obj.value == ':') {
                if(lexamaArray[iterator-1].lex == 'lab' ){
                    polizArray.push(':');
                    stekObj.push({value:':',lex:'auxiliry signs'})
                } 
                else
                {
                    let j=stekD.length;
                    while(j>0){
                        let temp = stekD.pop();
                        if(temp.match(/if*/)){
                            createLabel();
                            polizArray.push('m'+(labelMap.size-1));
                            polizArray.push('goto');
                            polizArray.push('m'+(labelMap.size-2));
                            polizArray.push(':')
                            stekD.push('if'+'m'+(labelMap.size-2)+'m'+(labelMap.size-1));
                            stekObj.push({value:'m'+(labelMap.size-1),code:'',lex:'auxiliry lab'});
                            stekObj.push({value:'goto',lex:'auxiliry words'});
                            stekObj.push({value:'m'+(labelMap.size-2),code:stekObj.length,lex:'auxiliry lab'});
                            labelMap.set('m'+(labelMap.size-2),stekObj.length);
                            stekObj.push({value:':',lex:'auxiliry signs'});

                            
                            break;

                        }
                        else{
                            polizArray.push(temp);
                            stekObj.push({value:temp,lex:'after if'})
                        }
                    j--;   
                    }

                }
            }   
            else if(obj.value == ';') {
                let j=stekD.length-1;
                while(j>=0){
                    let temp =stekD.pop();

                    if( temp.match(/while*/) ){
                        let lab=temp.slice(temp.length-2);
                        polizArray.push(lab);
                        stekObj.push({value:lab,code:labelMap.get(lab),lex:'auxiliry lab'});
                        polizArray.push('goto');
                        stekObj.push({value:'goto',lex:"auxiliry words"})
                        let i=+lab[1]+1;
                        polizArray.push('m'+i);
                        polizArray.push(':')
                        stekObj.push({value:'m'+i,code:stekObj.length,lex:'auxiliry lab'});
                        labelMap.set('m'+i,stekObj.length);
                        stekObj.push({value:':',lex:'auxiliry signs'});
                        
                        break;
                    }
                   else if( temp.match(/if*/) ){
                        if(temp.match(/if..../)){
                            let lab=temp.slice(temp.length-2);
                            polizArray.push(lab);
                            polizArray.push(':');
                            stekObj.push({value:lab,code:stekObj.length,lex:'auxiliry lab'});
                            labelMap.set(lab,stekObj.length);
                            stekObj.push({value:':',lex:'auxiliry signs'});
                            

                        }

                        break;
                    }
                       
                    else if(temp =='{') { 
                        stekD.push(temp);
                        break;
                    }
                    else    {
                        polizArray.push(temp);
                        if(priorityTable.get(temp)<5&&temp!='=')
                            stekObj.push({value:temp,lex:'logic sign'})
                        else  stekObj.push({value:temp,lex:'sign'})
                    }

                    j--;
                }
            }
                            
            else if(obj.value =='('){
                processingSign(obj,iterator)

            }
            else if (obj.value ==')') {
                if(writeControl) { 
                    counterOutput++;
                    polizArray.push(counterOutput);
                    stekObj.push({value:counterOutput,code:"",lex:"con"})
                    polizArray.push('WT');
                    stekObj.push({value:'WT',lex:"WT"});
                    writeControl=false;
                }
                else if(readControl) {
                    counterInput++;
                    polizArray.push(counterInput);
                    stekObj.push({value:counterInput,code:"",lex:"con"})
                    polizArray.push('RD');
                    stekObj.push({value:'RD',lex:"RD"});
                    readControl=false;

                }
                processingSign(obj,iterator);


            }
            else if (obj.value =='{') {
                processingSign(obj,iterator)

            }
            else if (obj.value =='}') {
                processingSign(obj,iterator);

            }
            else if (obj.value == 'while') {
                createLabel();
                stekD.push('while'+'m'+(labelMap.size-1));
                
                polizArray.push('m'+(labelMap.size-1));
                polizArray.push(':');
                stekObj.push({value:'m'+(labelMap.size-1),code:labelMap.get('m'+(labelMap.size-1)),lex:"auxiliry lab"});
                labelMap.set('m'+(labelMap.size-1),stekObj.length);
                stekObj.push({value:':',lex:'auxiliry signs'});
                
            }
            else if(obj.value == 'do'){
                let j=stekD.length;
                while(j>0){
                    let temp = stekD.pop();
                    if(temp.match(/while*/)){
                        createLabel();
                        polizArray.push('m'+(labelMap.size-1));
                        stekObj.push({value:'m'+(labelMap.size-1),code:labelMap.get('m'+(labelMap.size-1)),lex:"auxiliry lab"});
                        polizArray.push('CTBM');
                        stekObj.push({value:'CTBM',lex:'auxiliry words' })

                        stekD.push('while'+'m'+(labelMap.size-2))
                        break;

                    }
                    else{
                        polizArray.push(temp);
                        stekObj.push(obj);
                    }
                 j--;   
                }

            }
            else if(obj.value == 'read'){
                readControl=true;
                counterInput=0;
            }
            else if(obj.value == 'write'){
                writeControl=true;
                counterOutput=0;
            }
            else if(obj.value == ','){
                if(writeControl) counterOutput++;
                if(readControl) counterInput++;

            }
            else if(obj.value == 'goto'){
                polizArray.push('goto');
                labelMap.set(lexamaArray[++iterator].value,0);
            }
            else writeInBlock(consol,'error'+obj.value);
        };

        //choose way for lex
        function transmissionControl(obj,i) {
            if(obj.lex=='con' || obj.lex=='id'){
                polizArray.push(obj.value);
                stekObj.push(obj);
            }
            else if(obj.lex == 'reserved words' || obj.lex == 'auxiliary signs'){
                processingReservedWordsOrAuxiliary(obj,i);
            }
            else if(obj.lex == 'sign'){
                processingSign(obj);


            }
            else if(obj.lex=='lab'){
                let temp= polizArray.pop();
                if(temp=='goto'){
                    polizArray.push(obj.value);
                    polizArray.push('goto');
                    stekObj.push(obj);
                    stekObj.push({value:'goto',lex:'auxiliry words'});

                }
                else{
                    polizArray.push(temp);
                    
                    polizArray.push(obj.value);
                    stekObj.push(obj);
                    labelMap.set(obj.value,stekObj.length);
                   
                }
            }
                
        };
        //  
        ////////////////////////////////////////////////////////////////////////



        ////////////////////////////////////////////////////////////////////////
        /*               Create POLIZ and find label point     lab 7         */
        ////////////////////////////////////////////////////////////////////////
        //
        function lab7(){
            let k=0;
            //find start of List Operator
            let startAt=function(){
                for(let i=0;i<lexamaArray.length;i++){
                if( lexamaArray[i].value =='{' ) return i; 
                }
                return -1;
            }();
            //main loop for 
            for(let i=startAt;i<lexamaArray.length;i++){

                transmissionControl(lexamaArray[i],i);

                tableLab7.innerHTML+=(`<div>
                                            <p class="lab1">${k++}</p>
                                            <p class="lab1"> ${lexamaArray[i].value}</p> 
                                            <p class="lab1">${polizArray.join(' ')}</p>
                                            <p class="lab1"> ${stekD.join(' ')}</p> 

                                    </div> `);
            }
            console.log(lexamaArray);
            //out the labelMap
            tableLab7.innerHTML+='<br>'
            tableLab7.innerHTML+='<tr>'
            for(let[key,value] of labelMap){
                 tableLab7.innerHTML+=(`<div>
                                            <p class="lab1">${key}</p>
                                            <p class="lab1"> ${value}</p> 
                                           </div> `);
            }
            
        };
        //
        //
        ////////////////////////////////////////////////////////////////////////

        lab7();

    });


/*****************************************************************/


/*                      The Other part                             */
/*****************************************************************/


////////////////////////////////////////////////////////////////////////
//   variables for next lab;

    let finalStek=[];
    let finalPoliz=stekObj.filter(()=>1).reverse();
    let finalPolizLenght=finalPoliz.length;
    let action='';



////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////   
//  used func for lab8
    function calculetePolizSecondWay(){
        let kk=0;
        let iterator=0;
       tableLab8.innerHTML+=(`<div>
                                    <p class="lab1">Step</p>
                                    <p class="lab1">Input</p> 
                                    <p class="lab1">Stek</p>
                                    <p class="lab1">Action</p>

                            </div> `);


        while(iterator<finalPolizLenght){
            //action='';
            let last = finalPoliz[finalPolizLenght-iterator-1];
          

            if(last.lex=='id'||last.lex=='con'){
                finalStek.push(last);
                action=`push ${last.value} in stek`

            }
            else if (last.lex=='lab'||last.lex=='auxiliry lab') {
                iterator=calcLabelProces(last,iterator);
                if(kk>300){
                    writeInBlock(consol,`${new  Error('loop,dont work\'s ')}`)                        
                    throw new  Error('loop,dont work\'s ');
                    break;
                }
            }
            else if(last.lex=='sign') {
                
                calcWithSign(last);

            }
            else if(last.lex=='logic sign'){

                calcWithLogicSign(last);

            }
            else if(last.lex=='WT'){

                calcWriteVariables();
                
            }
            else if(last.lex =='RD'){

                calcReadVariables();

            }
            else{
                writeInBlock(consol,`${new  Error('Undefined '+last.value)}`)  
                throw new  Error('Undefined '+last.value)
            }

            console.log(action)

            tableLab8.innerHTML+=(`<div>
                                        <p class="lab1">${kk}</p>
                                        <p class="lab1"> ${last.value}</p> 
                                        <p class="lab1">${display()}</p>
                                        <p class="lab1">${action}</p>

                                </div> `);


            iterator++;
            kk++;

        }
    };
    
    // function for testing,output transformed FinalStek in 
    function display(arr = finalStek){
        let temp=[];
        for(let i=0;i<arr.length;i++){
            temp.push(arr[i].value)
        }
        return temp;
    }
 

    function calcReadVariables(){
        let readCount=+finalStek.pop().value;
        action =`read ${readCount} elements,such as:`;
        for(let i=0;i<readCount;i++){
            let readablevariable=finalStek.pop().value;
            let temp = prompt(`Enter a variable: ${readablevariable}`);
            tableID.set(readablevariable,temp) ;
            action+=`${readablevariable} ` 

        }
       console.log(action)
    }


    function calcWriteVariables(){
        let writeCount=finalStek.pop().value;
        let writablevariable;

        action=`write ${writeCount} elements,such as:`;
        for(let i=0;i<writeCount;i++){
     
            writablevariable=finalStek.pop();
    
            writeInBlock(consol,`${writablevariable.value} = ${tableID.get(writablevariable.value)}`);
            action+=`${writablevariable.value}  `

        }
    }


    function calcWithSign(last){
        let first=finalStek.pop().value;
        let second=finalStek.pop().value;
        let temp={lex:'con'};

        if(last.value == '='){
            tableID.set(second,first);
            temp.value=tableID.get(second);
        }
        else{
            second=tableID.has(second) ? +tableID.get(second) :+second;
            first=tableID.has(first) ? +tableID.get(first) :+first;
            if(last.value == '+'){
                temp.value=+(second+first);
                finalStek.push(temp);
            }

            else if(last.value == '-'){
                temp.value=+(second-first);
                finalStek.push(temp);
            }
            else if(last.value == '*'){
                temp.value=+(second*first);
                finalStek.push(temp);
            }
            else if(last.value == '/') { 
                temp.value=+(second/first);
                finalStek.push(temp);;

            }
            else {
                writeInBlock(consol,`${new Error('undefined sign'+last.value)}`);
                throw new Error('undefined sign'+last.value);
            }
        }

        action=`operation ${last.value} with elements 
        ${first} and  ${second}
        result : ${temp.value} push to stek`;          
    };


    function calcWithLogicSign(last){
        let first=finalStek.pop().value;
        let second=finalStek.pop().value;
        let temp={lex:'bool'}
        if(last.value == '&&') { 
            temp.value=(second && first);
            finalStek.push(temp);

        }
        else if(last.value == '||') { 
            temp.value=(second || first);
            finalStek.push(temp);

        }
        else{
            second=tableID.has(second) ? +tableID.get(second) :+second;
            first=tableID.has(first) ? +tableID.get(first) :+first;
            if(last.value == '=='){
                temp.value=(second == first);
                finalStek.push(temp);

            }
            else if(last.value == '<'){
                temp.value=(second < first);
                finalStek.push(temp);
            }

            else if(last.value == '<='){
                temp.value=(second <= first);
                finalStek.push(temp);
            }
            else if(last.value == '>'){
                temp.value=(second > first);
                finalStek.push(temp);
            }
            else if(last.value == '>=') { 
                temp.value=(second >= first);
                finalStek.push(temp);;

            }
            else if(last.value == '!=') { 
                temp.value=(second != first);
                finalStek.push(temp);;

            }
            else {
                writeInBlock(consol,`${new Error('undefined sign'+last.value)}`);
                throw new Error('undefined sign'+last.value)
            }
        }

        action=`operation ${last.value} with elements 
        ${first} and  ${second}
        result : ${temp.value} push to stek`; 

    };

    function calcLabelProces(last,iterator){
        let temp = finalPoliz[finalPolizLenght-iterator-2];
        let count=0;

        if(temp.lex =='auxiliry words'){
            if(temp.value=="goto"){
                return count = finalPolizLenght-(finalPolizLenght - labelMap.get(last.value));
                action = ` go to ${last.value}`
            }
            else if (temp.value=="CTBM") {
                let loopExpression=finalStek.pop().value;
                let move = loopExpression ? iterator+1 : finalPolizLenght-(finalPolizLenght - labelMap.get(last.value));
                action = loopExpression ? `loopExpression= ${loopExpression} so go on` :`loopExpression= ${loopExpression} so go to ${last.value}`
                return move
            }

            else{
                writeInBlock(consol,`${ new Error(`undefined auxiliry words${temp.value}`)}`);
                throw new Error(`Undefined auxiliry words${temp.value}`);
            }
        }
        else if (temp.value==":") {
            return ++iterator;
        }
        else{
                writeInBlock(consol,`${ new Error(`undefined auxiliry words${temp.value}`)}`);
                throw new Error(`Undefined auxiliry words${temp.value}`);
            }

        return count;

    }
//
//
////////////////////////////////////////////////////////////////////////


/*                      LAB8                                      */
/*****************************************************************/
// process POLIZ


    function lab8(){
        finalStek=[];
        finalPoliz=stekObj.filter(()=>1).reverse();
        finalPolizLenght=finalPoliz.length;
        calculetePolizSecondWay();
    }
//
//
//////////////////////////////////////////////////    

///***********************************************************************************

