/* =========================================
   ELEMENTOS
========================================= */

const creditsScreen =
    document.getElementById("credits-screen");

const creditsButton =
    document.getElementById("credits-button");

const closeCredits =
    document.getElementById("close-credits");

const messagesContainer =
    document.getElementById("messages");

const choicesContainer =
    document.getElementById("choices");

const conversationList =
    document.querySelector(".conversation-list");

const chatName =
    document.querySelector(".chat-user h2");

const chatStatus =
    document.querySelector(".chat-user span");

const chatAvatar =
    document.querySelector(".chat-user .avatar");

const restartButton =
    document.getElementById("restart-button");

const confettiContainer =
    document.getElementById("confetti-container");

const startScreen =
    document.getElementById("start-screen");

const startButton =
    document.getElementById("start-button");


/* =========================================
   STORAGE
========================================= */

const STORAGE_KEY =
    "jogoViolenciaDomestica_v3";


/* =========================================
   ESTADO INICIAL
========================================= */

function createInitialState() {

    return {

        currentChat: "lucas",

        dialogueCompleted: {

            lucas: false,

            ana: false

        },

        chats: {

            lucas: {

    messages: [

        {
            text: "Oi, amor.",
            type: "received",
            time: "21:42"
        },

        {
            text: "Oi ❤️",
            type: "sent",
            time: "21:43"
        },

        {
            text: "Chegou em casa?",
            type: "received",
            time: "21:44"
        }

    ],

    currentNode: "inicio",

    currentChoices: null,

    finished: false

},

            ana: {

    messages: [

        {
            text: "Oii!",
            type: "received",
            time: "20:08"
        },

        {
            text: "Oi Ana ❤️",
            type: "sent",
            time: "20:09"
        },

        {
            text: "Você tá bem?",
            type: "received",
            time: "20:12"
        }

    ],

    currentNode: "inicio",

    currentChoices: null,

    finished: false

},

        },

        quiz: {

            current: 0,

            score: 0,

            finished: false

        },

        started: false

    };

}


let gameState =
    createInitialState();


/* =========================================
   SALVAR
========================================= */

function saveGame() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(gameState)
    );

}


/* =========================================
   CARREGAR
========================================= */

function loadGame() {

    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (!saved) {

        return;

    }

    try {

        const parsed =
            JSON.parse(saved);

        const initial =
            createInitialState();

        gameState = {

            ...initial,

            ...parsed,

            dialogueCompleted: {

                ...initial.dialogueCompleted,

                ...(parsed.dialogueCompleted || {})

            },

            chats: {

                ...initial.chats,

                ...(parsed.chats || {})

            },

            quiz: {

                ...initial.quiz,

                ...(parsed.quiz || {})

            }

        };

    } catch {

        gameState =
            createInitialState();

    }

}


/* =========================================
   HORÁRIO
========================================= */

/* =========================================
   HORÁRIO DA CONVERSA
========================================= */

let conversationMinutes = 21 * 60 + 44;

function getTime() {

    conversationMinutes++;

    const hours =
        Math.floor(conversationMinutes / 60) % 24;

    const minutes =
        conversationMinutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

}


/* =========================================
   RENDERIZAR MENSAGEM
========================================= */

function renderMessage(
    text,
    type,
    time
) {

    const message =
        document.createElement("div");

    message.className =
        `message ${type}`;

    const bubble =
        document.createElement("div");

    bubble.className =
        "bubble";

    const p =
        document.createElement("p");

    p.textContent =
        text;

    const messageTime =
        document.createElement("span");

    messageTime.className =
        "message-time";

    messageTime.textContent =
        time;

    if (type === "sent") {

        messageTime.innerHTML +=
            ' <i class="bi bi-check2-all"></i>';

    }

    bubble.appendChild(p);

    bubble.appendChild(messageTime);

    message.appendChild(bubble);

    messagesContainer.appendChild(message);

}


/* =========================================
   CARREGAR CHAT
========================================= */

