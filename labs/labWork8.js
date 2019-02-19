let labWork8 = function() {
    ////////////////////////////////////////////////////////////////////////
    //   variables for next lab;

    let finalStek = [];
    let finalPoliz = stekObj.filter(() => 1).reverse();
    let finalPolizLenght = finalPoliz.length;
    let action = "";

    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    //  used func for lab8
    function calculetePolizSecondWay() {
        let kk = 0;
        let iterator = 0;
        tableLab8.innerHTML += `<div>
                                        <p class="lab1">Step</p>
                                        <p class="lab1">Input</p> 
                                        <p class="lab1">Stek</p>
                                        <p class="lab1">Action</p>

                                </div> `;

        while (iterator < finalPolizLenght) {
            //action='';
            let last = finalPoliz[finalPolizLenght - iterator - 1];

            if (last.lex == "id" || last.lex == "con") {
                finalStek.push(last);
                action = `push ${last.value} in stek`;
            } else if (last.lex == "lab" || last.lex == "auxiliry lab") {
                iterator = calcLabelProces(last, iterator);
                if (kk > 10000) {
                    writeInBlock(consol, `${new Error("loop,dont work's ")}`);
                    throw new Error("loop,dont work's ");
                }
            } else if (last.lex == "sign") {
                calcWithSign(last);
            } else if (last.lex == "logic sign") {
                calcWithLogicSign(last);
            } else if (last.lex == "WT") {
                calcWriteVariables();
            } else if (last.lex == "RD") {
                calcReadVariables();
            } else {
                writeInBlock(consol, `${new Error("Undefined " + last.value)}`);
                throw new Error("Undefined " + last.value);
            }

            console.log("next step");
            tableLab8.innerHTML += `<div>
                                            <p class="lab1">${kk}</p>
                                            <p class="lab1"> ${last.value}</p> 
                                            <p class="lab1">${display()}</p>
                                            <p class="lab1">${action}</p>

                                    </div> `;

            iterator++;
            kk++;
        }
    }

    // function for testing,output transformed FinalStek in
    function display(arr = finalStek) {
        let temp = [];
        for (let i = 0; i < arr.length; i++) {
            temp.push(arr[i].value);
        }
        return temp;
    }

    function calcReadVariables() {
        let readCount = +finalStek.pop().value;
        action = `read ${readCount} elements,such as:`;
        for (let i = 0; i < readCount; i++) {
            let readablevariable = finalStek.pop().value;
            let temp = prompt(`Enter a variable: ${readablevariable}`);
            tableID.set(readablevariable, temp);
            action += `${readablevariable} `;
        }
    }

    function calcWriteVariables() {
        let writeCount = finalStek.pop().value;
        let writablevariable;

        action = `write ${writeCount} elements,such as:`;
        for (let i = 0; i < writeCount; i++) {
            writablevariable = finalStek.pop();

            writeInBlock(
                consol,
                `${writablevariable.value} = ${tableID.get(
                    writablevariable.value
                )}`
            );
            action += `${writablevariable.value}  `;
        }
    }

    function calcWithSign(last) {
        let first = finalStek.pop().value;
        let second = finalStek.pop().value;
        let temp = { lex: "con" };

        if (last.value == "=") {
            tableID.set(second, first);
            temp.value = tableID.get(second);
        } else {
            second = tableID.has(second) ? +tableID.get(second) : +second;
            first = tableID.has(first) ? +tableID.get(first) : +first;
            if (last.value == "+") {
                temp.value = +(second + first);
                finalStek.push(temp);
            } else if (last.value == "-") {
                temp.value = +(second - first);
                finalStek.push(temp);
            } else if (last.value == "*") {
                temp.value = +(second * first);
                finalStek.push(temp);
            } else if (last.value == "/") {
                temp.value = +(second / first);
                finalStek.push(temp);
            } else {
                writeInBlock(
                    consol,
                    `${new Error("undefined sign" + last.value)}`
                );
                throw new Error("undefined sign" + last.value);
            }
        }

        action = `operation ${last.value} with elements 
            ${first} and  ${second}
            result : ${temp.value} push to stek`;
    }

    function calcWithLogicSign(last) {
        let first = finalStek.pop().value;
        let second = finalStek.pop().value;
        let temp = { lex: "bool" };
        if (last.value == "&&") {
            temp.value = second && first;
            finalStek.push(temp);
        } else if (last.value == "||") {
            temp.value = second || first;
            finalStek.push(temp);
        } else {
            second = tableID.has(second) ? +tableID.get(second) : +second;
            first = tableID.has(first) ? +tableID.get(first) : +first;
            if (last.value == "==") {
                temp.value = second == first;
                finalStek.push(temp);
            } else if (last.value == "<") {
                temp.value = second < first;
                finalStek.push(temp);
            } else if (last.value == "<=") {
                temp.value = second <= first;
                finalStek.push(temp);
            } else if (last.value == ">") {
                temp.value = second > first;
                finalStek.push(temp);
            } else if (last.value == ">=") {
                temp.value = second >= first;
                finalStek.push(temp);
            } else if (last.value == "!=") {
                temp.value = second != first;
                finalStek.push(temp);
            } else {
                writeInBlock(
                    consol,
                    `${new Error("undefined sign" + last.value)}`
                );
                throw new Error("undefined sign" + last.value);
            }
        }

        action = `operation ${last.value} with elements 
            ${first} and  ${second}
            result : ${temp.value} push to stek`;
    }

    function calcLabelProces(last, iterator) {
        let temp = finalPoliz[finalPolizLenght - iterator - 2];
        let count = 0;

        if (temp.lex == "auxiliry words") {
            if (temp.value == "goto") {
                action = ` go to ${last.value}`;
            } else if (temp.value == "CTBM") {
                let loopExpression = finalStek.pop().value;
                let move = loopExpression
                    ? iterator + 1
                    : finalPolizLenght -
                      (finalPolizLenght - labelMap.get(last.value));
                action = loopExpression
                    ? `loopExpression= ${loopExpression} so go on`
                    : `loopExpression= ${loopExpression} so go to ${
                          last.value
                      }`;
                return move;
            } else {
                writeInBlock(
                    consol,
                    `${new Error(`undefined auxiliry words${temp.value}`)}`
                );
                throw new Error(`Undefined auxiliry words${temp.value}`);
            }
        } else if (temp.value == ":") {
            return ++iterator;
        } else {
            writeInBlock(
                consol,
                `${new Error(`undefined auxiliry words${temp.value}`)}`
            );
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

    let lab8 = () => {
        finalStek = [];
        finalPoliz = stekObj.filter(() => 1).reverse();
        finalPolizLenght = finalPoliz.length;
        calculetePolizSecondWay();
    };

    lab8();
};
