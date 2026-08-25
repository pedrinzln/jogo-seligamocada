/* =========================================================
   ENTRE LINHAS
   SE LIGA MOÇADA 2026
========================================================= */


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const STORAGE_KEY = "jogoViolenciaDomestica";


/* =========================================================
   ELEMENTOS
========================================================= */

const startScreen =
    document.getElementById("start-screen");

const startButton =
    document.getElementById("start-button");

const messagesContainer =
    document.getElementById("messages");

const choicesContainer =
    document.getElementById("choices");

const restartButton =
    document.getElementById("restart-button");

const creditsScreen =
    document.getElementById("credits-screen");

const creditsOpenButton =
    document.getElementById("credits-open-button");

const startCreditsButton =
    document.getElementById("start-credits-button");

const closeCredits =
    document.getElementById("close-credits");

const conversationElements =
    document.querySelectorAll(".conversation");

const searchInput =
    document.getElementById("search-input");

const chatName =
    document.getElementById("chat-name");

const chatAvatar =
    document.getElementById("chat-avatar");

const chatStatus =
    document.getElementById("chat-status");

const lucasPreview =
    document.getElementById("lucas-preview");

const anaPreview =
    document.getElementById("ana-preview");


/* =========================================================
   ESTADO PADRÃO
========================================================= */

const defaultState = {

    started: false,

    currentChat: "lucas",

    lucasNode: 0,
    anaNode: 0,

    lucasChoices: [],
    anaChoices: [],

    lucasFinished: false,
    anaFinished: false,

    quizFinished: false,
    quizScore: 0,
    quizQuestion: 0
};


/* =========================================================
   CARREGAR ESTADO
========================================================= */

function loadState() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {

            return {
                ...defaultState,
                lucasChoices: [],
                anaChoices: []
            };
        }

        const parsed =
            JSON.parse(saved);

        return {

            ...defaultState,
            ...parsed,

            lucasChoices:
                Array.isArray(parsed.lucasChoices)
                    ? parsed.lucasChoices
                    : [],

            anaChoices:
                Array.isArray(parsed.anaChoices)
                    ? parsed.anaChoices
                    : []
        };

    } catch (error) {

        console.error(
            "Erro ao carregar o jogo:",
            error
        );

        return {
            ...defaultState,
            lucasChoices: [],
            anaChoices: []
        };
    }
}


/* =========================================================
   ESTADO
========================================================= */

let gameState = loadState();


/* =========================================================
   SALVAR
========================================================= */

function saveState() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(gameState)
    );
}


/* =========================================================
   DIÁLOGO DO LUCAS
========================================================= */

