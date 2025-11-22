# TECH ACADEMY 8 - Agenda Fácil

**Membros do Grupo:**

- Samuel Ernandes dos Santos
- Paulo Eduardo Fernandes Rodrigues
- Milena Santos

---

## 1. Visão do Produto

Ser a plataforma que **aproxima pessoas**. Queremos transformar a maneira como clientes encontram e contratam profissionais autônomos no Brasil, oferecendo uma experiência simples, rápida e segura.

Nossa visão é criar um ambiente onde a **confiança seja natural**, o agendamento seja fácil e cada serviço gere mais tranquilidade, oportunidades e relações de valor para todos.

---

## 2. Métricas de Sucesso

| Métrica       | Objetivo                                                                  | Descrição                                                                                                                                 |
| :------------ | :------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **Métrica 1** | Taxa de agendamentos concluídos com sucesso (>75% em 30 dias)             | Indica o nível de aderência entre a demanda dos clientes e a disponibilidade dos prestadores, além da eficiência no fluxo de agendamento. |
| **Métrica 2** | Tempo médio para um prestador aceitar um serviço (<1h após a solicitação) | Mede a agilidade da plataforma e a atratividade das oportunidades para os profissionais cadastrados.                                      |
| **Métrica 3** | Percentual de avaliações positivas após o serviço (>90%)                  | Reflete a qualidade das prestações de serviço, a confiança entre usuários e prestadores e a solidez da experiência na plataforma.         |

---

## 3. Antiobjetivos (Fora do Escopo Inicial/MVP)

- Automação de faturamento e emissão de NF-e dentro do aplicativo.
- Integração com rastreamento e telemetria em tempo real para empresas privadas.
- O sistema de busca e agendamento funciona sem falhas.

---

## 4. Stakeholders

| Stakeholder                                             | Tipo       | Função/Interesse                                                                |
| :------------------------------------------------------ | :--------- | :------------------------------------------------------------------------------ |
| **Cliente (Usuário Final Mobile)**                      | Primário   | Utiliza o app para buscar, comparar, agendar e acompanhar serviços.             |
| **Prestador de Serviço (Eletricista, Encanador, etc.)** | Primário   | Profissional autônomo que aceita, executa serviços e mantém seu perfil.         |
| **Administrador da Plataforma**                         | Secundário | Gerencia cadastros, denúncias, avaliações, categorias e políticas operacionais. |
| **Equipe Técnica (Dev / QA / UX)**                      | Secundário | Responsável por desenvolvimento, testes, design, manutenção do app e API.       |
| **Suporte / Atendimento ao Usuário**                    | Secundário | Resolve dúvidas, auxilia em problemas de acesso e intermedia questões.          |
| **Patrocinador / Dono do Produto**                      | Decisor    | Financia o projeto, define metas estratégicas e acompanha indicadores.          |
| **Parceiros Comerciais (Indiretos)**                    | Indireto   | Empresas que futuramente podem oferecer descontos e benefícios dentro do app.   |
| **Órgãos Reguladores / Legislação (Indireto)**          | Indireto   | Envolve normas como segurança do consumidor e proteção de dados (LGPD).         |

---

## 5. Personas

### 5.1. Cliente Usuário

- **Objetivo:** Buscar um jeito rápido e confiável de agendar serviços com profissionais autônomos.
- **Responsabilidades:** Buscar prestadores, visualizar agenda, agendar e avaliar após o atendimento.
- **Interface:** App Mobile (lista de serviços, perfil do prestador, calendário).
- **Dores:** Dificuldade em encontrar profissionais confiáveis; demora no retorno; necessidade de organizar horários sem complicação.

### 5.2. Prestador de Serviços (Autônomo)

- **Objetivo:** Aumentar a base de clientes e organizar a agenda de forma simples.
- **Responsabilidades:** Disponibilizar horários, responder solicitações, confirmar serviços, manter perfil atualizado.
- **Interface:** App Mobile (agenda, perfil, histórico de atendimentos).
- **Dores:** Falta de visibilidade; dificuldades em administrar agenda; cancelamentos inesperados; comunicação dispersa.

### 5.3. Equipe Técnica (Dev / QA)

