# TECH ACADEMY 8 - Agenda Fácil

**Membros do Grupo:**

- Samuel Ernandes dos Santos
- Paulo Eduardo Fernandes Rodrigues
- Milena Santos

---

## Visão do Produto

Ser a plataforma que aproxima pessoas. Queremos transformar a maneira como clientes encontram e contratam profissionais autônomos no Brasil, oferecendo uma experiência simples, rápida e segura. Nossa visão é criar um ambiente onde a confiança seja natural, o agendamento seja fácil e cada serviço gere mais tranquilidade, oportunidades e relações de valor para todos.

---

## Métricas de Sucesso

**Métrica 1 – Taxa de agendamentos concluídos com sucesso (>75% em 30 dias)**

Indica o nível de aderência entre a demanda dos clientes e a disponibilidade dos prestadores, além da eficiência no fluxo de agendamento.

**Métrica 2 – Tempo médio para um prestador aceitar um serviço (<1h após a solicitação)**

Mede a agilidade da plataforma e a atratividade das oportunidades para os profissionais cadastrados.

**Métrica 3 – Percentual de avaliações positivas após o serviço (>90%)**

Reflete a qualidade das prestações de serviço, a confiança entre usuários e prestadores e a solidez da experiência na plataforma.

---

## Antiobjetivos (fora do escopo inicial/MVP)

- Automação de faturamento e emissão de NF-e dentro do aplicativo.
- Integração com rastreamento e telemetria em tempo real para empresas privadas.
- O sistema de busca e agendamento funciona sem falhas.

---

## Stakeholders

### 4.1 – Cliente (Usuário Final Mobile)

Utiliza o aplicativo para buscar profissionais, comparar opções, agendar serviços e acompanhar o atendimento.

### 4.2 – Prestador de Serviço (Eletricista, Encanador, Mecânico, etc.)

Profissional autônomo que recebe solicitações, aceita agendamentos, executa os serviços e mantém seu perfil atualizado.

### 4.3 – Administrador da Plataforma

Gerência cadastros, denúncias, avaliações, categorias de serviços, políticas e parâmetros operacionais do aplicativo.

### 4.4 – Equipe Técnica (Dev / QA / UX)

Responsável pelo desenvolvimento, testes, design, melhorias contínuas, publicação e manutenção do app e da API.

### 4.5 – Suporte / Atendimento ao Usuário

Resolve dúvidas, auxilia em problemas de acesso, corrige incidentes e intermedia questões entre cliente e prestador.

### 4.6 – Patrocinador / Dono do Produto

Financia o projeto, define metas estratégicas, prioridades do roadmap e acompanha indicadores de valor do negócio.

### 4.7 – Parceiros Comerciais (Indiretos)

Empresas de ferramentas, lojas de materiais ou parceiros que futuramente podem oferecer descontos e benefícios dentro do app.

### 4.8 – Órgãos Reguladores / Legislação (Indireto)

Envolve normas relacionadas a segurança do consumidor, proteção de dados (LGPD) e regulamentações de prestação de serviços.

---

## Personas

### 5.1 – Persona: Cliente Usuário

- **Descrição / Objetivo**: Pessoa que busca um jeito rápido e confiável de agendar serviços com profissionais autônomos.
- **Responsabilidades**: Buscar prestadores, visualizar agenda disponível, agendar serviços, avaliar após atendimento.
- **Interface**: App Mobile (lista de serviços, perfil do prestador, calendário).
- **Dores**: Dificuldade em encontrar profissionais confiáveis; demora para obter retorno; necessidade de organizar horários sem complicação.

### 5.2 – Persona: Prestador de Serviços (Autônomo)

- **Descrição / Objetivo**: Profissional que deseja aumentar sua base de clientes e organizar sua agenda de forma simples.
- **Responsabilidades**: Disponibilizar horários, responder solicitações, confirmar serviços, manter perfil atualizado.
- **Interface**: App Mobile (agenda, perfil, histórico de atendimentos).
- **Dores**: Falta de visibilidade; dificuldades em administrar agenda; cancelamentos inesperados; comunicação dispersa.

### 5.3 – Persona: Equipe Técnica (Dev / QA)

- **Descrição / Objetivo**: Desenvolver, testar e manter o backend, app e integração.
- **Responsabilidades**: Criar funcionalidades, corrigir bugs, manter API, garantir segurança e estabilidade.
- **Interface**: Repositório de código, documentação técnica, logs, Swagger.
- **Dores**: Requisitos pouco definidos; necessidade de padronização; retrabalho por falta de clareza em regras de negócio.

