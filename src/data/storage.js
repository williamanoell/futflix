const KEYS = {
  categorias: 'futflix_categorias',
  videos: 'futflix_videos',
};

function getCategorias() {
  return JSON.parse(localStorage.getItem(KEYS.categorias) || '[]');
}

function addCategoria(categoria) {
  const atual = getCategorias();
  const nova = { ...categoria, id: Date.now() };
  localStorage.setItem(KEYS.categorias, JSON.stringify([...atual, nova]));
  return nova;
}

function getVideos() {
  return JSON.parse(localStorage.getItem(KEYS.videos) || '[]');
}

function addVideo(video) {
  const atual = getVideos();
  const novo = { ...video, id: Date.now() };
  localStorage.setItem(KEYS.videos, JSON.stringify([...atual, novo]));
  return novo;
}

export default { getCategorias, addCategoria, getVideos, addVideo };