- **Objetivo:** Desenvolver, testar e manter o backend, app e integração.
- **Responsabilidades:** Criar funcionalidades, corrigir bugs, manter API, garantir segurança e estabilidade.
- **Interface:** Repositório de código, documentação técnica, logs, Swagger.
- **Dores:** Requisitos pouco definidos; necessidade de padronização; retrabalho por falta de clareza em regras de negócio.

### 5.4. Suporte / Atendimento

- **Objetivo:** Resolver dúvidas e problemas simples dos usuários.
- **Responsabilidades:** Ajudar com login, agendamentos, inconsistências na agenda, orientações gerais.
- **Interface:** Painel de suporte, scripts de atendimento, logs.
- **Dores:** Falta de ferramentas de diagnóstico; repetição de problemas comuns; ausência de histórico consolidado.

---

## 6. Diagramas C4

### 6.1. Diagrama de Contexto

| Entidade                                  | Função                                                                                                                                   |
| :---------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **Cliente/Usuário**                       | Busca serviços, faz agendamentos e avalia empresas.                                                                                      |
| **Prestador/Empresa**                     | Profissional/empresa que oferece serviços e recebe agendamentos.                                                                         |
| **Plataforma de Agendamento de Serviços** | App web/móvel que intermedia clientes e empresas, permitindo cadastro, autenticação, agendamentos, favoritos, avaliações e notificações. |

![Diagrama de Contexto](assets/DiagramaContexto.jpeg)

### 6.2. Diagrama de Container

- **Diagrama de Container Visual**: O Container Service (Search) e o Container Service (Scheduling) interagem com o Container Service (Notifications) e com o Container Service (Backend/DB) que armazena avaliações, favoritos, agendamentos e notificações.

![Diagrama de Container](assets/DiagramaContainer.jpeg)

---

## 7. Domínios da Aplicação

### 7.1. Domínio Principal

A conexão digital entre clientes e prestadores de serviços autônomos, oferecendo uma forma prática, organizada e confiável de agendar atendimentos. Seu núcleo funcional é eliminar barreiras entre quem precisa e quem oferece o serviço.

### 7.2. Subdomínios

| Tipo          | Subdomínio                              | Função                                                                                                          |
| :------------ | :-------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| **Principal** | Agendamento de Serviços                 | Controla o fluxo de marcação de horários, verifica disponibilidade, gerencia conflitos e confirma atendimentos. |
| **Principal** | Gestão de Profissionais e Serviços      | Permite que prestadores configurem perfil, serviços, duração, preços e horários.                                |
| **Principal** | Busca e Conexão Cliente Prestador       | Realiza a busca por profissionais com base em localização, categoria, avaliações e disponibilidade.             |
| **Suporte**   | Notificações e Alertas                  | Enviar notificações push, e-mail ou mensagens para lembretes, avisos de alteração ou confirmação.               |
| **Suporte**   | Avaliações e Feedback                   | Permite que clientes avaliem profissionais e deixem comentários, criando reputação e confiança.                 |
| **Suporte**   | Histórico e Registro de Atendimentos    | Armazena atendimentos concluídos, cancelados ou reagendados para análises futuras e transparência.              |
| **Genérico**  | Autenticação e Perfis de Usuário        | Gerencia login, cadastro, autenticação via token, perfis (cliente e prestador) e permissões.                    |
| **Genérico**  | Pagamentos e Confirmações (futuro)      | No futuro, permitirá integrar meios de pagamento para confirmar serviços.                                       |
| **Genérico**  | Configurações e Preferências do Usuário | Gerência de idiomas, notificações, dados pessoais e personalizações gerais da conta.                            |

---

## 8. Bounded Contexts (BCs)

### 8.1. Visão Empresa (Prestadores)

Focado nas funcionalidades para prestadores de serviço.

- **Responsabilidades:** Cadastro de prestadores e serviços, gestão de agenda, configuração de duração/preço/categoria, controle de visibilidade e recebimento de avaliações.

### 8.2. Visão Usuário (Clientes)

Focado na experiência do cliente final.

- **Responsabilidades:** Buscar profissionais, verificar disponibilidade, realizar reservas/confirmações, receber notificações e avaliar profissionais.

### 8.3. Gerenciamento de Dados de Usuário (Contexto de Usuário e Autenticação)

Dedicado ao perfil principal (Cadastro e Autenticação).

