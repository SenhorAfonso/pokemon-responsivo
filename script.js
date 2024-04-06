function set_page(evolucao, image_url, target) {
  evolucao = evolucao.charAt(0).toUpperCase() + evolucao.slice(1)
  console.log(image_url)
  target.innerHTML = `
  <h1>Detalhes sobre o ${evolucao} </h1>
  
  <img src="${image_url}" alt=${evolucao}>
  `
}

async function getImageURL(evolucao) {
  const evolucao_url = (await fetch(`https://pokeapi.co/api/v2/pokemon/${evolucao}`)).url;
  const pokemon_detail_object = await (await fetch(evolucao_url)).json();
  const image_path = pokemon_detail_object.sprites.front_default

  return image_path;
}

async function main() {
  const titulo = document.getElementById('header')
  const img = document.getElementById('evolucao')
  const queryString = window.location.search
  const evolucao = new URLSearchParams(queryString).get('evolucao').toLowerCase(); 

  titulo.innerHTML = `<h1>Pagina do ${evolucao}</h1>`

  const evolucao_image_url = await getImageURL(evolucao, img);
  set_page(evolucao, evolucao_image_url, img)
}

main();