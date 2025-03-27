var a = 10;
console.log(a);
function fn() {
  console.log(a);
  var a = 20;
  a++;
  console.log(a);
  if (a) {
    var a = 30;
    a++;
    console.log(a);
  }
  console.log(a);
}
fn();
console.log(a);


10
undefined21
31
31
10