function loadChatMessages(chat) {

    messagesContainer.innerHTML = `
        <div class="date-divider">
            <span>Hoje</span>
        </div>
    `;

    const history =
        gameState.chats[chat].messages;

    history.forEach(message => {

        renderMessage(
            message.text,
            message.type,
            message.time
        );

    });

    scrollMessages();

}


/* =========================================
   SCROLL
========================================= */

function scrollMessages() {

    setTimeout(() => {

        messagesContainer.scrollTop =
            messagesContainer.scrollHeight;

    }, 50);

}


/* =========================================
   ADICIONAR MENSAGEM
========================================= */

function addMessage(
    chat,
    text,
    type
) {

    const time =
        getTime();

    gameState.chats[chat].messages.push({

        text,
        type,
        time

    });
updateConversationPreview(chat);
    if (
        gameState.currentChat === chat
    ) {

        renderMessage(
            text,
            type,
            time
        );

        scrollMessages();

    }

    saveGame();

}


/* =========================================
   HISTÓRIA LUCAS
========================================= */

const lucasChoices = [

    {

        text: "Cheguei em casa.",

        response:
            "Finalmente. Eu já estava pensando que tinha acontecido alguma coisa.",

        next: [

            {

                text: "O ônibus demorou.",

                response:
                    "Entendi. Só é estranho você conseguir ficar horas sem olhar o celular quando sabe que eu estou esperando.",

                next: [

                    {

                        text: "Eu estava sem olhar o celular.",

                        response:
                            "Você sempre consegue uma explicação. Eu só queria que você percebesse o que certas coisas fazem comigo.",

                        next: [

                            {

                                text: "Entendo.",

                                response:
                                    "É... deixa pra lá.",

                                next: []

                            },

                            {

                                text: "Você não precisa saber onde eu estou o tempo todo.",

                                response:
                                    "Eu sei. Mas se você realmente se importasse comigo, não faria eu precisar perguntar.",

                                next: []

                            }

                        ]

                    },

                    {

                        text: "Desculpa.",

                        response:
                            "Não precisa pedir desculpa. Só não faz de novo.",

                        next: [

                            {

                                text: "Tá bom.",

                                response:
                                    "É só isso que eu queria.",

                                next: []

                            }

                        ]

                    }

                ]

            },

            {

                text: "Você estava preocupado?",

                response:
                    "Um pouco. Você não costuma demorar tanto.",

                next: [

                    {

                        text: "Foi só hoje.",

                        response:
                            "Tá. Só não gosto de ficar sem saber.",

                        next: []

                    },

                    {

                        text: "Eu estava com minhas amigas.",

                        response:
                            "Ah... achei que você tinha saído com aquele pessoal de novo.",

                        next: [

                            {

                                text: "E qual seria o problema?",

                                response:
                                    "Nenhum. Eu só não gosto muito daquele pessoal.",

                                next: []

                            },

                            {

                                text: "Não saí com eles.",

                                response:
                                    "Tá bom.",

                                next: []

                            }

                        ]

                    }

                ]

            }

        ]

    },

    {

        text: "Ainda estou fora.",

        response:
            "Fora onde?",

        next: [

            {

                text: "Estou com umas amigas.",

                response:
                    "Você não tinha falado que ia sair.",

                next: [

                    {

                        text: "Eu decidi de última hora.",

                        response:
                            "Eu não estou dizendo que você não pode sair. Estou dizendo que eu esperava que você tivesse consideração por mim.",

                        next: [

                            {

                                text: "Mas eu posso sair com minhas amigas.",

                                response:
                                    "Eu nunca disse que você não podia. Você está começando a transformar tudo que eu falo em controle.",

                                next: []

                            },

                            {

                                text: "Desculpa, eu devia ter avisado.",

                                response:
                                    "É. Era só isso que eu queria.",

                                next: []

                            }

                        ]

                    }

                ]

            },

            {

                text: "Só saí para espairecer.",

                response:
                    "Você podia ter me chamado.",

                next: [

                    {

                        text: "Eu queria ficar um pouco sozinha.",

                        response:
                            "Sozinha? Você está se afastando de mim e está chamando isso de precisar de espaço.",

                        next: [

                            {

                                text: "Eu só precisava de um tempo.",

                                response:
                                    "Eu só espero que você não perceba tarde demais quem realmente estava do seu lado.",

                                next: []

                            }

                        ]

                    }

                ]

            }

        ]

    },

    {

        text: "Por quê?",

        response:
            "Porque eu quero saber onde você está.",

        next: [

            {

                text: "Estou em casa agora.",

                response:
                    "Tá. Era só isso que eu queria saber.",

                next: [

                    {

                        text: "Você ficou bravo comigo?",

                        response:
                            "Não. Só fiquei chateado.",

                        next: [

                            {

                                text: "Por eu ter saído?",

                                response:
                                    "Por você não ter pensado em como eu ia me sentir.",

                                next: []

                            }

                        ]

                    }

                ]

            },

            {

                text: "Você está me interrogando?",

                response:
                    "Nossa. Agora perguntar onde você está virou interrogatório?",

                next: [

                    {

                        text: "Não foi isso que eu quis dizer.",

                        response:
                            "Então não transforma tudo em problema.",

                        next: [

                            {

                                text: "Tá.",

                                response:
                                    "Boa noite.",

                                next: []

                            }

                        ]

                    }

                ]

            }

        ]

    }

];


