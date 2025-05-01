async function coinsApi(name)  {
    return await fetch(`https://rest.coincap.io/v3/assets/${name}` , {
        headers: {
            "Authorization" : "Bearer 22aab835a2a0d65baf3c3ccbc6d74ccbb5991fdd675f1b06716cd097a67f28ae"
          }
    })
}
export {coinsApi}
