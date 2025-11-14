// =================================================================================
// PHẦN 1: KHAI BÁO BIẾN TOÀN CỤC VÀ DOM ELEMENTS
// =================================================================================

// --- Dữ liệu Game (sẽ được tải từ file JSON) ---
let knowledgeMap = null;
let fullQuestionBank = null;

// === [NÂNG CẤP] KHAI BÁO ÂM THANH ===
// Các file âm thanh ngắn, gọn, miễn phí bản quyền.

const soundCorrectBase64 = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjQwLjEwMQAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAABMYXZjAAAAAAAAAAAAAAAAAAAAAACj//tAwRAAAAPekQARPyAARQGgYVoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAExhbWVAAAAAAAAAAAAAAAAAAAAAADMAAAAAAAAAA//tAwSAAAAQAAB9AAAEgAAB9AAA//tAwQgAAAAUAAB9AAAEgAAB9AAA//tAwQAAAAAAB9AAAEgAAB9AA";
const soundIncorrectBase64 = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjQwLjEwMQAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAABMYXZjAAAAAAAAAAAAAAAAAAAAAACj//tAwRAAAAPekQARPyAARQGgYVoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAExhbWVAAAAAAAAAAAAAAAAAAAAAADMAAAAAAAAAA//tAwSAAAAQAAB9AAAEgAAB9AAA//tAwQgAAAAUAAB9AAAEgAAB9AAA//tAwQAAAAAAB9AAAEgAAB9AA";
const soundClickBase64 = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjQwLjEwMQAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAABMYXZjAAAAAAAAAAAAAAAAAAAAAACj//tAwRAAAAPekQARPyAARQGgYVoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAExhbWVAAAAAAAAAAAAAAAAAAAAAADMAAAAAAAAAA//tAwSAAAAQAAB9AAAEgAAB9AAA//tAwQgAAAAUAAB9AAAEgAAB9AAA//tAwQAAAAAAB9AAAEgAAB9AA";
const soundStartBase64 = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjQwLjEwMQAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAABMYXZjAAAAAAAAAAAAAAAAAAAAAACj//tAwRAAAAPekQARPyAARQGgYVoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAExhbWVAAAAAAAAAAAAAAAAAAAAAADMAAAAAAAAAA//tAwSAAAAQAAB9AAAEgAAB9AAA//tAwQgAAAAUAAB9AAAEgAAB9AAA//tAwQAAAAAAB9AAAEgAAB9AA";
const soundTimerTickBase64 = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjQwLjEwMQAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAABMYXZjAAAAAAAAAAAAAAAAAAAAAACj//tAwRAAAAPekQARPyAARQGgYVoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAExhbWVAAAAAAAAAAAAAAAAAAAAAADMAAAAAAAAAA//tAwSAAAAQAAB9AAAEgAAB9AAA//tAwQgAAAAUAAB9AAAEgAAB9AAA//tAwQAAAAAAB9AAAEgAAB9AA";
const soundPowerupBase64 = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjQwLjEwMQAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAABMYXZjAAAAAAAAAAAAAAAAAAAAAACj//tAwRAAAAPekQARPyAARQGgYVoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAExhbWVAAAAAAAAAAAAAAAAAAAAAADMAAAAAAAAAA//tAwSAAAAQAAB9AAAEgAAB9AAA//tAwQgAAAAUAAB9AAAEgAAB9AAA//tAwQAAAAAAB9AAAEgAAB9AA";

const soundCorrect = new Audio();
const soundIncorrect = new Audio();
const soundClick = new Audio();
const soundStart = new Audio();
const soundTimerTick = new Audio();
const soundPowerup = new Audio();

const loadSound = (audioElement, base64String, name) => {
    // Tăng giới hạn volume để nghe rõ hơn, bạn có thể điều chỉnh
    audioElement.volume = 0.7; 
    if (base64String && base64String.length > 100) { // Tăng kiểm tra độ dài một chút
        audioElement.src = base64String;
    } else {
        console.warn(`Chuỗi Base64 cho âm thanh '${name}' quá ngắn, có thể đã bị lỗi.`);
    }
    audioElement.onerror = () => console.warn(`Lỗi tải âm thanh '${name}'. Chuỗi Base64 trống hoặc sai.`);
};

loadSound(soundCorrect, soundCorrectBase64, 'đúng');
loadSound(soundIncorrect, soundIncorrectBase64, 'sai');
loadSound(soundClick, soundClickBase64, 'click');
loadSound(soundStart, soundStartBase64, 'bắt đầu');
loadSound(soundTimerTick, soundTimerTickBase64, 'đồng hồ');
loadSound(soundPowerup, soundPowerupBase64, 'trợ giúp');


// --- Trạng thái Game ---
let playerName = "Chiến Binh";
let gameMode = 'challenge'; // 'challenge' hoặc 'practice'
let gameActive = false;

// Trạng thái lựa chọn
let selectedGrade = null;
let selectedSubject = null;
let selectedChapterNames = [];

// Trạng thái vòng chơi hiện tại
let questionsInCurrentPlaythrough = [];
let wronglyAnsweredQuestions = [];
let currentQuestionIndex = 0;
let currentLives = 3;
let totalScore = 0;
let totalCorrectAnswers = 0;
let currentStreak = 0;
let gameReport = [];
let failedTopics = new Set();
let currentQuestionForGemini = null;

// Trạng thái trợ giúp
let powerUpFiftyFiftyCount = 1;
let powerUpAddTimeCount = 1;

// Trạng thái hẹn giờ
let questionTimerInterval = null;
let timeLeft = 0;

// --- Cấu hình Game ---
const QUESTION_TIME_LIMIT = 60;
let practiceQuestionsPerChapter = 4; // Có thể thay đổi trên UI
const LEADERBOARD_KEY = 'mathQuestLeaderboard';
const ACHIEVEMENTS_KEY = 'mathQuestAchievements';