### 5.4 – Persona: Suporte / Atendimento

- **Descrição / Objetivo**: Resolver dúvidas e problemas simples dos usuários.
- **Responsabilidades**: Ajudar com login, agendamentos, inconsistências na agenda, orientações gerais.
- **Interface**: Painel de suporte, scripts de atendimento, logs.
- **Dores**: Falta de ferramentas de diagnóstico; repetição de problemas comuns; ausência de histórico consolidado.

---

## Diagramas C4:

### 6.1 - Diagrama de contexto:

- Pessoa: Cliente/Usuário que busca serviços, faz agendamentos e avalia empresas.
- Pessoa: Prestador / Empresa/Profissional ou empresa que oferece serviços e recebe agendamentos.
- Sistema: Plataforma de Agendamento de Serviços App web/móvel que intermedia clientes e empresas, permitindo cadastro, autenticação, agendamentos, favoritos, avaliações e notificações.

![Diagrama de Contexto](assets/DiagramaContexto.jpeg)

### 6.2 - Diagrama de container:

- O Container Service (Search) e o Container Service (Scheduling) interagem com o Container Service (Notifications) e com o Container Service (Backend/DB) que armazena avaliações, favoritos, agendamentos e notificações.

![Diagrama de Container](assets/DiagramaContainer.jpeg)

---

## Domínios da aplicação:

### Domínio Principal:

O domínio principal do Agenda Fácil é a conexão digital entre clientes e prestadores de serviços autônomos, oferecendo uma forma prática, organizada e confiável de agendar atendimentos. Esse domínio representa o núcleo funcional da aplicação e concentra todas as regras de negócio essenciais para que o usuário consiga encontrar o profissional ideal, marcar um horário disponível e acompanhar seu atendimento com simplicidade. Sua função central é eliminar barreiras entre quem precisa de um serviço e quem está disponível para oferecê-lo, criando um ecossistema eficiente, transparente e acessível.

### Subdomínios:

| Tipo      | Subdomínio                              | Função                                                                                                                                                                  |
| :-------- | :-------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Principal | Agendamento de Serviços                 | Controla todo o fluxo de marcação de horários entre clientes e prestadores; verificar disponibilidade, reservar horários, gerenciar conflitos e confirmar atendimentos. |
| Principal | Gestão de Profissionais e Serviços      | Permite que os prestadores configurem seu perfil, seus serviços, duração, preços e horários, controla visibilidade e categorias de atuação.                             |
| Principal | Busca e Conexão Cliente – Prestador     | Realiza a busca por profissionais com base em localização, categoria, avaliações e disponibilidade, conectando clientes ao prestador ideal.                             |
| Suporte   | Notificações e Alertas                  | Enviar notificações push, e-mail ou mensagens para lembrar compromissos, avisar alterações, confirmar reservas ou comunicar cancelamentos.                              |
| Suporte   | Avaliações e Feedback                   | Permite que clientes avaliem profissionais e deixem comentários após o atendimento, ajudando a criar reputação e confiança no app.                                      |
| Suporte   | Histórico e Registro de Atendimentos    | Armazena os atendimentos concluídos, cancelados ou reagendados, permitindo análises futuras e transparência para o cliente e profissional.                              |
| Genérico  | Autenticação e Perfis de Usuário        | Gerencia login, cadastro, autenticação via token, perfis (cliente e prestador), permissões e gerenciamento de informações pessoais.                                     |
| Genérico  | Pagamentos e Confirmações (futuro)      | No futuro, permitirá integrar meios de pagamento para confirmar serviços, sinalizar agendamentos e processar valores com segurança.                                     |
| Genérico  | Configurações e Preferências do Usuário | Gerência de idiomas, notificações, dados pessoais, políticas de uso e personalizações gerais da conta.                                                                  |

---

## Bounded Contexts:

### Visão Empresa (Prestadores)

Abrange todas as funcionalidades relacionadas aos prestadores de serviço que utilizam o app para divulgar seu trabalho.

**Responsabilidades:**

- Cadastro de prestadores e seus serviços.
- Gestão de agenda e horários disponíveis.
- Configuração de duração, preço e categorias de serviços.
- Controle de visibilidade do perfil.
- Recebimento de avaliações e feedbacks.

### Visão Usuário (Clientes)

Focado na experiência do cliente final que utiliza o app para agendar serviços.

**Responsabilidades:**

