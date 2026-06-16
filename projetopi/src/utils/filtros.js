export const aplicarFiltros = (psicologos, filtros) => {
  return psicologos.filter(psicologo => {
    // Filtro por texto de busca inteligente
    if (filtros.buscaTexto) {
      const termo = filtros.buscaTexto.toLowerCase();
      const matchNome = psicologo.nome.toLowerCase().includes(termo);
      const matchAbordagem = psicologo.abordagens.some(a => a.toLowerCase().includes(termo));
      const matchEspecializacao = psicologo.especializacoes.some(e => e.toLowerCase().includes(termo));
      const matchDescricao = psicologo.descricao.toLowerCase().includes(termo);
      if (!(matchNome || matchAbordagem || matchEspecializacao || matchDescricao)) return false;
    }

    // Filtro por abordagem terapêutica
    if (filtros.abordagens && filtros.abordagens.length > 0) {
      const temAbordagem = filtros.abordagens.some(ab => psicologo.abordagens.includes(ab));
      if (!temAbordagem) return false;
    }

    // Filtro por modalidade
    if (filtros.modalidade && filtros.modalidade !== 'todos') {
      if (psicologo.modalidade !== filtros.modalidade) return false;
    }

    // Filtro por faixa de preço
    if (filtros.precoMin !== undefined && psicologo.preco < filtros.precoMin) return false;
    if (filtros.precoMax !== undefined && psicologo.preco > filtros.precoMax) return false;

    // Filtro por localização (cidade/estado)
    if (filtros.localizacao) {
      const loc = filtros.localizacao.toLowerCase();
      const cidadeMatch = psicologo.localizacao.cidade.toLowerCase().includes(loc);
      const estadoMatch = psicologo.localizacao.estado.toLowerCase().includes(loc);
      if (!(cidadeMatch || estadoMatch)) return false;
    }

    // Filtro por horário disponível (dia e hora)
    if (filtros.horarioDia && filtros.horarioHora) {
      const disponivel = psicologo.disponibilidade.some(dispo => 
        dispo.dia === filtros.horarioDia && 
        dispo.horarios.includes(filtros.horarioHora)
      );
      if (!disponivel) return false;
    }

    return true;
  });
};