async function searchExchanges(name) {
return await fetch(`https://rest.coincap.io/v3/exchanges?search=${name}` , {
    method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Accept-Encoding": "deflate" ,
        "Authorization" : "Bearer 1704aad12ff97270b4dd95f079f00e4116134a5a0679c25444eb20300f807c8f"
      },
});
}

export { searchExchanges };