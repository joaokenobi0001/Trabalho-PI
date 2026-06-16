// Funções de validação em conformidade com as normas do CFP
export const validarCRP = (crp) => {
  // Formato padrão: NN/XXXXX ou NN/XXXXX-X
  const regex = /^\d{2}\/\d{5}(-\d)?$/;
  return regex.test(crp);
};

export const validarDivulgacaoEtica = (descricao, especializacoes, abordagens) => {
  const termosProibidos = ['cura', 'garantia', '100% eficaz', 'milagre', 'total'];
  const textoCompleto = `${descricao} ${especializacoes.join(' ')} ${abordagens.join(' ')}`.toLowerCase();
  
  for (let termo of termosProibidos) {
    if (textoCompleto.includes(termo)) {
      return { valido: false, motivo: `Termo não ético: "${termo}". Evite promessas de cura ou garantias.` };
    }
  }
  return { valido: true, motivo: '' };
};

export const obterInformacoesCFP = () => ({
  titulo: "Conformidade com o Conselho Federal de Psicologia (CFP)",
  texto: "Todos os psicólogos listados possuem CRP ativo e seguem o Código de Ética Profissional do Psicólogo. Esta plataforma não garante resultados terapêuticos e incentiva o usuário a verificar o CRP diretamente no site do CFP.",
  link: "https://www.cfp.org.br/consulta"
});