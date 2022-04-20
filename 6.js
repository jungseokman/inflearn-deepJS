// await를 생각없이 연달아 쓰지 말자.
function delayP(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}
async function a() {
  await delayP(3000); // 3초
  await delayP(6000); // 6초
  await delayP(9000); // 9초
} // 총 18초
async function b() {
  const p1 = delayP(3000); // 3초
  const p2 = delayP(6000); // 6초
  await Promise.allSettled([p1, p2]); // 6초
  await delayP(9000); // 9초
} // 총 15초

const results = await Promise.all([p1, p2, p3]);
results.map(async () => {
  await result조작(); // p1, p2, p3 조작 동시에
});
for (let result of results) {
  await result조작(); // p1 끝난 후, p2 끝난 후, p3
}
