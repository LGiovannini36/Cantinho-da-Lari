// Aguarda a página carregar completamente antes de executar o código
window.addEventListener('DOMContentLoaded', () => {

    // --- CAPTURA DOS ELEMENTOS GLOBAIS ---
    const contadorEl = document.getElementById('contador-dias');
    const audioPositivo = document.getElementById('som-positivo');
    const audioOps = document.getElementById('som-ops');


    // --- SEÇÃO DO CONTADOR DE DIAS ---
    const dataInicio = new Date(2024, 9, 24); // 24 de Outubro de 2024 (mês 9 é Outubro)
    const hoje = new Date();
    const diferencaEmMilissegundos = hoje - dataInicio;
    const umDiaEmMilissegundos = 1000 * 60 * 60 * 24;
    const diasPassados = Math.floor(diferencaEmMilissegundos / umDiaEmMilissegundos);
    contadorEl.textContent = `Já se passaram ${diasPassados} dias desde nosso comecinho ❤️`;


    // --- SEÇÃO DA FRASE DO DIA ---
    const frases = ["Às vezes, de longe parece que as coisas estão ruins, mas vendo de perto, parece que estão longe.", "Malandro é o gato, que já nasce de bigode.", "Em terra de saci, qualquer chute é uma voadora.", "A vida é como um sanduíche: o recheio é você quem escolhe.", "Se a vida te der limões, procure quem tem uma cachaça e um açúcar.", "Não sou o Google, mas em você eu encontro tudo que procuro.", "O importante não é saber, mas ter o telefone de quem sabe.", "Quem ri por último, não entendeu a piada.", "A pressa é a inimiga da refeição.", "Fui fazer o Enem e descobri que meu forte é interpretação de boleto.", "Malandro mesmo é o pato, que já nasce com os dedo colado pra não usar aliança.", "Se tudo na vida é passageiro, eu sou o cobrador.", "O futuro a Deus pertence, e a fatura do cartão a mim.", "Água mole em pedra dura, tanto bate até que... molha tudo.", "Não leve a vida tão a sério, afinal, você não vai sair vivo dela.", "Quem com ferro fere, não sabe a dor que eu sinto.", "Só não compro uma Ferrari porque não gosto da cor.", "Errar é humano, colocar a culpa nos outros é estratégia.", "O trabalho dignifica o homem, mas o cansaço que dá é uma vergonha.", "Deus ajuda quem cedo madruga, mas quem tarde madruga já pega o café pronto.", "Mais vale um pássaro na mão do que... ué, cadê meu relógio?", "A esperança é a última que morre, mas a minha paciência já foi faz tempo.", "Quem tem boca vai a Roma. Quem tem grana vai pra onde quiser.", "Não sou vidente, mas prevejo que amanhã é outro dia.", "A beleza interior é importante, mas uma chapinha também ajuda.", "Se o amor é cego, o negócio é apalpar.", "Se ferradura desse sorte, burro não puxava carroça.", "Quem cedo madruga, fica com sono o dia todo.", "Malandro é o goleiro, que joga onde os outros só trabalham.", "Depois da tempestade, vem a conta da reforma do telhado.", "Haverá um dia em que os robôs serão tão inteligentes que poderão nos dominar. Mas não hoje. Hoje eles só aspiram o chão.", "Em briga de saci, uma rasteira derruba.", "Se te jogarem pedras, construa um muro e venda os tijolos.", "A voz do povo é a voz de Deus, mas o povo anda muito desafinado.", "A vida te derruba, mas você pode escolher se levanta ou se tira um cochilo.", "Para que levar a vida a sério, se nós nascemos de uma gozada?", "Se conselho fosse bom, não se dava, se vendia. E o meu estaria em promoção.", "A fé move montanhas, mas eu prefiro usar um trator.", "Quem não tem cão, caça com... o vizinho reclamando do barulho.", "Diga-me com quem andas e eu te direi se vou junto.", "Se a montanha não vem a Maomé, Maomé pede um iFood.", "Eu não tenho problema com a segunda-feira, meu problema é com o trabalho.", "A mente é como um paraquedas, só funciona se estiver aberta.", "Quem espera sempre alcança, mas geralmente chega atrasado.", "Onde há fumaça, há... um churrasco começando.", "Se a vida é uma festa, eu nasci na cozinha lavando a louça.", "Roupa suja se lava em casa. A minha eu levo na lavanderia.", "Um dia a gente ri, no outro a gente é o meme.", "Não deixe para amanhã o que você pode deixar pra lá de vez.", "A diferença entre a genialidade e a estupidez é que a genialidade tem seus limites.", "Eu queria ser uma abelha, pra te dar uma ferroada no coração.", "Quem planta vento, colhe uma rinite alérgica.", "Se Maomé não vai à montanha, é porque a passagem de avião está muito cara.", "Gentileza gera gentileza, e um PIX também.", "De grão em grão, a galinha enche o papo e eu encho meu bucho.", "Quem não chora não mama, e quem chora demais já é adulto.", "Filho de peixe, peixinho é. A não ser que seja o Aquaman.", "Crie uma cobra e ela te picará. Crie um humano e ele... bom, ele também.", "Por trás de um grande homem, sempre há uma mulher surpresa.", "Quem cala consente, ou tá só esperando a vez de falar."];
    const diaDoAno = Math.floor((hoje - new Date(hoje.getFullYear(), 0, 0)) / umDiaEmMilissegundos);
    const indiceDiario = diaDoAno % frases.length;
    document.getElementById('frase-do-dia-texto').textContent = frases[indiceDiario];


    // --- FUNÇÃO REUTILIZÁVEL PARA ENVIAR NOTIFICAÇÕES ---
    const enviarNotificacao = (dados) => {
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(dados).toString(),
        })
        .then(() => console.log("Notificação enviada com sucesso!"))
        .catch((error) => console.error("Erro ao enviar notificação:", error));
    };

    
    // --- SEÇÃO DOS LEMBRETES ---
    const lembreteItems = document.querySelectorAll('.lembrete-item');
    lembreteItems.forEach(item => {
        const perguntaEl = item.querySelector('p');
        const btnPositivo = item.querySelector('.btn-positivo');
        const btnOps = item.querySelector('.btn-ops');
        const feedbackEl = item.querySelector('.lembrete-feedback');

        btnPositivo.addEventListener('click', () => {
            feedbackEl.textContent = 'Muito que bem, orgulho do princeso';
            audioPositivo.play();
            const dadosParaEnviar = { "form-name": "lembretes", "lembrete": perguntaEl.textContent, "resposta": "Positivo, capitão brocha 🫡" };
            enviarNotificacao(dadosParaEnviar);
        });

        btnOps.addEventListener('click', () => {
            feedbackEl.textContent = 'Mas vamos melhorar isso pra amanhã, né?!';
            audioOps.play();
            const dadosParaEnviar = { "form-name": "lembretes", "lembrete": perguntaEl.textContent, "resposta": "Ops" };
            enviarNotificacao(dadosParaEnviar);
        });
    });
    

    // --- SEÇÃO NOSSAS LEMBRANÇAS ---
    const memorias = [ { data: "Outubro de 2024", titulo: "O Início de Tudo", descricao: "Aqui tudo começou, quem diria que um \"boa noite\" mudaria tanto nossas vidas. Mensalmente teremos as nossas melhores lembranças registradas aqui, nesse cantinho, pra nunca esquecer quão valiosa é a nossa história." } ];
    const lembrancasContainer = document.getElementById('lembrancas-inline-container');
    memorias.forEach(memoria => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('lembranca-item');
        itemEl.innerHTML = `
            <p class="data">${memoria.data}</p>
            <h3>${memoria.titulo}</h3>
            <p>${memoria.descricao}</p>
        `;
        lembrancasContainer.appendChild(itemEl);
    });


    // --- SEÇÃO DO COISÔMETRO ---
    const inputCoisoLevel = document.getElementById('coiso-level');
    const coisoMessageEl = document.getElementById('coiso-message');
    const btnDescoisar = document.getElementById('btn-descoisar');
    const caixaDesabafo = document.getElementById('caixa-desabafo');
    const piadasRuins = [ "O que o pagodeiro foi fazer na igreja? Foi cantar pá god.", "Por que a velhinha não usa relógio? Porque ela é sem hora.", "Qual o nome do peixe que caiu do décimo andar? Aaaaah, tum.", "Como o Batman faz para entrar na bat-caverna? Ele bat-palma.", "O que um cromossomo disse para o outro? Cromossomos felizes!", "Por que o pinheiro não se perde na floresta? Porque ele tem uma pinha (um mapinha).", "O que o zero disse para o oito? Belo cinto!", "Qual o contrário de 'volátil'? 'Vem cá, sobrinho'.", "Sabe qual o rei dos queijos? O reiqueijão.", "Tinha um pintinho que não tinha umbigo. Um dia ele foi pular e 'PÁ': explodiu.", "Por que a planta não responde? Porque ela é uma planta e plantas não falam, seu idiota.", "O que a xícara disse para o pires? 'Você é um pires-ponsável mesmo!'", "Qual o estado que queria ser um carro? Ser-gipe.", "O que o pato disse para a pata? 'Vem quá!'", "Como se chama o sorvete que sofreu um acidente? Sorvete de massa-crada.", "Por que o jacaré tirou o filho da escola? Porque ele réptil de ano.", "Qual é o cúmulo da sorte? Ser atropelado por uma ambulância.", "Dois homens conversando: 'Ontem eu caí de uma escada de 20 metros'. O outro: 'Nossa, e você se machucou?'. 'Não, eu caí do primeiro degrau'.", "O que o tomate foi fazer no banco? Foi tirar extrato.", "Por que o policial não usa sabão? Porque ele prefere deter-gente.", "Qual o animal que não vale mais nada? O javali (já valeu).", "O que o pão disse para o outro? 'Nossa, tô com um miolo mole'.", "Onde o Super-Homem compra suas roupas? Na Super Loja.", "O que a zebra disse para a mosca? 'Você está na minha lista negra'.", "O que é um pontinho amarelo no topo de um prédio? Um milho-nário.", "Por que o Napoleão era sempre chamado para as festas? Porque ele era Bom Na Party.", "O que a galinha foi fazer na igreja? Assistir à missa do galo.", "Sabe por que a água foi presa? Porque ela matou a sede.", "O que o tijolo falou para o outro? 'Há um ciumento entre nós'.", "Qual o carro que acabou de sair da concessionária? O ex-Ford.", "Qual a fórmula da água benta? H-Deus-O.", "O que o melão estava fazendo de ponta cabeça? Caindo de maduro.", "Por que o Papai Noel não tem filhos? Porque o saco dele é de brinquedo.", "Qual o peixe que é parceiro de todo mundo? O 'meu bacalhau'.", "O que a frigideira disse para o ovo? 'Me desculpe se te deixo com a gema mole'.", "O que um advogado e um quiabo têm em comum? Ambos são cheios de baba.", "Qual o nome do pai do King Kong? O Pai Kong.", "O que o Faustão foi fazer no psiquiatra? Foi tratar o problema de 'quem sabe faz ao vivo'.", "O que um programador e um surfista têm em comum? Ambos vivem de 'ondas'.", "Por que a aranha é o animal mais carente do mundo? Porque ela é um arac'needyou'.", "Qual a diferença entre um lago e um oceano? A opinião de um peixe.", "O que a fechadura disse para a chave? 'Vamos dar uma voltinha?'", "Como o diabo abre a porta? Com a diabrindo.", "O que um fantasma disse para o outro? 'Você acredita em pessoas?'", "Qual a comida que liga e desliga? O strogON-OFF.", "O que um tênis disse para o outro? 'Nossa, que cadarço'.", "Por que a matemática é um problema? Porque ela é cheia de problemas.", "O que a parede disse para a outra? 'Nos encontramos no canto'.", "O que o cego disse ao passar por uma peixaria? 'Olá, meninas!'", "O que o gibi disse para o outro? 'Tô todo me 'HQ'drando aqui'.", "Qual o país que tem a hora certa? A 'Hora'guai.", "O que a gasolina disse para o carro? 'Vou te deixar na mão'.", "Qual o filme preferido do pão? 'O Pão que o Diabo Amassou'.", "Qual o carro do gás? O Explo'são'.", "O que o corretor de imóveis disse para o cliente? 'Essa casa é o seu 'lar'goritmo'.", "Por que o louco toma banho com o chuveiro desligado? Porque ele comprou um shampoo para cabelos secos.", "Qual o animal mais antigo? A zebra, porque ela é preto e branca.", "O que a mãe do Hulk disse para ele? 'Menino, você me deixa verde de raiva!'", "O que um asterisco disse para o outro? 'Vamos 'asteriscar' um romance?'", "Qual o cereal favorito do vampiro? Aveia.", "O que um caçador de mitos disse quando viu um Saci? 'É... 'Saci'fatório'.", "O que a fita-crepe disse para a outra? 'Nós somos uma dupla e tanto'.", "Qual o animal que já foi da polícia? O ex-tinto.", "Por que a bicicleta não consegue ficar de pé sozinha? Porque ela é 'two-tired' (muito cansada).", "O que o espermatozoide disse para o óvulo? 'Deixa eu ser o pai da criança'.", "O que o livro de matemática disse para o de história? 'Não me venha com histórias, eu já tenho problemas demais'.", "Por que os mergulhadores sempre caem de costas na água? Porque se caíssem de frente, continuariam no barco.", "O que é um pontinho verde no canto da sala? Uma ervilha de castigo.", "O que o advogado da galinha disse no tribunal? 'Ela é inocente, meritíssimo, foi só uma 'ovo'dose de emoção'.", "Qual o contrário de paixão? 'Mãe-teto'.", "O que a Lua disse para o Sol? 'Nossa, como você é Sol'idário, me ilumina toda noite'.", "Por que a mulher do Hulk se divorciou dele? Porque ela queria um homem mais maduro.", "Qual o nome do médico que te ensina a fazer massagem? O 'fisiotera'peuta'.", "O que o canibal vegetariano come? Plantas carnívoras.", "O que um elétron disse ao ser perguntado se queria mudar? 'Não, obrigado, estou bem 'negativo' quanto a isso'.", "Qual o programa de TV favorito do encanador? 'Super'Nanny'.", "O que o martelo foi fazer na academia? Malhar.", "Qual o peixe que se veste de mulher? O 'traíra'.", "Qual a banda de rock favorita do Mário? 'Linkin Parkour'.", "O que um pedreiro disse para o outro? 'Vamos fazer uma 'argamassa'gem?'", "Por que o semáforo foi ao psicólogo? Porque ele estava com problemas de 'sinal'idade.", "Qual o animal que come com o rabo? Todos, nenhum tira o rabo para comer.", "Qual o ator que é um mestre em artes marciais? O 'Jean-Claude Van'g Damm-se'.", "O que o catchup disse para a mostarda? 'Você me 'mostarda' o caminho?'", "Por que a girafa tem o pescoço tão longo? Para alcançar o próprio chifre.", "O que um número disse para o outro? 'Vamos 'somar' nossas forças?'", "Qual o peixe que usa terno? O 'tubarão'-terno.", "Por que o escorpião é um bom amigo? Porque ele é sempre 'escorpião' de linha.", "O que o Google foi fazer no médico? Foi tratar um problema de 'busca'.", "Qual o santo que é o rei da pipoca? São 'João' de milho.", "O que um programador disse quando nasceu seu filho? 'Hello, World!'", "Qual o peixe que usa maquiagem? O 'pinta'do.", "Qual o nome do peixe que se joga do prédio? O 'atum', porque 'atum' se joga.", "Por que o gato não gosta de água? Porque ele é 'mia'scarado.", "O que o elevador disse para o outro? 'Estou com um 'pressentimento' de que vamos subir na vida'.", "Qual o animal que é um mestre em natação? O 'nada'dor.", "Qual o estado que é um mestre em artes marciais? O 'Mato' Grosso do Sul.", "Qual o nome do peixe que é um mestre em disfarces? O 'camaleão' marinho." ];
    btnDescoisar.addEventListener('click', () => {
        const nivel = parseFloat(inputCoisoLevel.value);
        const desabafoTexto = caixaDesabafo.value;
        let mensagem = "";
        if (nivel >= 0 && nivel <= 30) { const piadaAleatoria = piadasRuins[Math.floor(Math.random() * piadasRuins.length)]; mensagem = `Vish, tá crítico né?! Aqui vai uma piada bem ruim: ${piadaAleatoria}`; } 
        else if (nivel > 30 && nivel < 50) { mensagem = "É, as coisas não estão muito boas, pelo menos rola uma bitoquinha de xô coisado pro princeso? 😘"; } 
        else if (nivel >= 50 && nivel <= 70) { mensagem = "Opa, estamos no positivo, já é alguma coisa!"; } 
        else if (nivel > 70 && nivel < 100) { mensagem = "xô, xispa, vaza, mete o pé restinho de coisado, vai, se adianta, rala, cata teus paninhos de bunda e deixa minha gostosa"; } 
        else if (nivel === 100) { mensagem = "🎆🎆🎆🎇🎉🎉🎉🎉 PQP, NÃO ACREDITO NISOOOOOOOO, MEU DEUS, CHEGOU O DIAAAAAAAAA, TOQUEM OS SINOS DE BELÉM, AS TROMBETAS DO PARAÍSO, ESSA VITÓRIA É NOSSA, TIMEEEEE"; } 
        else { mensagem = "Parece que você esqueceu de colocar uma porcentagem!"; }
        coisoMessageEl.textContent = mensagem;
        if (desabafoTexto.trim() || !isNaN(nivel)) {
            const dadosParaEnviar = { "form-name": "coisometro", "porcentagem": isNaN(nivel) ? "Não preenchido" : `${nivel}%`, "desabafo": desabafoTexto || "Não preenchido" };
            enviarNotificacao(dadosParaEnviar);
        }
        caixaDesabafo.value = '';
    });


    // --- SEÇÃO DE SUGESTÃO DE LEMBRANÇA ---
    const btnEnviarSugestao = document.getElementById('btn-enviar-sugestao');
    const sugestaoTextarea = document.getElementById('sugestao-textarea');
    const sugestaoFeedbackEl = document.getElementById('sugestao-feedback');
    btnEnviarSugestao.addEventListener('click', () => {
        const sugestaoTexto = sugestaoTextarea.value;
        if (!sugestaoTexto.trim()) {
            sugestaoFeedbackEl.textContent = "Você precisa escrever uma lembrança primeiro, meu amor!";
            return;
        }
        const dadosParaEnviar = { "form-name": "sugestao-lembranca", "sugestao": sugestaoTexto };
        enviarNotificacao(dadosParaEnviar);
        sugestaoTextarea.value = '';
        sugestaoFeedbackEl.textContent = "Lembrança enviada! O princeso vai dar uma olhada com todo o carinho. ❤️";
    });


    // --- SEÇÃO DO CANTINHO DA A LARIETORIEDADE ---
    // Bancos de dados para os sorteios
    const generosMusicais = ["skin rockeira geral", "skin rockeira internacional", "skin rockeira nacional", "skin MPB", "Skin forró", "skin forró internacional", "skin Tocanna", "skin pá god", "skin pop internacional", "skin maezoca valesca", "skin nostálgicas", "skin Baila Hermana", "skin Pink + avril + Maneskin", "skin Bryan behr + avuá"];
    const conteudosParaDormir = ["ASMRs do mozao", "Dra Sandra Lee - o terror dos cravos", "ranguinho brabo", "série que a princesa estiver envolvida", "Modern family", "The office", "mastercheff", "vídeos culinários aleatórios", "desenhos", "art attack", "casimiro", "aqueles caras", "choque de cultura"];
    const debates = ["Biscoito ou bolacha?", "O correto é pingar o leite no cereal ou o cereal no leite?", "Cachorro-quente é com ou sem purê de batata?", "A Terra é o recheio de um sanduíche de espaço?", "Uma lasanha é um bolo salgado?", "Se você espera o inesperado, o inesperado se torna o esperado?", "A humanidade está pronta para o contato alienígena?", "Qual o melhor superpoder: voar ou ficar invisível?", "Pizza com ou sem abacaxi?", "Se o Pinóquio disser 'meu nariz vai crescer agora', o que acontece?", "A sopa é uma bebida?", "É possível chorar debaixo d'água?", "A cor laranja recebeu o nome da fruta ou a fruta recebeu o nome da cor?", "Um canudo tem um ou dois buracos?", "Se você se teletransportasse, a sua versão original morreria?", "O que veio primeiro, o ovo ou a galinha?", "Cachorros usariam calças em duas ou quatro patas?", "Se o tempo é dinheiro, um caixa eletrônico é uma máquina do tempo?", "O cereal é uma sopa?", "Os zumbis devem ter direitos?", "Qual o melhor: filmes ou livros?", "Se você pudesse ter qualquer animal como pet, qual seria?", "É melhor ser o mais inteligente em um grupo de burros ou o mais burro em um grupo de gênios?", "O ketchup deve ser guardado na geladeira ou no armário?", "Um hot dog é um sanduíche?", "O que é mais assustador: o oceano profundo ou o espaço sideral?", "O que é mais importante: talento ou trabalho duro?", "Se você pudesse viver em qualquer universo de ficção, qual seria?", "O correto é dobrar a pizza ou comê-la aberta?", "A tecnologia nos aproxima ou nos afasta?", "Se você pudesse jantar com qualquer pessoa da história, quem seria?", "É melhor ter mais tempo ou mais dinheiro?", "O que é pior: falhar ou nunca tentar?", "As redes sociais são mais benéficas ou prejudiciais?", "A água é molhada?", "Se o Tarzan fosse para a civilização, ele teria que usar terno?", "É melhor saber a data da sua morte ou como você vai morrer?", "A sorte existe?", "O que acontece se um vampiro morder um zumbi?", "O conhecimento é poder?", "Se você pudesse ter um emprego dos sonhos, qual seria?", "O que é mais importante em um relacionamento: amor ou confiança?", "A beleza está nos olhos de quem vê?", "Se você pudesse ter um robô para uma única tarefa, qual seria?", "O que é mais importante: a jornada ou o destino?", "O livre-arbítrio é real ou uma ilusão?", "É possível ser amigo do seu ex?", "Se você pudesse aprender qualquer habilidade instantaneamente, qual seria?", "A vingança é um prato que se come frio?", "O que é mais assustador: fantasmas ou alienígenas?", "A ignorância é uma bênção?", "É melhor amar e perder do que nunca ter amado?", "O que você faria se ganhasse na loteria amanhã?", "O que é mais importante: seguir as regras ou seguir seu coração?", "O que você levaria para uma ilha deserta (3 itens)?", "Se você pudesse mudar uma coisa no mundo, o que seria?", "O que é mais importante: a aparência ou a personalidade?", "É possível ser feliz o tempo todo?", "Se você pudesse voltar no tempo, para qual época iria?", "O que é mais importante: a família que você nasce ou a que você escolhe?", "O que você prefere: nunca mais comer sua comida favorita ou só poder comer sua comida favorita?", "Se você pudesse ter uma conversa de 10 minutos com seu 'eu' de 10 anos atrás, o que diria?", "O que é pior: o calor extremo ou o frio extremo?", "É melhor dar ou receber?", "O que define a 'arte'?", "Se você pudesse ter um mentor, vivo ou morto, quem seria?", "A vida imita a arte ou a arte imita a vida?", "É melhor ter poucos amigos verdadeiros ou muitos conhecidos?", "O que é mais relaxante: o som da chuva ou o som das ondas do mar?", "O que você faria se fosse invisível por um dia?", "O que é mais importante: a verdade, mesmo que dolorosa, ou uma mentira para proteger alguém?", "É melhor viver em uma cidade grande ou no campo?", "O que você prefere: ler mentes ou falar com animais?", "A tecnologia vai salvar ou destruir a humanidade?", "Qual a sua 'linguagem do amor'?", "Se você pudesse eliminar uma palavra do dicionário, qual seria?", "O que é mais importante: a tradição ou a inovação?", "É possível que estejamos vivendo em uma simulação?", "Qual a sua definição de 'sucesso'?", "O que você faria se descobrisse que tem um irmão gêmeo perdido?", "Se você pudesse criar uma nova lei, qual seria?", "Qual a sua opinião mais impopular?", "O que te dá mais medo de envelhecer?", "Qual a sua memória mais feliz da infância?", "Se você pudesse ser um personagem de desenho animado, qual seria?", "O que é mais importante: a liberdade ou a segurança?", "Se você pudesse ter uma trilha sonora para a sua vida, qual seria a música principal?", "Qual a sua maior qualidade e o seu maior defeito?", "O que te deixa mais irritado no trânsito?", "Se você pudesse ter um super-herói como melhor amigo, quem seria?", "Qual a coisa mais corajosa que você já fez?", "O que você faria se encontrasse uma mala de dinheiro na rua?", "O que é mais importante: a razão ou a emoção?"];
    const top3 = ["Top 3 filmes para ver num dia de chuva.", "Top 3 comidas que você levaria para uma ilha deserta.", "Top 3 músicas para cantar no chuveiro.", "Top 3 superpoderes que você gostaria de ter.", "Top 3 lugares no mundo que você quer visitar.", "Top 3 sabores de pizza.", "Top 3 personagens de 'The Office'.", "Top 3 coisas para fazer num domingo à tarde.", "Top 3 animais que você teria como pet (sem limites!).", "Top 3 frutas.", "Top 3 cores.", "Top 3 assuntos para conversar num primeiro encontro.", "Top 3 cheiros que te trazem boas memórias.", "Top 3 coisas que te fazem rir.", "Top 3 bandas de rock de todos os tempos.", "Top 3 momentos da sua vida.", "Top 3 manias que você tem.", "Top 3 apps que você mais usa no celular.", "Top 3 coisas para comprar se você ganhasse na loteria.", "Top 3 defeitos que você acha charmosos em alguém.", "Top 3 qualidades que você mais admira.", "Top 3 sabores de sorvete.", "Top 3 vilões do cinema.", "Top 3 memes da internet.", "Top 3 coisas que te irritam profundamente.", "Top 3 desenhos animados da sua infância.", "Top 3 habilidades inúteis que você tem.", "Top 3 comidas de festa de criança.", "Top 3 coisas que você faria se fosse invisível por um dia.", "Top 3 shows que você gostaria de ir.", "Top 3 livros que todo mundo deveria ler.", "Top 3 formas de relaxar depois de um dia estressante.", "Top 3 piadas ruins.", "Top 3 coisas que não podem faltar na geladeira.", "Top 3 guloseimas.", "Top 3 séries para maratonar.", "Top 3 coisas para fazer antes de morrer.", "Top 3 medos bobos que você tem.", "Top 3 conquistas que você mais se orgulha.", "Top 3 pessoas que te inspiram.", "Top 3 coisas que te deixam otimista.", "Top 3 momentos constrangedores que você já passou.", "Top 3 apelidos que você já teve.", "Top 3 jeitos de tomar café.", "Top 3 coisas para fazer no frio.", "Top 3 coisas para fazer no calor.", "Top 3 filmes que te fizeram chorar.", "Top 3 personagens de 'Modern Family'.", "Top 3 desculpas para não ir à academia.", "Top 3 teorias da conspiração que você acha divertidas.", "Top 3 coisas que você faria se pudesse voltar no tempo.", "Top 3 músicas para uma viagem de carro.", "Top 3 coisas que você aprendeu da maneira mais difícil.", "Top 3 tradições de família que você adora.", "Top 3 presentes que você mais gostou de ganhar.", "Top 3 coisas que você sempre esquece.", "Top 3 programas de TV dos anos 90/2000.", "Top 3 cheiros que você detesta.", "Top 3 YouTubers ou canais que você acompanha.", "Top 3 coisas que você faria se fosse presidente por um dia.", "Top 3 objetivos para o próximo ano.", "Top 3 conselhos que você daria para o seu 'eu' mais novo.", "Top 3 lugares para um encontro romântico.", "Top 3 comidas que você nunca provou, mas tem curiosidade.", "Top 3 talentos que você gostaria de ter.", "Top 3 coisas que te fazem sentir velho(a).", "Top 3 gírias que você mais usa.", "Top 3 coisas que te fazem sentir em casa.", "Top 3 personagens de ficção com quem você seria amigo(a).", "Top 3 formas de estragar um filme.", "Top 3 coisas que te deixam com 'vergonha alheia'.", "Top 3 esportes que você gosta de assistir.", "Top 3 coisas que você não precisaria de dinheiro para fazer.", "Top 3 celebridades com quem você passaria uma tarde.", "Top 3 hábitos que você quer mudar.", "Top 3 coisas que te fazem sentir nostálgico(a).", "Top 3 mentiras que todo mundo conta.", "Top 3 coisas que são superestimadas.", "Top 3 coisas que são subestimadas.", "Top 3 matérias que você mais gostava na escola.", "Top 3 matérias que você mais odiava.", "Top 3 aplicativos que deveriam ser inventados.", "Top 3 invenções que mudaram o mundo.", "Top 3 coisas que te fazem perder a noção do tempo.", "Top 3 resoluções de ano novo que você nunca cumpre.", "Top 3 coisas que te fazem sentir poderoso(a).", "Top 3 coisas que você não entende por que as pessoas gostam.", "Top 3 músicas 'pra sofrer'.", "Top 3 looks que você já usou e hoje tem vergonha.", "Top 3 coisas que te fazem acreditar na humanidade.", "Top 3 coisas que te fazem perder a fé na humanidade.", "Top 3 sons mais satisfatórios.", "Top 3 animais mais fofos.", "Top 3 melhores tipos de abraço.", "Top 3 coisas para se fazer em um dia de tédio."];
    // NOVO BANCO DE DADOS DE CURIOSIDADES
    const curiosidades = ["O coração de um camarão fica na sua cabeça.", "É impossível criar uma pasta chamada 'CON' no Windows.", "A pele é o maior órgão do corpo humano.", "O som de um pato não produz eco e ninguém sabe o porquê.", "Os elefantes são os únicos animais que não conseguem pular.", "Uma formiga pode levantar 50 vezes o seu próprio peso.", "O olho de um avestruz é maior do que o seu cérebro.", "As estrelas-do-mar não têm cérebro.", "A maioria dos batons contém escamas de peixe.", "O medo de ficar sem o celular é chamado de 'nomofobia'.", "A Mona Lisa não tem sobrancelhas.", "O mel é o único alimento que não se estraga.", "Os caracóis podem dormir por três anos.", "O Oceano Atlântico é mais salgado que o Pacífico.", "Um raio pode ser 5 vezes mais quente que a superfície do Sol.", "O cérebro humano pesa cerca de 1,4 kg.", "A Terra pesa aproximadamente 6 sextilhões de toneladas.", "A Coca-Cola originalmente era verde.", "As borboletas sentem o gosto com os pés.", "Um grupo de corujas é chamado de 'parlamento'.", "Os bebês nascem com cerca de 300 ossos, mas os adultos têm 206.", "A língua de uma baleia azul pesa tanto quanto um elefante adulto.", "Os ratos riem quando lhes fazem cócegas.", "As abelhas conseguem reconhecer rostos humanos.", "A maioria do pó da sua casa é pele morta.", "O corpo humano tem mais de 96.000 km de vasos sanguíneos.", "A água quente congela mais rápido que a água fria (efeito Mpemba).", "O Sol representa 99.86% da massa total do nosso sistema solar.", "A Arábia Saudita importa camelos da Austrália.", "É mais provável ser morto por um coco do que por um tubarão.", "O cérebro humano gera cerca de 12-25 watts de eletricidade.", "Os flamingos são rosa por causa dos pigmentos dos crustáceos que comem.", "Os polvos têm sangue azul.", "As formigas se espreguiçam pela manhã quando acordam.", "A Antártida é o maior deserto do mundo.", "Os esquilos esquecem onde esconderam metade de suas nozes.", "O dente humano é a única parte do corpo que não consegue se curar sozinha.", "A caixinha preta dos aviões é, na verdade, laranja.", "A palavra 'cemitério' vem do grego e significa 'dormitório'.", "A primeira laranja do mundo não era laranja, era verde.", "Os coalas têm impressões digitais quase idênticas às humanas.", "O som mais alto já registrado na história foi a erupção do vulcão Krakatoa.", "O nome original do Pac-Man era Puck-Man.", "A Nutella foi inventada durante a Segunda Guerra Mundial.", "Os gatos não conseguem sentir o sabor doce.", "O isqueiro foi inventado antes do fósforo.", "O seu estômago produz um novo revestimento a cada três dias.", "A Estátua da Liberdade era originalmente da cor do cobre.", "Um 'jiffy' é uma unidade de tempo real que equivale a 1/100 de segundo.", "A palavra 'abacate' vem de uma palavra asteca que significa 'testículo'.", "As girafas não têm cordas vocais.", "O nome completo da Barbie é Barbara Millicent Roberts.", "Os morcegos são os únicos mamíferos capazes de voar.", "O cérebro é mais ativo durante a noite do que durante o dia.", "Os humanos compartilham 50% de seu DNA com as bananas.", "Um grupo de corvos é chamado de 'assassinato' (murder).", "O músculo mais forte do corpo humano é a língua.", "As impressões do nariz de um cão são únicas, como as digitais humanas.", "Os gatos dormem em média 70% de suas vidas.", "As cabras têm pupilas retangulares.", "O medo de palavras longas é 'hipopotomonstrosesquipedaliofobia'.", "O pica-pau pode bicar 20 vezes por segundo.", "A maioria das vacas produz mais leite quando ouve música clássica.", "Os peixes-dourados conseguem se lembrar de coisas por até 5 meses.", "O nome original do Google era 'Backrub'.", "Os cangurus não conseguem andar para trás.", "A Islândia não tem mosquitos.", "O material mais resistente conhecido na biologia é a teia de aranha.", "A palavra 'nerd' foi usada pela primeira vez no livro 'Se Eu Dirigisse o Zoológico' do Dr. Seuss.", "O coração humano bate mais de 100.000 vezes por dia.", "O Tiranossauro Rex viveu mais perto da era dos humanos do que da era do Estegossauro.", "Os golfinhos dão nomes uns aos outros.", "A goma de mascar aumenta o fluxo sanguíneo para o cérebro.", "O Vaticano tem o caixa eletrônico com instruções em latim.", "Os astronautas não conseguem arrotar no espaço.", "Ovelhas conseguem reconhecer até 50 rostos diferentes de outras ovelhas.", "Os cavalos-marinhos são os únicos animais onde o macho dá à luz.", "O nome 'Bluetooth' vem de um rei viking do século X.", "A palavra 'emoji' vem do japonês para 'imagem' (e) + 'personagem' (moji).", "As vacas-marinhas (peixes-boi) são parentes próximos dos elefantes.", "O nome original do Twitter era 'twttr'.", "As lontras do mar têm um bolsinho na pele para guardar sua pedra favorita.", "A clepsidra é um dos relógios mais antigos.", "Os bicho-preguiça podem prender a respiração por mais tempo que os golfinhos.", "Os primeiros óculos de sol foram inventados na China para que os juízes escondessem suas emoções.", "A palavra 'quarentena' vem do italiano 'quaranta giorni', os 40 dias que os navios ficavam isolados.", "O corpo humano contém ferro suficiente para fazer um prego de 7 cm.", "O nome 'Alasca' significa 'grande terra' na língua dos Aleutas.", "As abelhas têm pelos nos olhos.", "Um espirro viaja a cerca de 160 km/h.", "O nome 'Jeep' veio da pronúncia da sigla 'GP' (General Purpose vehicle).", "A Torre de Pisa nunca esteve reta.", "As formigas não têm pulmões.", "Os bigodes de um gato são tão largos quanto seu corpo para ajudá-lo a medir passagens.", "A palavra 'sniper' (atirador de elite) vem do ato de caçar um pássaro pequeno e rápido chamado 'snipe'.", "As cenouras eram originalmente roxas.", "O som que você ouve ao colocar uma concha no ouvido não é o oceano, mas o som do seu próprio sangue.", "O nome do robô R2-D2 de Star Wars veio de uma gíria de editores de som.", "A palavra 'deadline' (prazo final) se originou nas prisões da Guerra Civil americana.", "O músculo que nos permite piscar é o mais rápido do corpo.", "O nome 'whisky' significa 'água da vida' em gaélico.", "O nome 'Wi-Fi' não significa nada; foi uma jogada de marketing.", "O nome 'LEGO' vem da frase dinamarquesa 'leg godt', que significa 'brincar bem'.", "Os escorpiões podem brilhar no escuro sob luz ultravioleta.", "O nome 'Adidas' vem do nome do seu fundador, Adolf 'Adi' Dassler.", "O nome 'Nike' vem da deusa grega da vitória.", "O nome 'Amazon' foi escolhido porque começava com 'A' e sugeria escala (como o rio Amazonas).", "Os gatos não podem descer de árvores de cabeça para baixo por causa da direção de suas garras.", "As águas-vivas são compostas por 95% de água.", "O nome 'Starbucks' vem de um personagem do livro Moby Dick.", "As bananas são, botanicamente, bagas (berries).", "Os morangos, botanicamente, não são bagas.", "A palavra 'robô' vem de uma palavra tcheca 'robota', que significa 'trabalho forçado'.", "Os pinguins se propõem em casamento oferecendo a melhor pedrinha.", "O nome 'Wendy' foi inventado para a peça Peter Pan.", "O nome 'spam' (para e-mails indesejados) vem de um esquete do Monty Python.", "Os camelos têm três pálpebras para se protegerem da areia.", "O nome 'IKEA' é um acrônimo com as iniciais do fundador, da fazenda onde ele cresceu e da sua cidade natal.", "As girafas limpam seus próprios ouvidos com suas línguas de 50 cm.", "O nome 'Coreia' vem de 'Goryeo', um reino antigo.", "Os gatos têm mais de 20 músculos para controlar suas orelhas.", "O nome 'Google' veio de um erro de digitação da palavra 'googol' (o número 1 seguido de 100 zeros).", "A palavra 'abracadabra' foi originalmente usada para curar febres.", "O nome 'ASICS' é um acrônimo para a frase latina 'Anima Sana In Corpore Sano'.", "As libélulas têm seis pernas, mas não conseguem andar.", "O nome 'Yahoo!' é um acrônimo para 'Yet Another Hierarchical Officious Oracle'.", "As vacas matam mais pessoas por ano do que os tubarões.", "O nome 'Sony' vem da palavra latina 'sonus' (som) e da gíria inglesa 'sonny boy'.", "Os tubarões são imunes a quase todas as doenças conhecidas.", "O nome 'Pepsi' vem do nome da enzima digestiva 'pepsina'.", "As formigas saúdam umas às outras tocando suas antenas.", "O nome 'Rolex' foi escolhido porque soava bem em qualquer língua.", "Os bebês têm mais papilas gustativas que os adultos.", "O nome 'Volkswagen' significa 'carro do povo' em alemão.", "Os crocodilos não conseguem pôr a língua para fora.", "O nome 'Zara' era originalmente 'Zorba', mas já existia um bar com esse nome na mesma rua.", "Os ursos polares têm a pele preta por baixo do pelo branco."];
    
    // Captura dos elementos e adição dos eventos
    const btnMusica = document.getElementById('btn-musica');
    const resultadoMusica = document.getElementById('resultado-musica');
    const btnDormir = document.getElementById('btn-dormir');
    const resultadoDormir = document.getElementById('resultado-dormir');
    const btnDebate = document.getElementById('btn-debate');
    const resultadoDebate = document.getElementById('resultado-debate');
    const btnTop3 = document.getElementById('btn-top3');
    const resultadoTop3 = document.getElementById('resultado-top3');
    const btnCuriosidade = document.getElementById('btn-curiosidade');
    const resultadoCuriosidade = document.getElementById('resultado-curiosidade');
    
    // A função de sorteio que será usada por vários botões
    const mostrarResultadoAleatorio = (lista, elemento) => { const indiceAleatorio = Math.floor(Math.random() * lista.length); elemento.textContent = lista[indiceAleatorio]; };
    
    btnMusica.addEventListener('click', () => mostrarResultadoAleatorio(generosMusicais, resultadoMusica));
    btnDormir.addEventListener('click', () => mostrarResultadoAleatorio(conteudosParaDormir, resultadoDormir));
    btnDebate.addEventListener('click', () => mostrarResultadoAleatorio(debates, resultadoDebate));
    btnTop3.addEventListener('click', () => mostrarResultadoAleatorio(top3, resultadoTop3));
    // ATIVAÇÃO CORRETA DO BOTÃO DE CURIOSIDADES
    btnCuriosidade.addEventListener('click', () => mostrarResultadoAleatorio(curiosidades, resultadoCuriosidade));


    // --- SEÇÃO DO CANTINHO DAS COMPOSIÇÕES ---
    const btnPlayMeuLugar = document.getElementById('play-meu-lugar');
    const btnPlayPortaRetrato = document.getElementById('play-porta-retrato');
    const audioMeuLugar = document.getElementById('audio-meu-lugar');
    const audioPortaRetrato = document.getElementById('audio-porta-retrato');
    btnPlayMeuLugar.addEventListener('click', () => {
        audioPortaRetrato.pause();
        audioPortaRetrato.currentTime = 0;
        if (audioMeuLugar.paused) { audioMeuLugar.play(); } else { audioMeuLugar.pause(); }
    });
    btnPlayPortaRetrato.addEventListener('click', () => {
        audioMeuLugar.pause();
        audioMeuLugar.currentTime = 0;
        if (audioPortaRetrato.paused) { audioPortaRetrato.play(); } else { audioPortaRetrato.pause(); }
    });


    // --- SEÇÃO DO RODAPÉ ---
    document.getElementById('coracao-footer').addEventListener('click', () => {
        document.getElementById('coracao-feedback').textContent = 'Você é meu lugar favorito no mundo ❤️';
    });


    // --- AJUSTE FINAL DE EXPERIÊNCIA DO USUÁRIO ---
    // Este é o último comando a ser executado, revelando a página.
    document.body.classList.remove('loading');
