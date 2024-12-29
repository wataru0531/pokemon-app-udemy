

// ポケモンの名前とURLのオブジェクトを取得する関数
export const getAllPokemon = (url) => {

  return new Promise((resolve, reject)=> {
    fetch(url)
      // fetchしてきたデータをJSON形式で返す。
      .then((response)=> {
        // console.log(response);
        return response.json()
      })
      // JSON形式となったデータをdataとして受け取る。
      // それをresolveに渡してJSON形式で返す
      .then((data)=> {
        // console.log(data);
        resolve(data)
      })
  });

};


// ポケモンのURLを取得する関数
export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      // console.log(data)
      resolve(data)
    });

  })
};