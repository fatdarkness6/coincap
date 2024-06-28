async function candleApi(name) {
  return  await fetch(`https://api.coincap.io/v2/assets/${name}/history?interval=m5` , {
    headers: {
          "Accept-Encoding": "deflate" ,
          "Authorization" : "Bearer 9c7d65ac-2855-43e0-bdf7-1722260c7ec6"
        }
  })
}

export {candleApi}

async function candleApiLimit(name , date) {
  return  await fetch(`https://api.coincap.io/v2/assets/${name}/history?interval=${date}` , {
    headers: {
          "Accept-Encoding": "deflate" ,
          "Authorization" : "Bearer 9c7d65ac-2855-43e0-bdf7-1722260c7ec6"
        }
  })
}

export {candleApiLimit}