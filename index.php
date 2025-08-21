<?php
require_once "controllers/GameController.php";

$controller = new GameController();
$questions = $controller->getQuestions();

include "views/gameView.php";
