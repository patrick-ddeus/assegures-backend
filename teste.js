function ondeEstou(caixas) {
  let k = 1
  let objAux = {}

  do {
    for (let i = 0; i < caixas.length; i++) {
      const key = caixas.slice(i, i + k)

      if (key.length < k) {
        continue
      }

      if (!(key in objAux)) {
        objAux[key] = 1
      } else {
        objAux[key] += 1
      }
    }
    
    if(!hasSomeValueGreaterThanOne(objAux)) break;

    k++
    objAux = {}
  } while (true)

  return k
}

function hasSomeValueGreaterThanOne(obj) {
  return Object.values(obj).some((value) => value > 1)
}

console.log(ondeEstou('ABCDABC'))