- **Responsabilidades:** Cadastro e autenticação (clientes e prestadores), atualização de dados pessoais, gestão de permissões (futuro), segurança de credenciais e recuperação de senha.

### 8.4. Comunicação e Notificações (Microsserviço)

Gerencia toda a comunicação automatizada (notificações, lembretes, confirmações).

- **Funções:** Enviar notificações de confirmação/alteração, lembretes ao cliente (ex: 1h antes), notificar prestadores sobre novos agendamentos, avisar sobre cancelamentos/atrasos, e enviar avisos por canais integrados (Push, E-mail, SMS, WhatsApp).

### 8.5. Contexto de Agendamentos (Microsserviço)

- **Lógica:** horários, disponibilidade, criação, edição e cancelamento.

### 8.6. Contexto Administrativo

- **Gerencia:** profissionais, regras de negócio internas e configurações do sistema.

### 8.7. Contexto de Dados Operacionais

- **Abrange:** logs de operação, dados de acesso e registros de erros.

---

## 9. Entities, Values e Aggregates (DDD)

### 9.1. Entities (Entidades)

- Usuário
- Prestador
- Serviço
- Agendamento

### 9.2. Value Objects (Objetos de Valor)

- Endereço
- Slot de horário (10h às 11h)
- Preço (R$ 80,00)
- Categoria de Serviço

### 9.3. Aggregates (Agregados)

| Agregado        | Entidade Raiz | Conteúdo                                                                                     |
| :-------------- | :------------ | :------------------------------------------------------------------------------------------- |
| **Agendamento** | Agendamento   | Entidades internas: Serviço, Prestador, Cliente. Value Objects: Data/Horário, Status, Notas. |
| **Prestador**   | Prestador     | Entidades internas: Lista de serviços. Value Objects: Endereço, Disponibilidade, Preço.      |
| **Usuário**     | Usuário       | Value Objects: E-mail, SenhaHash, Telefone.                                                  |

---

## 10. Decisões Arquiteturais (ADR)

### 10.1. ADR 8.1 - Escolha de Arquitetura (Monolito + Microsserviços)

**Decisão:** Adotar arquitetura híbrida.

| Componente          | Conteúdo                                                                                 | Justificativa                                                               |
| :------------------ | :--------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| **Monolito (Core)** | Gestão de profissionais, serviços, preferências, agenda interna e painel administrativo. | Núcleo permanece monolítico para reduzir a complexidade e por simplicidade. |
| **Microsserviços**  | 1. Agendamento                                                                           | Carga variável, escalabilidade, performance alta.                           |
| **Microsserviços**  | 2. Notificações                                                                          | Carga variável, escalabilidade, performance alta.                           |
| **Microsserviços**  | 3. Cadastro de Cliente (Usuário)                                                         | Carga variável, escalabilidade, performance alta.                           |

**Consequências Positivas:** Escalabilidade sob demanda, menos acoplamento, evolução independente e simplificação do _core_.
**Consequências Negativas:** Introdução de complexidade operacional (monitoramento, logs distribuídos), necessidade de integração via APIs/mensageria, gestão de versão de contratos.

### 10.2. ADR 8.2 - Escolha do Banco de Dados (PostgreSQL)

**Decisão:** Utilizar PostgreSQL como banco principal para todo o sistema.

- **Motivação:** Suporte robusto a transações, excelente escalabilidade e **consistência forte** (essencial para horários e agendamentos), possui extensões geoespaciais (PostGIS), aceita JSON e semiestruturados, maturidade e comunidade forte.

**Consequências Positivas:** Alta confiabilidade, flexibilidade entre dados estruturados e semiestruturados, ótimo suporte a consultas complexas (ideal para agenda).
**Consequências Negativas:** Pode exigir _tuning_ avançado, operações distribuídas (microsserviços) exigem sincronização via eventos ou mensageria.

---

## 11. Cenários de Qualidade

### 11.1. Tempo de Resposta e Disponibilidade

- **Requisito:** Sistema deve responder em **menos de 300 ms** para buscas e ações simples.
- **Disponibilidade Alvo:** **99,5%**.
- **SLO/SLI:** SLI é o tempo médio de resposta da API. SLO é **400 ms** para operações principais.

### 11.2. Estratégia de Resiliência

