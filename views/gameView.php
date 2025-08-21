<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>English Sentence Game</title>
    <link rel="stylesheet" href="public/css/styles.css">
    <script src="https://cdn.tailwindcss.com"></script>
    
</head>

<body class="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-blue-600 p-6 text-center">
            <h1 class="text-2xl font-bold text-white">Complete the Sentence</h1>
            <p class="text-blue-100">Select the correct missing words</p>
        </div>

        <!-- Game Area -->
        <div class="p-6">
            <!-- Timer -->
            <div class="mb-6">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium text-gray-700">Time remaining</span>
                    <span id="time" class="text-sm font-bold text-gray-900">30s</span>
                </div>
                <div class="timer-container">
                    <div id="timerProgress" class="timer-progress" style="width: 100%"></div>
                </div>
            </div>

            <!-- Questions -->
            <div id="questionContainer"></div>

            <!-- Feedback -->
            <div id="feedbackContainer" class="hidden"></div>

            <!-- Results -->
            <div id="resultsContainer" class="hidden text-center py-8"></div>
            <div id="questionContainer"></div>

            <div class="mt-4">
                <button
                    id="confirmButton"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled>
                    Confirmar y pasar a la siguiente
                </button>
            </div>
        </div>
    </div>

    <script>
        const questions = <?= json_encode($questions) ?>;
    </script>
    <script src="public/js/game.js"></script>
</body>

</html>