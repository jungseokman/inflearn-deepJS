// 한 번 비동기는 영원한 비동기이다.
// 비동기는 동시의 문제가 아니다. 순서의 문제다.

setTimeout(() => {
  console.log("a");
}, 0);
setTimeout(() => {
  console.log("a");
}, 1000);
setTimeout(() => {
  console.log("a");
}, 2000);
Promise.resolve().then(() => {
  console.log("p");
}); // p, a, b, c 순서대로 콘솔에 나옴

// 이벤트 루프 분석
// 호출스텍에서 순서대로 호출되서 쌓일 때 특정 비동기 코드는 백그라운드에 저장되고 콜스택에서 빠져나간다.
// [백그라운드는 추상적인 개념이며 js가 아니고 js 엔진 + OS 이다. (js가 아니기에 동시라는 개념이 생긴다.)]
// -> 백그라운드에서 특정된 조건이 만족된 순서대로 큐(마이크로, 매크로)에 저장된다.
// [큐의 특성상 처음 들어온게 처음 실행된다.
// 동시 실행일 때 마이크로가 매크로보다 우선시 된다.
// promise, process.nextTick -> 마이크로 , 나미저는 매크로
// -> 호출스택이 비워있을때 큐에서 순서대로 한개씩 호출스택으로 가서 실행되고 빠져나간다.
// 참고로 async 함수는 콜스택에서 첫번째 await 직전에 도달 했을 시 빠져나간다. (이 부분이 동기)

let a = 2;
const p = new Promise((resolve, reject) => {
  console.log("제일 먼저"); // Promise내부는 동기이기 때문에 "console.log("딴 짓")보다 먼저 실행된다."
  setTimeout(() => {
    a = 5;
    console.log(a);
    resolve(a);
  }, 0);
});
console.log("딴 짓");
p.then((result) => {
  console.log("result", result);
}); // 제일 먼저, 딴 짓, 5, result 5 순서대로 콘솔에 나옴
// setInterval은 백그라운드에 계속 남아있기 때문에 clearInterval로 종료시켜줘야 비워진다.

async function a() {
  const a = await 1;
  console.log("a");
}

// async 함수를 promise로 변환

async function a() {
  const a = await 1;
  console.log("a", a);
  console.log("xxx");
  await null;
  const b = await Promise.resolve(1);
  console.log("b", b);
  return a + b;
}
// *******************************
Promise.resolve(1)
  .then((a) => {
    console.log("a", a);
    console.log("xxx");
    return [a, null];
  })
  .then((...args) => {
    return Promise.all(args.concat(Promise.resolve(1)));
  })
  .then((...args) => {
    console.log("b", b);
    return a + b;
  });

// 순서
async function a() {
  console.log("2"); //첫번째 await직전인 부분은 동기부분이라  console.log("3")전에 실행된다.
  const a = await 1;
  console.log("4");
  console.log("a", a);
  await null;
  const b = await Promise.resolve(1);
  console("b", b);
  return a + b;
}
console.log("1");
a()
  .then((result) => {
    console.log(result);
  })
  .then((result2) => {
    console.log(result2);
  });
console.log("3"); // 1, 2, 3, 4, a 1, b 1, 2, undefined 순서로 찍힌다.
