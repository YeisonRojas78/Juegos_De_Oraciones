<?php
class Question
{
    public static function getQuestions()
    {
        return [
            [
                "sentence" => "I ___ call you as soon as I ___ home.",
                "answers" => ["will", "won't", "get", "go"],
                "correctAnswer" => ["will", "get"],
                "missingWordCount" => 2,
                "correction" => "Futuro simple: 'I will call you as soon as I get home.'"
            ],
            [
                "sentence" => "She ___ help you with your homework tomorrow.",
                "answers" => ["will", "won't", "is", "was"],
                "correctAnswer" => "will",
                "missingWordCount" => 1,
                "correction" => "En futuro simple afirmativo se usa 'will'."
            ],
            [
                "sentence" => "They ___ arrive late because they ___ take the bus.",
                "answers" => ["will", "won't", "might", "will"],
                "correctAnswer" => ["will", "take"],
                "missingWordCount" => 2,
                "correction" => "Futuro simple: 'They will arrive late because they will take the bus.'"
            ],
            [
                "sentence" => "We ___ see that movie next Friday.",
                "answers" => ["will", "won't", "are", "were"],
                "correctAnswer" => "will",
                "missingWordCount" => 1,
                "correction" => "Para planes futuros sin intención previa: 'will'."
            ],
            [
                "sentence" => "I ___ not eat pizza tonight because I ___ cook pasta.",
                "answers" => ["will", "won't", "am", "will"],
                "correctAnswer" => ["won't", "will"],
                "missingWordCount" => 2,
                "correction" => "Negación en futuro: 'won’t', afirmación: 'will'."
            ],
            [
                "sentence" => "You ___ enjoy the party, I’m sure.",
                "answers" => ["will", "won't", "shall", "is"],
                "correctAnswer" => "will",
                "missingWordCount" => 1,
                "correction" => "Futuro afirmativo para predicciones: 'will'."
            ],
            [
                "sentence" => "It ___ rain tomorrow, according to the forecast.",
                "answers" => ["will", "won't", "is", "does"],
                "correctAnswer" => "will",
                "missingWordCount" => 1,
                "correction" => "Predicciones con 'will'."
            ],
            [
                "sentence" => "They ___ not pass the test if they ___ study.",
                "answers" => ["will", "won't", "don't", "will"],
                "correctAnswer" => ["won't", "will"],
                "missingWordCount" => 2,
                "correction" => "Negación en futuro + condición: 'won’t pass' / 'will study'."
            ],
            [
                "sentence" => "She ___ call you later to explain.",
                "answers" => ["will", "won't", "is", "was"],
                "correctAnswer" => "will",
                "missingWordCount" => 1,
                "correction" => "Acciones voluntarias en futuro: 'will'."
            ],
            [
                "sentence" => "We ___ visit our grandparents and ___ stay for dinner.",
                "answers" => ["will", "won't", "are", "will"],
                "correctAnswer" => ["will", "will"],
                "missingWordCount" => 2,
                "correction" => "Dos acciones planeadas en futuro con 'will'."
            ],
            [
                "sentence" => "He ___ not go to the meeting because he ___ be busy.",
                "answers" => ["will", "won't", "be", "will"],
                "correctAnswer" => ["won't", "will"],
                "missingWordCount" => 2,
                "correction" => "Uso de 'won’t' para negación y 'will be' para predicción."
            ],
            [
                "sentence" => "I ___ help you carry those bags.",
                "answers" => ["will", "won't", "am", "do"],
                "correctAnswer" => "will",
                "missingWordCount" => 1,
                "correction" => "Ofrecimientos espontáneos en futuro: 'will'."
            ],
            [
                "sentence" => "They ___ finish the project next week.",
                "answers" => ["will", "won't", "are", "did"],
                "correctAnswer" => "will",
                "missingWordCount" => 1,
                "correction" => "Planificación futura: 'will finish'."
            ],
            [
                "sentence" => "She ___ not travel to Spain because she ___ save money.",
                "answers" => ["will", "won't", "is", "will"],
                "correctAnswer" => ["won't", "will"],
                "missingWordCount" => 2,
                "correction" => "Negación y afirmación en futuro simple."
            ],
            [
                "sentence" => "We ___ start the meeting at 9 a.m.",
                "answers" => ["will", "won't", "shall", "are"],
                "correctAnswer" => "will",
                "missingWordCount" => 1,
                "correction" => "Futuro programado con 'will'."
            ]
        ];
    }
}
