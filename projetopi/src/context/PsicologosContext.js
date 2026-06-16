import React, { createContext, useState, useEffect, useContext } from 'react';

const PsicologosContext = createContext();

// Dados iniciais mockados (em produção viriam de uma API)
const psicologosMock = [
  {
    id: 1,
    nome: "Dra. Ana Beatriz Souza",
    crp: "04/51234",
    email: "ana@psicologia.com",
    telefone: "(31) 99999-1234",
    abordagens: ["Terapia Cognitivo-Comportamental", "Mindfulness"],
    formacao: "Doutora em Psicologia Clínica pela UFMG",
    especializacoes: ["Ansiedade", "Depressão", "Transtorno de Pânico"],
    disponibilidade: [
      { dia: "segunda", horarios: ["09:00", "10:00", "14:00"] },
      { dia: "quarta", horarios: ["09:00", "10:00"] },
      { dia: "sexta", horarios: ["14:00", "15:00"] }
    ],
    preco: 180,
    modalidade: "online",
    localizacao: {
      cidade: "Belo Horizonte",
      estado: "MG",
      endereco: "Atendimento online"
    },
    descricao: "Atendo adultos e adolescentes com foco em terapia breve e manejo da ansiedade.",
    foto: "https://randomuser.me/api/portraits/women/68.jpg",
    avaliacao: 4.9,
    validado: true
  },
  {
    id: 2,
    nome: "Dr. Carlos Mendes",
    crp: "05/98765",
    email: "carlos@psicologia.com",
    telefone: "(21) 98888-5678",
    abordagens: ["Psicanálise Lacaniana", "Psicologia Existencial"],
    formacao: "Mestre em Teoria Psicanalítica pela UFRJ",
    especializacoes: ["Luto", "Crise Existencial", "Relacionamentos"],
    disponibilidade: [
      { dia: "terca", horarios: ["10:00", "11:00", "15:00"] },
      { dia: "quinta", horarios: ["10:00", "11:00"] },
      { dia: "sabado", horarios: ["09:00", "10:00"] }
    ],
    preco: 220,
    modalidade: "presencial",
    localizacao: {
      cidade: "Rio de Janeiro",
      estado: "RJ",
      endereco: "Rua Voluntários da Pátria, 280 - Botafogo"
    },
    descricao: "Atendimento presencial no Rio de Janeiro. Especialista em luto e questões existenciais.",
    foto: "https://randomuser.me/api/portraits/men/32.jpg",
    avaliacao: 4.7,
    validado: true
  },
  {
    id: 3,
    nome: "Dra. Fernanda Lima",
    crp: "06/33445",
    email: "fernanda@psicologia.com",
    telefone: "(11) 97777-9012",
    abordagens: ["Terapia Cognitivo-Comportamental", "Terapia de Aceitação e Compromisso"],
    formacao: "Especialista em Neuropsicologia pela PUC-SP",
    especializacoes: ["TDAH", "Autismo leve", "Gestão de estresse"],
    disponibilidade: [
      { dia: "segunda", horarios: ["08:00", "09:00", "13:00"] },
      { dia: "terca", horarios: ["08:00", "09:00"] },
      { dia: "quinta", horarios: ["13:00", "14:00", "15:00"] }
    ],
    preco: 150,
    modalidade: "online",
    localizacao: {
      cidade: "São Paulo",
      estado: "SP",
      endereco: "Atendimento online"
    },
    descricao: "Atendo crianças, adolescentes e adultos. Tenho experiência com neurodivergências.",
    foto: "https://randomuser.me/api/portraits/women/45.jpg",
    avaliacao: 5.0,
    validado: true
  },
  {
    id: 4,
    nome: "Dr. Rafael Almeida",
    crp: "03/11223",
    email: "rafael@psicologia.com",
    telefone: "(51) 96666-7890",
    abordagens: ["Terapia Sistêmica", "Terapia de Casal"],
    formacao: "Mestre em Psicologia Social pela UFRGS",
    especializacoes: ["Terapia de casal", "Família", "Conflitos conjugais"],
    disponibilidade: [
      { dia: "segunda", horarios: ["18:00", "19:00", "20:00"] },
      { dia: "quarta", horarios: ["18:00", "19:00"] },
      { dia: "sexta", horarios: ["18:00", "19:00", "20:00"] }
    ],
    preco: 200,
    modalidade: "presencial",
    localizacao: {
      cidade: "Porto Alegre",
      estado: "RS",
      endereco: "Av. Goethe, 150 - Auxiliadora"
    },
    descricao: "Atendimento presencial e online para casais e famílias.",
    foto: "https://randomuser.me/api/portraits/men/52.jpg",
    avaliacao: 4.8,
    validado: true
  },
  {
    id: 5,
    nome: "Dra. Mariana Castro",
    crp: "08/99887",
    email: "mariana@psicologia.com",
    telefone: "(61) 95555-4321",
    abordagens: ["Terapia Comportamental Dialética", "Mindfulness"],
    formacao: "Especialista em Transtornos de Personalidade pela UNB",
    especializacoes: ["Borderline", "Compulsão alimentar", "Regulação emocional"],
    disponibilidade: [
      { dia: "terca", horarios: ["14:00", "15:00", "16:00"] },
      { dia: "quinta", horarios: ["14:00", "15:00", "16:00"] }
    ],
    preco: 190,
    modalidade: "online",
    localizacao: {
      cidade: "Brasília",
      estado: "DF",
      endereco: "Atendimento online"
    },
    descricao: "Utilizo a TCD para ajudar no manejo de emoções intensas.",
    foto: "https://randomuser.me/api/portraits/women/23.jpg",
    avaliacao: 4.9,
    validado: true
  }
];

export const PsicologosProvider = ({ children }) => {
  const [psicologos, setPsicologos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar dados do localStorage ou usar mock
  useEffect(() => {
    const stored = localStorage.getItem('psicologos');
    if (stored) {
      setPsicologos(JSON.parse(stored));
    } else {
      setPsicologos(psicologosMock);
      localStorage.setItem('psicologos', JSON.stringify(psicologosMock));
    }
    setLoading(false);
  }, []);

  const adicionarPsicologo = (novoPsicologo) => {
    const novoId = Math.max(...psicologos.map(p => p.id), 0) + 1;
    const psicologoCompleto = {
      ...novoPsicologo,
      id: novoId,
      avaliacao: 0,
      validado: false, // Precisa de validação manual por professores
    };
    const novaLista = [...psicologos, psicologoCompleto];
    setPsicologos(novaLista);
    localStorage.setItem('psicologos', JSON.stringify(novaLista));
    return psicologoCompleto;
  };

  return (
    <PsicologosContext.Provider value={{ psicologos, loading, adicionarPsicologo }}>
      {children}
    </PsicologosContext.Provider>
  );
};

export const usePsicologos = () => useContext(PsicologosContext);