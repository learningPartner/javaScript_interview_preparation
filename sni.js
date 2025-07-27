
for (var i = 0; i < 3; i++) {
  ((j) => {
    setTimeout(() => console.log(j), 1000);
  })(i);
}