/* =========================================
   HISTÓRIA ANA
========================================= */

const anaChoices = [

    {

        text: "Tô sim.",

        response:
            "Tem certeza? Você parece meio distante ultimamente.",

        next: [

            {

                text: "Só estou cansada.",

                response:
                    "Entendi. Mas você anda recusando vários rolês nossos.",

                next: [

                    {

                        text: "Ando sem vontade.",

                        response:
                            "Você costumava gostar de sair com a gente.",

                        next: []

                    },

                    {

                        text: "O Lucas não gosta muito quando eu saio.",

                        response:
                            "Mas você gosta?",

                        next: [

                            {

                                text: "Eu gostava.",

                                response:
                                    "Pedro... isso não parece muito normal.",

                                next: []

                            },

                            {

                                text: "Não sei mais.",

                                response:
                                    "Se um dia quiser conversar, eu estou aqui.",

                                next: []

                            }

                        ]

                    }

                ]

            },

            {

                text: "Por que você acha isso?",

                response:
                    "Porque você sempre olha o celular quando fala dele.",

                next: [

                    {

                        text: "É impressão sua.",

                        response:
                            "Pode ser. Só queria saber se está tudo bem.",

                        next: []

                    }

                ]

            }

        ]

    },

    {

        text: "Na verdade, não muito.",

        response:
            "Aconteceu alguma coisa?",

        next: [

            {

                text: "É complicado explicar.",

                response:
                    "Pode explicar do seu jeito. Eu vou te ouvir.",

                next: [

                    {

                        text: "Às vezes eu sinto que preciso tomar cuidado com tudo que faço.",

                        response:
                            "Você não deveria precisar ter medo de fazer coisas normais.",

                        next: []

                    },

                    {

                        text: "Depois eu te conto.",

                        response:
                            "Tudo bem. Mas não precisa passar por nada sozinha, tá?",

                        next: []

                    }

                ]

            }

        ]

    }

];


/* =========================================
   RENDERIZAR ESCOLHAS
========================================= */

function renderChoices(
    choices,
    chat
) {

    choicesContainer.innerHTML = "";

    if (
        !choices ||
        choices.length === 0
    ) {

        finishDialogue(chat);

        return;

    }


    const title =
        document.createElement("p");

    title.className =
        "choices-title";

    title.textContent =
        "Escolha uma resposta";

    choicesContainer.appendChild(title);


    choices.forEach(choice => {

        const button =
            document.createElement("button");

        button.className =
            "choice-button";

        button.type =
            "button";

        button.innerHTML = `
            <span>${choice.text}</span>
            <i class="bi bi-arrow-right"></i>
        `;

        button.addEventListener(
            "click",
            () => {

                chooseAnswer(
                    choice,
                    chat
                );

            }
        );

        choicesContainer.appendChild(button);

    });

}


/* =========================================
   ESCOLHER RESPOSTA
========================================= */