const lucasDialogue = [

    {
        sender: "received",
        text: "Chegou em casa?",
        time: "21:47",
        choices: [
            {
                text: "Cheguei sim. Por quê?",
                next: 1
            },
            {
                text: "Ainda não, estou chegando.",
                next: 1
            },
            {
                text: "Cheguei. Estava conversando com o pessoal.",
                next: 1
            }
        ]
    },

    {
        sender: "received",
        text: "Nada. Só queria saber. Você podia ter avisado quando saiu.",
        time: "21:48",
        choices: [
            {
                text: "Foi mal, acabei esquecendo.",
                next: 2
            },
            {
                text: "Eu não sabia que precisava avisar toda vez.",
                next: 2
            },
            {
                text: "Eu estava ocupada, Lucas.",
                next: 2
            }
        ]
    },

    {
        sender: "received",
        text: "Não custa mandar uma mensagem. Eu fico preocupado quando você some.",
        time: "21:49",
        choices: [
            {
                text: "Entendi. Na próxima eu aviso.",
                next: 3
            },
            {
                text: "Você não precisa se preocupar tanto.",
                next: 3
            },
            {
                text: "Eu estava com minhas amigas, não aconteceu nada.",
                next: 3
            }
        ]
    },

    {
        sender: "received",
        text: "E quem estava com você?",
        time: "21:50",
        choices: [
            {
                text: "A Ana e o pessoal da faculdade.",
                next: 4
            },
            {
                text: "Só algumas pessoas.",
                next: 4
            },
            {
                text: "Por que você quer saber?",
                next: 4
            }
        ]
    },

    {
        sender: "received",
        text: "Tinha algum menino junto?",
        time: "21:51",
        choices: [
            {
                text: "Tinha algumas pessoas, mas nada demais.",
                next: 5
            },
            {
                text: "Lucas, eu estava com meus amigos.",
                next: 5
            },
            {
                text: "Você está com ciúmes?",
                next: 5
            }
        ]
    },

    {
        sender: "received",
        text: "Eu só acho estranho você ficar tão próxima de outros caras. Você sabe que eu não gosto.",
        time: "21:52",
        choices: [
            {
                text: "Eu entendo que você possa sentir ciúmes, mas não fiz nada.",
                next: 6
            },
            {
                text: "Tá bom. Vou tentar evitar.",
                next: 6
            },
            {
                text: "Você precisa confiar em mim.",
                next: 6
            }
        ]
    },

    {
        sender: "received",
        text: "Me manda sua localização quando sair amanhã.",
        time: "21:53",
        choices: [
            {
                text: "Por quê?",
                next: 7
            },
            {
                text: "Tá, eu mando.",
                next: 7
            },
            {
                text: "Não acho necessário.",
                next: 7
            }
        ]
    },

    {
        sender: "received",
        text: "Porque eu quero saber onde você está. Se a gente namora, não vejo problema nisso.",
        time: "21:54",
        choices: [
            {
                text: "Mas eu também preciso ter minha privacidade.",
                next: 8
            },
            {
                text: "Tudo bem, vou mandar.",
                next: 8
            },
            {
                text: "Acho que confiança não deveria depender disso.",
                next: 8
            }
        ]
    },

    {
        sender: "received",
        text: "E amanhã você vai sair com a Ana de novo?",
        time: "21:55",
        choices: [
            {
                text: "Sim. A gente combinou de estudar.",
                next: 9
            },
            {
                text: "Ainda não sei.",
                next: 9
            },
            {
                text: "Por que você pergunta?",
                next: 9
            }
        ]
    },

    {
        sender: "received",
        text: "Não gosto muito dela. Depois que você começou a andar com ela, parece que tudo virou problema entre nós.",
        time: "21:56",
        choices: [
            {
                text: "Ela só tenta me ajudar quando eu preciso.",
                next: 10
            },
            {
                text: "Talvez seja melhor eu falar menos com ela.",
                next: 10
            },
            {
                text: "Você não precisa gostar dela.",
                next: 10
            }
        ]
    },

    {
        sender: "received",
        text: "E outra coisa... aquela roupa que você postou ontem. Não gostei.",
        time: "21:57",
        choices: [
            {
                text: "Era só uma roupa, Lucas.",
                next: 11
            },
            {
                text: "Desculpa. Eu não pensei que você fosse ficar incomodado.",
                next: 11
            },
            {
                text: "Eu gosto daquela roupa.",
                next: 11
            }
        ]
    },

    {
        sender: "received",
        text: "Você sabe que chama atenção. Eu não quero minha namorada se exibindo por aí.",
        time: "21:58",
        choices: [
            {
                text: "Eu posso escolher minhas próprias roupas.",
                next: 12
            },
            {
                text: "Tá bom. Não vou usar mais.",
                next: 12
            },
            {
                text: "Não acho justo você decidir isso.",
                next: 12
            }
        ]
    },

    {
        sender: "received",
        text: "Você sempre faz parecer que eu sou o errado. Eu só faço isso porque amo você.",
        time: "21:59",
        choices: [
            {
                text: "Eu sei que você gosta de mim, mas isso não torna tudo certo.",
                next: 13
            },
            {
                text: "Talvez eu esteja exagerando mesmo.",
                next: 13
            },
            {
                text: "Eu não quero discutir.",
                next: 13
            }
        ]
    },

    {
        sender: "received",
        text: "Depois você reclama que eu fico nervoso. Se você colaborasse, seria tudo mais fácil.",
        time: "22:00",
        choices: [
            {
                text: "Eu não sou responsável pelo seu comportamento.",
                next: 14
            },
            {
                text: "Desculpa. Não quero te deixar nervoso.",
                next: 14
            },
            {
                text: "Vamos conversar quando estivermos mais tranquilos.",
                next: 14
            }
        ]
    },

    {
        sender: "received",
        text: "Inclusive, lembra daquele dinheiro que você tinha guardado?",
        time: "22:01",
        choices: [
            {
                text: "Lembro. Por quê?",
                next: 15
            },
            {
                text: "Sim. O que aconteceu?",
                next: 15
            },
            {
                text: "Por que você quer saber?",
                next: 15
            }
        ]
    },

    {
        sender: "received",
        text: "Eu estou precisando. Você podia me emprestar. Afinal, a gente está junto.",
        time: "22:02",
        choices: [
            {
                text: "Posso ajudar se eu puder, mas o dinheiro é meu.",
                next: 16
            },
            {
                text: "Tá bom. Quanto você precisa?",
                next: 16
            },
            {
                text: "Não acho certo você cobrar isso de mim.",
                next: 16
            }
        ]
    },

    {
        sender: "received",
        text: "Se você realmente confiasse em mim, não ficaria fazendo tanta pergunta.",
        time: "22:03",
        choices: [
            {
                text: "Confiança não significa aceitar qualquer coisa.",
                next: 17
            },
            {
                text: "Tá bom, eu confio em você.",
                next: 17
            },
            {
                text: "Eu só quero entender.",
                next: 17
            }
        ]
    },

    {
        sender: "received",
        text: "Às vezes eu penso que você não precisa mais de mim.",
        time: "22:04",
        choices: [
            {
                text: "Eu me importo com você, mas isso não significa abrir mão de mim.",
                next: 18
            },
            {
                text: "Claro que preciso de você.",
                next: 18
            },
            {
                text: "Não fala assim.",
                next: 18
            }
        ]
    },

    {
        sender: "received",
        text: "Se você me deixar, eu não sei o que vou fazer. Você é a única pessoa que eu tenho.",
        time: "22:05",
        choices: [
            {
                text: "Isso não pode ser colocado como responsabilidade minha.",
                next: 19
            },
            {
                text: "Eu nunca vou te deixar.",
                next: 19
            },
            {
                text: "Lucas, você também precisa ter outras pessoas por perto.",
                next: 19
            }
        ]
    },

    {
        sender: "received",
        text: "Esquece. Boa noite. Depois a gente conversa.",
        time: "22:06",
        choices: []
    }

];


