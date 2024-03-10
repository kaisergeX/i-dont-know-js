function* gen() {
  let a = 0;
  yield a++;
  yield a++;
  yield a++;

  return a;
}

const test1 = gen();
console.log(test1.next().value);
console.log(test1.next().value);
console.log(test1.next().value);
console.log(test1.next().value);

console.log("=================");

const test2 = gen();
for (const hmm of test2) {
  console.log(hmm);
}
