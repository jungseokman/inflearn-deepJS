// js에서 this는 window (strict모드에선 undefined)
// node에서 this는 global
// 현재는 js랑 node둘다 globalThis로 통합됨.
// this는 함수를 호출할 때 정해진다!!!(중요)

console.log(this); // window
function a() {
  console.log(this);
} // window
const obj = {
  name: "seokman",
  sayName() {
    console.log(this.name);
  },
};
obj.sayName(); // seokman
const sayN = obj.sayName;
sayN(); // window.name
const obj2 = {
  name: "seokman",
  sayName: () => {
    console.log(this.name);
  },
};
obj2.sayName(); // window.name
// 화살표함수인지 아닌지도 this를 결정하는데 큰 역할을 한다.

function Human(name) {
  this.name = name;
}
new Human("seokman"); // seokman
// 앞에 객체가 붙는 경우랑 new하는 경우 this가 바뀐다 (객체라도 안에가 화살표함수면 바뀌지 않는다.)

function sayName() {
  console.log(this.name);
}
sayName(); // window.name
sayName.bind({ name: "seokman" })(); // seokman
sayName.apply({ name: "seokman" }); // seokman
sayName.call({ name: "seokman" }); // seokman (apply랑 call은 호출까지 해준다.)
// this는 기본적으로 window인데, this가 바뀌는 경우는 객체의 메소드로 호출하는 경우, new 붙혀서 호출하는 경우,
// bind, apply, call로 this를 직접적으로 바꿔주는 경우가 있다.

const obj3 = {
  name: "seokman",
  sayName() {
    console.log(this.name);
    function inner() {
      console.log(this.name);
    }
    inner();
  },
};
obj3.sayName(); //위는 seokman, 아래는 window.name
// 위는 sayName이 호출할 때 앞에 객체가 붙었으니 seokman,
// 아래는 inner이 호출될 때 this를 바뀌주는 행동을 안했으니 window.name이다.

const obj4 = {
  name: "seokman",
  sayName() {
    console.log(this.name);
    const inner = () => {
      console.log(this.name);
    };
    inner();
  },
};
obj4.sayName(); // 둘 다 seokman
// 화살표 함수는 부모함수의 this를 그대로 가져온다.

// this를 분석할 수 없는 케이스
const header = document.querySelector(".header");
header.addEventListener("click", function () {
  console.log(this);
}); // <div class="header">해더</div>
// addEventListener가 호출 된거고 어떤 함수인지 모르기 때문에 function이 호출하는 부분을 볼 수 없기에 분석할 수 없다.
// addEventListener의 경우엔 this가 앞에 값인 header가 된다.
