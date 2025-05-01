async function exchangeApi() {
    return await fetch(`https://rest.coincap.io/v3/exchanges`, {
        headers: {
          "Authorization" : 'Bearer 22aab835a2a0d65baf3c3ccbc6d74ccbb5991fdd675f1b06716cd097a67f28ae',
        }
      })
}

 function exchangeApiLimit(plus) {
  return  fetch(`https://rest.coincap.io/v3/exchanges?limit=${plus}`, {
      headers: {
        "Authorization" : "Bearer 22aab835a2a0d65baf3c3ccbc6d74ccbb5991fdd675f1b06716cd097a67f28ae"
      }
    })
}

function singleExchangeApiLimit(name) {
  return  fetch(`https://rest.coincap.io/v3/exchanges/${name}`, {
      headers: {
        "Authorization" : 'Bearer 22aab835a2a0d65baf3c3ccbc6d74ccbb5991fdd675f1b06716cd097a67f28ae'
      }
    })
}

export { singleExchangeApiLimit , exchangeApiLimit , exchangeApi }