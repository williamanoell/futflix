import React, { useEffect, useState } from 'react';
import dadosLocais from '../../data/dadosIniciais.json';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import categoriasRepository from '../../repositories/categorias';
import PageDefault from '../../components/PageDefault';

function Home() {

  const [dadosIniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
    categoriasRepository.getAllWithVideos()
       .then((categoriasComVideos) => {
          setDadosIniciais(categoriasComVideos);
       })
       .catch(() => {
         setDadosIniciais(dadosLocais);
       });
  }, []);

  return (
    <PageDefault paddingAll={1}>

      {dadosIniciais.length === 0 && <div>Loading...</div>}


     {dadosIniciais.length >=1 &&  
       dadosIniciais.map((categoria, indice) => {
        if (indice === 0) {
          return (
            <div key={categoria.id}>
              <BannerMain
                videoTitle={<p>País do Futebol</p>}
                url={dadosIniciais[0].videos[0].url}
                videoDescription={"O futebol é uma paixão mundial, conhecido como o esporte mais praticado no mundo todo. E quando se fala em futebol, o Brasil é o país mais apaixonado pelo esporte e o mais vitorioso nele, considerado, por isso, como o país do futebol."}
              />
              <Carousel
                ignoreFirstVideo
                category={categoria}
              />
            </div>
          );
        }
        return (
          <Carousel
            key={categoria.id}
            category={categoria}
          />
        );
      })
    }

      {/* <BannerMain
        videoTitle={<p>País do Futebol</p>}
        url={dadosIniciais.categorias[0].videos[0].url}
        videoDescription={"O futebol é uma paixão mundial, conhecido como o esporte mais praticado no mundo todo. E quando se fala em futebol, o Brasil é o país mais apaixonado pelo esporte e o mais vitorioso nele, considerado, por isso, como o país do futebol."}
      />

      <Carousel
        ignoreFirstVideo
        category={dadosIniciais.categorias[0]}
      />

      <Carousel
        category={dadosIniciais.categorias[1]}
      />

      <Carousel
        category={dadosIniciais.categorias[2]}
      />      

      <Carousel
        category={dadosIniciais.categorias[3]}
      />       */}

    </PageDefault>
  );
}

export default Home;
