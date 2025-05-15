 function marketApi(name) {
    return  fetch(`https://rest.coincap.io/v3/markets?exchangeId=${name}&limit=2000` , {
          headers: {
           "Authorization" : "Bearer 1704aad12ff97270b4dd95f079f00e4116134a5a0679c25444eb20300f807c8f"
          },
    })
}
export {marketApi}

function marketLimitApi(name , plus) {
  return  fetch(`https://rest.coincap.io/v3/markets?exchangeId=${name}&limit=${plus}` , {
        headers: {
          "Authorization" : "Bearer 1704aad12ff97270b4dd95f079f00e4116134a5a0679c25444eb20300f807c8f"
        },
  })
}
export {marketLimitApi}