- **Técnicas Aplicadas:** Retry automático com _backoff_, Circuit Breaker para serviços externos, Cache para consultas repetitivas/dados estáticos, Replicação do banco de dados, Timeouts curtos e Dead-letter queue para notificações falhas.

### 11.3. Observabilidade (Plano Simples)

- **Logs:** Toda ação relevante (login, erro, agendamento criado). Armazenados em serviço centralizado (ELK / CloudWatch). Inclui logs de requisição/resposta, erros de API, falhas de autenticação e eventos de agendamento.
- **Métricas:** Taxa de sucesso por _endpoint_, tempo de resposta percentil 95, fila de notificações e uso de CPU/memória.
- **Alertas:** Avisos para falhas críticas. Notificação por e-mail/Slack para equipe técnica. Inclui: serviço de agendamento fora do ar, fila de notificações acima do limite e número anormal de erros 500.

---

## 12. Segurança e DevSecOps

### 12.1. Vulnerabilidades e Tratativas (Threat Model)

| Vulnerabilidade/Ameaça                              | Tratativas                                                                                                                                             |
| :-------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Burlar login**                                    | JWT com expiração + senha criptografada (bcrypt) + Bloqueio após tentativas falhas (Rate limiting)                                                     |
| **Acesso indevido a API**                           | Roles + permissões por usuário/função                                                                                                                  |
| **SQL Injection**                                   | Uso de ORM (Prisma, TypeORM) + validação e sanitização de dados                                                                                        |
| **Vazamento de Dados/Exposição de dados sensíveis** | Variáveis de ambiente (ENV) + HTTPS obrigatório/criptografia TLS + Nunca versionar segredos/Credenciais no repositório + Logs sem informações pessoais |
| **Tentativas de força bruta**                       | Rate limiting                                                                                                                                          |

### 12.2. Autenticação

- **Mecanismo:** JWT (JSON Web Token).
  - Armazena token assinado.
  - Expira automaticamente.
  - Permite login seguro sem armazenar sessão.
- **Método de Envio:** Bearer Token (Authorization: Bearer `<token>`).

### 12.3. Estado Atual da Segurança do Código

- Autenticação via JWT implementada.
- Rotas protegidas com Bearer Token.
- Logs básicos funcionando.
- Sanitização parcial dos dados.
- Ainda não implementado: _rate limiting_, monitoramento avançado.

---

## 13. Integração, APIs e Dados

### 13.1. Documentação de API (Swagger/OpenAPI)

O projeto utiliza **Swagger/OpenAPI** para documentar as APIs REST, permitindo:

- visualização de _endpoints_,
- testes diretos pelo navegador,
- geração automática de cliente HTTP,
- padronização das requisições.
- **Vantagens:** reduz dúvidas entre desenvolvedores, garante contrato claro entre monolito e microsserviços, melhora a comunicação com o _front-end_.

### 13.2. Justificativa do PostgreSQL (ADR 8.2)

A escolha do PostgreSQL foi motivada por:

- Consistência forte (ideal para agendamentos).
- Suporte avançado.
- JSONB para dados flexíveis.
- Excelente _performance_ para consultas complexas.
- Maturidade e comunidade forte.
- É _open-source_ e robusto para produção.
- Sua aderência ao modelo relacional facilita: horários, intervalos e regras sobre choques de agenda.

---

## 14. CI/CD + Estratégia de Deploy + Runbook

### 14.1. Pipeline CI/CD (Esqueleto - Não Implementado)

1.  **Pull Request (`branch feature/`)**: rodar testes, rodar _lint_, _build_ do projeto.
2.  **Merge na `main` (GitHub Actions)**: _build_ automático, testes completos, gerar imagem docker, preparar ambiente para _deploy_.

### 14.2. Estratégia de Deploy

- **Empacotamento:** Monolito e microsserviços empacotados em **imagens Docker** (containers independentes).
- **Execução:** Subida manual ou automatizada em servidor Linux.
- **Ambientes:** Dev (local), Homolog e Produção.

### 14.3. Runbook de Incidentes (Como Agir se o Sistema Cair)

1.  Verificar _health-check_ dos serviços.
2.  Conferir logs do Agendamento e Notificações.
3.  Reiniciar _containers_ individualmente.
4.  Verificar fila de eventos (se existir).
5.  Caso persista:
    - Restaurar versão anterior.
    - Abrir incidente e documentar causa raiz.
