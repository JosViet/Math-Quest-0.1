// =================================================================================
// PHẦN 1: KHAI BÁO BIẾN TOÀN CỤC VÀ DOM ELEMENTS
// =================================================================================

// --- Dữ liệu Game (sẽ được tải từ file JSON) ---
let knowledgeMap = null;
let fullQuestionBank = null;

// --- Âm thanh ---
const soundCorrect = new Audio(); const soundIncorrect = new Audio();
const soundClick = new Audio(); const soundStart = new Audio();
const soundTimerTick = new Audio(); const soundPowerup = new Audio();

// [!!!] HÃY DÁN CÁC CHUỖI BASE64 ÂM THANH CỦA BẠN VÀO ĐÂY
const soundCorrectBase64 = "data:audio/mpeg;base64,..."; 
const soundIncorrectBase64 = "data:audio/mpeg;base64,...";
const soundClickBase64 = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjQwLjEwMQ... (chuỗi đầy đủ)";
const soundStartBase64 = "data:audio/mpeg;base64,...";
const soundTimerTickBase64 = "data:audio/mpeg;base64,...";
const soundPowerupBase64 = "data:audio/mpeg;base64,...";

const loadSound = (audioElement, base64String, name) => {
    audioElement.volume = 0.7; 
    if (base64String && base64String.length > 100) { audioElement.src = base64String; } 
    else { console.warn(`Chuỗi Base64 cho âm thanh '${name}' quá ngắn hoặc trống.`); }
    audioElement.onerror = () => console.warn(`Lỗi khi tải âm thanh '${name}'.`);
};

// --- Trạng thái Game ---
let playerName = "Chiến Binh";
let gameMode = 'challenge';
let gameActive = false;
let selectedGrade = null;
let selectedSubject = null;
let selectedChapterNames = [];
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
let powerUpFiftyFiftyCount = 1;
let powerUpAddTimeCount = 1;
let questionTimerInterval = null;
let timeLeft = 0;

// --- Cấu hình Game ---
const QUESTION_TIME_LIMIT = 60;
let practiceQuestionsPerChapter = 4;
const LEADERBOARD_KEY = 'mathQuestLeaderboard';
const ACHIEVEMENTS_KEY = 'mathQuestAchievements';

// --- DOM Elements ---
const gameModal = document.getElementById('game-modal');
const practiceButton = document.getElementById('practice-button');
const challengeButton = document.getElementById('challenge-button');
const playerNameInput = document.getElementById('player-name-input');
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
const gradeSelectionModal = document.getElementById('grade-selection-modal');
const gradeSelectGrid = document.getElementById('grade-select-grid');
const subjectSelectionModal = document.getElementById('subject-selection-modal');
const subjectSelectTitle = document.getElementById('subject-select-title');
const subjectSelectGrid = document.getElementById('subject-select-grid');
const backToGradeSelectBtn = document.getElementById('back-to-grade-select');
const backFromChapterSelectBtn = document.getElementById('back-to-subject-select'); 


// =================================================================================
// PHẦN 2: KHỞI TẠO VÀ TẢI DỮ LIỆU
// =================================================================================

document.addEventListener('DOMContentLoaded', function() {
    loadGameData();
});

