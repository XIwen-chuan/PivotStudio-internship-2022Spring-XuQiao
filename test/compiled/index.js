let a;
let b = 1;

for (let i = 1; i < 2; i++) {
  (function () {
    setTimeout(function () {}, 100);
  })();
}