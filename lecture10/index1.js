var p1 = new Promise((resolve, reject) => {
  setTimeout(function() {
    reject("Hello Worls.");
  }, 100);
});

p1.then((value) => {
  console.log(`.then() onfullfiled : ${value}`);
}, (reason) => {
  console.log(`.then() onrejected  : ${reason}`);
});

p1.catch((reason)=>{
  console.log(`.catch() onrejected : ${reason}`);
});