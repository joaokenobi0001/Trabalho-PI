import React from 'react';
import FormCadastroPsicologo from '../components/FormCadastroPsicologo';
import styles from '../styles/components.module.css';

const CadastroPage = () => {
  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <h1>Cadastro para profissionais de psicologia</h1>
        <p>Seu cadastro será analisado por uma equipe de psicólogos e professores para garantir a conformidade com as normas do CFP.</p>
      </div>
      <FormCadastroPsicologo />
    </div>
  );
};

export default CadastroPage;