function _getMulti(arg1, arg2) {
    let multi1;
    let multi2;

    for (multi1 = 1; multi1 < Infinity; multi1 = multi1 * 10) {
        if (arg1 * multi1 % 1 === 0) {
            break;
        }
    }

    for (multi2 = 1; multi2 < Infinity; multi2 = multi2 * 10) {
        if (arg2 * multi2 % 1 === 0) {
            break;
        }
    }

    return multi1 > multi2 ? multi1 : multi2;
}

function _cstmDiv(arg1, arg2) {
    let multi = _getMulti(arg1, arg2);

    return arg1 * multi / (arg2 * multi);
}

function _cstmMulti(arg1, arg2) {
    let multi = _getMulti(arg1, arg2);

    return arg1 * multi * (arg2 * multi) / (multi * multi);
}

function _cstmMinus(arg1, arg2) {
    let multi = _getMulti(arg1, arg2);

    return (arg1 * multi - arg2 * multi) / multi;
}

function _cstmAdd(arg1, arg2) {
    let multi = _getMulti(arg1, arg2);

    return (arg1 * multi + arg2 * multi) / multi;
}

console.log(_cstmAdd(0.1, 0.2));