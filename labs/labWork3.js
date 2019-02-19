/*                      lab work N3                              */
/*****************************************************************/

let labWork3 = function labWork3(arr) {
    var i = 0;

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
    mass.push(new Avtom(1, 1, 2, 0, true, false)); // îñíîâà-îñíîâ
    mass.push(new Avtom(2, 34, 3, 0, true, false));
    mass.push(new Avtom(3, 2, 101, 4, false, false));
    mass.push(new Avtom(4, 5, 101, 4, false, false));
    mass.push(new Avtom(4, 3, 201, 5, true, false));
    mass.push(new Avtom(5, 5, 6, 0, true, false));
    mass.push(new Avtom(6, 4, 0, 0, false, true, 0));
    mass.push(new Avtom(6, 0, 201, 5, false, false, 0));

    //mass.push( new Avtom(7, 5, 6, 0, true, false));

    mass.push(new Avtom(101, 7, 102, 0, false, false));
    mass.push(new Avtom(101, 8, 104, 0, true, false));
    mass.push(new Avtom(102, 34, 103, 0, true, false));
    mass.push(new Avtom(103, 33, 102, 0, false, false));
    mass.push(new Avtom(103, 0, 0, 0, false, true, 0));
    mass.push(new Avtom(104, 36, 105, 0, true, false));
    mass.push(new Avtom(105, 33, 104, 0, false, false));
    mass.push(new Avtom(105, 0, 0, 0, false, true, 0));

    mass.push(new Avtom(201, 34, 202, 0, false, false));
    mass.push(new Avtom(201, 9, 204, 0, false, false));
    mass.push(new Avtom(201, 10, 204, 0, false, false));
    mass.push(new Avtom(201, 11, 401, 207, false, false));
    mass.push(new Avtom(201, 14, 401, 209, false, false));
    mass.push(new Avtom(201, 36, 212, 0, false, false));
    mass.push(new Avtom(201, 13, 213, 0, true, false));
    // assigment

    mass.push(new Avtom(202, 32, 301, 203, true, false)); // нада false поставить на виход
    mass.push(new Avtom(203, 0, 0, 0, false, true, 0));

    // read
    mass.push(new Avtom(204, 29, 205, 0, true, false));
    mass.push(new Avtom(205, 34, 206, 0, true, false));
    mass.push(new Avtom(206, 33, 205, 0, false, false));
    mass.push(new Avtom(206, 30, 0, 0, true, true));

    //while
    mass.push(new Avtom(207, 12, 501, 208, true, false));
    mass.push(new Avtom(208, 0, 0, 0, true, true, 0));

    // if
    mass.push(new Avtom(209, 15, 501, 210, true, false));
    mass.push(new Avtom(210, 6, 501, 211, true, false));
    mass.push(new Avtom(211, 0, 0, 0, false, true, 0));
    // lab
    mass.push(new Avtom(212, 6, 0, 0, true, true));
    //goto
    mass.push(new Avtom(213, 36, 0, 0, true, true));
    //exspression
    mass.push(new Avtom(301, 34, 303, 0, false, false));
    mass.push(new Avtom(301, 35, 303, 0, false, false));
    mass.push(new Avtom(301, 29, 301, 302, true, false));
    mass.push(new Avtom(302, 30, 303, 0, true, false));
    mass.push(new Avtom(303, 25, 301, 0, false, false));
    mass.push(new Avtom(303, 26, 301, 0, false, false));
    mass.push(new Avtom(303, 27, 301, 0, false, false));
    mass.push(new Avtom(303, 28, 301, 0, false, false));
    mass.push(new Avtom(303, 0, 0, 0, false, true, 0));
    //logic_exspression
    mass.push(new Avtom(401, 29, 401, 404, false, false));
    mass.push(new Avtom(401, 0, 301, 402, false, false, 0));
    mass.push(new Avtom(402, 18, 301, 403, false, false));
    mass.push(new Avtom(402, 19, 301, 403, false, false));
    mass.push(new Avtom(402, 20, 301, 403, false, false));
    mass.push(new Avtom(402, 21, 301, 403, false, false));
    mass.push(new Avtom(402, 22, 301, 403, false, false));
    mass.push(new Avtom(402, 23, 301, 403, true, true));
    mass.push(new Avtom(403, 16, 401, 0, false, false));
    mass.push(new Avtom(403, 17, 401, 0, false, false));
    mass.push(new Avtom(403, 0, 0, 0, false, true, 0));
    mass.push(new Avtom(404, 30, 403, 0, true, false));
    //oper_block
    mass.push(new Avtom(501, 3, 201, 502, true, false));
    //mass.push( new Avtom(501, 0, 201,504, false,false,0));
    mass.push(new Avtom(502, 5, 503, 0, true, false));
    mass.push(new Avtom(503, 4, 504, 0, false, false));
    mass.push(new Avtom(503, 0, 201, 502, false, false, 0)); //trr
    mass.push(new Avtom(504, 0, 0, 0, false, true, 0));

    var i = 0;
    var stak = [];
    return avtomat(arr);

    function avtomat(arr) {
        var start = 1;
        var vyhod = 0;
        do {
            if (i > arr.length) {
                writeInBlock(consol, "Перевище");
            }
            vyhod = nextState(start, arr[i].inPutNum);
            var vyvid = document.createElement("p");
            if (stak.length === 0 && vyhod !== 1002) {
                var text = document.createTextNode(
                    " Transition from " +
                        start +
                        " to  " +
                        vyhod +
                        ". In stek - " +
                        "Current lexema - " +
                        arr[i].inPutNum +
                        "_|" +
                        arr[i - 1].value +
                        "|_next lex=|" +
                        arr[i].value
                );
            } else if (vyhod === 1002) {
                var text = document.createTextNode(
                    "LastLex -  end. It's Alive!"
                );
            } else {
                var text = document.createTextNode(
                    "Transition from " +
                        start +
                        " to " +
                        vyhod +
                        ". In stek - " +
                        stak +
                        ". Current lexema - " +
                        arr[i].inPutNum +
                        "_|" +
                        arr[i - 1].value +
                        "|_next lex=|" +
                        arr[i].value
                );
            }

            var lab3 = document.getElementById("lab3");
            vyvid.appendChild(text);
            lab3.appendChild(vyvid);

            if (vyhod === 1002) {
                if (i + 1 === arr.length) {
                    writeInBlock(consol, "Success!!!");
                    return true;
                }
            }
            if (vyhod === 1003) {
                writeInBlock(
                    consol,
                    "Syntax error on stroka " + arr[i].row + "!"
                );
                return false;
            }
            if (vyhod === 1001) {
                writeInBlock(
                    consol,
                    "Unexpected end of programm on stroka " +
                        arr[i - 1].row +
                        "!"
                );
                return false;
            }

            if (vyhod == 1004) {
                writeInBlock(
                    consol,
                    "Syntax error on stroka " + arr[i].row + "!"
                );
                return false;
            }

            start = vyhod;
        } while (true);
    }

    function nextState(state, nomer) {
        var nextState;
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
                    } else {
                        /* console.log(mass[k]);*/
                    }
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
    }
};

//
//////////////////////////////////////////////////////////////////////
