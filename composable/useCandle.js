// async function candleApi(name) {
//   return  await fetch(`https://rest.coincap.io/v3/assets/${name}/history?interval=m5` , {
//     headers: {
//           "Authorization" : "Bearer 22aab835a2a0d65baf3c3ccbc6d74ccbb5991fdd675f1b06716cd097a67f28ae"
//         }
//   })
// }

// export {candleApi}

// async function candleApiLimit(name , date) {
//   return  await fetch(`https://rest.coincap.io/v3/assets/${name}/history?interval=${date}` , {
//     headers: {
//           "Authorization" : "Bearer 22aab835a2a0d65baf3c3ccbc6d74ccbb5991fdd675f1b06716cd097a67f28ae"
//         }
//   })
// }

function useCandles() {
   function getCandles(name) {
    return fetch(`https://rest.coincap.io/v3/assets/${name}/history?interval=m5` , {
      headers: {
            "Authorization" : "Bearer 1704aad12ff97270b4dd95f079f00e4116134a5a0679c25444eb20300f807c8f"
          }
    })
  }
  function getLimitCandles(name , date) {
    return fetch(`https://rest.coincap.io/v3/assets/${name}/history?interval=${date}` , {
      headers: {
            "Authorization" : "Bearer 1704aad12ff97270b4dd95f079f00e4116134a5a0679c25444eb20300f807c8f"
          }
    })
  }
  return {
    getCandles, 
    getLimitCandles
  }
}
export {useCandles}