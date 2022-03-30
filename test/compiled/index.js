Array.prototype.myFind = function(fn, context = null) {
    var arr = this;
    var len = arr.length;
    var index = 0,
        k = 0;
    var targetValue;

    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    while (index < len) {
        if (index in arr) {
            var result = fn.call(context, arr[index], index, arr);
            if (result) targetValue = arr[index];
            break;
        }

        index++;
    }

    return targetValue;
};

Array.prototype.myFilter = function(fn, context = null) {
    var arr = this;
    var len = arr.length;
    var index = 0,
        k = 0;
    var newArr = [];

    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    while (index < len) {
        if (index in arr) {
            var result = fn.call(context, arr[index], index, arr);
            if (result) newArr[k++] = arr[index];
        }

        index++;
    }

    return newArr;
};

Array.prototype.myForEach = async function(fn, context = null) {
    var index = 0;
    var arr = this;

    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    while (index < arr.length) {
        if (index in arr) {
            try {
                await fn.call(context, arr[index], index, arr);
            } catch (e) {
                console.log(e);
            }
        }

        index++;
    }
};

function _cstmDiv(arg1, arg2) {
    var multi = _getMulti(arg1, arg2);

    return arg1 * multi / (arg2 * multi);
}

function _cstmMulti(arg1, arg2) {
    var multi = _getMulti(arg1, arg2);

    return arg1 * multi * (arg2 * multi) / (multi * multi);
}

function _cstmMinus(arg1, arg2) {
    var multi = _getMulti(arg1, arg2);

    return (arg1 * multi - arg2 * multi) / multi;
}

function _cstmAdd(arg1, arg2) {
    var multi = _getMulti(arg1, arg2);

    return (arg1 * multi + arg2 * multi) / multi;
}

function _getMulti(arg1, arg2) {
    var multi1;
    var multi2;

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

console.log(_cstmAdd(1, 2));
console.log(_cstmMinus(1, 2));
console.log(_cstmMulti(1, 2));
console.log(_cstmDiv(1, 2));
console.log(_cstmAdd(3, 4));
console.log(_cstmMinus(3, 4));
console.log(_cstmMulti(3, 4));
console.log(_cstmDiv(3, 4));
var a = 1;

var b = function(param1, param2) {
    console.log(param1);
    return param2;
};

var c = function(param1, param2) {
    return param1 + param2;
};

for (var _i = 1; _i < 10; _i++) {
    (function() {
        setTimeout(function() {
            console.log(_i);
        }, 1000);
    })();
}

;
var arr1 = [1, 3, 5, 7, 9];
arr1.myForEach(function(val, index, arr) {
    console.log(val + index);
});
arr1.myFilter(function(val, index, arr) {
    if (index < 3) return true;
});
arr1.myFind(function(val, index, arr) {
    if (index = 3) return true;
});