// promise는 "실행은 바로 하되, 결괏값은 나중에 원할 때 쓸 수 있는 것"이다.

const p = new Promise();
// 중간에 딴 짓
const c = p
  .then((결괏값) => {
    //결괏값 사용
  })
  .catch((에러) => {});

const p1 = axios.post("서버주소1");
const p2 = axios.post("서버주소2");
const p3 = axios.post("서버주소3");
const p4 = axios.post("서버주소4");
const p5 = axios.post("서버주소5");

Promise.all([p1, p2, p3, p4, p5])
  .then((results) => {})
  .catch((error) => {})
  .finally(() => {});
// 원할 때 p1~p5의 결과를 한번에 받아올 수 있다.
// 단, p1~p5중에 단 하나라도 실패하면 catch로 간다.
Promise.allSettled([p1, p2, p3, p4, p5])
  .then((results) => {
    // 실패한 것만 필터링해서 다시 시도할 수 있다.
  })
  .catch((error) => {})
  .finally(() => {});
// 성공안건 then으로 실패한 건 catch로 간다.
// catch는 Promise의 에러만 catch로 가는게 아니라,
// then에서의 에러도 catch로 간다.
// .finally(() => {})  :   최종적으로 무조건 실행된다