function chooseAnswer(choice, chat) {

    document
        .querySelectorAll(".choice-button")
        .forEach(button => {
            button.disabled = true;
        });

    // Salva a resposta escolhida
    addMessage(
        chat,
        choice.text,
        "sent"
    );

    // IMPORTANTE:
    // salva quais são as próximas escolhas
    gameState.chats[chat].currentChoices =
        choice.next && choice.next.length
            ? choice.next
            : null;

    saveGame();

    setTimeout(() => {

        addMessage(
            chat,
            choice.response,
            "received"
        );

        setTimeout(() => {

            // Ainda existem escolhas
            if (
                choice.next &&
                choice.next.length
            ) {

                gameState.chats[chat].currentChoices =
                    choice.next;

                saveGame();

                // Só renderiza se ainda estiver nessa conversa
                if (
                    gameState.currentChat === chat
                ) {

                    renderChoices(
                        choice.next,
                        chat
                    );

                }

            }

            // Não existem mais escolhas
            else {

                gameState.chats[chat].currentChoices =
                    null;

                gameState.chats[chat].finished =
                    true;

                gameState.dialogueCompleted[chat] =
                    true;

                saveGame();

                finishDialogue(chat);

            }

        }, 500);

    }, 1000);

}


/* =========================================
   FINALIZAR DIÁLOGO
========================================= */

function finishDialogue(chat) {

    gameState.chats[chat].finished = true;

    gameState.chats[chat].currentChoices = null;

    gameState.dialogueCompleted[chat] = true;

    saveGame();


    /* =====================================
       FINAL DO LUCAS
    ===================================== */

    if (chat === "lucas") {

        choicesContainer.innerHTML = `

            <div class="dialogue-finished">

                <div class="dialogue-finished-icon">
                    ✓
                </div>

                <h3>
                    Conversa com Lucas encerrada
                </h3>

                <p>
                    Essa conversa chegou ao fim.
                </p>

                <p>
                    Agora vá até a conversa com
                    <strong>Ana</strong> para continuar a história.
                </p>

                <button
                    class="go-to-ana"
                    type="button"
                >
                    Conversar com Ana
                    <i class="bi bi-arrow-right"></i>
                </button>

            </div>

        `;


        const button =
            choicesContainer.querySelector(
                ".go-to-ana"
            );


        if (button) {

            button.addEventListener(
                "click",
                () => {

                    configureChat("ana");

                }
            );

        }

        return;

    }


    /* =====================================
       FINAL DA ANA
    ===================================== */

    if (chat === "ana") {

        choicesContainer.innerHTML = `

            <div class="dialogue-finished">

                <div class="dialogue-finished-icon">
                    ✓
                </div>

                <h3>
                    Diálogos concluídos
                </h3>

                <p>
                    Você terminou as conversas
                    com Lucas e Ana.
                </p>

                <p>
                    Agora você pode continuar para
                    a atividade de reflexão.
                </p>

                <button
                    class="go-to-quiz"
                    type="button"
                >
                    Iniciar atividade
                    <i class="bi bi-arrow-right"></i>
                </button>

            </div>

        `;


        const button =
            choicesContainer.querySelector(
                ".go-to-quiz"
            );


        if (button) {

            button.addEventListener(
                "click",
                () => {

                    startQuiz();

                }
            );

        }

    }

}
/* =========================================
   CONFIGURAR CHAT
========================================= */

