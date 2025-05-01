async function homePageApi(plus)  {
   let res =  await fetch(`https://rest.coincap.io/v3/assets?limit=${plus}` , {
        headers: {
          "Authorization" : "Bearer 22aab835a2a0d65baf3c3ccbc6d74ccbb5991fdd675f1b06716cd097a67f28ae"
        }
      })
      return res
}
export { homePageApi }

async function homePageApiFullInfo()  {
  let res =  await fetch(`https://rest.coincap.io/v3/assets?limit=2000` , {
       headers: {
         "Authorization" : "Bearer 22aab835a2a0d65baf3c3ccbc6d74ccbb5991fdd675f1b06716cd097a67f28ae"
       }
     })
     return res
}
export { homePageApiFullInfo }