/* =========================================================
   DIÁLOGO DA ANA
========================================================= */

const anaDialogue = [

    {
        sender: "received",
        text: "Carol, você está bem?",
        time: "20:12",
        choices: [
            {
                text: "Estou. Por quê?",
                next: 1
            },
            {
                text: "Mais ou menos.",
                next: 1
            },
            {
                text: "Aconteceu alguma coisa?",
                next: 1
            }
        ]
    },

    {
        sender: "received",
        text: "Você anda diferente ultimamente. Parece que está sempre preocupada em não deixar o Lucas bravo.",
        time: "20:13",
        choices: [
            {
                text: "Às vezes ele fica bravo mesmo.",
                next: 2
            },
            {
                text: "Eu só quero evitar discussão.",
                next: 2
            },
            {
                text: "Talvez seja impressão sua.",
                next: 2
            }
        ]
    },

    {
        sender: "received",
        text: "Mas você sente que precisa pensar duas vezes antes de fazer alguma coisa por causa da reação dele?",
        time: "20:14",
        choices: [
            {
                text: "Às vezes.",
                next: 3
            },
            {
                text: "Sim, bastante.",
                next: 3
            },
            {
                text: "Nunca tinha pensado assim.",
                next: 3
            }
        ]
    },

    {
        sender: "received",
        text: "E aquela história de ele querer saber onde você está o tempo todo?",
        time: "20:15",
        choices: [
            {
                text: "Ele diz que é preocupação.",
                next: 4
            },
            {
                text: "Ele pede minha localização.",
                next: 4
            },
            {
                text: "Ele fica perguntando com quem estou.",
                next: 4
            }
        ]
    },

    {
        sender: "received",
        text: "Preocupação é uma coisa. Controle é outra. Você consegue perceber a diferença?",
        time: "20:16",
        choices: [
            {
                text: "Acho que estou começando a perceber.",
                next: 5
            },
            {
                text: "Ainda não sei.",
                next: 5
            },
            {
                text: "Talvez eu tenha normalizado algumas coisas.",
                next: 5
            }
        ]
    },

    {
        sender: "received",
        text: "E não precisa parar de falar comigo para evitar problemas com ele, tá?",
        time: "20:17",
        choices: [
            {
                text: "Obrigada por falar isso.",
                next: 6
            },
            {
                text: "Eu estava com medo de você achar estranho.",
                next: 6
            },
            {
                text: "Eu sinto falta de conversar normalmente.",
                next: 6
            }
        ]
    },

    {
        sender: "received",
        text: "Você não precisa escolher entre seus amigos e seu relacionamento.",
        time: "20:18",
        choices: [
            {
                text: "Eu acho que estava começando a me afastar de todo mundo.",
                next: 7
            },
            {
                text: "É verdade.",
                next: 7
            },
            {
                text: "Nunca tinha percebido isso.",
                next: 7
            }
        ]
    },

    {
        sender: "received",
        text: "E sobre suas roupas? Ele também comenta?",
        time: "20:19",
        choices: [
            {
                text: "Sim. Ele diz que algumas roupas chamam atenção.",
                next: 8
            },
            {
                text: "Às vezes ele fala que não gosta.",
                next: 8
            },
            {
                text: "Ele quer escolher algumas coisas.",
                next: 8
            }
        ]
    },

    {
        sender: "received",
        text: "Carol, você percebe como essas coisas estão se acumulando?",
        time: "20:20",
        choices: [
            {
                text: "Agora estou percebendo.",
                next: 9
            },
            {
                text: "Sim. Acho que eu estava tentando justificar tudo.",
                next: 9
            },
            {
                text: "Estou começando a entender.",
                next: 9
            }
        ]
    },

    {
        sender: "received",
        text: "Você não é responsável pelas escolhas e reações dele.",
        time: "20:21",
        choices: [
            {
                text: "Eu precisava ouvir isso.",
                next: 10
            },
            {
                text: "Eu sempre achei que precisava evitar deixá-lo bravo.",
                next: 10
            },
            {
                text: "Faz sentido.",
                next: 10
            }
        ]
    },

    {
        sender: "received",
        text: "Um relacionamento saudável precisa ter respeito, confiança, liberdade e espaço para cada pessoa ser quem é.",
        time: "20:22",
        choices: [
            {
                text: "Eu quero começar a pensar mais nisso.",
                next: 11
            },
            {
                text: "Acho que eu estava confundindo cuidado com controle.",
                next: 11
            },
            {
                text: "Obrigada por não desistir de conversar comigo.",
                next: 11
            }
        ]
    },

    {
        sender: "received",
        text: "Nunca vou te julgar por precisar de ajuda. Você não precisa passar por isso sozinha.",
        time: "20:23",
        choices: []
    }

];


