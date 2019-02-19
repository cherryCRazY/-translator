let labWork1 = function(code) {
    console.log(code);

    /*             States of input Char          */
    /********************************************/

    let State21 = new Map([["name", 21], ["Final", "op"]]);

    let State20 = new Map([["name", 20], ["Final", "op"]]);
    let State19 = new Map([
        ["AndChar", State20],
        ["name", 19],
        ["Final", false]
    ]);

    let State18 = new Map([["name", 18], ["Final", "op"]]);

    let State17 = new Map([
        ["OrChar", State18],
        ["name", 17],
        ["Final", false]
    ]);

    let State16 = new Map([["name", 16], ["Final", "op"]]);

    let State15 = new Map([["EqChar", State16], ["name", 15], ["Final", "op"]]);

    let State14 = new Map([["name", 14], ["Final", "op"]]);

    let State13 = new Map([
        ["EqChar", State14],
        ["name", 13],
        ["Final", false]
    ]);

    let State12 = new Map([["name", 12], ["Final", "op"]]);

    let State11 = new Map([["EqChar", State12], ["name", 11], ["Final", "op"]]);

    let State10 = new Map([["name", 10], ["Final", "op"]]);

    let State9 = new Map([["EqChar", State10], ["name", 9], ["Final", "op"]]);

    let State8 = new Map([["name", 8], ["Final", "con"]]);
    State8.set("Num", State8);
    let State7 = new Map([["Num", State8], ["name", 7], ["Final", false]]);

    let State6 = new Map([
        ["Num", State8],
        ["Sign", State7],
        ["name", 6],
        ["Final", false]
    ]);

    let State5 = new Map([["E", State6], ["name", 5], ["Final", "con"]]);

    State5.set("Num", State5);

    let State4 = new Map([["Num", State5], ["name", 4], ["Final", false]]);

    let State3 = new Map([
        ["Dot", State5],
        ["E", State6],
        ["name", 3],
        ["Final", "con"]
    ]);
    State3.set("Num", State3);

    let State2 = new Map([["Final", "id"], ["name", 2]]);

    State2.set("Letter", State2);
    State2.set("Num", State2);
    State2.set("E", State2);

    var State1 = new Map([
        ["Letter", State2],
        ["E", State2],
        ["Num", State3],
        ["Dot", State4],
        ["OP", State21],
        ["LessChar", State9],
        ["MoreChar", State11],
        ["NotChar", State13],
        ["EqChar", State15],
        ["OrChar", State17],
        ["AndChar", State19],
        ["Sign", State21],
        ["name", 1],
        ["Final", false]
    ]);

    /********************************************/

    /*            Variables for  this lab work    */
    /*********************************************/

    let lex = "";
    let maps = State1;
    let label_control = false;
    let var_control = false;
    let error = false;
    let minus_const_control = false;
    let pred_lex = lexamaArray[lexamaArray.length - 1];

    maps = State1;
    lex = "";
    row = 0;
    label_control = false;
    var_control = false;
    error = false;
    minus_const_control = false;

    /*********************************************/

    /*              inputLex                     */
    /********************************************/
    let inputLex = new Map([
        ["program", 1],
        ["var", 2],
        ["{", 3],
        ["}", 4],
        [";", 5],
        [":", 6],
        ["num", 7],
        ["label", 8],
        ["read", 9],
        ["write", 10],
        ["while", 11],
        ["do", 12],
        ["goto", 13],
        ["if", 14],
        ["?", 15],
        ["||", 16],
        ["&&", 17],
        ["<", 18],
        ["<=", 19],
        ["!=", 20],
        ["==", 21],
        [">", 22],
        [">=", 23],
        [".", 24],
        ["+", 25],
        ["-", 26],
        ["*", 27],
        ["/", 28],
        ["(", 29],
        [")", 30],
        //['!',31],
        ["=", 32],
        [",", 33],
        ["id", 34],
        ["con", 35],
        ["lab", 36],
        ["[", 37],
        ["]", 38]
    ]);

    /********************************************/

    /*      functions to detect type of char     */
    /********************************************/

    function isE(char) {
        return char.charCodeAt(0) == 69 ? true : false;
    }

    function isLetter(char) {
        return char.match(/\w/) && !char.match(/\d/) ? true : false;
    }

    function isNum(char) {
        return char.match(/\d/) ? true : false;
    }

    function isDot(char) {
        return char == "." ? true : false;
    }

    function isOP(char) {
        return OP.indexOf(char) > -1 ? true : false;
    }

    function isSign(char) {
        return Sign.indexOf(char) > -1 ? true : false;
    }

    function isLessChar(char) {
        return char == "<" ? true : false;
    }

    function isMoreChar(char) {
        return char == ">" ? true : false;
    }

    function isNotChar(char) {
        return char == "!" ? true : false;
    }

    function isEqChar(char) {
        return char == "=" ? true : false;
    }

    function isOrChar(char) {
        return char == "|" ? true : false;
    }

    function isAndChar(char) {
        return char == "&" ? true : false;
    }

    function isSpace(char) {
        return char.charCodeAt(0) == 32 ||
            char.charCodeAt(0) == 13 ||
            char.charCodeAt(0) == 9
            ? true
            : false;
    }

    function Classification(char) {
        if (isE(char)) symb = "E";
        else if (isLetter(char)) symb = "Letter";
        else if (isNum(char)) symb = "Num";
        else if (isDot(char)) symb = "Dot";
        else if (isSign(char)) symb = "Sign";
        else if (isOP(char)) symb = "OP";
        else if (isLessChar(char)) symb = "LessChar";
        else if (isMoreChar(char)) symb = "MoreChar";
        else if (isNotChar(char)) symb = "NotChar";
        else if (isEqChar(char)) symb = "EqChar";
        else if (isOrChar(char)) symb = "OrChar";
        else if (isAndChar(char)) symb = "AndChar";
        else if (isSpace(char)) symb = "Space";
        else symb = "Other";
        return symb;
    }

    /************************************************/

    /*      function to  add words in lexamaArray     */
    /************************************************/

    function Add(row, value, inPutNum, code, lex) {
        this.value = value;
        this.row = row;
        this.inPutNum = inPutNum;
        this.code = code;
        this.lex = lex;
    }

    function addLexam(str, row) {
        if (lex == ";" || lex == "{") label_control = false;
        if (lex == "{") var_control = true;
        if (str == "id") {
            if (inputLex.has(lex)) {
                if (lex == "label") label_control = true;
                let TRM = new Add(
                    row,
                    lex,
                    inputLex.get(lex),
                    "",
                    "reserved words"
                );
                lexamaArray.push(TRM);
                return lexamaArray;
            } else {
                if (idArray.has(lex) && labelArray.has(lex)) {
                    writeInBlock(
                        consol,
                        `both ${lex} in idArray and labelArray`
                    );
                    error = true;
                }
                let t = idArray;
                let c = 34;
                let cm = "id";
                if (label_control || labelArray.has(lex)) {
                    t = labelArray;
                    c = 36;
                    cm = "lab";
                }
                if (var_control == false && t.has(lex) == true) {
                    writeInBlock(
                        consol,
                        `Variable ${lex} has already been declared ${row}`
                    );
                    error = true;
                } else if (t.has(lex)) {
                    let TRM = new Add(row, lex, c, t.get(lex), cm);
                    lexamaArray.push(TRM);
                    return lexamaArray;
                } else {
                    if (var_control) {
                        writeInBlock(
                            consol,
                            ` ${lex} is not defined,row : ${row}`
                        );
                        error = true;
                    } else {
                        t.set(lex, t.size + 1);
                        let TRM = new Add(row, lex, c, t.get(lex), cm);
                        lexamaArray.push(TRM);
                        return lexamaArray;
                    }
                }
            }
        }
        if (str == "con") {
            if (conArray.has(lex)) {
                let TRM = new Add(row, lex, 35, conArray.get(lex), "con");
                lexamaArray.push(TRM);
                return lexamaArray;
            } else {
                conArray.set(lex, conArray.size + 1);
                let TRM = new Add(row, lex, 35, conArray.get(lex), "con");
                lexamaArray.push(TRM);
                return lexamaArray;
            }
        }
        if (lex == "-") {
            if (
                (pred_lex == 34 || pred_lex == 35 || pred_lex == 30) &&
                lex == "-"
            ) {
                minus_const_control = false;
                let TRM = new Add(row, lex, inputLex.get(lex), "", "c");
                lexamaArray.push(TRM);
                return lexamaArray;
            } else {
                minus_const_control = true;
                return;
            }
        }
        if (str == "op") {
            if (Signs.includes(lex)) {
                let TRM = new Add(row, lex, inputLex.get(lex), "", "sign");
                lexamaArray.push(TRM);
            } else {
                let TRM = new Add(
                    row,
                    lex,
                    inputLex.get(lex),
                    "",
                    "auxiliary signs"
                );
                lexamaArray.push(TRM);
            }
            return lexamaArray;
        }
    }

    /************************************************/

    /*      function to detect State(Class) of char
                         and routing                    */
    /************************************************/

    function Classes(symb, row, r) {
        for (var [key, value] of maps) {
            if (symb == key) {
                return value;
            }
        }
        if (maps.get("Final")) {
            addLexam(maps.get("Final"), row);
            pred_lex = lexamaArray[lexamaArray.length - 1].inPutNum;
            if (!minus_const_control) lex = "";
            else {
                minus_const_control = false;
                return State1.get(symb);
            }
            return State1;
        } else {
            console.log(lex.charAt(0));
            lex = r;
            writeInBlock(consol, `Unidentified word ${r} in line ${row}!!!`);
            error = true;
            return;
        }
    }

    /************************************************/

    /*    finiteAvtomat (main fucntion on local */
    /************************************************/

    function finiteAvtomat(code) {
        let classOfChar;
        let arr = code.split("\n");

        for (let j = 0; j < arr.length; j++) {
            let stroka = arr[j];
            if (error) break;
            row++;
            for (let i = 0; i < stroka.length; i++) {
                if (maps == undefined) error = true;

                if (error) {
                    writeInBlock(
                        consol,
                        `Unidentified word ${lex} in line ${row}!!!!`
                    );
                    new Error(`Unidentified word ${lex} in line ${row}!!`);
                    break;
                }

                classOfChar = Classification(stroka[i]);

                if (
                    (maps.get("name") == 3 ||
                        maps.get("name") == 5 ||
                        maps.get("name") == 8) &&
                    classOfChar == "Letter"
                ) {
                    writeInBlock(
                        consol,
                        `Unidentified word ${lex} in line ${row}`
                    );
                    new Error(`Unidentified word ${lex} in line ${row}`);
                    error = true;
                }

                if (classOfChar == "Space" && lex.length == 0 && maps == State1)
                    continue;

                maps = Classes(classOfChar, row, stroka[i + 1]);

                if (classOfChar === "Space") continue;

                lex += stroka[i];

                if (lex.length == 1) maps = State1.get(classOfChar);
                if (i == stroka.length - 1) {
                    try {
                        addLexam(maps.get("Final"), row);
                        lex = "";
                        maps = State1;
                    } catch (e) {
                        // statements
                        console.log(e);
                    }
                }
            }
        }
        console.log(lexamaArray);
        for (let i = 0; i < lexamaArray.length; i++) {
            lab1.innerHTML += `<div>
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
};
