// Importa a biblioteca oficial do Google AI que acabamos de instalar.
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Esta é a função principal que o Netlify vai executar.
// Ela é assíncrona (async) porque precisamos "esperar" a resposta do Gemini.
exports.handler = async function(event, context) {
  try {
    // 1. ACESSANDO A CHAVE DE API SECRETA
    // Pega a chave de API que vamos configurar no Netlify.
    // process.env é a forma SEGURA de acessar segredos no backend.
    const API_KEY = process.env.GEMINI_API_KEY;

    // 2. INICIANDO O CLIENTE DO GEMINI
    // Inicia o cliente do Google AI com a sua chave.
    const genAI = new GoogleGenerativeAI(API_KEY);

    // 3. FAZENDO A PERGUNTA PARA A IA
    // Escolhe o modelo do Gemini que vamos usar.
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    
    // A pergunta que faremos para a IA.
    const prompt = "Me diga uma curiosidade aleatória, divertida e surpreendente, em uma única frase curta.";

    // Gera o conteúdo, "esperando" (await) a IA responder.
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // 4. ENVIANDO A RESPOSTA DE VOLTA PARA O SITE
    // Se tudo deu certo, retorna um código de sucesso (200) e a curiosidade
    // que o Gemini gerou, formatada como um objeto JSON.
    return {
      statusCode: 200,
      body: JSON.stringify({ curiosidade: text }),
    };
    
  } catch (error) {
    // 5. LIDANDO COM ERROS
    // Se algo der errado (chave inválida, problema na API, etc.),
    // registra o erro e envia uma mensagem de erro de volta para o site.
    console.error("Erro ao chamar a API do Gemini:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Falha ao gerar a curiosidade." }),
    };
  }
};
