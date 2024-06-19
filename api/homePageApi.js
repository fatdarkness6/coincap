async function homePageApi(plus)  {
   let res =  await fetch(`https://api.coincap.io/v2/assets?limit=${plus}` , {
        headers: {
          "Accept-Encoding": "deflate" ,
          "Authorization" : "Bearer 9c7d65ac-2855-43e0-bdf7-1722260c7ec6"
        }
      })
      return res
}
export { homePageApi }