async function loadGameData() {
    const messageInterval = showLoadingMessages();
    try {
        console.log("Bắt đầu tải dữ liệu game...");
        const [mapResponse, bankResponse] = await Promise.all([
            fetch('./js/knowledge_map.json'),
            fetch('./js/database.json')
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
        document.body.innerHTML = `<div style="text-align: center; color: red; padding: 2rem; font-size: 1.2rem;">Lỗi: Không thể tải được ngân hàng câu hỏi.<br>Vui lòng thử lại sau hoặc liên hệ quản trị viên.</div>`;
    } finally {
        clearInterval(messageInterval); // Dừng đổi thông điệp khi tải xong (dù thành công hay thất bại)
    }
}

function initializeApp() {
    // [QUAN TRỌNG] Ẩn màn hình loading ngay lập tức
    const loader = document.getElementById('initial-loader');
    if (loader) {
        // Thêm hiệu ứng mờ dần đẹp mắt
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500); // Ẩn sau khi hiệu ứng kết thúc
    }

    // Tải âm thanh
    loadSound(soundCorrect, soundCorrectBase64, 'đúng'); loadSound(soundIncorrect, soundIncorrectBase64, 'sai');
    loadSound(soundClick, soundClickBase64, 'click'); loadSound(soundStart, soundStartBase64, 'bắt đầu');
    loadSound(soundTimerTick, soundTimerTickBase64, 'đồng hồ'); loadSound(soundPowerup, soundPowerupBase64, 'trợ giúp');

    // [NÂNG CẤP] Tạo một hàm phụ để gán sự kiện an toàn
    const safeSetOnClick = (element, handler) => {
        if (element) {
            element.onclick = handler;
        } else {
            // Lỗi này sẽ chỉ hiện ra cho bạn, không làm crash game
            console.error('Lỗi: Không tìm thấy một DOM element cần thiết. Kiểm tra lại ID trong HTML.');
        }
    };

    // Gán sự kiện onclick một cách an toàn
    safeSetOnClick(practiceButton, () => { gameMode = 'practice'; showGradeSelection(); });
    safeSetOnClick(challengeButton, () => { gameMode = 'challenge'; showGradeSelection(); });
    safeSetOnClick(backToGradeSelectBtn, showGradeSelection);
    safeSetOnClick(backFromChapterSelectBtn, showSubjectSelection); 
    safeSetOnClick(startChapterSelectionButton, () => startSelectedPlaythrough(false));
    
    if (practiceQPCInput) {
        practiceQPCInput.onchange = (e) => {
            let val = parseInt(e.target.value);
            if (isNaN(val) || val < 1) val = 1; if (val > 10) val = 10;
            practiceQuestionsPerChapter = val; e.target.value = val;
        };
    }
    
    safeSetOnClick(nextButton, nextQuestionInChapter);
    safeSetOnClick(explainButton, handleExplainAnswer);
    safeSetOnClick(closeGeminiModalButton, closeGeminiModal);
    safeSetOnClick(powerup5050Btn, useFiftyFifty);
    safeSetOnClick(powerupAddTimeBtn, useAddTime);
    safeSetOnClick(leaderboardButton, displayLeaderboard);
    safeSetOnClick(closeLeaderboardModalBtn, () => leaderboardModal.classList.add('hidden'));
    safeSetOnClick(achievementsButton, displayAchievementsModal);
    safeSetOnClick(closeAchievementsModalBtn, () => achievementsModal.classList.add('hidden'));
    safeSetOnClick(replayChapterButton, () => {
        // [THÊM DÒNG NÀY] Ẩn modal kết thúc trước khi bắt đầu lại
        chapterModal.classList.add('hidden');
        
        // Giữ nguyên logic bắt đầu lại
        startSelectedPlaythrough(false); 
    });
    safeSetOnClick(nextChapterButton, showMainMenu);

    // Load các thành phần khác
    loadUnlockedAchievements(); // Tạm thời comment lại
}

// =================================================================================
// PHẦN 3: LOGIC PARSER DỮ LIỆU
// =================================================================================

/**
 * Trích xuất nội dung của một lệnh LaTeX có dấu ngoặc {}, xử lý các cặp ngoặc lồng nhau.
 * @param {string} text - Chuỗi để tìm kiếm.
 * @param {string} command - Tên lệnh (ví dụ: '\\loigiai').
 * @returns {{content: string, startIndex: number, endIndex: number}|null}
 */
function extractBalancedContent(text, command) {
    const commandStart = text.indexOf(command);
    if (commandStart === -1) return null;

    const openBraceIndex = text.indexOf('{', commandStart);
    if (openBraceIndex === -1) return null;

    let balance = 1;
    let endIndex = -1;

    for (let i = openBraceIndex + 1; i < text.length; i++) {
        if (text[i] === '{') {
            balance++;
        } else if (text[i] === '}') {
            balance--;
        }
        if (balance === 0) {
            endIndex = i;
            break;
        }
    }

    if (endIndex === -1) return null; // Không tìm thấy cặp ngoặc cân bằng

    return {
        content: text.substring(openBraceIndex + 1, endIndex),
        startIndex: commandStart,
        endIndex: endIndex + 1,
    };
}


/**
 * Phân tích một khối LaTeX từ Question Bank để chuyển đổi thành định dạng object cho game.
 * [V4] Sử dụng logic cân bằng dấu ngoặc để trích xuất \loigiai chính xác.
 * @param {string} latexBlock - Chuỗi LaTeX thô từ database.
 * @param {string} questionType - Loại câu hỏi.
 * @returns {object|null} - Object câu hỏi đã được định dạng, hoặc null.
 */
function parseLatexBlock(latexBlock, questionType) {
    try {
        if (/\\immini|\\begin{tikzpicture}|\\begin{bt}/.test(latexBlock)) {
            return null;
        }

        let content = latexBlock
            .replace(/\\begin{ex}([\s\S]*?)\\end{ex}/s, '$1')
            .replace(/%\[.*?\]/g, '')
            .trim();
        // [NÂNG CẤP] Loại bỏ môi trường multicol nhưng giữ lại nội dung
        content = content.replace(/\\begin{multicols}{\d+}/g, '').replace(/\\end{multicols}/g, '');

        const result = { question: '', options: [], answer: null, tip: '', type: '' };

        // --- [NÂNG CẤP] Sử dụng hàm mới để trích xuất lời giải ---
        const tipData = extractBalancedContent(content, '\\loigiai');
        if (tipData) {
            result.tip = tipData.content.trim();
            // Xóa toàn bộ khối \loigiai khỏi content
            content = content.substring(0, tipData.startIndex) + content.substring(tipData.endIndex);
            content = content.trim();
        }
        
        content = content.replace(/\\begin{center}[\s\S]*?\\end{center}/g, ' ');

        // --- Phân tích loại câu hỏi (giữ nguyên logic cũ) ---
        if (questionType === 'trac_nghiem_mot_dap_an') {
            result.type = 'mcq';
            const choiceData = extractBalancedContent(content, '\\choice');
            if (!choiceData) return null;

            result.question = content.substring(0, choiceData.startIndex).trim();
            
            const optionsBlock = choiceData.content;
            const optionRegex = /{\s*(\\True\s*)?([\s\S]*?)\s*}/g;
            let match;
            
            while ((match = optionRegex.exec(optionsBlock)) !== null) {
                const optionText = match[2].trim();
                if (optionText) {
                    result.options.push(optionText);
                    if (match[1]) {
                        result.answer = optionText;
                    }
                }
            }
        } 
        else if (questionType === 'tra_loi_ngan') {
            result.type = 'fill';
            const answerMatch = content.match(/\\shortans\[.*?\]\s*\{([\s\S]*?)\}/s);
            if (!answerMatch) return null;

            result.answer = answerMatch[1].trim();
            result.question = content.replace(/\\shortans\[.*?\]\s*\{([\s\S]*?)\}/s, '').trim();
        }
        else if (questionType === 'trac_nghiem_dung_sai') {
            result.type = 'mcq_multiple';
            const choiceTFData = extractBalancedContent(content, '\\choiceTF');
            if (!choiceTFData) return null;

            result.question = content.substring(0, choiceTFData.startIndex).trim() + 
                              "<br><small>(Có thể có nhiều đáp án đúng. Chọn tất cả các mệnh đề bạn cho là đúng.)</small>";
            
            result.answer = [];
            
            const optionsBlock = choiceTFData.content;
            const optionRegex = /{\s*(\\True\s*)?([\s\S]*?)\s*}/g;
            let match;
            
            while ((match = optionRegex.exec(optionsBlock)) !== null) {
                const optionText = match[2].trim();
                if (optionText) {
                    result.options.push(optionText);
                    if (match[1]) {
                        result.answer.push(optionText);
                    }
                }
            }
        }
        else {
            console.log(`Bỏ qua câu hỏi có type chưa được hỗ trợ: '${questionType}'`);
            return null;
        }

        // --- Dọn dẹp và kiểm tra ---
        // Chuyển đổi các môi trường itemize thành danh sách HTML
        result.question = result.question
            .replace(/\\begin{itemize}/g, '<ul>').replace(/\\end{itemize}/g, '</ul>')
            .replace(/\\begin{enumerate}/g, '<ol>').replace(/\\end{enumerate}/g, '</ol>')
            .replace(/\\item/g, '<li>');
        
        result.tip = result.tip
            .replace(/\\begin{itemize}/g, '<ul>').replace(/\\end{itemize}/g, '</ul>')
            .replace(/\\begin{enumerate}/g, '<ol>').replace(/\\end{enumerate}/g, '</ol>')
            .replace(/\\item/g, '<li>');
        
        result.question = result.question.replace(/\\\\/g, '<br>').replace(/\s+/g, ' ').trim();
        
        if (!result.question || !result.answer) return null;
        if (result.type === 'mcq_multiple' && result.answer.length === 0) return null;
        if (result.type.startsWith('mcq') && result.options.length < 2) return null;

        return result;

    } catch (error) {
        console.error("Lỗi nghiêm trọng khi phân tích LaTeX block:", error, latexBlock);
        return null;
    }
}

// =================================================================================
// PHẦN 4: LOGIC ĐIỀU HƯỚNG VÀ HIỂN THỊ MODAL
// =================================================================================
function showLoadingMessages() {
    const loaderText = document.querySelector('#initial-loader p');
    const messages = [
        "Đang kết nối với máy chủ...",
        "Tải ngân hàng câu hỏi (có thể mất vài giây)...",
        "Sắp xếp các công thức toán học...",
        "Chuẩn bị cho cuộc chinh phục tri thức!"
    ];
    let messageIndex = 0;
    
    // Hiển thị thông điệp đầu tiên ngay lập tức
    if(loaderText) loaderText.textContent = messages[messageIndex];
    
    // Cứ mỗi 3 giây lại đổi thông điệp
    const intervalId = setInterval(() => {
        messageIndex++;
        if (messageIndex < messages.length && loaderText) {
            loaderText.textContent = messages[messageIndex];
        } else {
            clearInterval(intervalId);
        }
    }, 3000);
    return intervalId;
}
function showMainMenu() {
    gradeSelectionModal.classList.add('hidden');
    subjectSelectionModal.classList.add('hidden');
    chapterSelectionModal.classList.add('hidden');
    chapterModal.classList.add('hidden');
    achievementsModal.classList.add('hidden');
    leaderboardModal.classList.add('hidden');
    gameContent.classList.add('opacity-0');
    gameModal.classList.remove('opacity-0', 'pointer-events-none');
    gameModal.classList.remove('hidden'); // Đảm bảo menu chính hiện ra
}

function showGradeSelection() {
    showMainMenu(); 
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

function showSubjectSelection() {
    gradeSelectionModal.classList.add('hidden');
    chapterSelectionModal.classList.add('hidden');
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
            populateChapterSelectionModal_New();
            showChapterSelection();
        };
        subjectSelectGrid.appendChild(button);
    });
}

