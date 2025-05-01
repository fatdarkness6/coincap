async function searchExchanges(name) {
return await fetch(`https://rest.coincap.io/v3/exchanges?search=${name}` , {
    method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Accept-Encoding": "deflate" ,
        "Authorization" : "Bearer 9c7d65ac-2855-43e0-bdf7-1722260c7ec6"
      },
});
}

export { searchExchanges };