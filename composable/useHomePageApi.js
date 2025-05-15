async function homePageApi(plus)  {
   let res =  await fetch(`https://rest.coincap.io/v3/assets?limit=${plus}` , {
        headers: {
          "Authorization" : "Bearer 1704aad12ff97270b4dd95f079f00e4116134a5a0679c25444eb20300f807c8f"
        }
      })
      return res
}
export { homePageApi }

async function homePageApiFullInfo()  {
  let res =  await fetch(`https://rest.coincap.io/v3/assets?limit=2000` , {
       headers: {
         "Authorization" : "Bearer 1704aad12ff97270b4dd95f079f00e4116134a5a0679c25444eb20300f807c8f"
       }
     })
     return res
}
export { homePageApiFullInfo }