/* =========================================================
   QUIZ
========================================================= */

const quizQuestions = [

    {
        question:
            "Lucas querer saber onde Carol está o tempo todo é apenas uma demonstração de carinho?",

        answer: false,

        explanation:
            "Não necessariamente. Quando a preocupação vira cobrança constante, monitoramento ou exigência de localização, pode ser um comportamento de controle."
    },

    {
        question:
            "Uma pessoa pode escolher suas próprias roupas sem precisar da autorização do parceiro?",

        answer: true,

        explanation:
            "Sim. Cada pessoa deve ter autonomia sobre sua aparência e suas escolhas pessoais."
    },

    {
        question:
            "Evitar amigos para não deixar o parceiro com ciúmes pode ser um sinal de isolamento?",

        answer: true,

        explanation:
            "Sim. O afastamento de amigos e familiares pode ser uma forma de isolamento dentro de uma relação abusiva."
    },

    {
        question:
            "Dizer 'eu faço isso porque amo você' torna automaticamente um comportamento de controle aceitável?",

        answer: false,

        explanation:
            "Não. Uma justificativa de amor não transforma controle, manipulação ou desrespeito em comportamento saudável."
    },

    {
        question:
            "Cada pessoa continua tendo direito à privacidade mesmo estando em um relacionamento?",

        answer: true,

        explanation:
            "Sim. Um relacionamento saudável envolve confiança, respeito e preservação da individualidade."
    },

    {
        question:
            "Carol é responsável por evitar que Lucas fique bravo?",

        answer: false,

        explanation:
            "Não. Cada pessoa é responsável pelas próprias emoções e comportamentos. Carol não deve carregar a responsabilidade pelas reações de Lucas."
    }

];


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeGame
);


function initializeGame() {

    setupEvents();

    updateConversationPreviews();

    updateActiveConversation();

    if (gameState.started) {

        hideStartScreen();

        renderCurrentChat();

    } else {

        showStartScreen();

        renderCurrentChat();
    }
}


/* =========================================================
   EVENTOS
========================================================= */

function setupEvents() {

    /* =====================================================
       BOTÃO INICIAR
    ===================================================== */

    if (startButton) {
        startButton.addEventListener(
            "click",
            startGame
        );
    }


    /* =====================================================
       REINICIAR
    ===================================================== */

    if (restartButton) {
        restartButton.addEventListener(
            "click",
            restartGame
        );
    }


    /* =====================================================
       CRÉDITOS
    ===================================================== */

    const creditsButtons = document.querySelectorAll(
        "#credits-open-button, #start-credits-button, #credits-button"
    );

    creditsButtons.forEach(button => {

        button.addEventListener(
            "click",
            openCredits
        );

    });


    /* =====================================================
       FECHAR CRÉDITOS
    ===================================================== */

    if (closeCredits) {

        closeCredits.addEventListener(
            "click",
            closeCreditsScreen
        );

    }


    /* =====================================================
       FECHAR CLICANDO FORA DA JANELA
    ===================================================== */

    if (creditsScreen) {

        creditsScreen.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === creditsScreen
                ) {
                    closeCreditsScreen();
                }

            }
        );

    }


    /* =====================================================
       CONVERSAS
    ===================================================== */

    conversationElements.forEach(
        conversation => {

            conversation.addEventListener(
                "click",
                function () {

                    const chat =
                        conversation.dataset.chat;

                    switchChat(chat);

                }
            );

        }
    );


    /* =====================================================
       BUSCA
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterConversations
        );

    }

}


/* =========================================================
   COMEÇAR
========================================================= */

function startGame() {

    gameState.started = true;

    gameState.currentChat = "lucas";

    saveState();

    hideStartScreen();

    updateActiveConversation();

    renderCurrentChat();
}


/* =========================================================
   TELA INICIAL
========================================================= */

function hideStartScreen() {

    if (startScreen) {

        startScreen.classList.add(
            "hidden"
        );
    }
}


function showStartScreen() {

    if (startScreen) {

        startScreen.classList.remove(
            "hidden"
        );
    }
}


/* =========================================================
   TROCAR CONVERSA
========================================================= */

function switchChat(chat) {

    if (!gameState.started) {

        return;
    }

    if (
        chat !== "lucas" &&
        chat !== "ana"
    ) {

        return;
    }

    gameState.currentChat = chat;

    saveState();

    updateActiveConversation();

    renderCurrentChat();
}


function updateActiveConversation() {

    conversationElements.forEach(
        element => {

            element.classList.toggle(
                "active",
                element.dataset.chat ===
                gameState.currentChat
            );
        }
    );
}


/* =========================================================
   RENDERIZAR CHAT ATUAL
========================================================= */

function renderCurrentChat() {

    updateChatHeader();

    clearMessages();

    choicesContainer.innerHTML = "";

    if (
        gameState.currentChat ===
        "lucas"
    ) {

        renderLucas();

    } else {

        renderAna();
    }
}


/* =========================================================
   CABEÇALHO DO CHAT
========================================================= */

