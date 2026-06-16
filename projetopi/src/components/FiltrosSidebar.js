import React, { useState } from 'react';
import styles from '../styles/components.module.css';

const abordagensDisponiveis = [
  "Terapia Cognitivo-Comportamental",
  "Psicanálise Lacaniana",
  "Psicologia Existencial",
  "Terapia Sistêmica",
  "Terapia Comportamental Dialética",
  "Mindfulness",
  "Terapia de Aceitação e Compromisso"
];

const diasSemana = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
const horariosPadrao = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

const FiltrosSidebar = ({ filtros, setFiltros, onFiltrar }) => {
  const [localExpandido, setLocalExpandido] = useState(false);
  const [precoExpandido, setPrecoExpandido] = useState(false);
  const [horarioExpandido, setHorarioExpandido] = useState(false);
  const [abordagemExpandido, setAbordagemExpandido] = useState(false);

  const handleChange = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const handleAbordagemToggle = (abordagem) => {
    const novas = filtros.abordagens.includes(abordagem)
      ? filtros.abordagens.filter(a => a !== abordagem)
      : [...filtros.abordagens, abordagem];
    setFiltros(prev => ({ ...prev, abordagens: novas }));
  };

  const aplicarFiltros = () => {
    onFiltrar();
  };

  const limparFiltros = () => {
    setFiltros({
      buscaTexto: '',
      abordagens: [],
      modalidade: 'todos',
      precoMin: 0,
      precoMax: 500,
      localizacao: '',
      horarioDia: '',
      horarioHora: ''
    });
    onFiltrar();
  };

  return (
    <aside className={styles.sidebar}>
      <h3>Filtros</h3>
      
      {/* Modalidade */}
      <div className={styles.filtroGrupo}>
        <label>Modalidade</label>
        <select 
          value={filtros.modalidade}
          onChange={(e) => handleChange('modalidade', e.target.value)}
          className={styles.select}
        >
          <option value="todos">Todos</option>
          <option value="online">Online</option>
          <option value="presencial">Presencial</option>
        </select>
      </div>

      {/* Faixa de Preço */}
      <div className={styles.filtroGrupo}>
        <div className={styles.filtroHeader} onClick={() => setPrecoExpandido(!precoExpandido)}>
          <label> Faixa de Preço</label>
          <span>{precoExpandido ? '−' : '+'}</span>
        </div>
        {precoExpandido && (
          <div className={styles.filtroBody}>
            <div className={styles.rangeContainer}>
              <span>R$ {filtros.precoMin}</span>
              <input 
                type="range"
                min="0"
                max="500"
                step="10"
                value={filtros.precoMin}
                onChange={(e) => handleChange('precoMin', Number(e.target.value))}
              />
            </div>
            <div className={styles.rangeContainer}>
              <span>R$ {filtros.precoMax}</span>
              <input 
                type="range"
                min="0"
                max="500"
                step="10"
                value={filtros.precoMax}
                onChange={(e) => handleChange('precoMax', Number(e.target.value))}
              />
            </div>
          </div>
        )}
      </div>

      {/* Localização Geográfica */}
      <div className={styles.filtroGrupo}>
        <div className={styles.filtroHeader} onClick={() => setLocalExpandido(!localExpandido)}>
          <label> Localização (cidade/estado)</label>
          <span>{localExpandido ? '−' : '+'}</span>
        </div>
        {localExpandido && (
          <input 
            type="text"
            placeholder="Ex: São Paulo, SP ou Belo Horizonte"
            value={filtros.localizacao}
            onChange={(e) => handleChange('localizacao', e.target.value)}
            className={styles.input}
          />
        )}
      </div>

      {/* Horários Disponíveis */}
      <div className={styles.filtroGrupo}>
        <div className={styles.filtroHeader} onClick={() => setHorarioExpandido(!horarioExpandido)}>
          <label> Horários disponíveis</label>
          <span>{horarioExpandido ? '−' : '+'}</span>
        </div>
        {horarioExpandido && (
          <div className={styles.horariosFiltro}>
            <select 
              value={filtros.horarioDia}
              onChange={(e) => handleChange('horarioDia', e.target.value)}
              className={styles.select}
            >
              <option value="">Dia da semana</option>
              {diasSemana.map(dia => (
                <option key={dia} value={dia}>{dia.charAt(0).toUpperCase() + dia.slice(1)}</option>
              ))}
            </select>
            <select 
              value={filtros.horarioHora}
              onChange={(e) => handleChange('horarioHora', e.target.value)}
              className={styles.select}
              disabled={!filtros.horarioDia}
            >
              <option value="">Horário</option>
              {horariosPadrao.map(hora => (
                <option key={hora} value={hora}>{hora}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Abordagens Terapêuticas */}
      <div className={styles.filtroGrupo}>
        <div className={styles.filtroHeader} onClick={() => setAbordagemExpandido(!abordagemExpandido)}>
          <label> Abordagens</label>
          <span>{abordagemExpandido ? '−' : '+'}</span>
        </div>
        {abordagemExpandido && (
          <div className={styles.checkboxGroup}>
            {abordagensDisponiveis.map(ab => (
              <label key={ab} className={styles.checkboxLabel}>
                <input 
                  type="checkbox"
                  checked={filtros.abordagens.includes(ab)}
                  onChange={() => handleAbordagemToggle(ab)}
                />
                {ab}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className={styles.filtroActions}>
        <button className={styles.btnAplicar} onClick={aplicarFiltros}>Aplicar Filtros</button>
        <button className={styles.btnLimpar} onClick={limparFiltros}>Limpar</button>
      </div>
    </aside>
  );
};

export default FiltrosSidebar;