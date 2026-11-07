# Website de Convite Digital de Graduação

Este projeto é um website de convite digital de graduação universitária de luxo, com estética editorial, romântica e minimalista. Foi concebido com foco total em **mobile-first**, garantindo uma experiência fluida para partilha via WhatsApp e redes sociais.

---

## 🎨 Identidade Visual e Paleta de Cores

O tema segue a paleta suave e elegante definida nas diretrizes, sem uso de preto ou vermelho no design geral:

- **Rosa suave:** `#DDA1B5`
- **Rosa claro:** `#F5E8EC`
- **Branco:** `#FFFFFF`
- **Champagne:** `#E8D8BE`
- **Dourado discreto:** `#B99A68`
- **Cinza (textos secundários):** `#888080`
- **Preto suave (texto):** `#252124`

As fontes utilizadas via Google Fonts são:
1. **Great Vibes** (Caligráfica para títulos especiais e assinatura)
2. **Cormorant Garamond** (Serifada clássica e sofisticada)
3. **Montserrat** (Sans-serif delicada e de alta legibilidade)

O projeto suporta nativamente o **tema escuro automático** (`prefers-color-scheme`), preservando a mesma sofisticação editorial.

---

## ⚙️ Configuração das Variáveis (`js/config.js`)

Todas as variáveis personalizáveis estão centralizadas no arquivo [`js/config.js`](file:///Users/mac/.gemini/antigravity/scratch/convite-graduacao/js/config.js):

```javascript
const CFG = {
  name: "",        // Nome da graduada (ex: "Isabel Cristina Matusse")
  whatsapp: "",    // Número com indicativo, só dígitos (ex: "258841234567")
  maps: "",        // Link do Google Maps (ex: "https://maps.app.goo.gl/...")
  music: "",       // URL da música de fundo em MP3 (ex: "assets/audio/fundo.mp3")
  dressF: "",      // Imagem de inspiração feminina (URL ou caminho local)
  dressM: "",      // Imagem de inspiração masculina (URL ou caminho local)
  ogImage: "",     // Imagem de partilha para WhatsApp (og:image)
  date: new Date(2026, 11, 19, 12, 0, 0) // Data: 19 de Dezembro de 2026
};
```

> **Regra de Elegância:** Quando qualquer dado estiver em branco (`""`), o sistema não inventa informações fictícias. Em vez disso, exibe placeholders elegantes com avisos discretos ao utilizador.

---

## 📋 Secções Implementadas

1. **Secção 01 — Abertura / Hero (Capa fechada):**
   - Ecrã inteiro com estética de convite fechado.
   - Bloqueia o scroll até o utilizador clicar em **"ABRIR CONVITE"**.
   - Transição suave em fade que revela o convite e inicia a música ambiente (se configurada).

2. **Secção 02 — Mensagem Especial:**
   - Título: *"CHEGOU O MEU MOMENTO!"*
   - Versículo bíblico: **Isaías 41:20**
   - Mensagem com destaques tipográficos em tom dourado suave (*CHEGOU O MEU MOMENTO*, *gratidão a Deus*, *Licenciatura em Administração e Gestão de Empresas*).

3. **Secção 03 — Detalhes do Evento & Contagem Decrescente:**
   - 3 blocos informativos: **DATA**, **LOCAL** e **ENDEREÇO** (com referência).
   - Botão **"VER LOCALIZAÇÃO NO MAPS"** (com aviso elegante se não estiver configurado).
   - Contagem decrescente em tempo real até 19 de Dezembro de 2026 (Dias, Horas, Minutos, Segundos).

4. **Secção 04 — Dress Code (Editorial de Moda):**
   - Tema: **CASUAL CHIC**.
   - Identificação visual das cores proibidas: **PRETO** e **VERMELHO**.
   - Molduras com ícones e suporte para fotos de inspiração feminina e masculina.
   - Textos e notas exatas de orientação aos convidados.

5. **Secção 05 — Menu da Celebração (Acordeões):**
   - Categorias expansíveis: Entradas, Pratos Principais, Acompanhamentos, Saladas, Sobremesas e Bebidas.
   - Ícones lineares delicados e comportamento adaptado a ecrãs táteis.

6. **Secção 06 — Sugestões de Presentes:**
   - Detalhes de vestuário e calçado.
   - M-Pesa: `846 772 773` com botão de cópia rápida.
   - BCI: NIB `0008 0000 0584 6304 101 95` com botão de cópia rápida.
   - Suporte a Clipboard API com fallback para navegadores antigos e toasts visuais de confirmação.

7. **Secção 07 — Confirmação de Presença (RSVP):**
   - Formulário com Nome Completo, Número de Telefone e opção Sim/Não.
   - Integração com WhatsApp gerando texto pré-preenchido pronto a enviar.
   - Tratamento gracioso caso o número ainda não tenha sido definido na configuração.
   - Estrutura pronta para integração opcional com Supabase.

8. **Secção 08 — Encerramento:**
   - Citações de agradecimento e louvor a Deus.
   - Assinatura caligráfica da graduada.
   - Ilustração delicada em SVG de capelo de formatura e flores.

---

## 🚀 Como Executar Localmente

Você pode abrir diretamente o arquivo `index.html` em qualquer navegador web moderno, ou iniciar um servidor local rápido:

```bash
# Navegar até a pasta do projeto
cd /Users/mac/.gemini/antigravity/scratch/convite-graduacao

# Iniciar servidor local com Python 3
python3 -m http.server 8080
```

Abra no navegador em: `http://localhost:8080`

---

## 🌐 Publicação Online (Netlify / Vercel / GitHub Pages)

O projeto é 100% estático (HTML, CSS e JavaScript puros), sem necessidade de etapas de compilação ou dependências externas (`npm`).

Para publicar no **Netlify**:
1. Arraste e solte a pasta `convite-graduacao` em [app.netlify.com/drop](https://app.netlify.com/drop).
2. O seu link público estará imediatamente ativo e pronto para envio por WhatsApp!