function configureChat(chat) {

    gameState.currentChat = chat;

    saveGame();


    /* =====================================
       DADOS DO CONTATO
    ===================================== */

    if (chat === "lucas") {

        chatName.textContent = "Lucas";

        chatAvatar.textContent = "L";

        chatAvatar.style.background = "#6366f1";

    }


    if (chat === "ana") {

        chatName.textContent = "Ana";

        chatAvatar.textContent = "A";

        chatAvatar.style.background = "#10b981";

    }


    /* =====================================
       CONVERSA ATIVA
    ===================================== */

    document
        .querySelectorAll(".conversation")
        .forEach(item => {

            item.classList.remove("active");

        });


    const selected =
        document.querySelector(
            `[data-chat="${chat}"]`
        );


    if (selected) {

        selected.classList.add("active");

    }


    /* =====================================
       CARREGAR MENSAGENS
    ===================================== */

    loadChatMessages(chat);


    const chatData =
        gameState.chats[chat];


    /* =====================================
       DIÁLOGO JÁ TERMINOU
    ===================================== */

if (chatData.finished) {

    choicesContainer.innerHTML = `

        <p class="choices-title">
            Conversa concluída
        </p>

    `;

    return;

}


    /* =====================================
       RECUPERAR OPÇÕES
    ===================================== */

    let choices =
        chatData.currentChoices;


    /*
       Se ainda não existe um ponto salvo,
       começa pela primeira escolha.
    */

    if (!choices) {

        choices =
            chat === "lucas"
                ? lucasChoices
                : anaChoices;

        chatData.currentChoices =
            choices;

        saveGame();

    }


    renderChoices(
        choices,
        chat
    );

}


/* =========================================
   TROCAR CHAT MANUALMENTE
========================================= */

if (conversationList) {

    conversationList.addEventListener(
        "click",
        event => {

            const conversation =
                event.target.closest(
                    ".conversation"
                );

            if (!conversation) {

                return;

            }

            configureChat(
                conversation.dataset.chat
            );

        }
    );

}


/* =========================================
   QUIZ
========================================= */

const quizQuestions = [

    {

        phrase:
            "“Me avisa quando chegar em casa. Fico preocupado e quero saber se você está bem.”",

        answer:
            "cuidado",

        explanation:
            "Aqui existe preocupação com a segurança da pessoa, sem tentativa de impedir seus movimentos ou controlar suas escolhas."

    },

    {

        phrase:
            "“Você não vai sair com suas amigas hoje. Eu não gosto delas.”",

        answer:
            "controle",

        explanation:
            "A pessoa está tentando decidir com quem o parceiro pode ou não se relacionar."

    },

    {

        phrase:
            "“Se você chegar tarde, pelo menos me manda uma mensagem para eu saber que está tudo bem.”",

        answer:
            "cuidado",

        explanation:
            "O pedido está relacionado à segurança e não impede a pessoa de sair ou tomar suas próprias decisões."

    },

    {

        phrase:
            "“Quero a senha do seu celular. Se você não tem nada a esconder, não deveria ter problema.”",

        answer:
            "controle",

        explanation:
            "Exigir acesso ao celular ou senhas pode ser uma forma de controlar a privacidade da outra pessoa."

    },

    {

        phrase:
            "“Você parece triste ultimamente. Quer conversar? Estou aqui se precisar.”",

        answer:
            "cuidado",

        explanation:
            "A frase demonstra atenção e oferece apoio sem pressionar a pessoa."

    },

    {

        phrase:
            "“Não quero que você use essa roupa. Se me respeitasse, trocaria.”",

        answer:
            "controle",

        explanation:
            "A pessoa está tentando controlar a forma como o parceiro se veste usando pressão emocional."

    },

    {

        phrase:
            "“Você pode sair com suas amigas. Só me avisa quando chegar para eu ficar tranquilo.”",

        answer:
            "cuidado",

        explanation:
            "Existe preocupação, mas a pessoa continua tendo liberdade para sair e escolher suas companhias."

    },

    {

        phrase:
            "“Você precisa me mandar sua localização sempre que sair.”",

        answer:
            "controle",

        explanation:
            "Exigir localização constante pode ultrapassar a preocupação e se transformar em monitoramento e controle."

    },

    {

        phrase:
            "“Percebi que você não está bem. Quer que eu te acompanhe ou prefere ficar um pouco sozinha?”",

        answer:
            "cuidado",

        explanation:
            "A pessoa demonstra preocupação e respeita a autonomia do outro ao oferecer uma escolha."

    },

    {

        phrase:
            "“Se você for nessa festa, pode esquecer que eu existo.”",

        answer:
            "controle",

        explanation:
            "A ameaça emocional é utilizada para tentar impedir a pessoa de fazer algo que deseja."

    }

];


/* =========================================
   INICIAR QUIZ
========================================= */