// --- DOM Elements ---
// (Toàn bộ các hằng số getElementById của bạn được giữ nguyên ở đây)
const gameModal = document.getElementById('game-modal');
const practiceButton = document.getElementById('practice-button');
const challengeButton = document.getElementById('challenge-button');
const playerNameInput = document.getElementById('player-name-input');
// ... và tất cả các DOM element khác bạn đã khai báo ...
const gameContent = document.getElementById('game-content');
const chapterTitle = document.getElementById('chapter-title');
const chapterProgressBar = document.getElementById('chapter-progress-bar');
const totalScoreElement = document.getElementById('total-score');
const livesContainer = document.getElementById('lives-container');
const timerDisplay = document.getElementById('timer-display');
const timerCountdown = document.getElementById('timer-countdown');
const questionContainer = document.getElementById('question-container');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackMessage = document.getElementById('feedback-message');
const nextButton = document.getElementById('next-button');
const explainButton = document.getElementById('explain-button');
const confettiContainer = document.getElementById('confetti-container');
const chapterModal = document.getElementById('chapter-modal');
const chapterModalTitle = document.getElementById('chapter-modal-title');
const chapterModalIcon = document.getElementById('chapter-modal-icon');
const chapterModalMessage = document.getElementById('chapter-modal-message');
const chapterScore = document.getElementById('chapter-score');
const replayChapterButton = document.getElementById('replay-chapter-button');
const nextChapterButton = document.getElementById('next-chapter-button');
const chapterSelectionModal = document.getElementById('chapter-selection-modal');
const chapterSelectTitle = document.getElementById('chapter-select-title');
const chapterSelectGrid = document.getElementById('chapter-select-grid');
const practiceOptionsContainer = document.getElementById('practice-options-container');
const practiceQPCInput = document.getElementById('practice-qpc-input');
const backToMainButton = document.getElementById('back-to-main-button');
const startChapterSelectionButton = document.getElementById('start-chapter-selection-button');
const geminiModal = document.getElementById('gemini-modal');
const geminiModalTitle = document.getElementById('gemini-modal-title');
const geminiModalContent = document.getElementById('gemini-modal-content');
const geminiLoaderContainer = document.getElementById('gemini-loader-container');
const closeGeminiModalButton = document.getElementById('close-gemini-modal');
const reportPrintButton = document.getElementById('report-print-button');
const streakContainer = document.getElementById('streak-container');
const streakCounter = document.getElementById('streak-counter');
const powerup5050Btn = document.getElementById('powerup-5050');
const powerupAddTimeBtn = document.getElementById('powerup-add-time');
const powerup5050CountSpan = document.getElementById('powerup-5050-count');
const powerupAddTimeCountSpan = document.getElementById('powerup-add-time-count');
const reviewMistakesContainer = document.getElementById('review-mistakes-container');
const leaderboardButton = document.getElementById('leaderboard-button');
const leaderboardModal = document.getElementById('leaderboard-modal');
const closeLeaderboardModalBtn = document.getElementById('close-leaderboard-modal');
const leaderboardList = document.getElementById('leaderboard-list');
const achievementsButton = document.getElementById('achievements-button');
const achievementsModal = document.getElementById('achievements-modal');
const closeAchievementsModalBtn = document.getElementById('close-achievements-modal');
const achievementsList = document.getElementById('achievements-list');
// [MỚI] DOM Elements cho luồng chọn bài mới
const gradeSelectionModal = document.getElementById('grade-selection-modal');
const gradeSelectGrid = document.getElementById('grade-select-grid');
const subjectSelectionModal = document.getElementById('subject-selection-modal');
const subjectSelectTitle = document.getElementById('subject-select-title');
const subjectSelectGrid = document.getElementById('subject-select-grid');
const backToGradeSelectBtn = document.getElementById('back-to-grade-select');
// [SỬA ĐỔI] Đổi tên nút để linh hoạt hơn
const backFromChapterSelectBtn = document.getElementById('back-to-main-button'); // Giả sử bạn đổi id trong HTML


// =================================================================================
// PHẦN 2: KHỞI TẠO VÀ TẢI DỮ LIỆU
// =================================================================================

window.onload = function() {
    loadGameData();
};

async function loadGameData() {
    // ... Giữ nguyên hàm loadGameData của bạn ...
    try {
        console.log("Bắt đầu tải dữ liệu game...");
        const [mapResponse, bankResponse] = await Promise.all([
            fetch('js/knowledge_map.json'),
            fetch('js/database.json')
        ]);
        if (!mapResponse.ok || !bankResponse.ok) {
            throw new Error('Không thể tải file dữ liệu.');
        }
        knowledgeMap = await mapResponse.json();
        fullQuestionBank = await bankResponse.json();
        console.log("Tải dữ liệu thành công!");
        initializeApp();
    } catch (error) {
        console.error("Lỗi nghiêm trọng khi tải dữ liệu:", error);
        document.body.innerHTML = `<div style="color: red; padding: 2rem;">Lỗi: Không thể tải được ngân hàng câu hỏi. Vui lòng thử lại sau.</div>`;
    }
}

function initializeApp() {
    // Gán tất cả sự kiện onclick ở đây
    practiceButton.onclick = () => { gameMode = 'practice'; showGradeSelection(); };
    challengeButton.onclick = () => { gameMode = 'challenge'; showGradeSelection(); };
    
    // Nút quay lại
    backToGradeSelectBtn.onclick = showGradeSelection;
    backFromChapterSelectBtn.onclick = showSubjectSelection; // Nút quay lại từ màn hình chọn chương

    startChapterSelectionButton.onclick = () => startSelectedPlaythrough(false);
    
    // ... Giữ nguyên các onclick khác của bạn ...
    practiceQPCInput.onchange = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) val = 1; if (val > 10) val = 10;
        practiceQuestionsPerChapter = val; e.target.value = val;
    };
    nextButton.onclick = nextQuestionInChapter;
    explainButton.onclick = handleExplainAnswer;
    closeGeminiModalButton.onclick = closeGeminiModal;
    powerup5050Btn.onclick = useFiftyFifty;
    powerupAddTimeBtn.onclick = useAddTime;
    leaderboardButton.onclick = displayLeaderboard;
    closeLeaderboardModalBtn.onclick = () => leaderboardModal.classList.add('hidden');
    achievementsButton.onclick = displayAchievementsModal;
    closeAchievementsModalBtn.onclick = () => achievementsModal.classList.add('hidden');
}