function updateChatHeader() {

    if (
        gameState.currentChat ===
        "lucas"
    ) {

        chatName.textContent =
            "Lucas meu amor ❤";

        chatAvatar.textContent =
            "L";

        chatAvatar.className =
            "avatar avatar-lucas";

        chatStatus.textContent =
            "online";

    } else {

        chatName.textContent =
            "Ana melhor amiga ❤";

        chatAvatar.textContent =
            "A";

        chatAvatar.className =
            "avatar avatar-friend";

        chatStatus.textContent =
            "online";
    }
}


/* =========================================================
   LIMPAR MENSAGENS
========================================================= */

function clearMessages() {

    messagesContainer.innerHTML = `
        <div class="date-divider">
            <span>Hoje</span>
        </div>
    `;
}


/* =========================================================
   RENDERIZAR HISTÓRICO DO LUCAS
========================================================= */

function renderLucas() {

    const node =
        Math.min(
            gameState.lucasNode,
            lucasDialogue.length
        );

    const choices =
        gameState.lucasChoices || [];


    /*
        Renderiza cada mensagem recebida
        apenas uma vez.

        Depois dela, renderiza a resposta
        escolhida pelo jogador.
    */

    for (
        let i = 0;
        i < node;
        i++
    ) {

        const dialogue =
            lucasDialogue[i];

        if (!dialogue) {
            continue;
        }

        renderMessage(dialogue);


        if (
            choices[i] &&
            choices[i].text
        ) {

            renderMessage({

                sender: "sent",

                text: choices[i].text,

                time: dialogue.time
            });
        }
    }


    /*
        Se a conversa terminou,
        mostra somente o final.
    */

    if (gameState.lucasFinished) {

        renderLucasFinished();

        return;
    }


    /*
        Mostra a mensagem atual
        e as escolhas.
    */

    const current =
        lucasDialogue[node];

    if (!current) {

        finishLucas();

        return;
    }

    renderMessage(current);

    renderChoices(current);

    scrollMessages();
}


/* =========================================================
   RENDERIZAR HISTÓRICO DA ANA
========================================================= */

function renderAna() {

    const node =
        Math.min(
            gameState.anaNode,
            anaDialogue.length
        );

    const choices =
        gameState.anaChoices || [];

    for (
        let i = 0;
        i < node;
        i++
    ) {

        const dialogue =
            anaDialogue[i];

        if (!dialogue) {
            continue;
        }

        renderMessage(dialogue);

        if (
            choices[i] &&
            choices[i].text
        ) {

            renderMessage({
                sender: "sent",
                text: choices[i].text,
                time: dialogue.time
            });

        }
    }

    if (gameState.anaFinished) {
        renderAnaFinished();
        return;
    }

    const current =
        anaDialogue[node];

    if (!current) {
        finishAna();
        return;
    }

    renderMessage(current);

    /*
        Se esta for a última mensagem da Ana,
        não existem escolhas para o jogador.
        Portanto, finalizamos a conversa automaticamente.
    */

    if (
        !current.choices ||
        current.choices.length === 0
    ) {

        setTimeout(
            () => {
                if (!gameState.anaFinished) {
                    finishAna();
                }
            },
            450
        );

        return;
    }

    renderChoices(current);

    scrollMessages();
}


/* =========================================================
   RENDER MENSAGEM
========================================================= */

function renderMessage(
    message,
    customText = null
) {

    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        `message ${message.sender}`;


    const bubble =
        document.createElement(
            "div"
        );

    bubble.className =
        "bubble";


    const text =
        document.createElement(
            "p"
        );

    text.textContent =
        customText !== null
            ? customText
            : message.text;


    const time =
        document.createElement(
            "span"
        );

    time.className =
        "message-time";

    time.textContent =
        message.time || "Agora";


    bubble.appendChild(text);

    bubble.appendChild(time);

    wrapper.appendChild(bubble);

    messagesContainer.appendChild(wrapper);
}


/* =========================================================
   ESCOLHAS
========================================================= */

function renderChoices(dialogue) {

    choicesContainer.innerHTML = "";


    if (
        !dialogue ||
        !dialogue.choices ||
        dialogue.choices.length === 0
    ) {

        return;
    }


    const title =
        document.createElement(
            "p"
        );

    title.className =
        "choices-title";

    title.textContent =
        "Escolha uma resposta";

    choicesContainer.appendChild(title);


    dialogue.choices.forEach(
        choice => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "choice-button";


            const text =
                document.createElement(
                    "span"
                );

            text.textContent =
                choice.text;


            const icon =
                document.createElement(
                    "i"
                );

            icon.className =
                "bi bi-chevron-right";


            button.appendChild(text);

            button.appendChild(icon);


            button.addEventListener(
                "click",
                () => {

                    handleChoice(choice);
                }
            );


            choicesContainer.appendChild(
                button
            );
        }
    );
}


/* =========================================================
   ESCOLHA
========================================================= */

