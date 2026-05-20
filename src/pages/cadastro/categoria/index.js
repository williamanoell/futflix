import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import FormField from '../../../components/FormField';
import PageDefault from '../../../components/PageDefault';
import storage from '../../../data/storage';
import useForm from '../../../hooks/useForm';


function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '#6BD1FF',
  };

  const { HandlerChange, values, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState(storage.getCategorias);

  return (
    <PageDefault>
      <h1>
        Cadastro de Campeonatos:
        {values.titulo}
      </h1>

      <form onSubmit={function handleSubmit(infosDoEvento) {
        infosDoEvento.preventDefault();
        const nova = storage.addCategoria(values);
        setCategorias([...categorias, nova]);
        clearForm();
      }}
      >
        <FormField
          label="País"
          type="text"
          value={values.titulo}
          name="titulo"
          onChange={HandlerChange}
          required
        />

        <FormField
          label="Nome do Campeonato"
          type="textarea"
          value={values.descricao}
          name="descricao"
          onChange={HandlerChange}
          required
        />

        <FormField
          label="Cor"
          type="color"
          value={values.cor}
          name="cor"
          onChange={HandlerChange}
          required
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && (
        <div>
          Loading...
        </div>
      )}

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.titulo}`}>
            <strong>Titulo</strong>
            <p>{categoria.titulo}</p>

            <strong>Descrição</strong>
            <p>{categoria.descricao}</p>

            <strong>Cor</strong>
            <p>{categoria.cor}</p>

          </li>
        ))}
      </ul>
      <Link to="/">
        Voltar para Home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
