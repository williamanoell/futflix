import React,{useState,useEffect} from 'react';
import PageDefault from '../../../components/PageDefault'
import { Link, useHistory } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import categoriasRepository from '../../../repositories/categorias';
import dadosLocais from '../../../data/dadosIniciais.json';
import storage from '../../../data/storage';



function CadastroVideo() {
  const history = useHistory();
  const [categorias,setcCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);

  const { HandlerChange, values } = useForm({
    titulo: '',
    url: '',
    categoria: '',
  });

  useEffect(() => {
    const extras = storage.getCategorias();
    categoriasRepository.getAll()
      .then((categoriasFromServer) => {
        setcCategorias([...categoriasFromServer, ...extras]);
      })
      .catch(() => {
        setcCategorias([...dadosLocais, ...extras]);
      });
  },[]);

  return (
    <PageDefault>

      <h1>Cadastro de Video</h1>
      <form onSubmit={(e) => {
        e.preventDefault();

        const categoriaEscolhida = categorias.find((categoria) => {
          return categoria.titulo === values.categoria;
        });
        storage.addVideo({
          titulo: values.titulo,
          url: values.url,
          categoriaId: categoriaEscolhida ? categoriaEscolhida.id : null,
        });
        history.push('/');

        
      }}>

        <FormField
          label="Titulo do video"
          name="titulo"
          type="text"
          value={values.titulo}
          onChange={HandlerChange}
          placeholder="Vídeo Padrão"
        />

        <FormField
          label="URL do video"
          name="url"
          type="text"
          value={values.url}
          onChange={HandlerChange}
          placeholder="https://www.youtube.com/watch?v=5qPuKhBa7Ag"
        />

        <FormField
          label="Categoria"
          name="categoria"
          value={values.categoria}
          onChange={HandlerChange}
          suggestions={categoryTitles}
          placeholder="Brasil"
        />

        <Button type="submit">Cadastrar</Button>
      </form>


      <Link to="/cadastro/categoria">
        Cadastrar Categoria
        </Link>
    </PageDefault>
  )
}


export default CadastroVideo;