function showChapterSelection() {
    subjectSelectionModal.classList.add('hidden');
    chapterSelectionModal.classList.remove('hidden');
    practiceOptionsContainer.style.display = gameMode === 'practice' ? 'block' : 'none';
    chapterSelectTitle.textContent = `Chọn Chương - ${knowledgeMap[selectedGrade][selectedSubject].name}`;
}

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
    validateChapterSelection();
}

function validateChapterSelection() {
    startChapterSelectionButton.disabled = getSelectedCheckboxes().length <= 0;
}

function getSelectedCheckboxes() {
    return Array.from(document.querySelectorAll('.chapter-select-checkbox:checked'));
}


// =================================================================================
// PHẦN 5: LOGIC CỐT LÕI CỦA GAME 
// =================================================================================

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

        const gradeMap = { "9": "9", "10": "0", "11": "1", "12": "2" };
        const metadataGradeCode = gradeMap[selectedGrade];

        const filteredRawQuestions = fullQuestionBank.filter(q => 
            q.metadata.lop_ma === metadataGradeCode &&
            q.metadata.mon_ma === selectedSubject &&
            selectedChapterIds.includes(q.metadata.chuong)
        );
        // [THÊM ĐOẠN CODE ĐIỀU TRA NÀY VÀO]
        console.log(`Đã lọc được ${filteredRawQuestions.length} câu hỏi thô.`);
        const mcqCount = filteredRawQuestions.filter(q => q.question_type === 'trac_nghiem_mot_dap_an').length;
        console.log(`Trong đó có ${mcqCount} câu trắc nghiệm.`);
        // ===================================

        questionsInCurrentPlaythrough = filteredRawQuestions
            .map(q => parseLatexBlock(q.latex_block, q.question_type))
            .filter(q => q !== null);

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

    if (gameMode === 'challenge') {
        currentLives = 3;
        livesContainer.style.display = 'block';
    } else {
        currentLives = 99;
        livesContainer.style.display = 'none';
    }
    updateLivesDisplay();
    
    chapterSelectionModal.classList.add('hidden');
    gameContent.classList.remove('opacity-0');

    loadQuestion();
    updateProgress();
    updateStreakDisplay();
}

