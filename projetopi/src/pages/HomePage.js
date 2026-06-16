import React, { useState, useMemo } from 'react';
import { usePsicologos } from '../context/PsicologosContext';
import PsicologoCard from '../components/PsicologoCard';
import FiltrosSidebar from '../components/FiltrosSidebar';
import BuscaInteligente from '../components/BuscaInteligente';
import { aplicarFiltros } from '../utils/filtros';
import styles from '../styles/components.module.css';

const HomePage = () => {
  const { psicologos, loading } = usePsicologos();
  const [filtros, setFiltros] = useState({
    buscaTexto: '',
    abordagens: [],
    modalidade: 'todos',
    precoMin: 0,
    precoMax: 500,
    localizacao: '',
    horarioDia: '',
    horarioHora: ''
  });
  const [resultados, setResultados] = useState([]);

  const handleBuscar = () => {
    const filtrados = aplicarFiltros(psicologos, filtros);
    setResultados(filtrados);
  };

  // Atualiza automaticamente quando os filtros mudam (opcional)
  useMemo(() => {
    if (psicologos.length > 0) {
      const filtrados = aplicarFiltros(psicologos, filtros);
      setResultados(filtrados);
    }
  }, [psicologos, filtros]);

  if (loading) {
    return <div className={styles.loading}>Carregando psicólogos...</div>;
  }

  return (
    <div className="container">
      <div className={styles.homeHeader}>
        <h1>Encontre o psicólogo ideal para você</h1>
        <p>Plataforma em conformidade com o Conselho Federal de Psicologia - Todos os profissionais possuem CRP válido</p>
      </div>
      
      <BuscaInteligente 
        valor={filtros.buscaTexto}
        onChange={(texto) => setFiltros(prev => ({ ...prev, buscaTexto: texto }))}
        onBuscar={handleBuscar}
      />
      
      <div className={styles.homeContent}>
        <FiltrosSidebar 
          filtros={filtros}
          setFiltros={setFiltros}
          onFiltrar={handleBuscar}
        />
        <div className={styles.resultadosArea}>
          <div className={styles.resultadosHeader}>
            <span>{resultados.length} psicólogos encontrados</span>
          </div>
          {resultados.length === 0 ? (
            <div className={styles.semResultados}>
              <p>Nenhum psicólogo encontrado com os filtros selecionados.</p>
              <p>Tente ampliar sua busca ou limpar os filtros.</p>
            </div>
          ) : (
            <div className={styles.cardsGrid}>
              {resultados.map(psicologo => (
                <PsicologoCard key={psicologo.id} psicologo={psicologo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;