async function searchCoinsApi(name) {
return await fetch(`https://rest.coincap.io/v3/assets?search=${name}` , {
    method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : "Bearer 22aab835a2a0d65baf3c3ccbc6d74ccbb5991fdd675f1b06716cd097a67f28ae"
      },
});
}
export { searchCoinsApi };