// --- Início da Seção para Substituir ---

// --- SEÇÃO DO CANTINHO DOS MEMES (VERSÃO ROLETA CORRIGIDA) ---
    const youtubePlayer = document.getElementById('youtube-player');
    const btnRoletaMeme = document.getElementById('btn-roleta-meme');
    const memeLinks = [
        'https://youtube.com/shorts/wjmEYCaR5hI?si=ElzXO1CD6FpwYUiv',
        'https://www.youtube.com/watch?v=DcZHkFBLGZc',
        'https://www.youtube.com/watch?v=YCsg_It_-Q8',
        'https://www.youtube.com/watch?v=yp6lJSFmMMc',
        'https://youtu.be/GjvQR4pfjEI?si=4OKraSjO6MgKaV2K',
        'https://youtu.be/UmY3DcMuFho?si=6P9G0H5CB0DgFOt0',
        'https://youtu.be/Jbz9u1FxlyA?si=FjkSRYw2DRnpsvxi',
        'https://youtu.be/Bw35fqhzpi4?si=uHcWDdo-tpHW8USs',
        'https://youtu.be/_RI9jjH9Tcg?si=ncZ1n915qalzsWfy',
        'https://youtu.be/8QmOVkN4qsw?si=O7geayeIQyy7-Q3k',
        'https://youtu.be/DAHPY_C85yU?si=8Tcv4yNSukJ3rY2G',
        'https://youtu.be/pmn-dbBpglU?si=dEYTyXYszZnjHGRo',
        'https://youtu.be/eNR-9C1xF8w?feature=shared',
        'https://youtu.be/62RlLoAnb-Q?si=3uJF0Owc8CAmDGkL',
        'https://youtu.be/U9CXtycJz_g?si=G9Syfyuf16rjyL3S',
        'https://youtu.be/18hhUcqX3P8?si=sXHSFgiUuGFkKgRs',
        'https://youtu.be/bG1w8JkcPUo?si=FbIigkIExApaB91g',
        'https://youtu.be/YpPkV7Zrhb0?si=GacW2HkM78fhYk98',
        'https://youtu.be/vOQnw7-3msQ?si=HHU1sKqtgZxthwH6',
        'https://youtu.be/zjprgAe_BbM?si=GRC4CovrFjbNVypG',
        'https://youtu.be/c_yg_OU0AnI?si=xEDgP-Dbk5DX3I-Q', // Aqui começa palavra trocada
        'https://youtu.be/sfAL4NPqWik?si=W_ctrGKKphdO0GaI',
        'https://youtu.be/GU4FoMqxau8?si=Toz_kfKGNyVMHuE6',
        'https://youtu.be/lXYXNrT8094?si=lWCWFcKcL4QeDaek',
        'https://youtu.be/2xc45CGDHDw?si=IxjS6TPyZHlWZQ5X',
        'https://youtu.be/hynijdbVjEg?si=VD0haLRPhQ0QFRD4',
        'https://youtu.be/VjuSkj6Cr-Y?si=rAMgog8uSPM-zIPW',
        'https://youtu.be/Kz2WjqV9Dc8?si=shCXikDtaKeJwubX',
        'https://youtu.be/Cd5dvwhxxKk?si=W8sGn-TN5hSCZIi5',
        'https://youtu.be/9Bg75kT_tCw?si=qL1yThQ8kkNsOjkC',
        'https://youtu.be/L93v779k3bg?si=1SZparLovftJiK-E',
        'https://youtu.be/gCfM9oE9loE?si=HjgHFaymM3rEYHyZ',
        'https://youtu.be/LgRqYh7Aivg?si=o0-EQDPgTdMOgiO-',
        'https://www.youtube.com/watch?v=GI3rKNjQQig',
        'https://www.youtube.com/shorts/JYypuI73kiU' // Vídeo de teste que sabemos que funciona
    ];
    function extrairIdDoYoutube(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
    btnRoletaMeme.addEventListener('click', () => {
        const linkSorteado = memeLinks[Math.floor(Math.random() * memeLinks.length)];
        const videoId = extrairIdDoYoutube(linkSorteado);
        if (videoId) {
            const novaUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&origin=https://antinhodalari.blog.br`;
            youtubePlayer.src = novaUrl;
        } else {
            console.error("Não foi possível extrair o ID do vídeo do link:", linkSorteado);
        }
    });

// --- Fim da Seção para Substituir ---
});