function loadQuestion() {
    if (!gameActive || currentQuestionIndex >= questionsInCurrentPlaythrough.length) {
        endGame();
        return;
    }

    const q = questionsInCurrentPlaythrough[currentQuestionIndex];
    currentQuestionForGemini = q;

    // --- Dọn dẹp giao diện từ câu hỏi trước ---
    questionNumber.textContent = `Câu ${currentQuestionIndex + 1}/${questionsInCurrentPlaythrough.length}:`;
    const cleanedQuestion = q.question.replace(/(\r\n|\n|\r)/gm, " ").trim();
    questionText.innerHTML = `<span>${cleanedQuestion}</span>`;
    optionsContainer.innerHTML = '';
    feedbackMessage.classList.add('opacity-0');
    nextButton.classList.add('hidden');
    nextButton.disabled = true;
    explainButton.classList.add('hidden');
    confettiContainer.innerHTML = '';

    // Dọn dẹp nút "Xác Nhận" của câu hỏi nhiều đáp án (nếu có)
    const oldSubmitBtn = document.getElementById('multiple-choice-submit');
    if (oldSubmitBtn) {
        oldSubmitBtn.remove();
    }

    // --- Cập nhật trạng thái và hiển thị timer ---
    updatePowerUpButtons();
    timerDisplay.style.display = (gameMode === 'challenge') ? 'flex' : 'none';
    if (gameMode === 'challenge') {
        startQuestionTimer();
    }

    // --- Tải câu hỏi dựa trên loại (type) ---
    if (q.type === 'fill') {
        // --- Dạng ĐIỀN KHUYẾT ---
        optionsContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center gap-4 py-8">
                <input type="text" id="fill-in-blank-input" class="fill-in-blank-input" placeholder="Nhập đáp án của bạn...">
                <button id="fill-in-blank-submit" class="fill-in-blank-submit">Kiểm Tra</button>
            </div>`;
        const input = document.getElementById('fill-in-blank-input');
        input.onkeydown = (e) => { if (e.key === 'Enter') checkFillInBlankAnswer(q); };
        document.getElementById('fill-in-blank-submit').onclick = () => checkFillInBlankAnswer(q);
        setTimeout(() => input.focus(), 100);

    } else if (q.type === 'mcq_multiple') {
        // --- Dạng TRẮC NGHIỆM NHIỀU ĐÁP ÁN ---
        optionsContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';
        
        shuffleArray([...q.options]).forEach(option => {
            const button = document.createElement('button');
            button.innerHTML = option;
            button.dataset.optionValue = option;
            button.classList.add('option-button', 'w-full', 'p-4', 'rounded-xl', 'text-lg', 'font-medium', 'text-left');
            // Thêm sự kiện để chọn/bỏ chọn
            button.onclick = () => {
                button.classList.toggle('selected'); // Thêm class 'selected' khi được click
            };
            optionsContainer.appendChild(button);
        });

        // Thêm nút "Xác nhận" bên ngoài optionsContainer
        const submitButton = document.createElement('button');
        submitButton.id = 'multiple-choice-submit';
        submitButton.textContent = 'Xác Nhận Lựa Chọn';
        submitButton.className = 'fill-in-blank-submit mt-4 mx-auto'; // Tận dụng style, căn giữa
        submitButton.onclick = () => checkMultipleAnswers(q);
        
        // Chèn nút Xác Nhận vào sau vùng chứa các lựa chọn
        optionsContainer.insertAdjacentElement('afterend', submitButton);

    } else { 
        // --- Dạng TRẮC NGHIỆM MỘT ĐÁP ÁN (mặc định) ---
        optionsContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';
        
        shuffleArray([...q.options]).forEach(option => {
            const button = document.createElement('button');
            button.innerHTML = option;
            button.dataset.optionValue = option;
            button.classList.add('option-button', 'w-full', 'p-4', 'rounded-xl', 'text-lg', 'font-medium', 'text-left');
            button.onclick = () => checkAnswer(button, option, q.answer); // Logic cũ
            optionsContainer.appendChild(button);
        });
    }

    // --- Render MathJax và cập nhật thanh tiến trình ---
    if (window.MathJax) {
        MathJax.typesetPromise([questionContainer, optionsContainer]).catch(console.error);
    }
    updateProgress();
}
function checkMultipleAnswers(q) {
    if (!gameActive || !nextButton.disabled) return;
    
    soundClick.play().catch(e => {});
    disableAllInputs(); // Vô hiệu hóa tất cả các nút

    // Lấy tất cả các đáp án người dùng đã chọn
    const selectedNodes = document.querySelectorAll('.option-button.selected');
    const userAnswers = Array.from(selectedNodes).map(node => node.dataset.optionValue);
    
    // Sắp xếp cả hai mảng để so sánh
    const sortedUserAnswers = [...userAnswers].sort();
    const sortedCorrectAnswers = [...q.answer].sort();

    // So sánh hai mảng đã sắp xếp
    const isCorrect = sortedUserAnswers.length === sortedCorrectAnswers.length && 
                      sortedUserAnswers.every((value, index) => value === sortedCorrectAnswers[index]);

    // Hiển thị phản hồi
    document.querySelectorAll('.option-button').forEach(btn => {
        const optionValue = btn.dataset.optionValue;
        // Tô xanh đáp án đúng
        if (q.answer.includes(optionValue)) {
            btn.classList.add('correct');
        }
        // Tô đỏ đáp án sai mà người dùng đã chọn
        if (userAnswers.includes(optionValue) && !q.answer.includes(optionValue)) {
            btn.classList.add('incorrect');
        }
    });
    
    gameReport.push({ question: q.question, userAnswer: userAnswers.join('; '), correctAnswer: q.answer.join('; ') });
    showFeedback(isCorrect, q.answer.join('; '));
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
function showFeedback(isCorrect, correctAnswerString, customMessage = null) {
    clearInterval(questionTimerInterval);
    if (isCorrect) {
        currentStreak++;
        const baseScore = 10, bonusScore = getStreakBonus(currentStreak);
        totalScore += baseScore + bonusScore;
        totalCorrectAnswers++;
        feedbackMessage.textContent = `Chính xác! +${baseScore} điểm` + (bonusScore > 0 ? ` (+${bonusScore} Chuỗi 🔥)` : '');
        feedbackMessage.className = 'text-lg font-bold p-2 rounded-lg flex-1 bg-green-100 text-green-800';
        triggerConfetti();
        soundCorrect.play().catch(e => {});
        // checkAchievements();
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
    } catch (e) { return []; }
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
    // ... (logic API call) ...
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


















