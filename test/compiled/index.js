var a = 1;

for (var a = 1; a < 10; a++) {
  (function () {
    setTimeout(function () {
      console.log(a);
    }, 1000);
  })();
}