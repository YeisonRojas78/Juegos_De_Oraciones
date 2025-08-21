<?php
require_once __DIR__ . '/../models/Question.php';

class GameController {
    public function getQuestions() {
        return Question::getQuestions();
    }
}
