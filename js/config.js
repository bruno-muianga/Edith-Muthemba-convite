/**
 * CONFIGURAÇÃO DO CONVITE DIGITAL DE GRADUAÇÃO
 * Dados personalizados da Graduada
 */

const CFG = {
  name: "Edith Muthemba",                        // Nome da graduada
  whatsapp: "258846772773",                                       // WhatsApp: +258 84 677 2773
  maps: "https://maps.google.com/?q=-25.915680,32.486134",        // Link oficial do Google Maps
  music: "assets/audio/moya-wanga-khensa.mp3",                    // Vokalani - Moya Wanga Khensa
  dressF: "",                                                     // Imagem de inspiração feminina
  dressM: "",                                                     // Imagem de inspiração masculina
  ogImage: "assets/images/foto-3-edith-perfil.jpg",               // Imagem de partilha para WhatsApp
  date: new Date(2026, 11, 19, 12, 30, 0)                          // 19 de Dezembro de 2026 às 12:30
};

/**
 * Configuração opcional para gravação direta no Supabase (se configurado).
 */
const SUPABASE_CONFIG = {
  url: "",
  anonKey: "",
  tableName: "confirmacoes_presenca"
};
