let makeArray = num => [...Array(num).keys()]
let elim = (arr, n = 0) => arr.slice(-2-n)[0]
let rest = (arr, n = 0) => arr.filter(
  (i, j) => j !== arr.length - 2 - n
)

let gcf = (eq1, eq2) => elim(eq1) * elim(eq2)
let multi = (eq1, eq2) => [
  eq1.map(i => i * gcf(eq1, eq2) / elim(eq1)),
  eq2.map(i => i * gcf(eq1, eq2) / elim(eq2))
]

let diff = (eq1, eq2) => rest(
  makeArray(eq1.length).map(i =>
    multi(eq1, eq2)[0][i] -
    multi(eq1, eq2)[1][i]
  )
)

let reduce = mat =>
  mat.length === 1 ? [] : [
    diff(mat[0], mat[1]),
    ...reduce(mat.slice(1-mat.length))
  ]

let solve = mat =>
  mat[0].length === 2 ?
  mat[0][1] / mat[0][0]
  : solve(reduce(mat))

let swap = (arr, n) => [elim(arr, n), ...rest(arr, n)]

let calculateAnswer = mat =>
  mat.length >= mat[0].length - 1 &&
  makeArray(mat[0].length - 1).map(
    i => mat.map(j => swap(j, i))
  ).map(solve).reverse()

export default calculateAnswer;

// console.log(
//   answer([
//     [1, 1, 50],
//     [0.1, 0.6, 15]
//   ]), // get [30, 20]
//   answer([
//     [5,-2,-4, 3],
//     [3, 3, 2,-3],
//     [-2,5, 3, 3],
//   ]), // get [-1, 2, -3]
//   answer([
//     [5, 7, 9, -1, 67],
//     [1, 9, 6, -5, 3],
//     [-5, -6, 1, -2, -33],
//     [-7, -4, -5, -1, -64],
//   ]), // get [3, 1, 6, 9]
// )