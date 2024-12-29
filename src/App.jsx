import { useEffect, useState } from 'react';
import './App.css';
import { Card } from './components/card/Card';
import { Navbar } from './components/Navbar/Navbar';

import { getAllPokemon, getPokemon } from './utils/Pokemon';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  const [ pokemonData, setPokemonData ] = useState([]);
  const [ nextURL, setNextURL ] = useState(''); // 次へボタン
  const [ prevURL, setPrevURL ] = useState(''); // 前へボタン

  // ローディング判定
  const [loading, setLoading] = useState(true);

  // response.resultsをdataとして渡して詳細データを取得する。
  const loadPokemon = async (data) => {
    // Promise.add...20種類のポケモンのデータ取得が終わるまでとうこと。
    let _pokemonData = await Promise.all(
      // ポケモンの詳細データを一つずつ取得
      data.map((pokemon)=>{
        // console.log(pokemon)
        let pokemonRecord = getPokemon(pokemon.url);

        return pokemonRecord;
      })
    );

    setPokemonData(_pokemonData);
  };

  // 次へ
  const handleNextPage = async () =>  {
    setLoading(true);

    let data = await getAllPokemon(nextURL);
    // console.log(data);

    await loadPokemon(data.results);

    // 次のURLを取得、更新
    setNextURL(data.next);

    // 前へのページのURLを取得、更新
    setPrevURL(data.previous);

    setLoading(false);
  };

  // 前へ
  const handlePrevPage = async () => {
    // 最初のページの対処
    if(!prevURL) return;

    setLoading(true);

    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);

    // 次のページ、前のページのURLを更新
    setNextURL(data.next);
    setPrevURL(data.previous);

    setLoading(false);
  };

  useEffect(()=>{
    // Promiseを使う場合はasync / awaitを使う。
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let response = await getAllPokemon(initialURL);
      // console.log(response);

      // loadPokemon...各ポケモンの詳細データを取得
      // response.resultsの中には、名前とurlしかない。
      const pokemonData = loadPokemon(response.results);
      // console.log(pokemonData);

      // 次のページのURLもここで取得
      setNextURL(response.next);
      // 前のページのURLを取得
      setPrevURL(response.previous); // 最初のページはnullになる

      setLoading(false);
    };

    fetchPokemonData();

  }, []);

  return (
    <>
      <Navbar />

      <div className="App">
        {
          loading ?
          (<h1>ロード中</h1>) : 
          (
            <>
              <div className="pokemonCardContainer">
              {
                pokemonData.map((pokemon, i) => {
                  return <Card key={i} pokemon={ pokemon }/>;
                })
              }
              </div>

              <div className="p-pagination">
                <div className="p-pagination__flex">
                  <div className="p-pagination__previous">
                    <button className="c-btn" onClick={ handlePrevPage }>前へ</button>
                  </div>
                  <div className="p-pagination__next">
                    <button className="c-btn" onClick={ handleNextPage }>次へ</button>
                  </div>
                </div>
              </div>
            </>
          )
        }
      </div>
    </>
  );
}

export default App;