// =================================================================================
// PHẦN 3: LOGIC PARSER DỮ LIỆU
// =================================================================================
// ... Giữ nguyên hàm parseLatexBlock của bạn ...
function parseLatexBlock(latexBlock, questionType) {
    try {
        let content = latexBlock.replace(/\\begin{ex}(.*?)\\end{ex}/s, '$1').trim();
        content = content.replace(/%\[.*?\]/g, '').trim();
        const result = { question: '', options: [], answer: '', tip: '', type: '' };
        const tipMatch = content.match(/\\loigiai\s*\{(.*?)\}/s);
        if (tipMatch) {
            result.tip = tipMatch[1].trim();
            content = content.replace(/\\loigiai\s*\{(.*?)\}/s, '').trim();
        }
        if (questionType === 'trac_nghiem_mot_dap_an') {
            result.type = 'mcq';
            const choiceMatch = content.match(/\\choice\s*\{(.*?)\}/s);
            if (!choiceMatch) return null;
            const questionText = content.substring(0, choiceMatch.index).trim();
            result.question = questionText.replace(/\\begin{center}[\s\S]*?\\end{center}/g, '[Hình ảnh minh họa]');
            let optionsBlock = choiceMatch[1];
            const optionRegex = /{\s*(\\True\s*)?(.*?)\s*}/g;
            let match;
            while ((match = optionRegex.exec(optionsBlock)) !== null) {
                const optionText = match[2].trim();
                result.options.push(optionText);
                if (match[1]) { result.answer = optionText; }
            }
        } else if (questionType === 'tra_loi_ngan') {
            result.type = 'fill';
            const answerMatch = content.match(/\\shortans\[.*?\]\s*\{(.*?)\}/s);
            if (!answerMatch) return null;
            result.answer = answerMatch[1].trim();
            result.question = content.replace(/\\shortans\[.*?\]\s*\{(.*?)\}/s, '').trim();
        } else {
            return null;
        }
        if (!result.question || !result.answer) return null;
        return result;
    } catch (error) {
        console.error("Lỗi khi phân tích LaTeX block:", error, latexBlock);
        return null;
    }
}

// =================================================================================
// PHẦN 4: LOGIC ĐIỀU HƯỚNG VÀ HIỂN THỊ MODAL
// =================================================================================

function showMainMenu() {
    // Ẩn tất cả các modal lựa chọn và game
    gradeSelectionModal.classList.add('hidden');
    subjectSelectionModal.classList.add('hidden');
    chapterSelectionModal.classList.add('hidden');
    chapterModal.classList.add('hidden');
    gameContent.classList.add('opacity-0');

    // Hiện menu chính
    gameModal.classList.remove('opacity-0', 'pointer-events-none');
}

// [MỚI] Hiển thị màn hình chọn Lớp
function showGradeSelection() {
    showMainMenu(); // Luôn reset về menu chính trước
    gameModal.classList.add('opacity-0', 'pointer-events-none');
    gradeSelectionModal.classList.remove('hidden');
    
    gradeSelectGrid.innerHTML = '';
    Object.keys(knowledgeMap).forEach(gradeKey => {
        const button = document.createElement('button');
        button.className = 'selection-button';
        button.textContent = `Lớp ${gradeKey}`;
        button.onclick = () => {
            selectedGrade = gradeKey;
            showSubjectSelection();
        };
        gradeSelectGrid.appendChild(button);
    });
}

// [MỚI] Hiển thị màn hình chọn Môn
function showSubjectSelection() {
    gradeSelectionModal.classList.add('hidden');
    subjectSelectionModal.classList.remove('hidden');

    const subjects = knowledgeMap[selectedGrade];
    subjectSelectTitle.textContent = `Chọn Môn - Lớp ${selectedGrade}`;
    subjectSelectGrid.innerHTML = '';

    Object.keys(subjects).forEach(subjectKey => {
        const subjectData = subjects[subjectKey];
        if (!subjectData.chapters || subjectData.chapters.length === 0) return;

        const button = document.createElement('button');
        button.className = 'selection-button';
        button.textContent = subjectData.name;
        button.onclick = () => {
            selectedSubject = subjectKey;
            populateChapterSelectionModal_New(); // Gọi hàm mới
            showChapterSelection();
        };
        subjectSelectGrid.appendChild(button);
    });
}

// [SỬA ĐỔI] Hiển thị màn hình chọn Chương
function showChapterSelection() {
    subjectSelectionModal.classList.add('hidden');
    chapterSelectionModal.classList.remove('hidden');
    practiceOptionsContainer.style.display = gameMode === 'practice' ? 'block' : 'none';
    chapterSelectTitle.textContent = `Chọn Chương - ${knowledgeMap[selectedGrade][selectedSubject].name}`;
}

