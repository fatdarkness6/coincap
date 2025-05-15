async function exchangeApi() {
    return await fetch(`https://rest.coincap.io/v3/exchanges`, {
        headers: {
          "Authorization" : 'Bearer 1704aad12ff97270b4dd95f079f00e4116134a5a0679c25444eb20300f807c8f',
        }
      })
}

 function exchangeApiLimit(plus) {
  return  fetch(`https://rest.coincap.io/v3/exchanges?limit=${plus}`, {
      headers: {
        "Authorization" : "Bearer 1704aad12ff97270b4dd95f079f00e4116134a5a0679c25444eb20300f807c8f"
      }
    })
}

function singleExchangeApiLimit(name) {
  return  fetch(`https://rest.coincap.io/v3/exchanges/${name}`, {
      headers: {
        "Authorization" : 'Bearer 1704aad12ff97270b4dd95f079f00e4116134a5a0679c25444eb20300f807c8f'
      }
    })
}

export { singleExchangeApiLimit , exchangeApiLimit , exchangeApi }