- Buscar profissionais por categoria, localização ou especialidade.
- Verificar disponibilidade e horários livres.
- Realizar reservas e confirmar agendamentos.
- Receber notificações, lembretes e atualizações.
- Avaliar profissionais após atendimento.

### Gerenciamento de Dados de Usuário

Contexto dedicado ao perfil principal:

**Responsabilidades:**

- Cadastro e autenticação (clientes e prestadores).
- Atualização de dados pessoais.
- Gestão de permissões e níveis de acesso (Implementação pro futuro).
- Segurança de credenciais.

### Comunicação e Notificações

**Descrição**: Gerencia toda a comunicação automatizada entre plataforma, prestadores e clientes. Inclui notificações, lembretes e confirmações de ações do sistema.

**Principais Funções:**

- Enviar notificações de confirmação ou alteração de agendamentos.
- Lembrar o cliente sobre o atendimento (ex: 1 hora antes).
- Notificar prestadores sobre novos agendamentos.
- Notificar clientes sobre cancelamentos e atrasos.
- Enviar avisos por canais integrados (Push, E-mail, SMS, WhatsApp).

---

## Entities, Values e Aggregates:

### Entities (Entidades)

- Usuário
- Prestador
- Serviço
- Agendamento

### Value Objects (Objetos de Valor)

- Endereço
- Slot de horário (10h às 11h)
- Preço (R$ 80,00)
- Categoria de Serviço

### Aggregates (Agregados)

**Agregado: Agendamento**

- Entidade Raiz: Agendamento
- Entidades internas: Serviço, Prestador, Cliente
- Value Objects: Data/Horário, Status, Notas

**Agregado: Prestador**

- Entidade Raiz: Prestador
- Entidades internas: Lista de serviços
- Value Objects: Endereço, Disponibilidade, Preço

**Agregado: Usuário**

- Entidade Raiz: Usuário
- Value Objects: E-mail, SenhaHash, Telefone

---

## Decisões Arquiteturais (ADR):

### ADR 8.1 – Escolha de Arquitetura (Monolito + Microsserviços)

O app Agenda Fácil precisa suportar:

- agendamentos em tempo real,
- comunicação por notificações,
- cadastro e gerenciamento de usuários,
- além de outras funcionalidades internas simples.

**Monolito completo**

- Simples de criar e manter.
- Difícil de escalar partes específicas.
- Deploy único e acoplado.

**Arquitetura 100% microsserviços**

- Maior escalabilidade e resiliência.
- Maior complexidade operacional (infra, DevOps, mensageria).
- Exige maturidade técnica e orquestração (K8s, observabilidade etc.).

**Arquitetura híbrida (Monolito + Microsserviços) – opção escolhida**

- O núcleo permanece monolítico para reduzir a complexidade.
- Serviços críticos isolados como microsserviços independentes.
- Balanceia simplicidade e escalabilidade.

**Decisão**

Adotar arquitetura híbrida, onde:

- **Monolito contém**:
  - gestão de profissionais,
  - serviços,
  - preferências,
- **Microsserviços independentes**:
  - Agendamento
  - Notificações
  - Cadastro de Cliente (Usuário)

Estes microsserviços têm requisitos diferentes, maior variabilidade de carga e justificam isolamento.

**Consequências**

- **Positivas**:
  - Escalabilidade sob demanda dos serviços críticos (agendamento e notificações).
  - Menos acoplamento entre componentes sensíveis.
  - Evolução independente dos microsserviços.
  - Simplificação do core monolítico.
- **Negativas**:
  - Introdução de complexidade operacional (monitoramento, logs distribuídos, filas).
  - Necessidade de integração via APIs ou mensageria.
  - Gestão de versão entre contratos de comunicação.

### ADR 8.2 – Escolha do Banco de Dados (PostgreSQL)

O sistema demanda:

- consultas rápidas,
- consistência forte (especialmente para horários e disponibilidade),
- estrutura relacional clara,
- extensibilidade.

**PostgreSQL – opção escolhida**

- Suporte robusto a transações.
- Excelente escalabilidade e consistência.
- Possui extensões geoespaciais (PostGIS).
- Aceita JSON e semiestruturados.
- Amplamente usado em arquiteturas híbridas.

**Decisão**

Utilizar PostgreSQL como banco principal para todo o sistema, incluindo microsserviços, seguindo princípios de _database-per-service_ onde for necessário.

**Consequências**