function startQuiz() {

    choicesContainer.innerHTML = "";

    messagesContainer.innerHTML = "";

    gameState.quiz.current = 0;

    gameState.quiz.score = 0;

    gameState.quiz.finished = false;

    saveGame();

    showQuizQuestion();

}


/* =========================================
   MOSTRAR QUESTÃO
========================================= */

/* =========================================
   MOSTRAR QUESTÃO
========================================= */

function showQuizQuestion() {

    const index =
        gameState.quiz.current;

    if (
        index >= quizQuestions.length
    ) {

        finishQuiz();

        return;

    }


    const question =
        quizQuestions[index];


    const container =
        document.createElement("div");

    container.className =
        "quiz-container";


    container.innerHTML = `

        <div class="quiz-badge">
            VAMOS TESTAR O QUE VOCÊ PERCEBEU
        </div>


        <h2 class="quiz-title">
            Cuidado ou Controle?
        </h2>


        <div class="quiz-counter">
            Frase ${index + 1} de ${quizQuestions.length}
        </div>


        <div class="quiz-phrase">

            "${question.phrase}"

        </div>


        <div class="quiz-buttons">

            <button
                class="quiz-answer"
                data-answer="cuidado"
            >

                <i class="bi bi-heart"></i>

                <span>
                    Cuidado
                </span>

            </button>


            <button
                class="quiz-answer"
                data-answer="controle"
            >

                <i class="bi bi-lock"></i>

                <span>
                    Controle
                </span>

            </button>

        </div>

    `;


    choicesContainer.innerHTML = "";

    choicesContainer.appendChild(
        container
    );


    container
        .querySelectorAll(".quiz-answer")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    answerQuiz(
                        button.dataset.answer
                    );

                }
            );

        });

}


/* =========================================
   RESPONDER QUIZ
========================================= */

function answerQuiz(
    selected
) {

    const index =
        gameState.quiz.current;

    const question =
        quizQuestions[index];


    const buttons =
        document.querySelectorAll(
            ".quiz-answer"
        );


    buttons.forEach(button => {

        button.disabled = true;

    });


    const correct =
        selected === question.answer;


    if (correct) {

        gameState.quiz.score++;

        showConfetti();

    }


    saveGame();


    const result =
        document.createElement("div");

    result.className =
        `quiz-result ${correct ? "correct" : "wrong"}`;


    result.innerHTML = `

        <h3>

            ${
                correct
                    ? "🎉 Acertou!"
                    : "🤔 Quase!"
            }

        </h3>


        <p>

            <strong>

                Classificação correta:

                ${
                    question.answer === "cuidado"
                        ? "Cuidado"
                        : "Controle"
                }

            </strong>

        </p>


        <p>

            ${question.explanation}

        </p>


        <button
            class="next-question"
        >

            ${
                index === quizQuestions.length - 1
                    ? "Ver resultado"
                    : "Próxima situação"
            }

        </button>

    `;


    const quizContainer =
        choicesContainer.querySelector(
            ".quiz-container"
        );


    quizContainer.appendChild(
        result
    );


    result
        .querySelector(".next-question")
        .addEventListener(
            "click",
            () => {

                gameState.quiz.current++;

                saveGame();

                showQuizQuestion();

            }
        );

}


/* =========================================
   CONFETES
========================================= */

function showConfetti() {

    if (!confettiContainer) {

        return;

    }


    confettiContainer.innerHTML = "";


    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti";


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.background =
            [

                "#6366f1",
                "#22c55e",
                "#facc15",
                "#ef4444",
                "#06b6d4",
                "#ec4899"

            ][
                Math.floor(
                    Math.random() * 6
                )
            ];


        piece.style.animationDuration =
            (2 + Math.random() * 2) + "s";


        piece.style.animationDelay =
            Math.random() * .4 + "s";


        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        confettiContainer
            .appendChild(piece);

    }


    setTimeout(() => {

        confettiContainer.innerHTML = "";

    }, 4500);

}


/* =========================================
   RESULTADO FINAL
========================================= */