// [SỬA ĐỔI] Hàm load chương mới, đọc từ knowledgeMap
function populateChapterSelectionModal_New() {
    chapterSelectGrid.innerHTML = '';
    const chapters = knowledgeMap[selectedGrade][selectedSubject].chapters;
    
    chapters.forEach(chapter => {
        const checkboxId = `chapter-checkbox-${chapter.id}`;
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <input type="checkbox" id="${checkboxId}" class="chapter-select-checkbox" value="${chapter.id}" data-chapter-name="${chapter.name}">
            <label for="${checkboxId}" class="chapter-select-label">${chapter.name}</label>
        `;
        wrapper.querySelector('input').onchange = validateChapterSelection;
        chapterSelectGrid.appendChild(wrapper);
    });
    validateChapterSelection(); // Kiểm tra ngay lần đầu load
}

function validateChapterSelection() {
    startChapterSelectionButton.disabled = getSelectedCheckboxes().length <= 0;
}

function getSelectedCheckboxes() {
    return Array.from(document.querySelectorAll('.chapter-select-checkbox:checked'));
}


// =================================================================================
// PHẦN 5: LOGIC CỐT LÕI CỦA GAME (BẮT ĐẦU, KẾT THÚC, HIỂN THỊ CÂU HỎI)
// =================================================================================

// [SỬA ĐỔI HOÀN TOÀN] Hàm bắt đầu game
function startSelectedPlaythrough(isReviewMode = false) {
    gameActive = true;
    currentQuestionIndex = 0;
    totalScore = 0;
    totalCorrectAnswers = 0;
    currentStreak = 0;
    failedTopics.clear();
    gameReport = [];
    powerUpFiftyFiftyCount = 1;
    powerUpAddTimeCount = 1;

    playerName = playerNameInput.value.trim() || "Chiến Binh";
    soundStart.play().catch(e => {});

    if (isReviewMode) {
        questionsInCurrentPlaythrough = JSON.parse(sessionStorage.getItem('mistakesToReview') || '[]');
        chapterTitle.textContent = `Ôn Tập Các Câu Sai`;
    } else {
        const selectedCheckboxes = getSelectedCheckboxes();
        const selectedChapterIds = selectedCheckboxes.map(cb => parseInt(cb.value));
        selectedChapterNames = selectedCheckboxes.map(cb => cb.dataset.chapterName);

        // Ánh xạ mã lớp trong game với mã lớp trong metadata
        const gradeMap = { "9": "9", "10": "0", "11": "1", "12": "2" };
        const metadataGradeCode = gradeMap[selectedGrade];

        // LỌC câu hỏi từ database
        const filteredRawQuestions = fullQuestionBank.filter(q => 
            q.metadata.lop_ma === metadataGradeCode &&
            q.metadata.mon_ma === selectedSubject &&
            selectedChapterIds.includes(q.metadata.chuong)
        );

        // "DỊCH" câu hỏi đã lọc
        questionsInCurrentPlaythrough = filteredRawQuestions
            .map(q => parseLatexBlock(q.latex_block, q.question_type))
            .filter(q => q !== null);

        // XÁO TRỘN và GIỚI HẠN số lượng
        questionsInCurrentPlaythrough = shuffleArray(questionsInCurrentPlaythrough);
        const numQuestionsPerChapter = gameMode === 'practice' ? practiceQuestionsPerChapter : 10;
        const totalQuestionsToPlay = Math.min(questionsInCurrentPlaythrough.length, selectedChapterIds.length * numQuestionsPerChapter);
        questionsInCurrentPlaythrough = questionsInCurrentPlaythrough.slice(0, totalQuestionsToPlay);
        
        chapterTitle.textContent = `${gameMode === 'challenge' ? 'Thử Thách' : 'Luyện Tập'}: ${selectedChapterNames.length} chương`;
    }

    if (questionsInCurrentPlaythrough.length === 0) {
        alert("Không tìm thấy câu hỏi phù hợp cho lựa chọn này. Vui lòng thử lại.");
        showChapterSelection();
        return;
    }

    // Cập nhật UI và bắt đầu
    if (gameMode === 'challenge') {
        currentLives = 3;
        livesContainer.style.display = 'block';
    } else {
        currentLives = 99; // Mạng không giới hạn cho chế độ luyện tập
        livesContainer.style.display = 'none';
    }
    updateLivesDisplay();
    
    chapterSelectionModal.classList.add('hidden');
    gameContent.classList.remove('opacity-0');

    loadQuestion();
    updateProgress();
    updateStreakDisplay();
}

// ... Giữ nguyên các hàm loadQuestion, endGame, showFeedback, checkAnswer, v.v. ...
// Đảm bảo hàm loadQuestion của bạn có dòng sau:
// const cleanedQuestion = q.question.replace(/(\r\n|\n|\r)/gm, " ").trim();
// questionText.innerHTML = `<span>${cleanedQuestion}</span>`;
function loadQuestion() {
    if (!gameActive || currentQuestionIndex >= questionsInCurrentPlaythrough.length) {
        endGame();
        return;
    }
    const q = questionsInCurrentPlaythrough[currentQuestionIndex];
    currentQuestionForGemini = q;
    questionNumber.textContent = `Câu ${currentQuestionIndex + 1}/${questionsInCurrentPlaythrough.length}:`;
    const cleanedQuestion = q.question.replace(/(\r\n|\n|\r)/gm, " ").trim();
    questionText.innerHTML = `<span>${cleanedQuestion}</span>`;
    optionsContainer.innerHTML = '';
    feedbackMessage.classList.add('opacity-0');
    nextButton.classList.add('hidden');
    nextButton.disabled = true;
    explainButton.classList.add('hidden');
    confettiContainer.innerHTML = '';
    updatePowerUpButtons();
    timerDisplay.style.display = (gameMode === 'challenge') ? 'flex' : 'none';
    if (gameMode === 'challenge') startQuestionTimer();
    if (q.type === 'fill') {
        optionsContainer.innerHTML = `<div class="flex flex-col items-center justify-center gap-4 py-8"><input type="text" id="fill-in-blank-input" class="fill-in-blank-input" placeholder="Nhập đáp án của bạn..."><button id="fill-in-blank-submit" class="fill-in-blank-submit">Kiểm Tra</button></div>`;
        const input = document.getElementById('fill-in-blank-input');
        input.onkeydown = (e) => { if (e.key === 'Enter') checkFillInBlankAnswer(q); };
        document.getElementById('fill-in-blank-submit').onclick = () => checkFillInBlankAnswer(q);
        setTimeout(() => input.focus(), 100);
    } else {
        optionsContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';
        shuffleArray([...q.options]).forEach(option => {
            const button = document.createElement('button');
            button.innerHTML = option;
            button.dataset.optionValue = option;
            button.classList.add('option-button', 'w-full', 'p-4', 'rounded-xl', 'text-lg', 'font-medium', 'text-left');
            button.onclick = () => checkAnswer(button, option, q.answer);
            optionsContainer.appendChild(button);
        });
    }
    if (window.MathJax) MathJax.typesetPromise([questionContainer, optionsContainer]).catch(console.error);
    updateProgress();
}

function endGame() {
    gameActive = false;
    clearInterval(questionTimerInterval);
    checkAchievements();
    if (gameMode === 'challenge') {
        saveScoreToLeaderboard(playerName, totalScore);
    }
    chapterModal.classList.remove('hidden');
    chapterModal.classList.add('flex');
    gameContent.classList.add('opacity-0');
    chapterModalTitle.textContent = `Hoàn Thành Chặng!`;
    chapterScore.textContent = `${totalCorrectAnswers}/${questionsInCurrentPlaythrough.length}`;
    if (gameMode === 'challenge') {
        const passed = totalCorrectAnswers >= Math.ceil(questionsInCurrentPlaythrough.length / 2);
        chapterModalIcon.textContent = passed ? '🥳' : '😥';
        chapterModalMessage.innerHTML = passed ? `Xuất sắc, ${playerName}!` : `Hãy cố gắng hơn nhé, ${playerName}!`;
    } else {
        chapterModalIcon.textContent = '👍';
        chapterModalMessage.innerHTML = `Bạn đã hoàn thành luyện tập, ${playerName}!`;
    }
    chapterModalMessage.innerHTML += `<br>Tổng điểm: <span class="text-yellow-300 text-3xl font-extrabold">${totalScore}</span><br><br><div class="flex flex-wrap justify-center gap-4 mt-4 scale-90"><button onclick="handleStudyPlan()" class="bg-yellow-400 text-blue-800 font-extrabold py-3 px-6 rounded-full text-lg shadow-xl hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105">✨ Nhận Tư Vấn</button><button onclick="showDetailedReport()" class="bg-sky-500 text-white font-extrabold py-3 px-6 rounded-full text-lg shadow-xl hover:bg-sky-400 transition-all duration-300 transform hover:scale-105"><i class="fas fa-list-ol mr-2"></i> Xem Báo Cáo</button></div>`;
    reviewMistakesContainer.innerHTML = '';
    if (wronglyAnsweredQuestions.length > 0) {
        sessionStorage.setItem('mistakesToReview', JSON.stringify(wronglyAnsweredQuestions));
        const reviewButton = document.createElement('button');
        reviewButton.innerHTML = `<i class="fas fa-book-medical mr-2"></i> Ôn lại ${wronglyAnsweredQuestions.length} câu sai`;
        reviewButton.className = 'review-mistakes-button';
        reviewButton.onclick = () => startSelectedPlaythrough(true);
        reviewMistakesContainer.appendChild(reviewButton);
    }
    replayChapterButton.onclick = () => startSelectedPlaythrough(false); 
    nextChapterButton.onclick = showMainMenu;
}

// =================================================================================
// PHẦN 6: CÁC HÀM TIỆN ÍCH VÀ TÍNH NĂNG PHỤ
// =================================================================================

function shuffleArray(array) {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
// ... Giữ nguyên toàn bộ các hàm còn lại của bạn ...
// (showFeedback, disableAllInputs, checkAnswer, checkFillInBlankAnswer,
// nextQuestionInChapter, updatePowerUpButtons, useFiftyFifty, useAddTime,
// getLeaderboard, saveScoreToLeaderboard, displayLeaderboard, updateProgress,
// updateLivesDisplay, updateStreakDisplay, startQuestionTimer, handleTimeUp,
// triggerConfetti, callGeminiAPI, showGeminiModal, closeGeminiModal,
// handleExplainAnswer, handleStudyPlan, showDetailedReport, exportReportAsHTML)
// Và các hàm của hệ thống Danh hiệu
// ...
function showFeedback(isCorrect, correctAnswerString, customMessage = null) {
    clearInterval(questionTimerInterval);
    if (isCorrect) {
        currentStreak++;
        const baseScore = 10, bonusScore = getStreakBonus(currentStreak);
        totalScore += baseScore + bonusScore;
        totalCorrectAnswers++;
        feedbackMessage.textContent = `Chính xác! +${baseScore} điểm` + (bonusScore > 0 ? ` (+${bonusScore} Chuỗi 🔥)` : '');
        feedbackMessage.className = 'text-lg font-bold p-2 rounded-lg flex-1 bg-green-100 text-green-800 correct-animation';
        triggerConfetti();
        soundCorrect.play().catch(e => {});
        checkAchievements();
    } else {
        currentStreak = 0;
        wronglyAnsweredQuestions.push(questionsInCurrentPlaythrough[currentQuestionIndex]);
        if (gameMode === 'challenge') {
            currentLives--;
            updateLivesDisplay();
        }
        soundIncorrect.play().catch(e => {});
        feedbackMessage.textContent = `${customMessage || "Ôi, sai rồi!"} Đáp án đúng là: ${correctAnswerString}`;
        feedbackMessage.className = 'text-lg font-bold p-2 rounded-lg flex-1 bg-red-100 text-red-800';
        if (currentQuestionForGemini) failedTopics.add(currentQuestionForGemini.topic);
    }
    nextButton.classList.remove('hidden');
    nextButton.disabled = false;
    explainButton.classList.remove('hidden');
    if (window.MathJax) MathJax.typesetPromise([feedbackMessage]).catch(console.error);
    updateProgress();
    updateStreakDisplay();
    if (gameMode === 'challenge' && currentLives === 0) {
        nextButton.disabled = true;
        explainButton.disabled = true;
        feedbackMessage.textContent = `Bạn đã hết mạng... Đáp án đúng là: ${correctAnswerString}`;
        gameReport.push({ question: currentQuestionForGemini.question, userAnswer: `[Hết Mạng]`, correctAnswer: currentQuestionForGemini.answer });
        setTimeout(endGame, 1500); 
    }
}
function disableAllInputs() {
    clearInterval(questionTimerInterval);
    document.querySelectorAll('.option-button, #fill-in-blank-submit').forEach(el => el.disabled = true);
    const input = document.getElementById('fill-in-blank-input');
    if (input) input.disabled = true;
    powerup5050Btn.disabled = true;
    powerupAddTimeBtn.disabled = true;
}
function checkAnswer(selectedButton, selectedValue, correctAnswer) {
    if (!gameActive || !nextButton.disabled) return;
    soundClick.play().catch(e => {});
    disableAllInputs();
    Array.from(optionsContainer.children).forEach(btn => { if (btn.dataset.optionValue === correctAnswer) btn.classList.add('correct'); });
    const isCorrect = (selectedValue === correctAnswer);
    gameReport.push({ question: currentQuestionForGemini.question, userAnswer: selectedValue, correctAnswer: correctAnswer });
    selectedButton.classList.add(isCorrect ? 'correct' : 'incorrect');
    showFeedback(isCorrect, correctAnswer);
}
function checkFillInBlankAnswer(q) {
    if (!gameActive || !nextButton.disabled) return;
    soundClick.play().catch(e => {});
    disableAllInputs();
    const input = document.getElementById('fill-in-blank-input');
    const userAnswer = input.value.trim().replace(/\s/g, '').toLowerCase();
    const correctAnswer = q.answer.trim().replace(/\s/g, '').replace(/\\/g, '').toLowerCase();
    const isCorrect = (userAnswer === correctAnswer);
    gameReport.push({ question: q.question, userAnswer: input.value.trim(), correctAnswer: q.answer });
    input.classList.add(isCorrect ? 'correct' : 'incorrect');
    showFeedback(isCorrect, q.answer);
}
function nextQuestionInChapter() {
    if (gameMode === 'challenge' && currentLives === 0) return;
    currentQuestionIndex++;
    loadQuestion();
}
function updatePowerUpButtons() {
    powerup5050CountSpan.textContent = powerUpFiftyFiftyCount;
    powerupAddTimeCountSpan.textContent = powerUpAddTimeCount;
    const q = questionsInCurrentPlaythrough[currentQuestionIndex];
    const isMCQ = q && q.type === 'mcq';
    powerup5050Btn.disabled = powerUpFiftyFiftyCount <= 0 || !isMCQ;
    powerupAddTimeBtn.disabled = powerUpAddTimeCount <= 0 || gameMode !== 'challenge';
}
function useFiftyFifty() {
    if (powerup5050Btn.disabled) return;
    soundPowerup.play().catch(e => {});
    powerUpFiftyFiftyCount--;
    const q = questionsInCurrentPlaythrough[currentQuestionIndex];
    const wrongOptions = q.options.filter(opt => opt !== q.answer);
    const optionsToHide = shuffleArray(wrongOptions).slice(0, 2);
    document.querySelectorAll('.option-button').forEach(btn => {
        if (optionsToHide.includes(btn.dataset.optionValue)) {
            btn.disabled = true;
            btn.style.opacity = '0.3';
        }
    });
    updatePowerUpButtons();
}
function useAddTime() {
    if (powerupAddTimeBtn.disabled) return;
    soundPowerup.play().catch(e => {});
    powerUpAddTimeCount--;
    timeLeft += 15;
    timerCountdown.textContent = timeLeft;
    updatePowerUpButtons();
}
function getLeaderboard() {
    try {
        const data = localStorage.getItem(LEADERBOARD_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Lỗi đọc Bảng xếp hạng:", e);
        return [];
    }
}
function saveScoreToLeaderboard(name, score) {
    if (score <= 0) return;
    const leaderboard = getLeaderboard();
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    const topScores = leaderboard.slice(0, 10);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(topScores));
}
function displayLeaderboard() {
    leaderboardModal.classList.remove('hidden');
    leaderboardModal.classList.add('flex');
    const leaderboard = getLeaderboard();
    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = '<li class="text-gray-500 justify-center">Chưa có ai trên bảng xếp hạng!</li>';
        return;
    }
    leaderboardList.innerHTML = leaderboard.map(entry => 
        `<li><span>${entry.name}</span><span class="leaderboard-score">${entry.score} điểm</span></li>`
    ).join('');
}
function updateProgress() {
    if (gameMode === 'challenge') updateLivesDisplay();
    const progress = (questionsInCurrentPlaythrough.length > 0) ? ((currentQuestionIndex) / questionsInCurrentPlaythrough.length) * 100 : 0;
    chapterProgressBar.style.width = `${progress}%`;
    if (totalScoreElement.textContent !== totalScore.toString()) {
        totalScoreElement.textContent = totalScore;
        totalScoreElement.classList.add('score-updated');
        setTimeout(() => totalScoreElement.classList.remove('score-updated'), 400);
    }
}
function updateLivesDisplay() { if (livesContainer) livesContainer.textContent = '❤️'.repeat(currentLives) + '💔'.repeat(3 - currentLives); }
function updateStreakDisplay() {
    if (currentStreak >= 2) {
        streakCounter.textContent = currentStreak;
        if (streakContainer.classList.contains('hidden')) {
            streakContainer.classList.remove('hidden');
            streakContainer.classList.add('streak-activated');
            setTimeout(() => streakContainer.classList.remove('streak-activated'), 500);
        }
    } else {
        streakContainer.classList.add('hidden');
    }
}
function getStreakBonus(streak) { if (streak >= 7) return 15; if (streak >= 5) return 10; if (streak >= 3) return 5; return 0; }
function startQuestionTimer() {
    clearInterval(questionTimerInterval);
    timeLeft = QUESTION_TIME_LIMIT;
    timerCountdown.textContent = timeLeft;
    timerDisplay.className = 'text-2xl font-bold text-blue-600 bg-blue-100 px-4 py-1 rounded-full shadow-inner';
    questionTimerInterval = setInterval(() => {
        timeLeft--;
        timerCountdown.textContent = timeLeft;
        if (timeLeft <= 10 && timeLeft > 0) {
            timerDisplay.className = 'text-2xl font-bold text-red-600 bg-red-100 px-4 py-1 rounded-full shadow-inner animate-pulse';
            soundTimerTick.play().catch(e => {});
        } else if (timeLeft <= 0) {
            handleTimeUp();
        }
    }, 1000);
}
function handleTimeUp() {
    clearInterval(questionTimerInterval);
    disableAllInputs();
    const q = questionsInCurrentPlaythrough[currentQuestionIndex];
    gameReport.push({ question: q.question, userAnswer: `[Hết Giờ]`, correctAnswer: q.answer });
    showFeedback(false, q.answer, "Hết giờ!");
}
function triggerConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti ' + ['blue', 'green', 'red', ''][Math.floor(Math.random() * 4)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        if (confettiContainer) confettiContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}
async function callGeminiAPI(userPrompt, systemPrompt) {
    const apiKey = "";
    if (!apiKey) { return "Rất tiếc, tính năng này chưa được cấu hình. Vui lòng thêm API Key."; }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    const payload = { contents: [{ parts: [{ text: userPrompt }] }], systemInstruction: { parts: [{ text: systemPrompt }] } };
    try {
        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const result = await response.json();
        return result.candidates?.[0]?.content?.parts?.[0]?.text || "Không nhận được phản hồi từ AI.";
    } catch (error) { console.error("Error calling Gemini:", error); return "Rất tiếc, đã có lỗi xảy ra khi kết nối với AI."; }
}
function showGeminiModal(title) { 
    geminiModalTitle.textContent = title; 
    geminiModalContent.innerHTML = ''; 
    geminiLoaderContainer.style.display = 'flex'; 
    reportPrintButton.classList.add('hidden'); 
    geminiModal.classList.remove('hidden'); 
    geminiModal.classList.add('flex'); 
}
function closeGeminiModal() { 
    geminiModal.classList.add('hidden'); 
}
async function handleExplainAnswer() {
    if (!currentQuestionForGemini) return;
    showGeminiModal("✨ Đang tải giải thích...");
    const q = currentQuestionForGemini;
    let optionsString = (q.type === 'mcq') ? `Các lựa chọn: ${q.options.join(', ')}` : "Đây là câu hỏi điền khuyết.";
    const systemPrompt = "Bạn là một gia sư Toán THPT thân thiện và thông thái. Hãy giải thích đáp án của câu hỏi sau một cách cặn kẽ, từng bước một. Sử dụng MathJax (ví dụ: $...$) cho các công thức toán. Bắt đầu bằng một lời giải thích trực tiếp, không cần chào hỏi.";
    const userPrompt = `Hãy giải thích từng bước câu hỏi này:\nCâu hỏi: ${q.question}\n${optionsString}\nĐáp án đúng: ${q.answer}\nMẹo/Tip: ${q.tip}`;
    const responseText = await callGeminiAPI(userPrompt, systemPrompt);
    geminiLoaderContainer.style.display = 'none';
    geminiModalContent.innerHTML = responseText;
    if (window.MathJax) MathJax.typesetPromise([geminiModalContent]).catch(console.error);
}
async function handleStudyPlan() {
    showGeminiModal("✨ Đang tạo kế hoạch ôn tập...");
    const systemPrompt = "Bạn là một gia sư Toán THPT tâm lý. Một học sinh vừa làm sai các chủ đề sau. Hãy đưa ra 3 gạch đầu dòng ngắn gọn, tập trung vào các hành động cụ thể (ví dụ: 'Ôn lại...', 'Luyện tập...') để giúp học sinh cải thiện. Nếu danh sách chủ đề trống, hãy chúc mừng học sinh.";
    let userPrompt = (failedTopics.size === 0) ? "Học sinh này không làm sai chủ đề nào cả." : `Học sinh này vừa làm sai ở các chủ đề sau: ${Array.from(failedTopics).join(', ')}.`;
    const responseText = await callGeminiAPI(userPrompt, systemPrompt);
    geminiLoaderContainer.style.display = 'none';
    geminiModalContent.innerHTML = responseText.replace(/\n/g, '<br>');
}
function showDetailedReport() {
    showGeminiModal("Báo Cáo Chi Tiết Thành Tích");
    geminiLoaderContainer.style.display = 'none';
    reportPrintButton.classList.remove('hidden');
    reportPrintButton.onclick = exportReportAsHTML;
    const totalQuestions = questionsInCurrentPlaythrough.length;
    const accuracy = totalQuestions > 0 ? ((totalCorrectAnswers / totalQuestions) * 100).toFixed(1) : 0;
    const accuracyColor = accuracy >= 50 ? 'text-green-600' : 'text-red-600';
    let chaptersHtml = selectedChapterNames.map(name => `<span class="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full">${name}</span>`).join('');
    let reportHtml = `<div id="report-content-exportable"><div class="text-center mb-6 pb-4 border-b border-gray-300"><h1 class="text-3xl font-extrabold text-indigo-800">BÁO CÁO KẾT QUẢ MATH QUEST</h1><p class="text-lg text-gray-600 mt-2">Ngày: ${new Date().toLocaleDateString('vi-VN')}</p></div><div class="grid grid-cols-2 gap-6 mb-6"><div><p class="text-sm font-semibold text-gray-500 uppercase">NGƯỜI CHƠI</p><p class="text-2xl font-bold text-gray-900">${playerName}</p></div><div><p class="text-sm font-semibold text-gray-500 uppercase">CHẾ ĐỘ</p><p class="text-2xl font-bold text-gray-900">${gameMode === 'challenge' ? 'Thử Thách' : 'Luyện Tập'}</p></div><div><p class="text-sm font-semibold text-gray-500 uppercase">TỶ LỆ ĐÚNG</p><p class="text-4xl font-extrabold ${accuracyColor}">${accuracy}%</p><p class="text-lg text-gray-600">(${totalCorrectAnswers} / ${totalQuestions} câu)</p></div><div><p class="text-sm font-semibold text-gray-500 uppercase">TỔNG ĐIỂM</p><p class="text-4xl font-extrabold text-yellow-500">${totalScore}</p></div></div><div class="mb-8"><p class="text-sm font-semibold text-gray-500 uppercase mb-2">CÁC CHƯƠNG ĐÃ HOÀN THÀNH</p><div>${chaptersHtml || 'Không có'}</div></div><h2 class="text-2xl font-bold text-indigo-800 mb-4 pb-2 border-b border-gray-300">CHI TIẾT CÂU HỎI</h2><div class="text-left space-y-6 text-base">`;
    gameReport.forEach((entry, index) => {
        const userAnswerNorm = entry.userAnswer.toString().trim().replace(/\s/g, '').toLowerCase();
        const correctAnswerNorm = entry.correctAnswer.toString().trim().replace(/\s/g, '').toLowerCase();
        const isCorrect = userAnswerNorm === correctAnswerNorm;
        const icon = isCorrect ? '<span class="text-green-600 font-bold"><i class="fas fa-check-circle"></i> Đúng</span>' : '<span class="text-red-600 font-bold"><i class="fas fa-times-circle"></i> Sai</span>';
        reportHtml += `<div class="report-question-item pb-4 border-b border-gray-200"><p class="font-bold text-lg text-indigo-700">Câu ${index + 1}: ${icon}</p><p class="font-medium my-2 text-gray-800" style="font-size: 1.1rem;">${entry.question}</p><p class="text-base">Bạn trả lời: <span class="text-gray-700 font-medium">${entry.userAnswer || "[Không trả lời]"}</span></p><p class="text-base">Đáp án đúng: <span class="text-green-700 font-medium">${entry.correctAnswer}</span></p></div>`;
    });
    reportHtml += `</div></div>`;
    geminiModalContent.innerHTML = reportHtml;
    if (window.MathJax) MathJax.typesetPromise([geminiModalContent]).catch(console.error);
}
function exportReportAsHTML() {
    const customStyles = document.querySelector('style') ? document.querySelector('style').innerHTML : '';
    const reportContentElement = document.getElementById('report-content-exportable');
    if (!reportContentElement) return;
    const reportHtmlContent = reportContentElement.innerHTML;
    const fullHtml = `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>Báo Cáo Math Quest - ${playerName}</title><script src="https://cdn.tailwindcss.com"></script><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"><style>body{font-family:"Inter",sans-serif;background-color:#f3f4f6;padding:2rem;} ${customStyles} #report-content-exportable{max-width:800px;margin:auto;background-color:white;padding:2rem;border-radius:1rem;box-shadow:0 10px 25px rgba(0,0,0,0.1);}</style></head><body>${reportHtmlContent}</body></html>`;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BaoCao_MathQuest_${playerName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0,10)}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
let unlockedAchievements = []; 
function loadUnlockedAchievements() { const saved = localStorage.getItem(ACHIEVEMENTS_KEY); unlockedAchievements = saved ? JSON.parse(saved) : []; }
function saveUnlockedAchievements() { localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(unlockedAchievements)); }
function showAchievementToast(achievement) { if (!achievement) return; toastIcon.textContent = achievement.icon; toastName.textContent = achievement.name; achievementToast.classList.add('show'); setTimeout(() => { achievementToast.classList.remove('show'); }, 4000); }
function unlockAchievement(id) { if (!unlockedAchievements.includes(id)) { unlockedAchievements.push(id); saveUnlockedAchievements(); showAchievementToast(allAchievements[id]); console.log(`Đã mở khóa danh hiệu: ${allAchievements[id].name}`); } }
function displayAchievementsModal() {
    achievementsList.innerHTML = '';
    Object.keys(allAchievements).forEach(id => {
        const ach = allAchievements[id];
        const isUnlocked = unlockedAchievements.includes(id);
        const li = document.createElement('li');
        li.className = isUnlocked ? 'unlocked' : 'locked';
        li.innerHTML = `<div class="ach-icon">${isUnlocked ? ach.icon : '❓'}</div><div class="ach-details"><span class="ach-name">${ach.name}</span><span class="ach-desc">${ach.description}</span></div>`;
        achievementsList.appendChild(li);
    });
    achievementsModal.classList.remove('hidden');
    achievementsModal.classList.add('flex');
}
function checkAchievements() {
    if (currentStreak >= 3) unlockAchievement('streak3');
    if (currentStreak >= 5) unlockAchievement('streak5');
    if (gameActive) return;
    unlockAchievement('firstWin');
    if (wronglyAnsweredQuestions.length === 0 && questionsInCurrentPlaythrough.length > 0) {
        unlockAchievement('perfectChapter');
    }
    if (gameMode === 'challenge' && currentLives === 3) {
        unlockAchievement('challengeMaster');
    }
    if (gameMode === 'challenge' && totalScore >= 100) {
        unlockAchievement('scholar');
    }
}