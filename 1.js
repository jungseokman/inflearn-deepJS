// 함수를 넣을지 함수의 호출 넣을지, 매게변수를 어디에 넣을지 헷갈릴때는 리턴값으로 대체해서 생각해봐라.
const onClick = () => {
  console.log("hello");
};
document.querySelector("#header").addEventListener("click", onClick());
/*  리턴 값으로 대체해봤을때
    document.querySelector("#header").addEventListener("click", undefined);
    이므로 이상한 코드가 된다.
 */
const onClick1 = () => () => {
  console.log("hello");
};
document.querySelector("#header").addEventListener("click", onClick1());
/*  document.querySelector('#header').addEventListener('click', () => {
    console.log('hello');
    고차 함수일땐 가능하다.
}) */
const onClick2 = (event) => () => {
  console.log("hello");
};
document.querySelector("#header").addEventListener("click", onClick2());
/* document.querySelector("#header").addEventListener("click", () => {
    console.log("hello"); 
}); 
    이므로 매개변수를 가져오지 못한다.*/
const onClick3 = () => (event) => {
  console.log("hello");
};
document.querySelector("#header").addEventListener("click", onClick3());
/*  document.querySelector("#header").addEventListener("click", (event) => {
    console.log("hello");
  });
  이므로 매개변수를 가져올 수 있다.
  */
