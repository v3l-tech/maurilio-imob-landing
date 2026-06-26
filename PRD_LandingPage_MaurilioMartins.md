# PRD — Landing Page de Captação de Clientes
## Maurílio Martins · Perito Avaliador de Imóveis

**Versão:** 1.0  
**Data:** Junho/2026  
**Stack sugerida:** React + TypeScript + Tailwind CSS + Vite  

---

## 1. Visão Geral do Produto

### 1.1 Objetivo
Criar uma landing page de página única (SPA) focada em captação de clientes pessoa física e jurídica para serviços de **consultoria e avaliação imobiliária** prestados por Maurílio Martins, corretor e perito avaliador credenciado (CRECI-14851 / CNAI-041040), baseado em Mato Grosso.

### 1.2 Público-alvo
| Segmento | Necessidade principal |
|---|---|
| Pessoas físicas (herança, divórcio, compra/venda) | Laudo de avaliação para fins legais ou negociação |
| Empresas e construtoras | Laudos para balanço patrimonial, garantias bancárias ou fusões |
| Advogados e escritórios de direito | Perito judicial de imóveis para processos cíveis |
| Agências bancárias / financeiras | Avaliação para concessão de crédito com garantia real |

### 1.3 Meta de conversão
Gerar contato direto via **WhatsApp** ou **formulário de e-mail**, com taxa de conversão-alvo de ≥ 5% dos visitantes únicos.

---

## 2. Identidade Visual

### 2.1 Paleta de Cores (extraída do cartão de visita)

| Token | Hex | Uso |
|---|---|---|
| `--color-bg-deep` | `#2D1B6B` | Fundo principal (roxo profundo) |
| `--color-bg-card` | `#1E1347` | Fundo de cards e seções alternadas |
| `--color-accent-gold` | `#C8922A` | Bordas, ícones e CTAs primários |
| `--color-accent-gold-light` | `#F0C060` | Hover states, destaques |
| `--color-navy` | `#1A2A4A` | Fundo de elementos geométricos / painéis |
| `--color-text-primary` | `#FFFFFF` | Títulos e texto principal |
| `--color-text-secondary` | `#C4B8E8` | Subtítulos e texto de apoio (lilás claro) |
| `--color-divider` | `#4A3A8A` | Linhas separadoras |

### 2.2 Tipografia

| Papel | Família sugerida | Peso | Observação |
|---|---|---|---|
| Display / Títulos de seção | `Cormorant Garamond` | 600–700 | Serifa elegante, remete ao mercado de alto padrão |
| Corpo / Parágrafos | `Inter` | 400–500 | Alta legibilidade digital |
| Labels / Tags / Credenciais | `Inter` | 600, uppercase, letter-spacing: 0.1em | Tom técnico e credível |

> **Fonte de importação (Google Fonts):**  
> `Cormorant+Garamond:wght@400;600;700` + `Inter:wght@400;500;600`

### 2.3 Elementos Gráficos Recorrentes
- **Setas/chevrons dourados em camadas** (assinatura visual do cartão) → usar como divisores de seção e elementos decorativos
- **Logotipo MS** (monograma) → presente no hero e no footer
- Bordas douradas finas (`1–2px`) em cards para reforçar sofisticação
- Fundo com gradiente sutil `radial-gradient` partindo do roxo profundo

---

## 3. Arquitetura da Página

A página é **single-page**, com scroll contínuo. A navegação fixa no topo faz smooth-scroll para cada âncora.

```
┌─────────────────────────────────────┐
│  HEADER FIXO (logo + nav + CTA)     │
├─────────────────────────────────────┤
│  HERO                               │  ← #hero
├─────────────────────────────────────┤
│  HISTÓRIA                           │  ← #historia
├─────────────────────────────────────┤
│  SERVIÇOS                           │  ← #servicos
├─────────────────────────────────────┤
│  VISÃO · MISSÃO · VALORES           │  ← #vmv
├─────────────────────────────────────┤
│  CONTATO / CTA FINAL                │  ← #contato
├─────────────────────────────────────┤
│  FOOTER                             │
└─────────────────────────────────────┘
```

---

## 4. Especificação de Seções

---

### 4.1 Header Fixo

**Comportamento:** Fixo no topo, com `backdrop-blur` e leve opacidade ao rolar (efeito glassmorphism sobre o fundo roxo).  
**Altura:** 72px desktop / 64px mobile.

**Conteúdo:**
- Logotipo `MS` (SVG inline) + nome "Maurílio Martins" em `Cormorant Garamond`
- Links de navegação: `Início · Sobre · Serviços · Valores · Contato`
- CTA botão: **"Solicitar Avaliação"** → abre WhatsApp (`https://wa.me/5566999852326`)

