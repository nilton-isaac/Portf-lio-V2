# Portfolio V2

Portfolio em React + TypeScript + Vite com direcao visual escura, background reativo por projeto, painel expandido inline e assets locais prontos para deploy.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- anime.js

## Estrutura

- `src/App.tsx`: composicao principal da landing e geracao do background dinamico.
- `src/site-data.ts`: camada de dados dos projetos, copy temporario e configuracao visual.
- `src/components/project-case-view.tsx`: visualizacao expandida de cada projeto.
- `src/brand-system.tsx`: logos vetoriais e uso do PNG real do Synth.
- `public/mockups/`: mockups SVG locais usados como placeholder.
- `public/synth-logo-original.png`: asset real do Synth WireNotion.

## Desenvolvimento

```bash
npm install
npm run dev
```

Servidor local padrao:

- `http://localhost:5173`

## Qualidade

Executar antes de subir:

```bash
npm run lint
npm run build
```

## Deploy na Vercel

Este projeto esta preparado como site estatico Vite.

### Via dashboard

1. Crie um repositorio com este projeto.
2. Importe o repositorio na [Vercel](https://vercel.com/).
3. A Vercel deve detectar `Vite` automaticamente.
4. Confirme os valores:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Publique.

### Via CLI

```bash
npm i -g vercel
vercel
```

Para previews:

```bash
vercel deploy
```

## Conteudo temporario

- Os textos em `src/site-data.ts` ja foram personalizados com a primeira versao do portfolio e podem ser refinados conforme novos detalhes entrarem.
- Os mockups em `public/mockups/` sao locais e podem ser substituidos por capturas reais dos projetos.
- O Synth ja usa o PNG real recebido do usuario.

## Responsividade

- Hero com reorganizacao em coluna unica no mobile.
- Lista de projetos com dossier expandido inline sem depender de sticky.
- Superficies de leitura mais solidas para manter contraste com o background.
