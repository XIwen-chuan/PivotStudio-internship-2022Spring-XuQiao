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

var arr1 = [];
arr1.myForEach(function (element) {
  console.log(element);
});