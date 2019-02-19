let labWork7 = function() {
    //////////////////////////////////////////////////////////////////////
    // Variables for next lab
    let priorityTable = new Map([
        ["(", 0],
        ["{", 0],
        [")", 1],
        ["}", 1],
        ["||", 2],
        ["&&", 3],
        ["<", 4],
        ["<=", 4],
        ["!=", 4],
        ["==", 4],
        ["=", 4],
        [">", 4],
        [">=", 4],
        ["+", 5],
        ["-", 5],
        ["*", 6],
        ["/", 6]
    ]);

    let readControl = false;
    let writeControl = false;
    let ifControl = false;
    let whileControl = false;
    let counterInput = 0;
    let counterOutput = 0;
    /////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    //      used func for lab7
    function createLabel(i) {
        if (i) labelMap.set("m" + labelMap.size, i++);
        else labelMap.set("m" + labelMap.size);
    }

    function processingSign(obj, iterator) {
        let last = stekD[stekD.length - 1];
        if (priorityTable.get(last) == undefined) {
            stekD.push(obj.value);
        } else if (priorityTable.get(obj.value) == 0) {
            stekD.push(obj.value);
        } else if (priorityTable.get(obj.value) == 1) {
            let j = stekD.length - 1;
            while (j > 0) {
                let temp = stekD.pop();
                if (priorityTable.get(temp) == 0) break;
                else {
                    polizArray.push(temp);
                    if (priorityTable.get(temp) < 5 && temp != "=")
                        stekObj.push({ value: temp, lex: "logic sign" });
                    else stekObj.push({ value: temp, lex: "sign" });
                }
                j--;
            }
        } else if (priorityTable.get(last) < priorityTable.get(obj.value)) {
            stekD.push(obj.value);
        } else if (priorityTable.get(last) >= priorityTable.get(obj.value)) {
            let j = stekD.length - 1;
            while (j > 0) {
                let temp = stekD.pop();
                polizArray.push(temp);
                if (priorityTable.get(temp) < 5 && temp != "=")
                    stekObj.push({ value: temp, lex: "logic sign" });
                else stekObj.push({ value: temp, lex: "sign" });
                j--;
                if (
                    priorityTable.get(stekD[j]) < priorityTable.get(obj.value)
                ) {
                    stekD.push(obj.value);
                    break;
                }
            }
        }
    }

    function processingReservedWordsOrAuxiliary(obj, iterator) {
        if (obj.value == "if") {
            stekD.push("if");
        } else if (obj.value == "?") {
            let j = stekD.length;
            while (j > 0) {
                let temp = stekD.pop();
                if (temp == "if") {
                    createLabel();
                    polizArray.push("m" + (labelMap.size - 1));
                    stekObj.push({
                        value: "m" + (labelMap.size - 1),
                        code: "",
                        lex: "auxiliry lab"
                    });
                    polizArray.push("CTBM");
                    stekObj.push({ value: "CTBM", lex: "auxiliry words" });
                    stekD.push("if" + "m" + (labelMap.size - 1));
                    break;
                } else {
                    polizArray.push(temp);
                    stekObj.push(obj);
                }
                j--;
            }
        } else if (obj.value == ":") {
            if (lexamaArray[iterator - 1].lex == "lab") {
                polizArray.push(":");
                stekObj.push({ value: ":", lex: "auxiliry signs" });
            } else {
                let j = stekD.length;
                while (j > 0) {
                    let temp = stekD.pop();
                    if (temp.match(/if*/)) {
                        createLabel();
                        polizArray.push("m" + (labelMap.size - 1));
                        polizArray.push("goto");
                        polizArray.push("m" + (labelMap.size - 2));
                        polizArray.push(":");
                        stekD.push(
                            "if" +
                                "m" +
                                (labelMap.size - 2) +
                                "m" +
                                (labelMap.size - 1)
                        );
                        stekObj.push({
                            value: "m" + (labelMap.size - 1),
                            code: "",
                            lex: "auxiliry lab"
                        });
                        stekObj.push({ value: "goto", lex: "auxiliry words" });
                        stekObj.push({
                            value: "m" + (labelMap.size - 2),
                            code: stekObj.length,
                            lex: "auxiliry lab"
                        });
                        labelMap.set("m" + (labelMap.size - 2), stekObj.length);
                        stekObj.push({ value: ":", lex: "auxiliry signs" });

                        break;
                    } else {
                        polizArray.push(temp);
                        stekObj.push({ value: temp, lex: "after if" });
                    }
                    j--;
                }
            }
        } else if (obj.value == ";") {
            let j = stekD.length - 1;
            while (j >= 0) {
                let temp = stekD.pop();

                if (temp.match(/while*/)) {
                    let lab = temp.slice(temp.length - 2);
                    polizArray.push(lab);
                    stekObj.push({
                        value: lab,
                        code: labelMap.get(lab),
                        lex: "auxiliry lab"
                    });
                    polizArray.push("goto");
                    stekObj.push({ value: "goto", lex: "auxiliry words" });
                    let i = +lab[1] + 1;
                    polizArray.push("m" + i);
                    polizArray.push(":");
                    stekObj.push({
                        value: "m" + i,
                        code: stekObj.length,
                        lex: "auxiliry lab"
                    });
                    labelMap.set("m" + i, stekObj.length);
                    stekObj.push({ value: ":", lex: "auxiliry signs" });

                    break;
                } else if (temp.match(/if*/)) {
                    if (temp.match(/if..../)) {
                        let lab = temp.slice(temp.length - 2);
                        polizArray.push(lab);
                        polizArray.push(":");
                        stekObj.push({
                            value: lab,
                            code: stekObj.length,
                            lex: "auxiliry lab"
                        });
                        labelMap.set(lab, stekObj.length);
                        stekObj.push({ value: ":", lex: "auxiliry signs" });
                    }

                    break;
                } else if (temp == "{") {
                    stekD.push(temp);
                    break;
                } else {
                    polizArray.push(temp);
                    if (priorityTable.get(temp) < 5 && temp != "=")
                        stekObj.push({ value: temp, lex: "logic sign" });
                    else stekObj.push({ value: temp, lex: "sign" });
                }

                j--;
            }
        } else if (obj.value == "(") {
            processingSign(obj, iterator);
        } else if (obj.value == ")") {
            if (writeControl) {
                counterOutput++;
                polizArray.push(counterOutput);
                stekObj.push({ value: counterOutput, code: "", lex: "con" });
                polizArray.push("WT");
                stekObj.push({ value: "WT", lex: "WT" });
                writeControl = false;
            } else if (readControl) {
                counterInput++;
                polizArray.push(counterInput);
                stekObj.push({ value: counterInput, code: "", lex: "con" });
                polizArray.push("RD");
                stekObj.push({ value: "RD", lex: "RD" });
                readControl = false;
            }
            processingSign(obj, iterator);
        } else if (obj.value == "{") {
            processingSign(obj, iterator);
        } else if (obj.value == "}") {
            processingSign(obj, iterator);
        } else if (obj.value == "while") {
            createLabel();
            stekD.push("while" + "m" + (labelMap.size - 1));

            polizArray.push("m" + (labelMap.size - 1));
            polizArray.push(":");
            stekObj.push({
                value: "m" + (labelMap.size - 1),
                code: labelMap.get("m" + (labelMap.size - 1)),
                lex: "auxiliry lab"
            });
            labelMap.set("m" + (labelMap.size - 1), stekObj.length);
            stekObj.push({ value: ":", lex: "auxiliry signs" });
        } else if (obj.value == "do") {
            let j = stekD.length;
            while (j > 0) {
                let temp = stekD.pop();
                if (temp.match(/while*/)) {
                    createLabel();
                    polizArray.push("m" + (labelMap.size - 1));
                    stekObj.push({
                        value: "m" + (labelMap.size - 1),
                        code: labelMap.get("m" + (labelMap.size - 1)),
                        lex: "auxiliry lab"
                    });
                    polizArray.push("CTBM");
                    stekObj.push({ value: "CTBM", lex: "auxiliry words" });

                    stekD.push("while" + "m" + (labelMap.size - 2));
                    break;
                } else {
                    polizArray.push(temp);
                    stekObj.push(obj);
                }
                j--;
            }
        } else if (obj.value == "read") {
            readControl = true;
            counterInput = 0;
        } else if (obj.value == "write") {
            writeControl = true;
            counterOutput = 0;
        } else if (obj.value == ",") {
            if (writeControl) counterOutput++;
            if (readControl) counterInput++;
        } else if (obj.value == "goto") {
            polizArray.push("goto");
            labelMap.set(lexamaArray[++iterator].value, 0);
        } else writeInBlock(consol, "error" + obj.value);
    }

    //choose way for lex
    function transmissionControl(obj, i) {
        if (obj.lex == "con" || obj.lex == "id") {
            polizArray.push(obj.value);
            stekObj.push(obj);
        } else if (
            obj.lex == "reserved words" ||
            obj.lex == "auxiliary signs"
        ) {
            processingReservedWordsOrAuxiliary(obj, i);
        } else if (obj.lex == "sign") {
            processingSign(obj);
        } else if (obj.lex == "lab") {
            let temp = polizArray.pop();
            if (temp == "goto") {
                polizArray.push(obj.value);
                polizArray.push("goto");
                stekObj.push(obj);
                stekObj.push({ value: "goto", lex: "auxiliry words" });
            } else {
                polizArray.push(temp);

                polizArray.push(obj.value);
                stekObj.push(obj);
                labelMap.set(obj.value, stekObj.length);
            }
        }
    }
    //
    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    /*               Create POLIZ and find label point     lab 7         */
    ////////////////////////////////////////////////////////////////////////
    //
    function lab7() {
        let k = 0;
        //find start of List Operator
        let startAt = (function() {
            for (let i = 0; i < lexamaArray.length; i++) {
                if (lexamaArray[i].value == "{") return i;
            }
            return -1;
        })();
        //main loop for
        for (let i = startAt; i < lexamaArray.length; i++) {
            transmissionControl(lexamaArray[i], i);

            tableLab7.innerHTML += `<div>
                                                <p class="lab1">${k++}</p>
                                                <p class="lab1"> ${
                                                    lexamaArray[i].value
                                                }</p> 
                                                <p class="lab1">${polizArray.join(
                                                    " "
                                                )}</p>
                                                <p class="lab1"> ${stekD.join(
                                                    " "
                                                )}</p> 

                                        </div> `;
        }
        console.log(lexamaArray);
        //out the labelMap
        tableLab7.innerHTML += "<br>";
        tableLab7.innerHTML += "<tr>";
        for (let [key, value] of labelMap) {
            tableLab7.innerHTML += `<div>
                                                <p class="lab1">${key}</p>
                                                <p class="lab1"> ${value}</p> 
                                               </div> `;
        }
    }
    //
    //
    ////////////////////////////////////////////////////////////////////////

    lab7();
};
