 function marketApi(name) {
    return  fetch(`https://api.coincap.io/v2/markets?exchangeId=${name}&limit=2000` , {
          headers: {
            "Authorization" : "Bearer 9c7d65ac-2855-43e0-bdf7-1722260c7ec6"
          },
    })
}
export {marketApi}

function marketLimitApi(name , plus) {
  return  fetch(`https://api.coincap.io/v2/markets?exchangeId=${name}&limit=${plus}` , {
        headers: {
          "Authorization" : "Bearer 9c7d65ac-2855-43e0-bdf7-1722260c7ec6"
        },
  })
}
export {marketLimitApi}