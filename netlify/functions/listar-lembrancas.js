// Importa a função para criar um cliente do Supabase, que veio do pacote que instalamos.
const { createClient } = require('@supabase/supabase-js');

// Esta é a função principal que o Netlify vai executar sempre que for chamada.
exports.handler = async function(event, context) {
  try {
    // 1. Pega as nossas chaves secretas do "cofre" do Netlify.
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    // 2. Cria o "cliente" Supabase, nossa ponte de comunicação com o banco de dados.
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. Executa a consulta no banco de dados.
    // Em português claro: "Supabase, da tabela 'lembrancas', selecione todas as colunas (*),
    // e ordene o resultado pela data de criação, com as mais novas primeiro."
    const { data, error } = await supabase
      .from('lembrancas')
      .select('*')
      .order('created_at', { ascending: false });

    // 4. Verifica se o Supabase retornou algum erro durante a consulta.
    if (error) {
      // Se houve um erro, nós o "lançamos" para ser pego pelo bloco 'catch' abaixo.
      throw error;
    }

    // 5. Se tudo deu certo, envia a resposta de sucesso de volta para o site.
    // Retorna um código 200 (OK) e a lista de lembranças em formato JSON.
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (error) {
    // 6. Se qualquer passo dentro do 'try' falhar, este bloco é executado.
    console.error("Erro ao listar lembranças:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Falha ao buscar as lembranças." }),
    };
  }
};