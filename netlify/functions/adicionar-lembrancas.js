// Importa a função para criar um cliente do Supabase
const { createClient } = require('@supabase/supabase-js');

// A função principal que o Netlify executará
exports.handler = async function(event, context) {
  try {
    // 1. Pega as nossas chaves secretas do "cofre" do Netlify
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    // 2. Cria o cliente Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. Pega os dados que o site enviou.
    // O event.body vem como um texto (string), então usamos JSON.parse para transformá-lo em um objeto.
    const novaMemoria = JSON.parse(event.body);

    // Validação simples para garantir que os dados necessários foram enviados
    if (!novaMemoria.titulo || !novaMemoria.descricao) {
      return {
        statusCode: 400, // Código de erro para "Requisição Inválida"
        body: JSON.stringify({ error: "Título e descrição são obrigatórios." }),
      };
    }

    // 4. Executa a inserção no banco de dados.
    // Em português claro: "Supabase, na tabela 'lembrancas', insira este novo objeto."
    // O .select() no final faz com que o Supabase retorne o item que acabou de ser criado.
    const { data, error } = await supabase
      .from('lembrancas')
      .insert([
        { 
          data: novaMemoria.data, 
          titulo: novaMemoria.titulo, 
          descricao: novaMemoria.descricao 
        }
      ])
      .select();

    // 5. Verifica se o Supabase retornou algum erro
    if (error) {
      throw error;
    }

    // 6. Envia a resposta de sucesso de volta para o site.
    // Retorna um código 201 (Criado com sucesso) e a lembrança que foi salva.
    return {
      statusCode: 201,
      body: JSON.stringify(data),
    };

  } catch (error) {
    // 7. Lida com qualquer erro que possa ter acontecido
    console.error("Erro ao adicionar lembrança:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Falha ao salvar a lembrança." }),
    };
  }
};