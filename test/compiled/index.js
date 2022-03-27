var a;
var b = 1;

for (var i = 1; i < 2; i++) {
  (function () {
    setTimeout(function () {}, 100);
  })();
}