function handleChoice(choice) {

    disableChoices();

    /* =====================================================
       LUCAS
    ===================================================== */

    if (gameState.currentChat === "lucas") {

        const currentNode =
            gameState.lucasNode;

        const currentDialogue =
            lucasDialogue[currentNode];

        if (!currentDialogue) {
            return;
        }

        gameState.lucasChoices[currentNode] = {
            text: choice.text,
            next: choice.next
        };

        gameState.lucasNode =
            choice.next;

        saveState();

        // Mostra a resposta do jogador
        renderMessage({
            sender: "sent",
            text: choice.text,
            time: currentDialogue.time
        });

        setTimeout(() => {

            if (
                gameState.lucasNode >=
                lucasDialogue.length
            ) {

                finishLucas();

            } else {

                const nextDialogue =
                    lucasDialogue[
                        gameState.lucasNode
                    ];

                renderMessage(
                    nextDialogue
                );

                // Se for a última mensagem,
                // finaliza a conversa
                if (
                    !nextDialogue.choices ||
                    nextDialogue.choices.length === 0
                ) {

                    setTimeout(() => {
                        finishLucas();
                    }, 450);

                } else {

                    renderChoices(
                        nextDialogue
                    );

                }

                scrollMessages();
            }

        }, 450);

    }

    /* =====================================================
       ANA
    ===================================================== */

    else {

        const currentNode =
            gameState.anaNode;

        const currentDialogue =
            anaDialogue[currentNode];

        if (!currentDialogue) {
            return;
        }

        gameState.anaChoices[currentNode] = {
            text: choice.text,
            next: choice.next
        };

        gameState.anaNode =
            choice.next;

        saveState();

        // Mostra a resposta do jogador
        renderMessage({
            sender: "sent",
            text: choice.text,
            time: currentDialogue.time
        });

        setTimeout(() => {

            if (
                gameState.anaNode >=
                anaDialogue.length
            ) {

                finishAna();

            } else {

                const nextDialogue =
                    anaDialogue[
                        gameState.anaNode
                    ];

                // Mostra a próxima mensagem da Ana
                renderMessage(
                    nextDialogue
                );

                /*
                 * IMPORTANTE:
                 * Se esta for a última mensagem,
                 * não existem escolhas.
                 * Então finalizamos a conversa
                 * automaticamente.
                 */
                if (
                    !nextDialogue.choices ||
                    nextDialogue.choices.length === 0
                ) {

                    setTimeout(() => {

                        if (
                            !gameState.anaFinished
                        ) {
                            finishAna();
                        }

                    }, 450);

                } else {

                    renderChoices(
                        nextDialogue
                    );
                }

                scrollMessages();
            }

        }, 450);
    }

    updateConversationPreviews();
}

/* =========================================================
   DESABILITAR ESCOLHAS
========================================================= */

function disableChoices() {

    const buttons =
        choicesContainer.querySelectorAll(
            ".choice-button"
        );

    buttons.forEach(
        button => {

            button.disabled =
                true;
        }
    );
}


/* =========================================================
   FINAL LUCAS
========================================================= */

function finishLucas() {

    gameState.lucasFinished =
        true;

    saveState();

    renderLucasFinished();

    updateConversationPreviews();
}


/* =========================================================
   CARD FINAL LUCAS
========================================================= */

function renderLucasFinished() {

    choicesContainer.innerHTML = "";


    /*
        Não apagamos e recriamos o histórico
        da conversa aqui.

        O histórico já está na tela.
        Isso também evita duplicação.
    */


    const card =
        document.createElement(
            "div"
        );

    card.className =
        "dialogue-finished";


    card.innerHTML = `

        <div class="dialogue-finished-icon">
            <i class="bi bi-check-lg"></i>
        </div>

        <h3>
            Conversa com Lucas finalizada
        </h3>

        <p>
            Algumas atitudes podem parecer
            preocupação ou ciúme, mas podem
            esconder comportamentos de controle.
        </p>

        <p>
            <strong>
                Agora veja o que Ana percebeu.
            </strong>
        </p>

        <button
            class="go-to-ana"
            type="button"
        >
            Conversar com Ana
            <i class="bi bi-arrow-right"></i>
        </button>
    `;


    messagesContainer.appendChild(card);


    const button =
        card.querySelector(
            ".go-to-ana"
        );


    button.addEventListener(
        "click",
        () => {

            switchChat("ana");
        }
    );


    scrollMessages();
}


/* =========================================================
   FINAL ANA
========================================================= */

function finishAna() {

    gameState.anaFinished = true;

    saveState();

    renderAnaFinished();

    updateConversationPreviews();
}


function renderAnaFinished() {

    choicesContainer.innerHTML = "";

    const existingCard =
        messagesContainer.querySelector(
            ".ana-finished-card"
        );

    if (existingCard) {
        return;
    }

    const card =
        document.createElement("div");

    card.className =
        "dialogue-finished ana-finished-card";

    card.innerHTML = `
        <div class="dialogue-finished-icon">
            <i class="fas fa-check"></i>
        </div>

        <h3>
            Conversa finalizada
        </h3>

        <p>
            Você chegou ao fim da conversa com Ana.
        </p>

        <p>
            Agora vamos verificar o que você aprendeu
            durante a experiência.
        </p>

        <button
            class="go-to-quiz"
            type="button"
        >
            <i class="fas fa-question-circle"></i>
            Ir para o Quiz
        </button>
    `;

    messagesContainer.appendChild(card);

    const goToQuizButton =
        card.querySelector(".go-to-quiz");

    if (goToQuizButton) {
        goToQuizButton.addEventListener(
            "click",
            startQuiz
        );
    }

    scrollMessages();
}
/* =========================================================
   CARD FINAL ANA
========================================================= */

