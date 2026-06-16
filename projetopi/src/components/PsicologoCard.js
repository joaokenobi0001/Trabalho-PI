import React, { useState } from 'react';
import styles from '../styles/components.module.css';

const PsicologoCard = ({ psicologo }) => {
  const [mostrarContato, setMostrarContato] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={psicologo.foto} alt={psicologo.nome} />
        {psicologo.validado && <span className={styles.validadoBadge}>✓ Validado</span>}
      </div>
      <div className={styles.cardContent}>
        <h3>{psicologo.nome}</h3>
        <p className={styles.crp}>CRP: {psicologo.crp}</p>
        <div className={styles.abordagens}>
          {psicologo.abordagens.map((ab, idx) => (
            <span key={idx} className={styles.tag}>{ab}</span>
          ))}
        </div>
        <p className={styles.descricao}>{psicologo.descricao.substring(0, 100)}...</p>
        <div className={styles.cardDetails}>
          <span>💰 R$ {psicologo.preco} / sessão</span>
          <span>{psicologo.modalidade === 'online' ? ' Online' : ' Presencial'}</span>
          <span>⭐ {psicologo.avaliacao || 'Novo'}</span>
        </div>
        {!mostrarContato ? (
          <button 
            className={styles.btnContato}
            onClick={() => setMostrarContato(true)}
          >
            Quero entrar em contato
          </button>
        ) : (
          <div className={styles.contatoInfo}>
            <p><strong>Email:</strong> {psicologo.email}</p>
            <p><strong>Telefone:</strong> {psicologo.telefone}</p>
            <p className={styles.sigiloMsg}> Mensagem sigilosa - Respeitamos a LGPD</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PsicologoCard;