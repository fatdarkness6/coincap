 function marketApi(name) {
    return  fetch(`https://rest.coincap.io/v3/markets?exchangeId=${name}&limit=2000` , {
          headers: {
           "Authorization" : "Bearer 22aab835a2a0d65baf3c3ccbc6d74ccbb5991fdd675f1b06716cd097a67f28ae"
          },
    })
}
export {marketApi}

function marketLimitApi(name , plus) {
  return  fetch(`https://rest.coincap.io/v3/markets?exchangeId=${name}&limit=${plus}` , {
        headers: {
          "Authorization" : "Bearer 22aab835a2a0d65baf3c3ccbc6d74ccbb5991fdd675f1b06716cd097a67f28ae"
        },
  })
}
export {marketLimitApi}