function finishQuiz() {

    gameState.quiz.finished =
        true;

    saveGame();


    const score =
        gameState.quiz.score;

    const total =
        quizQuestions.length;

    const percentage =
        Math.round(
            (score / total) * 100
        );


    let message;


    if (percentage >= 80) {

        message =
            "Você demonstrou uma boa capacidade de identificar situações de cuidado e controle.";

    } else if (percentage >= 50) {

        message =
            "Você conseguiu identificar parte das situações. Algumas formas de controle podem ser bastante sutis.";

    } else {

        message =
            "Algumas situações podem ser difíceis de identificar. Observe como preocupação e controle podem se parecer, mas possuem diferenças importantes.";

    }


    choicesContainer.innerHTML = `

        <div class="score-card">

            <h2>
                Resultado
            </h2>


            <div class="score-number">

                ${score}/${total}

            </div>


            <p>

                Você acertou

                <strong>
                    ${percentage}%
                </strong>

                das situações.

            </p>


            <p>

                ${message}

            </p>


            <hr>


            <h4>
                Você não está sozinho.
            </h4>


            <p>

                Reconhecer comportamentos de controle,
                isolamento, ameaças e outras formas de
                violência é um passo importante para
                buscar ajuda e proteção.

            </p>


            <p>

                Se você ou alguém que conhece estiver
                passando por uma situação de violência
                contra a mulher, procure ajuda.

            </p>


            <p>

                <strong>
                    Ligue 180 — Central de Atendimento à Mulher.
                </strong>

            </p>


            <button
                class="restart-quiz"
                id="restart-quiz"
            >

                Refazer atividade

            </button>

        </div>

    `;


    document
        .getElementById("restart-quiz")
        .addEventListener(
            "click",
            () => {

                gameState.quiz = {

                    current: 0,

                    score: 0,

                    finished: false

                };

                saveGame();

                showQuizQuestion();

            }
        );

}

function updateConversationPreview(chat) {

    const conversation =
        document.querySelector(
            `[data-chat="${chat}"]`
        );

    if (!conversation) return;

    const messages =
        gameState.chats[chat].messages;

    if (!messages.length) return;

    const lastMessage =
        messages[messages.length - 1];

    const preview =
        conversation.querySelector(".conversation-info p");

    const time =
        conversation.querySelector(".conversation-top small");

    if (preview) {
        preview.textContent =
            lastMessage.text;
    }

    if (time) {
        time.textContent =
            lastMessage.time;
    }

}

/* =========================================
   REINICIAR JOGO COMPLETO
========================================= */

if (restartButton) {

    restartButton.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Tem certeza que deseja reiniciar o jogo?\n\nTodo o progresso será perdido."
                );


            if (!confirmed) {

                return;

            }


            localStorage.removeItem(
                STORAGE_KEY
            );


            gameState =
                createInitialState();


            location.reload();

        }
    );

}


/* =========================================
   TELA INICIAL
========================================= */

if (startButton) {

    startButton.addEventListener(
        "click",
        () => {

            gameState.started =
                true;

            saveGame();


            if (startScreen) {

                startScreen.style.opacity =
                    "0";

                startScreen.style.transition =
                    "opacity 0.4s ease";


                setTimeout(() => {

                    startScreen.style.display =
                        "none";


                    configureChat(
                        "lucas"
                    );

                }, 400);

            } else {

                configureChat(
                    "lucas"
                );

            }

        }
    );

}

/* =========================================
   CRÉDITOS
========================================= */

if (creditsButton) {

    creditsButton.addEventListener(
        "click",
        () => {

            creditsScreen.classList.add(
                "active"
            );

        }
    );

}


if (closeCredits) {

    closeCredits.addEventListener(
        "click",
        () => {

            creditsScreen.classList.remove(
                "active"
            );

        }
    );

}

/* =========================================
   INICIALIZAÇÃO
========================================= */

loadGame();


/*
 * IMPORTANTE:
 * Não iniciamos o chat automaticamente aqui.
 *
 * A tela inicial controla o começo do jogo.
 */

if (
    gameState.started &&
    startScreen
) {

    startScreen.style.display =
        "none";

    configureChat(
        gameState.currentChat || "lucas"
    );

}