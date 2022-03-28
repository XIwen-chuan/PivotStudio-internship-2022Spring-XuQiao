Array.prototype.myFind = function (fn, context = null) {
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

Array.prototype.myFilter = function (fn, context = null) {
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

Array.prototype.myForEach = async function (fn, context = null) {
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

arr1.myForEach(function (element) {
  console.log(element);
});
arr1.myFliter(function (element) {
  console.log(element);
});
arr1.find(function (element) {
  console.log(element);
});