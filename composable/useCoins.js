async function coinsApi(name)  {
    return await fetch(`https://rest.coincap.io/v3/assets/${name}` , {
        headers: {
            "Authorization" : "Bearer 1704aad12ff97270b4dd95f079f00e4116134a5a0679c25444eb20300f807c8f"
          }
    })
}
export {coinsApi}