function renderAnaFinished() {
    choicesContainer.innerHTML = "";

    // Evita criar o card mais de uma vez
    const existingCard =
        messagesContainer.querySelector(
            ".ana-finished-card"
        );

    if (existingCard) {
        return;
    }

    const card =
        document.createElement("div");

    card.className =
        "dialogue-finished ana-finished-card";

    card.innerHTML = `
        <div class="dialogue-finished-icon">
            <i class="fas fa-check"></i>
        </div>

        <h3>
            Conversa finalizada
        </h3>

        <p>
            Você chegou ao fim da conversa com Ana.
        </p>

        <p>
            Agora vamos verificar o que você aprendeu
            durante a experiência.
        </p>

        <button
            class="go-to-quiz"
            type="button"
        >
            <i class="fas fa-question-circle"></i>
            Ir para o Quiz
        </button>
    `;

    messagesContainer.appendChild(card);

    const goToQuizButton =
        card.querySelector(".go-to-quiz");

    goToQuizButton.addEventListener(
        "click",
        startQuiz
    );

    scrollMessages();
}


/* =========================================================
   QUIZ
========================================================= */

function startQuiz() {

    gameState.quizQuestion =
        0;

    gameState.quizScore =
        0;

    gameState.quizFinished =
        false;

    saveState();

    renderQuiz();
}


/* =========================================================
   RENDER QUIZ
========================================================= */

function renderQuiz() {

    choicesContainer.innerHTML = "";

    messagesContainer.innerHTML = "";


    const questionIndex =
        gameState.quizQuestion;


    if (
        questionIndex >=
        quizQuestions.length
    ) {

        finishQuiz();

        return;
    }


    const question =
        quizQuestions[
            questionIndex
        ];


    const container =
        document.createElement(
            "div"
        );

    container.className =
        "quiz-container";


    const progress =
        (
            (questionIndex + 1) /
            quizQuestions.length
        ) * 100;


    container.innerHTML = `

        <div class="quiz-badge">
            Você está no quiz
        </div>

        <h2 class="quiz-title">
            Reconhecendo os sinais
        </h2>

        <div class="quiz-counter">
            Pergunta
            ${questionIndex + 1}
            de
            ${quizQuestions.length}
        </div>

        <div class="quiz-progress">

            <div
                class="quiz-progress-bar"
                style="width: ${progress}%"
            ></div>

        </div>

        <div class="quiz-phrase">
            ${escapeHTML(question.question)}
        </div>

        <div class="quiz-buttons">

            <button
                class="quiz-answer"
                data-answer="true"
                type="button"
            >
                <i class="bi bi-check-lg"></i>
                Verdadeiro
            </button>

            <button
                class="quiz-answer"
                data-answer="false"
                type="button"
            >
                <i class="bi bi-x-lg"></i>
                Falso
            </button>

        </div>
    `;


    messagesContainer.appendChild(
        container
    );


    const buttons =
        container.querySelectorAll(
            ".quiz-answer"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const answer =
                        button.dataset.answer ===
                        "true";

                    answerQuiz(
                        answer,
                        question,
                        buttons,
                        container
                    );
                }
            );
        }
    );


    scrollMessages();
}


/* =========================================================
   RESPONDER QUIZ
========================================================= */

function answerQuiz(
    answer,
    question,
    buttons,
    container
) {

    buttons.forEach(
        button => {

            button.disabled =
                true;
        }
    );


    const correct =
        answer === question.answer;


    if (correct) {

        gameState.quizScore++;
    }


    saveState();


    const result =
        document.createElement(
            "div"
        );

    result.className =
        `quiz-result ${
            correct
                ? "correct"
                : "wrong"
        }`;


    result.innerHTML = `

        <h3>
            ${
                correct
                    ? "✓ Muito bem!"
                    : "✕ Atenção!"
            }
        </h3>

        <p>
            ${escapeHTML(
                question.explanation
            )}
        </p>

        <button
            class="next-question"
            type="button"
        >

            ${
                gameState.quizQuestion ===
                quizQuestions.length - 1
                    ? "Ver resultado"
                    : "Próxima pergunta"
            }

            <i class="bi bi-arrow-right"></i>

        </button>
    `;


    container.appendChild(result);


    const nextButton =
        result.querySelector(
            ".next-question"
        );


    nextButton.addEventListener(
        "click",
        () => {

            gameState.quizQuestion++;

            saveState();

            renderQuiz();
        }
    );


    scrollMessages();
}


/* =========================================================
   FINAL DO QUIZ
========================================================= */

