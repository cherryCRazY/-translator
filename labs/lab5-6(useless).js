
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