- **Positivas**:
  - Alta confiabilidade e maturidade.
  - Flexibilidade entre dados estruturados e semiestruturados.
  - Ótimo suporte a consultas complexas, ideal para agenda e disponibilidade.
  - Segurança e ferramentas robustas.
- **Negativas**:
  - Pode exigir _tuning_ avançado para _workloads_ massivos.
  - Operações distribuídas entre microsserviços exigem sincronização via eventos ou mensageria.

---

## Cenários de qualidade:

### 9.1 – Tempo de Resposta e Disponibilidade:

O sistema deve responder em menos de 300 ms para buscas e ações simples.
Disponibilidade alvo: 99,5%.

### 9.2 – Estratégia de Resiliência:

- Retry automático para falhas temporárias.
- Circuit Breaker para serviços externos.
- Cache para consultas repetitivas.
- Replicação do banco de dados.

### 9.3 – Observabilidade:

**Logs:**

- Toda ação relevante: login, erro, agendamento criado.
- Armazenados em serviço centralizado (ELK / CloudWatch).

**Avisos:**

- Alertas para falhas críticas.
- Notificação por e-mail/Slack para equipe técnica.

---

## Segurança:

### 10.1 - Vulnerabilidades e tratativas:

| Vulnerabilidade           | Tratativas                                        |
| :------------------------ | :------------------------------------------------ |
| Burlar login              | JWT com expiração + senha criptografada (bcrypt). |
| Acesso indevido a API     | Roles + permissões por usuário.                   |
| SQL Injection             | Uso de ORM (Prisma, TypeORM).                     |
| Vazamento de Dados        | Variáveis de ambiente + HTTPS.                    |
| Tentativas de força bruta | Rate limiting.                                    |

### 10.2 – Autenticação:

**JWT**

- Armazena token assinado.
- Expira automaticamente.
- Permite login seguro sem armazenar sessão.

**Bearer**

- Forma de enviar o token no header:
  - Authorization: Bearer `<token>`

### 10.3 – Checklist de Segurança

**Login**

- Senha criptografada
- MFA (futuro)
- Bloqueio após tentativas falhas

**API**

- HTTPS obrigatório
- Rate limiting
- Permissões por função

**Banco**

- Usuário com permissões mínimas
- Backups automáticos

**Credenciais / ENVs**

- Nunca no repositório
- Somente em variáveis de ambiente
- Rotação a cada 90 dias

---

## Decisão Arquitetural (Microsserviços) + Quality Scenarios

### 1.1 — Decisão Arquitetural

O Agenda Fácil utiliza uma arquitetura híbrida, combinando:

**Monolito (Core da aplicação)**
Responsável por:

- gestão de profissionais,
- agenda interna,
- veículos (se aplicável),
- telemetria e dados adicionais,
- painel administrativo.

**Microsserviços isolados**:

- **Serviço de Agendamentos**
  - Responsável pelo fluxo crítico: criar, alterar e cancelar agendamentos.
- **Serviço de Notificações**
  - Envio de push, e-mail e alertas automáticos.
- **Serviço de Cadastro de Usuários**
  - Cadastro, autenticação, perfis e permissões.

**Justificativa**
Esses três domínios possuem:

- carga variável,
- necessidade de escalabilidade,
- requisitos de performance mais altos,
- isolamento natural do restante do sistema.

O restante permanece no monólito por simplicidade e redução de complexidade.

### 1.2 — Quality Scenarios

**Disponibilidade**

- Cenário: o serviço de agendamentos recebe alto volume de requisições.
- Resposta esperada: disponibilidade mínima de 99%, mantendo o serviço online mesmo sob picos.
- Técnicas aplicadas:
  - health-check endpoints,
  - replicação da API quando necessário,
  - tolerância a falhas no microsserviço.

**Desempenho**

- Cenário: usuário consulta a agenda ou cria um agendamento.
- Requisito esperado:
  - Tempo de resposta < 400 ms para as principais operações.
  - Notificações enviadas em até 2 segundos após o evento.
- Ações aplicadas:
  - caches leves,
  - consultas otimizadas,
  - indexação no PostgreSQL,
  - redução de carga no monolito com processamento assíncrono.

---

## Bounded Contexts:

A aplicação Agenda Fácil é dividida nos seguintes BCs:

### 1. Contexto de Usuário e Autenticação

Responsável por:

- cadastro,
- login,
- recuperação de senha,
- perfis (cliente, profissional).

### 2. Contexto de Agendamentos (Microsserviço)

Contém:

- lógica de horários,
- disponibilidade,
- criação, edição e cancelamento.

### 3. Contexto de Notificações (Microssserviço)

Trata:

- push notifications,
- aviso de agendamento confirmado/cancelado,
- lembretes.

### 4. Contexto Administrativo

Inclui:

- gerenciamento de profissionais,
- regras de negócio internas,
- configurações do sistema.

### 5. Contexto de Dados Operacionais

Abrange:

- logs de operação,
- dados de acesso,
- registros de erros.

---

## Swagger + Justificativa do Banco de Dados

### 3.1 — Documentação de API (Swagger)

O projeto utiliza Swagger/OpenAPI para documentar as APIs REST, permitindo:

- visualização de endpoints,
- testes diretos pelo navegador,
- geração automática de cliente HTTP,
- padronização das requisições.

**Vantagens**:

- reduz dúvidas entre desenvolvedores,
- garante contrato claro entre monolito e microsserviços,
- melhora a comunicação com o front-end.

### 3.2 — Justificativa do PostgreSQL

A escolha do PostgreSQL foi motivada por:

- Consistência forte (ideal para agendamentos)
- Suporte avançado
- JSONB para dados flexíveis
- Excelente performance para consultas complexas
- Maturidade e comunidade forte
- Open-source e robusto para produção

Sua aderência ao modelo relacional facilita:

- horários,
- intervalos,
- regras sobre choques de agenda.

---

## Atributos de Qualidade, Resiliência e Observabilidade

### 4.1 — SLO / SLI (Tempo de resposta)

- SLI: tempo médio de resposta da API.
- SLO: 400 ms para operações principais.
- Error Budget: até 5% de requisições podem ultrapassar o limite.

### 4.2 — Estratégias de Resiliência

Aplicadas no projeto:

- Retry com backoff para comunicação com microsserviços
- Circuit Breaker para evitar cascatas de falhas
- Timeouts curtos para impedir travamentos
- Dead-letter queue para notificações falhas
- Cache local para dados estáticos
- Monitoramento via health-checks

### 4.3 — Plano de Observabilidade

O sistema coleta:

**Logs**

- logs de requisição/resposta,
- erros de API,
- falhas de autenticação,
- eventos de agendamento.

**Métricas**

- taxa de sucesso por endpoint,
- tempo de resposta percentil 95,
- fila de notificações,
- uso de CPU e memória dos serviços.

**Alertas**

- serviço de agendamento fora do ar,
- fila de notificações acima do limite,
- número anormal de erros 500.

---

## Mapa de ameaças e vulnerabilidades:

### Ameaça 1: Tentativa de burlar login

**Tratativa**:

- uso de JWT
- senhas com hash + salt
- expiração de tokens
- bloqueio após tentativas consecutivas

### Ameaça 2: Exposição de dados sensíveis

**Tratativa**:

- variáveis de ambiente (ENV)
- criptografia TLS
- não-versionar segredos no GitHub
- logs sem informações pessoais

### Ameaça 3: Injeção SQL

**Tratativa**:

- ORM e query parametrizada
- validação de entrada
- sanitização de dados

### Estado atual da segurança do código

- autenticação via JWT implementada
- rotas protegidas com Bearer Token
- logs básicos funcionando
- sanitização parcial dos dados
- ainda não implementado: rate limiting, monitoramento avançado

---

## CI/CD + Estratégia de Deploy + Runbook

### 6.1 — Pipeline CI/CD (Esqueleto)

(explicado, mas não implementado por ser projeto acadêmico)

**Fluxo esperado**:

- **Pull Request → branch feature/**
  - rodar testes
  - rodar lint
  - build do projeto
- **Merge na main → GitHub Actions**
  - build automático
  - testes completos
  - gerar imagem docker
  - preparar ambiente para deploy

### 6.2 — Estratégia de Deploy

O deploy segue o modelo:

- monolito é empacotado em imagem Docker
- microsserviços também são containers independentes
- subida manual ou automatizada em servidor linux
- **ambientes**:
  - Dev (local)
  - Homolog
  - Produção

JWT/Bearer usado apenas para autenticação, não relacionado ao deploy.

### 6.3 — Runbook de Incidentes

Se o sistema cair:

- Verificar health-check dos serviços
- Conferir logs do Agendamento e Notificações
- Reiniciar containers individualmente
- Verificar fila de eventos (se existir)
- Caso persista:
  - restaurar versão anterior
  - abrir incidente e documentar causa raiz
