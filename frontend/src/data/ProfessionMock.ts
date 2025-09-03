import { Profession } from "../types/ProfessionType";

export const ProfessionMock: Profession[] = [
    // 🛠 Serviços de Reparos e Manutenção
    { id: 1, name: "Eletricista", categoryId: 1 },
    { id: 2, name: "Encanador", categoryId: 1 },
    { id: 3, name: "Pintor", categoryId: 1 },
    { id: 4, name: "Pedreiro", categoryId: 1 },
    { id: 5, name: "Gesseiro", categoryId: 1 },
    { id: 6, name: "Azulejista", categoryId: 1 },
    { id: 7, name: "Marceneiro", categoryId: 1 },
    { id: 8, name: "Serralheiro", categoryId: 1 },
    { id: 9, name: "Vidraceiro", categoryId: 1 },
    { id: 10, name: "Técnico em eletrodomésticos", categoryId: 1 },
    { id: 11, name: "Desentupidor", categoryId: 1 },
    { id: 12, name: "Dedetizador", categoryId: 1 },
    { id: 13, name: "Calheiro / Telhadista", categoryId: 1 },
    { id: 14, name: "Instalador de cerca elétrica", categoryId: 1 },
    { id: 15, name: "Instalador de câmeras / segurança", categoryId: 1 },
    { id: 16, name: "Montador de móveis", categoryId: 1 },
    { id: 17, name: "Instalador de ventiladores / lustres", categoryId: 1 },
    { id: 18, name: "Reformas em geral", categoryId: 1 },

    // 🧹 Serviços Domésticos
    { id: 19, name: "Diarista", categoryId: 2 },
    { id: 20, name: "Faxineira", categoryId: 2 },
    { id: 21, name: "Passadeira", categoryId: 2 },
    { id: 22, name: "Cozinheira", categoryId: 2 },
    { id: 23, name: "Babá", categoryId: 2 },
    { id: 24, name: "Cuidador de idosos", categoryId: 2 },
    { id: 25, name: "Limpeza pós-obra", categoryId: 2 },
    { id: 26, name: "Limpeza de estofados", categoryId: 2 },
    { id: 27, name: "Limpeza de vidros", categoryId: 2 },
    { id: 28, name: "Limpeza de caixa d’água", categoryId: 2 },
    { id: 29, name: "Jardinagem", categoryId: 2 },
    { id: 30, name: "Piscineiro", categoryId: 2 },

    // 💇 Beleza e Estética
    { id: 31, name: "Manicure / Pedicure", categoryId: 3 },
    { id: 32, name: "Cabeleireiro", categoryId: 3 },
    { id: 33, name: "Barbeiro", categoryId: 3 },
    { id: 34, name: "Maquiador(a)", categoryId: 3 },
    { id: 35, name: "Designer de sobrancelhas", categoryId: 3 },
    { id: 36, name: "Depilador(a)", categoryId: 3 },
    { id: 37, name: "Massoterapeuta", categoryId: 3 },
    { id: 38, name: "Esteticista facial / corporal", categoryId: 3 },
    { id: 39, name: "Colocação de unhas", categoryId: 3 },
    { id: 40, name: "Bronzeamento", categoryId: 3 },
    { id: 41, name: "Micropigmentação", categoryId: 3 },

    // 👔 Moda e Costura
    { id: 42, name: "Costureira", categoryId: 4 },
    { id: 43, name: "Ajustes e consertos de roupas", categoryId: 4 },
    { id: 44, name: "Bordados personalizados", categoryId: 4 },
    { id: 45, name: "Aluguel de roupas", categoryId: 4 },
    { id: 46, name: "Customização de roupas", categoryId: 4 },

    // 💻 Tecnologia e Assistência Técnica
    { id: 47, name: "Técnico de informática", categoryId: 5 },
    { id: 48, name: "Formatação de computadores", categoryId: 5 },
    { id: 49, name: "Suporte remoto", categoryId: 5 },
    { id: 50, name: "Instalação de redes Wi-Fi", categoryId: 5 },
    { id: 51, name: "Reparo de celulares / tablets", categoryId: 5 },
    { id: 52, name: "Criação de sites", categoryId: 5 },
    { id: 53, name: "Suporte a software", categoryId: 5 },

    // 🚗 Veículos e Transporte
    { id: 54, name: "Mecânico automotivo", categoryId: 6 },
    { id: 55, name: "Chaveiro", categoryId: 6 },
    { id: 56, name: "Funileiro / Pintor automotivo", categoryId: 6 },
    { id: 57, name: "Guincho", categoryId: 6 },
    { id: 58, name: "Motorista particular", categoryId: 6 },
    { id: 59, name: "Motoboy", categoryId: 6 },
    { id: 60, name: "Serviços de leva-e-traz", categoryId: 6 },
    { id: 61, name: "Lavagem automotiva", categoryId: 6 },
    { id: 62, name: "Vistoria veicular", categoryId: 6 },

    // 🐶 Pets
    { id: 63, name: "Banho e tosa", categoryId: 7 },
    { id: 64, name: "Babá de Pet", categoryId: 7 },
    { id: 65, name: "Adestrador", categoryId: 7 },
    { id: 66, name: "Transporte para pets", categoryId: 7 },
    { id: 67, name: "Hospedagem / hotelzinho", categoryId: 7 },

    // 🎓 Aulas e Educação
    { id: 68, name: "Reforço escolar", categoryId: 8 },
    { id: 69, name: "Aulas particulares", categoryId: 8 },
    { id: 70, name: "Aulas de música", categoryId: 8 },
    { id: 71, name: "Aulas de dança", categoryId: 8 },
    { id: 72, name: "Aulas de culinária", categoryId: 8 },
    { id: 73, name: "Personal trainer", categoryId: 8 },
    { id: 74, name: "Instrutor de yoga/pilates", categoryId: 8 },

    // 📦 Serviços de Mudança e Logística
    { id: 75, name: "Carreteiro", categoryId: 9 },
    { id: 76, name: "Frete pequeno e médio", categoryId: 9 },
    { id: 77, name: "Montagem/desmontagem de móveis", categoryId: 9 },
    { id: 78, name: "Embalagem de mudança", categoryId: 9 },
    { id: 79, name: "Carregadores", categoryId: 9 },

    // 📸 Eventos e Festas
    { id: 80, name: "Fotógrafo", categoryId: 10 },
    { id: 81, name: "Filmagem / videomaker", categoryId: 10 },
    { id: 82, name: "DJ", categoryId: 10 },
    { id: 83, name: "Bartender", categoryId: 10 },
    { id: 84, name: "Garçom", categoryId: 10 },
    { id: 85, name: "Cozinheiro de evento / buffet", categoryId: 10 },
    { id: 86, name: "Decorador", categoryId: 10 },
    { id: 87, name: "Animador de festas", categoryId: 10 },
    { id: 88, name: "Sonorização e iluminação", categoryId: 10 },

    // 📄 Serviços Administrativos e Profissionais
    { id: 89, name: "Contador", categoryId: 11 },
    { id: 90, name: "Advogado", categoryId: 11 },
    { id: 91, name: "Arquiteto", categoryId: 11 },
    { id: 92, name: "Tatuador", categoryId: 11 },
    { id: 93, name: "Fisioterapeuta", categoryId: 11 },
    { id: 94, name: "Engenheiro Civil", categoryId: 11 },
    { id: 95, name: "Tradutor", categoryId: 11 },
    { id: 96, name: "Massagista", categoryId: 11 },
    { id: 97, name: "Dentista", categoryId: 11 },
    { id: 98, name: "Designer gráfico", categoryId: 11 },
    { id: 99, name: "Redator / Copywriter", categoryId: 11 },
    { id: 100, name: "Consultor de marketing", categoryId: 11 },
    { id: 101, name: "Psicólogo", categoryId: 11 },
    { id: 102, name: "Terapeuta", categoryId: 11 },
    { id: 103, name: "Segurança particular", categoryId: 11 },

    // 🧑‍🔧 Outros Serviços
    { id: 104, name: "Serviços para condomínios", categoryId: 12 },
    { id: 105, name: "Ajudante de obra", categoryId: 12 },
    { id: 106, name: "Apoio para eventos e feiras", categoryId: 12 },
    { id: 107, name: "Serviços espirituais", categoryId: 12 }
];