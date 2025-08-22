# 📚 Gerador de Cenários Jurídicos com IA

Uma aplicação completa para gerar cenários jurídicos realistas usando Inteligência Artificial, desenvolvida para treinamento e aperfeiçoamento de equipes jurídicas.

<img width="1220" height="883" alt="image" src="https://github.com/user-attachments/assets/d44f194a-c336-4992-98e5-b30f05839df0" />

## 🚀 Funcionalidades

- ✨ **Geração Inteligente**: Cenários jurídicos realistas usando GPT-4
- 📋 **Múltiplas Áreas**: Civil, Trabalhista, Empresarial, Consumidor, Tributário, Penal
- 🎯 **Níveis de Dificuldade**: Iniciante, Intermediário, Avançado, Expert
- 🎨 **Interface Moderna**: Design responsivo com Tailwind CSS
- ⚙️ **Personalizável**: Prompts customizados para cenários específicos
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile

## 🛠️ Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **OpenAI GPT-4** - Geração de cenários com IA
- **Lucide React** - Ícones
- **Vercel** - Deploy (recomendado)

## 📦 Instalação e Execução Local

### Pré-requisitos

- Node.js 18.0 ou superior
- npm ou yarn
- Chave de API do OpenAI

### Passo a Passo

1. **Clone o repositório:**

```bash
git clone <url-do-repositorio>
cd gerador-cenarios-juridicos
```

2. **Instale as dependências:**

```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente:**

```bash
# Copie o arquivo de exemplo
cp .env.local.example .env.local

# Edite o arquivo .env.local e adicione sua API key do OpenAI
# OPENAI_API_KEY=sk-your-openai-api-key-here
```

4. **Execute o projeto em modo de desenvolvimento:**

```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação:**
   - Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🔑 Configuração da API OpenAI

1. Acesse [OpenAI Platform](https://platform.openai.com)
2. Crie uma conta ou faça login
3. Vá para [API Keys](https://platform.openai.com/api-keys)
4. Clique em "Create new secret key"
5. Copie a chave e adicione no arquivo `.env.local`

**Importante:** Mantenha sua chave de API segura e nunca a compartilhe publicamente.

## 🚀 Deploy em Produção

### Vercel (Recomendado)

1. **Instale a CLI da Vercel:**

```bash
npm i -g vercel
```

2. **Faça o deploy:**

```bash
vercel
```

3. **Configure as variáveis de ambiente na Vercel:**
   - Acesse o dashboard da Vercel
   - Vá em Settings > Environment Variables
   - Adicione `OPENAI_API_KEY` com sua chave de API

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   └── generate-scenario/
│   │       └── route.ts          # API route para geração
│   ├── globals.css               # Estilos globais
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página inicial
├── components/
│   ├── ScenarioCard.tsx         # Card de cenário
│   └── ScenarioGenerator.tsx    # Gerador de cenários
└── types/                       # Tipos TypeScript
```

## 🎨 Customização

### Adicionando Novas Áreas Jurídicas

1. Edite `src/components/ScenarioGenerator.tsx`:

```typescript
const legalAreas = [
  // ... áreas existentes
  { value: 'nova-area', label: 'Nova Área' },
];
```

2. Edite `src/app/api/generate-scenario/route.ts`:

```typescript
const areaContexts = {
  // ... contextos existentes
  'nova-area': 'contexto específico da nova área',
};
```

### Modificando Níveis de Dificuldade

Edite as configurações em `src/components/ScenarioGenerator.tsx` e `src/app/api/generate-scenario/route.ts`.

### Personalizando Estilos

Modifique `tailwind.config.js` para ajustar cores, fontes e outras configurações visuais.

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa linter

## 📊 Monitoramento e Analytics

Para produção, considere adicionar:

- **Vercel Analytics** - Análise de performance
- **Sentry** - Monitoramento de erros
- **Google Analytics** - Análise de uso

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para detalhes.

## 🆘 Suporte

- 📧 Email: seu-email@empresa.com
- 💬 Slack: #sexta-criativa
- 📚 Wiki: Link para documentação interna

## 🎯 Roadmap

- [ ] Sistema de avaliação de performance
- [ ] Integração com calendário
- [ ] Relatórios de progresso
- [ ] Modo multiplayer
- [ ] API pública
- [ ] Plugin para Notion/Confluence

---

**Desenvolvido com ❤️ para a Sexta Criativa**
