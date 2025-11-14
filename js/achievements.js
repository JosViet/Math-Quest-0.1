// js/achievements.js

const allAchievements = {
    // ID duy nhất của danh hiệu
    'first_win': {
        name: "Khởi Đầu Thuận Lợi",
        description: "Hoàn thành một vòng chơi bất kỳ.",
        icon: '<i class="fas fa-play-circle text-green-500"></i>',
        hidden: false // Danh hiệu này không bị ẩn
    },
    'streak_5': {
        name: "Nóng Máy!",
        description: "Đạt được chuỗi 5 câu trả lời đúng liên tiếp.",
        icon: '<i class="fas fa-fire text-orange-500"></i>',
        hidden: false
    },
    'streak_10': {
        name: "Phong Độ Đỉnh Cao",
        description: "Đạt được chuỗi 10 câu trả lời đúng liên tiếp.",
        icon: '<i class="fas fa-meteor text-red-500"></i>',
        hidden: false
    },
    'perfect_challenge': {
        name: "Bậc Thầy Thử Thách",
        description: "Hoàn thành một vòng Thử Thách mà không sai câu nào.",
        icon: '<i class="fas fa-crown text-yellow-400"></i>',
        hidden: false
    },
    'no_powerup': {
        name: "Tự Lực Cánh Sinh",
        description: "Hoàn thành một vòng Thử Thách mà không dùng bất kỳ sự trợ giúp nào.",
        icon: '<i class="fas fa-fist-raised text-blue-500"></i>',
        hidden: false
    },
    'chapter_master_1': {
        name: "Chuyên Gia Hàm Số",
        description: "Hoàn thành chỉ chương 'Hàm số và Đồ thị' ở chế độ Thử Thách.",
        icon: '<i class="fas fa-chart-line text-indigo-500"></i>',
        hidden: false
    },
    'secret_explorer': {
        name: "Nhà Thám Hiểm",
        description: "?? Hạng mục bí ẩn ??",
        icon: '<i class="fas fa-question-circle text-gray-500"></i>',
        hidden: true // Sẽ chỉ hiện ra khi người chơi mở khóa được nó
    }
};