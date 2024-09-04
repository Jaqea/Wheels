[1, 2, 3].reduce((pre, cur, i, arr) => {
  console.log(pre, cur, i, arr);
  return cur;
}, 0);