function finishQuiz() {

    gameState.quizFinished =
        true;

    saveState();


    const total =
        quizQuestions.length;

    const score =
        gameState.quizScore;


    let title;
    let message;


    if (score === total) {

        title =
            "Excelente!";

        message =
            "Você conseguiu identificar muito bem os sinais apresentados durante a história.";

    } else if (score >= 4) {

        title =
            "Muito bom!";

        message =
            "Você conseguiu reconhecer a maioria dos comportamentos apresentados.";

    } else if (score >= 2) {

        title =
            "Bom começo!";

        message =
            "Alguns sinais podem ser difíceis de perceber. Continue aprendendo sobre relacionamentos saudáveis.";

    } else {

        title =
            "Continue aprendendo";

        message =
            "Reconhecer comportamentos abusivos nem sempre é fácil. Conhecimento e informação ajudam a perceber esses sinais.";
    }


    messagesContainer.innerHTML = "";

    choicesContainer.innerHTML = "";


    const card =
        document.createElement(
            "div"
        );

    card.className =
        "score-card";


    card.innerHTML = `

        <div class="dialogue-finished-icon">

            <i class="bi bi-trophy"></i>

        </div>

        <h2>
            ${title}
        </h2>

        <div class="score-number">
            ${score}/${total}
        </div>

        <p>
            ${message}
        </p>

        <p>
            A violência e o controle podem aparecer
            de formas diferentes. Informação,
            respeito e apoio são importantes.
        </p>

        <button
            class="restart-quiz"
            type="button"
        >
            Jogar novamente
            <i class="bi bi-arrow-clockwise"></i>
        </button>
    `;


    messagesContainer.appendChild(card);


    const button =
        card.querySelector(
            ".restart-quiz"
        );


    button.addEventListener(
        "click",
        restartGame
    );


    createConfetti();

    scrollMessages();
}


/* =========================================================
   REINICIAR
========================================================= */

function restartGame() {

    const confirmed =
        window.confirm(
            "Deseja realmente reiniciar a história?"
        );


    if (!confirmed) {

        return;
    }


    localStorage.removeItem(
        STORAGE_KEY
    );


    gameState = {

        ...defaultState,

        lucasChoices: [],

        anaChoices: []
    };


    saveState();


    updateActiveConversation();

    updateConversationPreviews();

    showStartScreen();

    renderCurrentChat();
}


/* =========================================================
   CRÉDITOS
========================================================= */

/* =========================================================
   CRÉDITOS
========================================================= */

/* =========================================================
   CRÉDITOS
========================================================= */

function openCredits(event) {

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    if (!creditsScreen) {
        console.error(
            "Tela de créditos não encontrada."
        );
        return;
    }

    creditsScreen.classList.add("active");
}


function closeCreditsScreen(event) {

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    if (!creditsScreen) {
        return;
    }

    creditsScreen.classList.remove("active");
}


/* =========================================================
   BUSCA DE CONVERSAS
========================================================= */

function filterConversations() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    conversationElements.forEach(
        conversation => {

            const name =
                conversation
                    .querySelector("strong")
                    .textContent
                    .toLowerCase();


            conversation.style.display =
                name.includes(search)
                    ? "flex"
                    : "none";
        }
    );
}


/* =========================================================
   PREVIEWS
========================================================= */

function updateConversationPreviews() {

    /*
        LUCAS
    */

    if (
        gameState.lucasFinished
    ) {

        lucasPreview.textContent =
            "Conversa finalizada";

    } else {

        const node =
            Math.min(
                gameState.lucasNode,
                lucasDialogue.length - 1
            );


        lucasPreview.textContent =
            lucasDialogue[node]?.text ||
            "Chegou em casa?";
    }


    /*
        ANA
    */

    if (
        gameState.anaFinished
    ) {

        anaPreview.textContent =
            "Conversa finalizada";

    } else {

        const node =
            Math.min(
                gameState.anaNode,
                anaDialogue.length - 1
            );


        anaPreview.textContent =
            anaDialogue[node]?.text ||
            "Você está bem?";
    }
}


/* =========================================================
   SCROLL
========================================================= */

function scrollMessages() {

    setTimeout(
        () => {

            messagesContainer.scrollTop =
                messagesContainer.scrollHeight;

        },
        50
    );
}


/* =========================================================
   CONFETES
========================================================= */

function createConfetti() {

    const container =
        document.getElementById(
            "confetti-container"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    for (
        let i = 0;
        i < 90;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.className =
            "confetti";


        piece.style.left =
            `${Math.random() * 100}%`;


        piece.style.animationDuration =
            `${2 + Math.random() * 3}s`;


        piece.style.animationDelay =
            `${Math.random() * 0.8}s`;


        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        piece.style.background =
            getRandomConfettiColor();


        container.appendChild(
            piece
        );
    }


    setTimeout(
        () => {

            container.innerHTML = "";

        },
        6000
    );
}


function getRandomConfettiColor() {

    const colors = [

        "#6366f1",
        "#818cf8",
        "#22c55e",
        "#10b981",
        "#facc15",
        "#f97316",
        "#ec4899"

    ];


    return colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ];
}


/* =========================================================
   SEGURANÇA DO TEXTO DO QUIZ
========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;
}