**Comportamento mobile:** Menu hambúrguer com drawer lateral. CTA sempre visível como botão flutuante no canto inferior direito (WhatsApp fixo).

---

### 4.2 Seção Hero (`#hero`)

**Objetivo:** Gerar credibilidade imediata e direcionar ao CTA.

**Layout:**
```
┌───────────────────────────────────────────┐
│  [Fundo: roxo profundo + chevrons dourados│
│   no lado esquerdo, opacidade 40%]        │
│                                           │
│   [Pequena tag]  CRECI-14851 | CNAI-041040│
│                                           │
│   Avaliações Imobiliárias                 │
│   com Respaldo Técnico                    │
│   e Validade Jurídica                     │
│                                           │
│   [Subtítulo] Laudos de avaliação para    │
│   compra, venda, inventários, ações       │
│   judiciais e garantias bancárias.        │
│                                           │
│   [Btn primário] Solicitar Avaliação      │
│   [Btn secundário] Conhecer Serviços      │
│                              [Logo MS]    │
└───────────────────────────────────────────┘
```

**Copywriting:**
- **Headline (H1):** "Avaliações Imobiliárias com Respaldo Técnico e Validade Jurídica"
- **Subtítulo:** "Laudos precisos para compra, venda, inventário, processos judiciais e garantias bancárias — emitidos por perito credenciado pelo CNAI e corretor registrado no CRECI-MS."
- **CTA Primário:** "Solicitar Avaliação" (dourado, abre WhatsApp)
- **CTA Secundário:** "Conhecer Serviços" (outline, scroll para #servicos)

---

### 4.3 Seção História (`#historia`)

**Objetivo:** Humanizar o profissional e construir confiança.

**Layout:**
```
┌──────────────────────┬───────────────────┐
│  [Foto profissional  │  SOBRE MIM        │
│   de Maurílio em     │                   │
│   ambiente formal    │  [Linha dourada]  │
│   ou em vistoria]    │                   │
│                      │  Texto narrativo  │
│                      │  em 3–4 parágrafos│
│                      │                   │
│                      │  [Stats bar]      │
│                      │  X+ anos | Y+ laud│
│                      │  os | Z cidades   │
└──────────────────────┴───────────────────┘
```

**Copywriting sugerido (placeholder — ajustar com informações reais):**
> "Com mais de [X] anos de atuação no mercado imobiliário de Mato Grosso, Maurílio Martins construiu sua carreira sobre dois pilares: o rigor técnico exigido pela perícia e a confiança que só a experiência de campo proporciona.
>
> Credenciado pelo CRECI-14851 e pelo CNAI-041040, atua como corretor e perito avaliador de imóveis, com especialidade em laudos técnicos para fins judiciais, inventários, garantias bancárias e operações de compra e venda.
>
> Cada avaliação é conduzida com metodologia NBR 14.653, levantamento in loco e análise comparativa de mercado — garantindo laudos que resistem ao escrutínio de peritos revisores, juízes e instituições financeiras."

**Stats (3 blocos em linha):**
| Ícone | Número | Label |
|---|---|---|
| 🏛 | 10+ | Anos de experiência |
| 📄 | 500+ | Laudos emitidos |
| 📍 | 15+ | Cidades atendidas |

---

### 4.4 Seção Serviços (`#servicos`)

**Objetivo:** Detalhar a oferta com foco em consultoria e avaliação imobiliária.

**Layout:** Grid de cards 2×3 (desktop) / 1×N (mobile).  
Cada card: ícone dourado + título em `Cormorant` + descrição em `Inter` + link âncora ao contato.

**Cards de serviço:**

| # | Título | Descrição |
|---|---|---|
| 1 | **Avaliação para Compra e Venda** | Laudo técnico que determina o valor real de mercado do imóvel, protegendo comprador e vendedor de negociações abaixo ou acima do justo. |
| 2 | **Avaliação para Inventário e Herança** | Laudos com validade jurídica para partilha de bens em processos de inventário judicial ou extrajudicial, com base na NBR 14.653. |
| 3 | **Avaliação para Processos Judiciais** | Atuação como perito judicial ou assistente técnico em ações de usucapião, desapropriação, despejo, divórcio litigioso e outros litígios imobiliários. |
| 4 | **Avaliação para Garantias Bancárias** | Emissão de laudo de avaliação para fins de financiamento imobiliário, consórcio ou crédito com garantia de imóvel (home equity). |
| 5 | **Consultoria Imobiliária** | Análise de viabilidade, precificação estratégica e parecer técnico para investidores, incorporadoras e proprietários em tomadas de decisão. |
| 6 | **Avaliação Empresarial de Ativos** | Levantamento do valor patrimonial de imóveis para balanço contábil, fusões, aquisições e laudos de reavaliação para empresas. |

**Detalhe visual de card:**
```
┌──────────────────────────────┐
│  [ícone dourado 32px]        │
│                              │
│  Título em Cormorant 20px    │
│  ─────────────────── (linha) │
│  Descrição em Inter 14px     │
│                              │
│  Saiba mais →                │
└──────────────────────────────┘
```
Fundo: `--color-bg-card` | Borda: `1px solid --color-accent-gold` (opacidade 40%) | Hover: eleva sombra dourada.

---

### 4.5 Seção Visão, Missão e Valores (`#vmv`)

**Objetivo:** Transmitir posicionamento ético e profissional.

**Layout:** Fundo alternado (`--color-bg-card`) com 3 blocos lado a lado (desktop) / empilhados (mobile).  
Chevron dourado decorativo no canto superior direito da seção.

**Conteúdo:**

**🔭 VISÃO**  
> "Ser referência em perícia e avaliação imobiliária em Mato Grosso, reconhecido pela precisão técnica, ética profissional e pelo impacto positivo nas decisões patrimoniais de nossos clientes."

**🎯 MISSÃO**  
> "Oferecer laudos de avaliação imobiliária com rigor técnico e respaldo legal, proporcionando segurança jurídica e patrimonial para pessoas, empresas e instituições — com atendimento transparente e personalizado."

**⭐ VALORES**
- Integridade e imparcialidade técnica
- Comprometimento com prazos e qualidade
- Transparência na comunicação com o cliente
- Atualização contínua com as normas ABNT
- Ética acima de qualquer resultado

**Layout do bloco de valores:**
```
┌──────────────┬──────────────┬──────────────┐
│   VISÃO      │   MISSÃO     │   VALORES    │
│  [ícone]     │  [ícone]     │  [ícone]     │
│  [linha ouro]│  [linha ouro]│  [linha ouro]│
│  Texto...    │  Texto...    │  Lista...    │
└──────────────┴──────────────┴──────────────┘
```

---

### 4.6 Seção Contato (`#contato`)

**Objetivo:** Converter visitante em lead com o menor atrito possível.

**Layout:** Duas colunas — esquerda com dados de contato, direita com formulário.

**Dados de contato:**
| Canal | Valor |
|---|---|
| 📱 WhatsApp | (66) 99985-2326 |
| 📧 E-mail | Maurilio.corretor@hotmail.com |
| 📸 Instagram | @MS.mauriliomartins |
| 💼 LinkedIn | Maurilio Martins |

**CTA WhatsApp:** Botão verde com ícone, texto "Conversar no WhatsApp" → `https://wa.me/5566999852326?text=Olá%2C%20gostaria%20de%20solicitar%20uma%20avaliação%20imobiliária.`

**Formulário (lado direito):**
```
Campos:
- Nome completo *
- Telefone / WhatsApp *
- E-mail
- Tipo de serviço [Select: Compra/Venda | Inventário | Judicial | Bancária | Consultoria | Outro]
- Cidade do imóvel *
- Mensagem (textarea)
- [Botão] "Enviar Solicitação"
```

**Integração de envio:** `mailto:` como fallback, ou integração com **Formspree** / **EmailJS** para envio sem backend.

---

### 4.7 Footer

**Conteúdo:**
- Logotipo MS + nome completo
- Credenciais: CRECI-14851 | CNAI-041040
- Links rápidos (âncoras internas)
- Ícones de redes sociais
- Texto legal: "© 2026 Maurílio Martins · Perito Avaliador de Imóveis · Todos os direitos reservados."
- Nota de conformidade: "Laudos emitidos conforme NBR 14.653 – ABNT"

---

## 5. Comportamento e Interatividade

### 5.1 Scroll e Navegação
- **Smooth scroll** nativo (`scroll-behavior: smooth`)
- Header muda opacidade ao ultrapassar 80px de scroll
- Seção ativa no menu destacada com underline dourado

### 5.2 Animações
- **Fade-in com translateY** nas seções ao entrar no viewport (Intersection Observer)
- **Counter animado** nos stats da seção História (0 → valor final em 1.5s)
- **Hover em cards de serviço:** sombra dourada `box-shadow: 0 0 20px rgba(200,146,42,0.3)`
- Motion preference: respeitar `prefers-reduced-motion`

### 5.3 Botão de WhatsApp Flutuante
- Sempre visível no mobile (canto inferior direito)
- Ícone WhatsApp + pulsar suave (animation `pulse 2s infinite`)
- Link direto com mensagem pré-preenchida

---

## 6. Requisitos Técnicos

### 6.1 Stack
| Camada | Tecnologia |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Estilização | Tailwind CSS v3 (com tokens customizados no `tailwind.config.ts`) |
| Formulário | React Hook Form + Zod (validação) |
| Ícones | Lucide React |
| Fontes | Google Fonts (Cormorant Garamond + Inter) |
| Deploy | Vercel |

### 6.2 Configuração Tailwind (`tailwind.config.ts`)
```typescript
theme: {
  extend: {
    colors: {
      'brand-deep':    '#2D1B6B',
      'brand-card':    '#1E1347',
      'brand-navy':    '#1A2A4A',
      'brand-gold':    '#C8922A',
      'brand-gold-light': '#F0C060',
      'brand-text':    '#FFFFFF',
      'brand-muted':   '#C4B8E8',
      'brand-divider': '#4A3A8A',
    },
    fontFamily: {
      display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
    },
  }
}
```

### 6.3 SEO On-Page
| Tag | Valor |
|---|---|
| `<title>` | Maurílio Martins · Perito Avaliador de Imóveis em MT |
| `meta description` | Laudos de avaliação imobiliária para compra, venda, inventário e processos judiciais. CRECI-14851 / CNAI-041040. Atendimento em todo o Mato Grosso. |
| `og:image` | Logo MS em fundo roxo (1200×630px) |
| Schema.org | `LocalBusiness` + `Person` (Perito) |

### 6.4 Performance
- Imagens em **WebP**, lazy loading com `loading="lazy"`
- Fonte carregada com `font-display: swap`
- Lighthouse Score alvo: ≥ 90 (Performance, Acessibilidade, SEO)

### 6.5 Responsividade
| Breakpoint | Comportamento |
|---|---|
| Mobile (< 640px) | 1 coluna, menu hambúrguer, botão WhatsApp fixo |
| Tablet (640–1024px) | 2 colunas para cards de serviço |
| Desktop (> 1024px) | Layout completo conforme especificação |

---

## 7. Estrutura de Pastas (sugerida)

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Historia.tsx
│   │   ├── Servicos.tsx
│   │   ├── VMV.tsx          ← Visão, Missão, Valores
│   │   └── Contato.tsx
│   └── ui/
│       ├── ServiceCard.tsx
│       ├── StatBlock.tsx
│       ├── WhatsAppButton.tsx
│       └── ContactForm.tsx
├── assets/
│   ├── logo-ms.svg
│   └── foto-maurilio.webp
├── App.tsx
├── main.tsx
└── index.css
```

---

## 8. Critérios de Aceite

| # | Critério | Verificação |
|---|---|---|
| AC-01 | Página carrega em < 3s em 4G | Lighthouse / PageSpeed Insights |
| AC-02 | CTA de WhatsApp visível acima da dobra em todos os breakpoints | Inspeção visual |
| AC-03 | Formulário envia e exibe mensagem de sucesso/erro | Teste funcional |
| AC-04 | Todas as âncoras de navegação funcionam corretamente | Teste manual |
| AC-05 | Paleta de cores idêntica ao cartão de visita | Comparação visual com PDF de referência |
| AC-06 | Credenciais CRECI e CNAI visíveis no hero e no footer | Inspeção visual |
| AC-07 | Página responsiva em 375px, 768px e 1440px | DevTools / BrowserStack |
| AC-08 | Score Lighthouse ≥ 90 em todas as categorias | Lighthouse CI |
| AC-09 | `prefers-reduced-motion` desativa animações | DevTools → Rendering |
| AC-10 | Schema.org `LocalBusiness` válido | Google Rich Results Test |

---

## 9. Fora do Escopo (v1.0)

- Blog ou área de artigos
- Área de cliente / login
- Integração com CRM
- Galeria de laudos (por razões de confidencialidade)
- Chat ao vivo (substituído pelo WhatsApp direto)

---

## 10. Referências e Assets Necessários

| Asset | Responsável | Status |
|---|---|---|
| Foto profissional de Maurílio (alta resolução) | Cliente | Pendente |
| Logotipo MS em SVG ou PNG transparente | Cliente | Disponível (extrair do PDF) |
| Credenciais completas (CRECI, CNAI, registro OAB se aplicável) | Cliente | Parcialmente disponível |
| Depoimentos de clientes (opcional) | Cliente | Pendente |
| Cidades/regiões de atuação | Cliente | Pendente |
| Anos de experiência e número de laudos | Cliente | Pendente |

---

*Documento gerado com base no cartão de visita de Maurílio Martins (arquivo: `carta_o_visita_roxo_Maurilio.pdf`). Todos os valores numéricos marcados com `[X]` devem ser confirmados pelo cliente antes do desenvolvimento.*
