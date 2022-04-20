// 호출과 선언을 구분하여 콜스택 순서을 머릿속에 그려봐라
const x = "x";
function c() {
  const y = "y";
  console.log("c");
}
function a() {
  const x = "x";
  console.log("a");
  function b() {
    const z = "z";
    console.log("b");
    c();
  }
  b();
}
a();
c();
/* 스택은 밑에서 부터 쌓이고 위에서부터 빠져나간다.
함수의 호출을 보고 밑에서 부터 anonymous -> a -> log (로그는 기본적으로 제공해주고 실제로도 브라우저나 노드에 구현되어져 있으므로 
들아왔다가 콘솔에 바로 찍히고 빠져나간다) -> b -> log (콘솔 찍히고 빠져나감) -> c -> 
log log (콘솔 찍히고 빠져나감) => (함수의 닫기(}) 부분에 도착하면) c 빠져나감 -> 
b 빠져나감 -> a 빠져나감 -> c -> log (콘솔 찍히고 빠져나감) -> c빠져나감 -> anonymous빠져나감.
결국 밑에서부터 anonymous, a, b, c 순서로 쌓여 있다가 각 함수의 닫기(}) 부분에 도착하면 위에서 부터
c, b, a 순서로 빠져나가고 다시 c가 쌓였다가 c , anonymous 순서로 빠져나간다 */

/* 스코프 체인 분석
함수의 선언을보고 각 함수의 관계(부모)를 생각해봐라
c -> anonymous
a -> anonymous
b -> c -> anonymous
a안에 b가 없고, anonymous안에도 b가 없으므로 a에서 b 접근 불가능
b안에 a가 없고, c안에도 a가 없지만, anonymous안에 a가 있으므로 b에서 a 접근 가능 */

// function은 호이스팅되서 상단으로 올라가서 어디서든 변수선언 가능하지만 함수선언문(화살표함수)은 선언되기 전에 변수가 선언되어야한다.
