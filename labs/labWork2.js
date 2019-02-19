let labWork2 = function() {
    ///////////////////////////////////////////////
    /*          used func in LAB2                */
    ////////////////////////////////////////////////

    function LabList() {
        let found = false;
        lex = next_lex();
        if (lex == 36) {
            found = true;
            lex = next_lex();
            while (lex == 33 && found) {
                lex = next_lex();
                if (lex == 36) lex = next_lex();
                else found = false;
            }
        } else writeInBlock(consol, `Expected identifier : ${row}`);

        return found;
    }

    function IdList() {
        let found = false;
        lex = next_lex();
        if (lex == 34) {
            found = true;
            lex = next_lex();
            while (lex == 33 && found) {
                lex = next_lex();
                if (lex == 34) lex = next_lex();
                else found = false;
            }
        } else writeInBlock(consol, `Expected identifier: ${row}`);

        return found;
    }

    function Declaration() {
        let found = false;
        if (lex == 7) {
            if (IdList()) {
                found = true;
            } else writeInBlock(consol, `Invalid list of argument  : ${row}`);
        } else if (lex == 8) {
            if (LabList()) {
                found = true;
            } else writeInBlock(consol, `Invalid list of labels : ${row}`);
        } else writeInBlock(consol, `Don't found type of variable : ${row}`);

        return found;
    }

    function ListDelacaration() {
        let found = false;
        if (Declaration()) {
            found = true;
            while (lex == 5 && found) {
                lex = next_lex();
                if (Declaration()) {
                } //writeInBlock(consol,'Declaration good');
                else found = false;
            }
        }
        return found;
    }

    function Logic_Plural() {
        let found = false;
        if (lex == 29) {
            lex = next_lex();
            if (Logic_Expression()) found = true;
            else {
                writeInBlock(consol, `Invalid Logic Plural : ${row}`);
                return false;
            }

            if (lex == 30) {
                lex = next_lex();
                found = true;
            } else {
                writeInBlock(consol, `missing ) after Logic Plural : ${row}`);
                found = false;
            }
        } else {
            if (Expression()) {
                if (
                    lex == 18 ||
                    lex == 19 ||
                    lex == 20 ||
                    lex == 21 ||
                    lex == 22 ||
                    lex == 23
                ) {
                    lex = next_lex();
                    if (Expression()) {
                        found = true;
                    } else
                        writeInBlock(
                            consol,
                            `Invalid Expression after logic sign ${row} `
                        );
                } else writeInBlock(consol, `Missing logic sign ${row}`);
            } else
                writeInBlock(
                    consol,
                    `Invalid Expression in Logic Plural ${row}`
                );
        }

        return found;
    }

    function Logic_Term() {
        let found = false;
        if (Logic_Plural()) {
            found = true;
            while (lex == 17) {
                lex = next_lex();
                if (Logic_Plural()) {
                } else {
                    writeInBlock(
                        consol,
                        `Invalid Logic Plural after  sign: ${row}`
                    );
                    return false;
                }
            }
        } else {
            writeInBlock(consol, `Invalid Logic Plural : ${row}`);
            found = false;
        }
        return found;
    }

    function Logic_Expression() {
        let found = false;
        if (Logic_Term()) {
            found = true;
            while (lex == 16) {
                lex = next_lex();
                if (Logic_Term()) {
                } else {
                    writeInBlock(
                        consol,
                        `Invalid Logic Term after  sign : ${row}`
                    );
                    return false;
                }
            }
        } else {
            writeInBlock(consol, `Invalid Logic Term  : ${row}`);
            return false;
        }
        return found;
    }

    function Plural() {
        if (lex == 29) {
            lex = next_lex();
            if (Expression()) {
            } else {
                writeInBlock(consol, `Invalid Expression: ${row}`);
                return false;
            }
            if (lex == 30) {
                lex = next_lex();
                return true;
            } else {
                console.log(lex);
                writeInBlock(consol, `missing ) : ${row}`);
                return false;
            }
        } else if (lex == 34 || lex == 35) {
            lex = next_lex();
            return true;
        } else {
            writeInBlock(consol, `Invalid id con or ( : ${row}`);
            return false;
        }
    }

    function Term() {
        let found = false;
        if (Plural()) {
            found = true;
            while (lex == 27 || lex == 28) {
                lex = next_lex();
                if (Plural()) {
                } else {
                    writeInBlock(consol, `Invalid Prular after  sign : ${row}`);
                    return false;
                }
            }
        } else {
            writeInBlock(consol, `Invalid Prular : ${row}`);
            found = false;
        }
        return found;
    }

    function Expression() {
        let found = false;
        if (Term()) {
            found = true;
            while (lex == 25 || lex == 26) {
                lex = next_lex();
                if (Term()) {
                } else {
                    writeInBlock(consol, `Invalid Term after  sign: ${row}`);
                    return false;
                }
            }
        } else {
            writeInBlock(consol, `Invalid Term : ${row}`);
            return false;
        }
        return found;
    }

    function OperatorBlock() {
        let found = false;
        if (lex == 3) {
            lex = next_lex();
            if (ListOperator()) {
                if (lex == 4) found = true;
                else writeInBlock(consol, `Close braket in ${row}`);
            } else writeInBlock(consol, `Not correct ListOperator ${row}`);
        }
        /*else{
	             if(Operator()) found =true;
	             else writeInBlock(consol,`Невірний оператор в ${row} lex=${lex}`)
	            }*/
        return found;
    }

    function OperatorAssignment() {
        let found = false;
        lex = next_lex();
        if (lex == 32) {
            lex = next_lex();
            if (Expression()) found = true;
        } else writeInBlock(consol, `Invalid  = in assignment: ${row}`);
        return found;
    }

    function OperatorInPut() {
        let found = false;
        lex = next_lex();
        if (lex == 29) {
            if (IdList()) {
                if (lex == 30) {
                    found = true;
                    lex = next_lex();
                } else writeInBlock(consol, `Invalid  ) ${row}`);
            } else
                writeInBlock(
                    consol,
                    `Invalid list of argument in OperatorInPut ${row}`
                );
        } else writeInBlock(consol, `Missing ( ${row}`);
        return found;
    }

    function OperatorOutPut() {
        let found = false;
        lex = next_lex();
        if (lex == 29) {
            if (IdList()) {
                //
                if (lex == 30) {
                    found = true;
                    lex = next_lex();
                } else writeInBlock(consol, `Missing ) ${row}`);
            } else
                writeInBlock(
                    consol,
                    `Invalid list of argument in OperatorOutPut ${row}`
                );
        } else writeInBlock(consol, `Missing ( ${row}`);
        return found;
    }

    function OperatorLoop() {
        let found = false;
        lex = next_lex();
        if (Logic_Expression()) {
            if (lex == 12) {
                lex = next_lex();
                if (OperatorBlock()) {
                    lex = next_lex();
                    found = true;
                } else
                    writeInBlock(
                        consol,
                        `Invalid OperatorBlock in OperatorLoop:${row}`
                    );
            } else writeInBlock(consol, `Missing valuable word do : ${row}`);
        } else writeInBlock(consol, `Invalid Logic Expression : ${row}`);

        return found;
    }

    function OperatorConditional() {
        let found = false;
        lex = next_lex();
        if (Logic_Expression()) {
            if (lex == 15) {
                lex = next_lex();
                if (OperatorBlock()) {
                    lex = next_lex();
                    if (lex == 6) {
                        lex = next_lex();
                        if (OperatorBlock()) {
                            lex = next_lex();
                            found = true;
                        } else
                            writeInBlock(
                                consol,
                                `Invalid OperatorBlock  after  ':  :${row}`
                            );
                    } else
                        writeInBlock(
                            consol,
                            `Missing  ':' after OperatorBlock : ${row}`
                        );
                } else
                    writeInBlock(
                        consol,
                        `Invalid OperatorBlock before : ${row}`
                    );
            } else
                writeInBlock(
                    consol,
                    `Missing sign  ? in OperatorConditional : ${row}`
                );
        } else
            writeInBlock(
                consol,
                `Invalid Logic Expression in  OperatorConditional : ${row}`
            );

        return found;
    }

    function OperatorUnconditional() {
        let found = false;
        lex = next_lex();
        lex == 36 ? (found = true) : (found = false);
        lex = next_lex();
        return found;
    }

    function OperatorLabel() {
        let found = false;
        lex = next_lex();
        lex == 6 ? (found = true) : (found = false);
        lex = next_lex();
        return found;
    }

    function Operator() {
        let found = false;
        if (lex == 34) found = OperatorAssignment();
        else if (lex == 9) found = OperatorInPut();
        else if (lex == 10) found = OperatorOutPut();
        else if (lex == 11) found = OperatorLoop();
        else if (lex == 14) found = OperatorConditional();
        else if (lex == 13) found = OperatorUnconditional();
        else if (lex == 36) found = OperatorLabel();
        else writeInBlock(consol, `Error ${lex} : ${row}`);
        return found;
    }

    function ListOperator() {
        let found = false;
        if (Operator()) {
            if (lex == 5) {
                found = true;
                lex = next_lex();
                while (lex != 4 && found) {
                    if (Operator()) {
                        if (lex == 5) {
                            lex = next_lex();
                        } else found = false;
                    } else {
                        writeInBlock(consol, `Invalid Operator: ${row}`);
                        found = false;
                    }
                }
            } else writeInBlock(consol, `Missing ';' : ${row}`);
        } else writeInBlock(consol, `Invalid Operator: ${row}`);

        return found;
    }

    //

    ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////

    /*         LAB 2                */
    /////////////////////////////////

    function Control_s() {
        if (lex == 1) {
            lex = next_lex();
            if (lex == 34) {
                lex = next_lex();
                if (lex == 2) {
                    lex = next_lex();
                    if (ListDelacaration()) {
                        if (lex == 3) {
                            lex = next_lex();
                            if (ListOperator()) {
                                if (lex == 4) {
                                    writeInBlock(consol, "It's Alive");
                                    return true;
                                } else
                                    writeInBlock(consol, `Missing ':' ${row}`);
                            } else
                                writeInBlock(
                                    consol,
                                    `Invalid ListOperator: ${row}`
                                );
                        } else writeInBlock(consol, `Missing  '}' : ${row}`);
                    } else
                        writeInBlock(
                            consol,
                            `Invalid ListDelacaration : ${row}`
                        );
                } else
                    writeInBlock(consol, ` Missing valuable word var : ${row}`);
            } else writeInBlock(consol, `Missing  name of program : ${row}`);
        } else writeInBlock(consol, `Missing valuable word program: ${row}`);
    }

    ////////////////////////////

    return Control_s();
};
