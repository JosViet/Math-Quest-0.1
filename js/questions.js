// === Ngân Hàng Câu Hỏi ===
const allQuestionsByChapter = {
    0: { // Chương 1
        name: "Mệnh Đề & Tập Hợp",
        questions: [
            { id: 1, topic: "Mệnh Đề", type: 'mcq',
                question: "Trong các câu sau, câu nào là mệnh đề?",
                options: ["Bạn học bài chưa?", "Số 5 là số chẵn.", "Thời tiết hôm nay đẹp quá!", "x + 2 = 5"],
                answer: "Số 5 là số chẵn.",
                tip: "Mệnh đề là một khẳng định có tính đúng hoặc sai rõ ràng."
            },
            { id: 2, topic: "Tập Hợp", type: 'fill',
                question: "Cho tập hợp $A = \\{x \\in \\mathbb{Z} \\mid -2 \\le x < 3\\}$. Tập hợp A có bao nhiêu phần tử?",
                answer: "5",
                tip: "Các số nguyên $x$ thỏa mãn là: -2, -1, 0, 1, 2. Hãy đếm xem có bao nhiêu số!"
            },
            { id: 3, topic: "Tập Hợp", type: 'mcq',
                question: "Cho $A = \\{1, 2, 3\\}$ và $B = \\{2, 3, 4\\}$. Tìm $A \\cap B$ (Phép giao).",
                options: ["$\\{1, 2, 3, 4\\}$", "$\\{1\\}$", "$\\{2, 3\\}$", "$\\{4\\}$"],
                answer: "$\\{2, 3\\}$",
                tip: "Phép giao ($\\cap$) là tìm các phần tử chung của cả hai tập hợp."
            },
            { id: 4, topic: "Tập Hợp", type: 'mcq',
                question: "Cho $A = (-\\infty, 3]$ và $B = (1, 5)$. Tìm $A \\cup B$ (Phép hợp).",
                options: ["$(1, 3]$", "$(-\\infty, 5)$", "$[3, 5)$", "$(-\\infty, 1]$"],
                answer: "$(-\\infty, 5)$",
                tip: "Phép hợp ($\\cup$) là lấy tất cả các phần tử thuộc ít nhất một trong hai tập hợp."
            },
            { id: 101, topic: "Mệnh Đề", type: 'mcq',
                question: "Tìm mệnh đề phủ định của mệnh đề $P: \"\\forall x \\in \\mathbb{R}, x^2 \\ge 0\"$.",
                options: ["$\\exists x \\in \\mathbb{R}, x^2 \\ge 0$", "$\\forall x \\in \\mathbb{R}, x^2 < 0$", "$\\exists x \\in \\mathbb{R}, x^2 < 0$", "$\\forall x \\in \\mathbb{R}, x^2 \\le 0$"],
                answer: "$\\exists x \\in \\mathbb{R}, x^2 < 0$",
                tip: "Phủ định của $\\forall$ là $\\exists$. Phủ định của $\\ge$ là $< $."
            },
            { id: 102, topic: "Tập Hợp", type: 'fill',
                question: "Cho $A = \\{1, 2, 3\\}$. Số tập hợp con của A là bao nhiêu? (Nhập đáp án là một con số)",
                answer: "8",
                tip: "Một tập hợp có $n$ phần tử thì có $2^n$ tập hợp con. Ở đây $n=3$."
            }
        ]
    },
    1: { // Chương 2
        name: "Bất Phương Trình",
        questions: [
            { id: 5, topic: "Bất Phương Trình", type: 'mcq',
                question: "Nghiệm của bất phương trình $3x - 6 \\ge 0$ là:",
                options: ["$x \\le 2$", "$x \\ge 2$", "$x > 2$", "$x < 2$"],
                answer: "$x \\ge 2$",
                tip: "Chuyển vế $3x \\ge 6$, sau đó chia cả hai vế cho 3 (số dương, giữ nguyên chiều)."
            },
            { id: 6, topic: "Bất Phương Trình", type: 'mcq',
                question: "Cặp số $(1, -1)$ là nghiệm của bất phương trình nào sau đây?",
                options: ["$x + y > 0$", "$x - y < 0$", "$2x + y \\ge 3$", "$x + 3y + 1 \\le 0$"],
                answer: "$x + 3y + 1 \\le 0$",
                tip: "Thay $x = 1$ và $y = -1$ vào từng bất phương trình. Bất phương trình nào cho kết quả đúng (ví dụ: $1 + 3(-1) + 1 = -1 \\le 0$) thì đó là đáp án."
            },
            { id: 7, topic: "Bất Phương Trình", type: 'mcq',
                question: "Miền nghiệm của bất phương trình $x + y > 2$ là nửa mặt phẳng (không kể bờ $d: x+y=2$) chứa điểm nào?",
                options: ["$O(0, 0)$", "$M(1, 1)$", "$N(2, 2)$", "$P(-1, -1)$"],
                answer: "$N(2, 2)$",
                tip: "Thay tọa độ các điểm vào BPT. Điểm $O(0, 0)$ cho $0+0 > 2$ (Sai). Điểm $N(2, 2)$ cho $2+2 > 2$ (Đúng)."
            },
            { id: 8, topic: "Bất Phương Trình", type: 'mcq',
                question: "Hệ bất phương trình nào sau đây là hệ bất phương trình bậc nhất hai ẩn?",
                options: ["$\\{x^2 + y > 0, x - y < 1\\}$", "$\\{x + y \\ge 1, x - 2y \\le 3\\}$", "$\\{x + y^2 < 0\\}$", "$\\{x + y + z > 0\\}$"],
                answer: "$\\{x + y \\ge 1, x - 2y \\le 3\\}$",
                tip: "Hệ BPT bậc nhất hai ẩn chỉ chứa các ẩn $x, y$ với số mũ là 1."
            },
            { id: 103, topic: "Bất Phương Trình", type: 'fill',
                question: "Giá trị $x = 3$ là nghiệm của bất phương trình nào sau đây: $2x - 5 > 0$. (Trả lời 'Đúng' hoặc 'Sai')",
                answer: "Đúng",
                tip: "Thay $x = 3$ vào BPT: $2(3) - 5 = 6 - 5 = 1$. Vì $1 > 0$ nên đây là một khẳng định đúng."
            },
            { id: 104, topic: "Bất Phương Trình", type: 'mcq',
                question: "Nghiệm của bất phương trình $-2x + 4 > 0$ là:",
                options: ["$x < 2$", "$x > 2$", "$x < -2$", "$x > -2$"],
                answer: "$x < 2$",
                tip: "$-2x > -4$. Chú ý: Khi chia cả hai vế cho số âm (-2), ta phải *đổi chiều* bất phương trình."
            }
        ]
    },
    2: { // Chương 3
        name: "Hàm Số & Đồ Thị",
        questions: [
            { id: 9, topic: "Hàm Số", type: 'mcq',
                question: "Tìm tập xác định $D$ của hàm số $y = \\sqrt{x - 2}$.",
                options: ["$D = (2, +\\infty)$", "$D = [2, +\\infty)$", "$D = (-\\infty, 2]$", "$D = \\mathbb{R}$"],
                answer: "$D = [2, +\\infty)$",
                tip: "Điều kiện để căn bậc hai có nghĩa là biểu thức trong căn phải $\\ge 0$ (tức là $x - 2 \\ge 0$)."
            },
            { id: 10, topic: "Hàm Số", type: 'mcq',
                question: "Tìm tập xác định $D$ của hàm số $y = \\frac{1}{x - 1} + \\sqrt{x}$.",
                options: ["$D = [0, +\\infty)$", "$D = (0, +\\infty) \\setminus \\{1\\}$", "$D = [0, +\\infty) \\setminus \\{1\\}$", "$D = (1, +\\infty)$"],
                answer: "$D = [0, +\\infty) \\setminus \\{1\\}$",
                tip: "Hàm số xác định khi $\\{x \\ge 0\\}$ (cho căn) và $\\{x - 1 \\neq 0\\}$ (cho mẫu). Giao hai điều kiện này lại."
            },
            { id: 11, topic: "Hàm Số Bậc Hai", type: 'mcq',
                question: "Parabol $(P): y = ax^2 + bx + c$ có $a > 0$ và $\\Delta > 0$ thì:",
                options: ["Parabol quay bề lõm xuống dưới và không cắt Ox.", "Parabol quay bề lõm lên trên và cắt Ox tại 2 điểm.", "Parabol quay bề lõm lên trên và không cắt Ox.", "Parabol quay bề lõm xuống dưới và cắt Ox tại 2 điểm."],
                answer: "Parabol quay bề lõm lên trên và cắt Ox tại 2 điểm.",
                tip: "$a > 0$ quyết định bề lõm quay lên trên. $\\Delta > 0$ quyết định phương trình $ax^2 + bx + c = 0$ có 2 nghiệm phân biệt (tức là cắt Ox tại 2 điểm)."
            },
            { id: 12, topic: "Hàm Số Bậc Hai", type: 'fill',
                question: "Tìm tọa độ đỉnh $I$ của parabol $(P): y = x^2 - 4x + 1$. (Nhập đáp án dạng `(x, y)`)",
                answer: "(2, -3)",
                tip: "Hoành độ đỉnh $x_I = \\frac{-b}{2a} = \\frac{-(-4)}{2(1)} = 2$. Tung độ đỉnh $y_I = (2)^2 - 4(2) + 1 = -3$."
            },
            { id: 105, topic: "Hàm Số", type: 'fill',
                question: "Tìm tập xác định $D$ của hàm số $y = \\frac{x+1}{x-5}$. (Nhập đáp án dạng $\\mathbb{R} \\setminus \\{...\\}$)",
                answer: "R \\ {5}",
                tip: "Hàm số có nghĩa khi mẫu số khác 0, tức là $x - 5 \\neq 0$."
            },
            { id: 106, topic: "Hàm Số Bậc Hai", type: 'fill',
                question: "Tìm trục đối xứng của parabol $(P): y = -x^2 + 6x - 1$. (Nhập đáp án dạng `x = a`)",
                answer: "x = 3",
                tip: "Trục đối xứng là đường thẳng $x = \\frac{-b}{2a} = \\frac{-6}{2(-1)} = 3$."
            }
        ]
    },
    3: { // Chương 4
        name: "Vector",
        questions: [
            { id: 13, topic: "Vector", type: 'mcq',
                question: "Cho hình bình hành $ABCD$. Đẳng thức nào sau đây đúng?",
                options: ["$\\vec{AB} + \\vec{AC} = \\vec{AD}$", "$\\vec{AB} + \\vec{AD} = \\vec{AC}$", "$\\vec{AB} = \\vec{CD}$", "$\\vec{AD} = \\vec{CB}$"],
                answer: "$\\vec{AB} + \\vec{AD} = \\vec{AC}$",
                tip: "Đây là quy tắc hình bình hành cho phép cộng vector."
            },
            { id: 14, topic: "Vector", type: 'mcq',
                question: "Cho 3 điểm $A, B, C$ bất kỳ. Đẳng thức nào sau đây đúng (Quy tắc 3 điểm)?",
                options: ["$\\vec{AB} + \\vec{BC} = \\vec{AC}$", "$\\vec{AB} + \\vec{CB} = \\vec{AC}$", "$\\vec{AB} - \\vec{BC} = \\vec{CA}$", "$\\vec{AC} + \\vec{AB} = \\vec{CB}$"],
                answer: "$\\vec{AB} + \\vec{BC} = \\vec{AC}$",
                tip: "Đây là quy tắc chèn điểm (hay quy tắc Chasles) cho phép cộng vector."
            },
            { id: 15, topic: "Vector", type: 'mcq',
                question: "Cho tam giác $ABC$ đều cạnh $a$. Tính $\\|\\vec{AB} + \\vec{AC}\\|$.",
                options: ["$a$", "$2a$", "$a\\sqrt{3}$", "$a\\frac{\\sqrt{3}}{2}$"],
                answer: "$a\\sqrt{3}$",
                tip: "Dựng hình bình hành $ABDC$. Khi đó $\\vec{AB} + \\vec{AC} = \\vec{AD}$. $AD$ là đường chéo hình thoi, cũng là đường cao tam giác đều $ABD$ (cạnh $2a$) hoặc tính qua trung tuyến $AM$ ($|\vec{AB} + \vec{AC}| = |2\vec{AM}| = 2 \cdot a\\frac{\\sqrt{3}}{2} = a\\sqrt{3}$)."
            },
            { id: 16, topic: "Vector", type: 'fill',
                question: "Cho $\\vec{a} = (1, 2)$ và $\\vec{b} = (3, 4)$. Tính tọa độ của vector $\\vec{u} = 2\\vec{a} - \\vec{b}$. (Nhập đáp án dạng `(x, y)`)",
                answer: "(-1, 0)",
                tip: "$2\\vec{a} = (2 \cdot 1, 2 \cdot 2) = (2, 4)$. $2\\vec{a} - \\vec{b} = (2 - 3, 4 - 4) = (-1, 0)$."
            },
            { id: 107, topic: "Vector", type: 'mcq',
                question: "Cho $I$ là trung điểm của đoạn $AB$. Đẳng thức nào sau đây đúng?",
                options: ["$\\vec{IA} + \\vec{IB} = \\vec{0}$", "$\\vec{IA} = \\vec{IB}$", "$\\vec{AB} = 2\\vec{IA}$", "$\\vec{IA} - \\vec{IB} = \\vec{0}$"],
                answer: "$\\vec{IA} + \\vec{IB} = \\vec{0}$",
                tip: "Vì $I$ là trung điểm, $\\vec{IA}$ và $\\vec{IB}$ là hai vector đối nhau (cùng độ dài, ngược hướng)."
            },
            { id: 108, topic: "Vector", type: 'fill',
                question: "Cho $\\vec{u} = (-1, 3)$ và $\\vec{v} = (1, -3)$. Hai vector $\\vec{u}$ và $\\vec{v}$ có mối quan hệ gì? (Một từ)",
                answer: "Đối nhau",
                tip: "Ta thấy $\\vec{u} = -\\vec{v}$ (hoặc $\\vec{u} + \\vec{v} = \\vec{0}$), nên chúng là hai vector đối nhau."
            }
        ]
    },
    4: { // Chương 5
        name: "Tích Vô Hướng",
        questions: [
            { id: 17, topic: "Tích Vô Hướng", type: 'mcq',
                question: "Cho $\\vec{a}$ và $\\vec{b}$ khác $\\vec{0}$. Tích vô hướng $\\vec{a} \\cdot \\vec{b} < 0$ khi nào?",
                options: ["$(\\vec{a}, \\vec{b}) = 90^\\circ$", "$(\\vec{a}, \\vec{b}) < 90^\\circ$", "$(\\vec{a}, \\vec{b}) > 90^\\circ$", "$(\\vec{a}, \\vec{b}) = 0^\\circ$"],
                answer: "$(\\vec{a}, \\vec{b}) > 90^\\circ$",
                tip: "$\\vec{a} \cdot \\vec{b} = |\\vec{a}| \cdot |\\vec{b}| \cdot \\cos(\\vec{a}, \\vec{b})$. Tích này âm khi $\\cos < 0$, tức là góc tù ($> 90^\\circ$)."
            },
            { id: 18, topic: "Tích Vô Hướng", type: 'fill',
                question: "Trong mặt phẳng $Oxy$, cho $\\vec{u} = (1, 3)$ và $\\vec{v} = (-6, 2)$. Tính $\\vec{u} \cdot \\vec{v}$. (Nhập đáp án là một con số)",
                answer: "0",
                tip: "Tích vô hướng $\\vec{u} \cdot \\vec{v} = x_1x_2 + y_1y_2 = (1)(-6) + (3)(2) = -6 + 6 = 0$. (Hai vector này vuông góc nhau!)"
            },
            { id: 19, topic: "Tích Vô Hướng", type: 'mcq',
                question: "Cho tam giác $ABC$ vuông tại $A$, $AB = 3$, $AC = 4$. Tính $\\vec{AB} \cdot \\vec{BC}$.",
                options: ["0", "-9", "9", "16"],
                answer: "-9",
                tip: "$\\vec{AB} \cdot \\vec{BC} = \\vec{AB} \cdot (\\vec{BA} + \\vec{AC}) = \\vec{AB} \cdot \\vec{BA} + \\vec{AB} \cdot \\vec{AC} = -\\vec{AB}^2 + 0 = -AB^2 = -3^2 = -9$. (Vì $\\vec{AB} \perp \\vec{AC}$)"
            },
            { id: 20, topic: "Tích Vô Hướng", type: 'fill',
                question: "Cho tam giác $ABC$ đều cạnh $a=2$. Tính $\\vec{AB} \cdot \\vec{AC}$. (Nhập đáp án là một con số)",
                answer: "2",
                tip: "$\\vec{AB} \cdot \\vec{AC} = |\\vec{AB}| \cdot |\\vec{AC}| \cdot \\cos(\\vec{AB}, \\vec{AC}) = a \cdot a \cdot \\cos(60^\\circ) = 2 \cdot 2 \cdot \\frac{1}{2} = 2$."
            },
            { id: 109, topic: "Tích Vô Hướng", type: 'fill',
                question: "Cho $\\vec{a} = (2, 5)$ và $\\vec{b} = (-3, 1)$. Tính $\\vec{a} \cdot \\vec{b}$. (Nhập đáp án là một con số)",
                answer: "-1",
                tip: "Tích vô hướng $\\vec{a} \cdot \\vec{b} = x_1x_2 + y_1y_2 = (2)(-3) + (5)(1) = -6 + 5 = -1$."
            },
            { id: 110, topic: "Tích Vô Hướng", type: 'mcq',
                question: "Cho $\\vec{a}$ và $\\vec{b}$ vuông góc với nhau và đều khác $\\vec{0}$. Tính $\\vec{a} \cdot \\vec{b}$.",
                options: ["1", "0", "-1", "Không xác định"],
                answer: "0",
                tip: "Hai vector vuông góc thì góc giữa chúng là $90^\\circ$. $\\cos(90^\\circ) = 0$, nên tích vô hướng của chúng bằng 0."
            },
            { id: 169, topic: "Tích Vô Hướng", type: 'mcq',
                question: "Khẳng định nào sau đây là SAI về tính chất của tích vô hướng?",
                options: ["$\\vec{a} \cdot \vec{b} = \vec{b} \cdot \vec{a}$", "$\\vec{a} \cdot (\vec{b} + \vec{c}) = \vec{a} \cdot \vec{b} + \vec{a} \cdot \vec{c}$", "$\\vec{a}^2 = |\\vec{a}|^2$", "$\\vec{a}^2 = \vec{a}$"],
                answer: "$\\vec{a}^2 = \vec{a}$",
                tip: "Bình phương vô hướng $\vec{a}^2$ là một số (bằng $|\vec{a}|^2$), trong khi $\vec{a}$ là một vector. Một số không thể bằng một vector."
            },
            { id: 170, topic: "Tích Vô Hướng", type: 'fill',
                question: "Cho hình vuông $ABCD$ cạnh $a$. Tính $\vec{AB} \cdot \vec{AD}$. (Nhập đáp án là một con số)",
                answer: "0",
                tip: "Hai vector $\vec{AB}$ và $\vec{AD}$ vuông góc với nhau (góc $90^\circ$). $\cos(90^\circ) = 0$."
            },
            { id: 171, topic: "Tích Vô Hướng", type: 'fill',
                question: "Cho hình vuông $ABCD$ cạnh $a$. Tính $\vec{AB} \cdot \vec{AC}$. (Nhập đáp án dạng `ka^2`)",
                answer: "a^2",
                tip: "Cách 1: $\vec{AB} \cdot \vec{AC} = |\vec{AB}| |\vec{AC}| \cos(45^\circ) = a \cdot (a\sqrt{2}) \cdot \frac{\sqrt{2}}{2} = a^2$. Cách 2: $\vec{AB} \cdot (\vec{AB} + \vec{AD}) = \vec{AB}^2 + \vec{AB} \cdot \vec{AD} = a^2 + 0 = a^2$."
            },
            { id: 172, topic: "Tích Vô Hướng", type: 'mcq',
                question: "Cho tam giác $ABC$ đều cạnh $a$. Gọi $M$ là trung điểm $BC$. Tính $\vec{AM} \cdot \vec{BC}$.",
                options: ["$a^2 \frac{\sqrt{3}}{2}$", "$a^2$", "0", "$-\frac{a^2}{2}$"],
                answer: "0",
                tip: "Trong tam giác đều, đường trung tuyến $AM$ cũng là đường cao, do đó $AM \perp BC$. Tích vô hướng của hai vector vuông góc bằng 0."
            },
            { id: 173, topic: "Tích Vô Hướng", type: 'mcq',
                question: "Cho $\vec{a}$ và $\vec{b}$ là hai vector ngược hướng và đều khác $\vec{0}$. Tích vô hướng $\vec{a} \cdot \vec{b}$ sẽ:",
                options: ["Lớn hơn 0", "Nhỏ hơn 0", "Bằng 0", "Không xác định"],
                answer: "Nhỏ hơn 0",
                tip: "Góc giữa hai vector ngược hướng là $180^\circ$. Ta có $\cos(180^\circ) = -1$, nên $\vec{a} \cdot \vec{b} = -|\vec{a}| |\vec{b}| < 0$."
            },
            { id: 174, topic: "Tích Vô Hướng", type: 'mcq',
                question: "Cho $\vec{a}$ và $\vec{b}$ là hai vector cùng hướng và đều khác $\vec{0}$. Tích vô hướng $\vec{a} \cdot \vec{b}$ sẽ:",
                options: ["Lớn hơn 0", "Nhỏ hơn 0", "Bằng 0", "Không xác định"],
                answer: "Lớn hơn 0",
                tip: "Góc giữa hai vector cùng hướng là $0^\circ$. Ta có $\cos(0^\circ) = 1$, nên $\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| > 0$."
            },
            { id: 175, topic: "Tích Vô Hướng", type: 'fill',
                question: "Cho biết $|\vec{a}| = 2$, $|\vec{b}| = 3$ và góc $(\vec{a}, \vec{b}) = 120^\circ$. Tính $\vec{a} \cdot \vec{b}$. (Nhập đáp án là một con số)",
                answer: "-3",
                tip: "Áp dụng công thức: $\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| \cos(\vec{a}, \vec{b}) = 2 \cdot 3 \cdot \cos(120^\circ) = 6 \cdot (-\frac{1}{2}) = -3$."
            },
            { id: 176, topic: "Tích Vô Hướng", type: 'mcq',
                question: "Biết $|\vec{a} + \vec{b}| = 0$. Khẳng định nào sau đây là đúng?",
                options: ["$\vec{a}$ và $\vec{b}$ cùng hướng", "$\vec{a}$ và $\vec{b}$ là hai vector đối nhau", "$\vec{a} \perp \vec{b}$", "$\vec{a} = \vec{b} = \vec{0}$"],
                answer: "$\vec{a}$ và $\vec{b}$ là hai vector đối nhau",
                tip: "Độ dài vector bằng 0 khi và chỉ khi đó là $\vec{0}$. Vậy $\vec{a} + \vec{b} = \vec{0}$, suy ra $\vec{a} = -\vec{b}$."
            },
            { id: 177, topic: "Tích Vô Hướng", type: 'fill',
                question: "Cho $\vec{a}, \vec{b}$ thỏa $|\vec{a}| = 1, |\vec{b}| = 2, \vec{a} \cdot \vec{b} = -1$. Tính độ dài $|\vec{a} - \vec{b}|$. (Nhập $\sqrt{a}$ là `sqrt(a)`)",
                answer: "sqrt(7)",
                tip: "Dùng bình phương vô hướng: $|\vec{a} - \vec{b}|^2 = (\vec{a} - \vec{b})^2 = \vec{a}^2 - 2\vec{a}\cdot\vec{b} + \vec{b}^2 = |\vec{a}|^2 - 2\vec{a}\cdot\vec{b} + |\vec{b}|^2 = 1^2 - 2(-1) + 2^2 = 1 + 2 + 4 = 7$."
            },
            { id: 178, topic: "Tích Vô Hướng", type: 'mcq',
                question: "Cho $\vec{a} \perp \vec{b}$, $|\vec{a}| = 3, |\vec{b}| = 4$. Tính $|\vec{a} + \vec{b}|$.",
                options: ["25", "7", "5", "1"],
                answer: "5",
                tip: "Vì $\vec{a} \perp \vec{b}$ nên $\vec{a} \cdot \vec{b} = 0$. Ta có $|\vec{a} + \vec{b}|^2 = |\vec{a}|^2 + |\vec{b}|^2 + 2\vec{a}\cdot\vec{b} = 3^2 + 4^2 + 0 = 25$. Vậy $|\vec{a} + \vec{b}| = \sqrt{25} = 5$."
            },
            { id: 179, topic: "Tích Vô Hướng", type: 'mcq',
                question: "Hệ thức nào trong tam giác $\triangle ABC$ là biểu thị của Định lý Cosine?",
                options: ["$a^2 = b^2 + c^2 - 2bc \cos(A)$", "$\\frac{a}{\sin(A)} = 2R$", "$S = \frac{1}{2}ab\sin(C)$", "$m_a^2 = \frac{b^2+c^2}{2} - \frac{a^2}{4}$"],
                answer: "$a^2 = b^2 + c^2 - 2bc \cos(A)$",
                tip: "Định lý Cosine liên hệ cạnh và góc đối diện, được suy ra từ $\vec{BC} = \vec{AC} - \vec{AB}$ và bình phương vô hướng hai vế."
            },
            { id: 180, topic: "Tích Vô Hướng", type: 'fill',
                question: "Cho hình chữ nhật $ABCD$ có $AB=4, AD=3$. Tính $\vec{BA} \cdot \vec{BD}$. (Nhập đáp án là một con số)",
                answer: "16",
                tip: "Phân tích $\vec{BD} = \vec{BA} + \vec{AD}$. Ta có $\vec{BA} \cdot \vec{BD} = \vec{BA} \cdot (\vec{BA} + \vec{AD}) = \vec{BA}^2 + \vec{BA} \cdot \vec{AD}$. Vì $BA \perp AD$ nên $\vec{BA} \cdot \vec{AD} = 0$. Vậy kết quả là $\vec{BA}^2 = AB^2 = 4^2 = 16$."
            },
            { id: 181, topic: "Tích Vô Hướng", type: 'mcq',
                question: "Cho $\triangle ABC$ vuông cân tại $A$, có $AB=a$. Tính $\vec{BA} \cdot \vec{BC}$.",
                options: ["$a^2$", "$-a^2$", "$a^2\sqrt{2}$", "0"],
                answer: "$a^2$",
                tip: "Phân tích $\vec{BC} = \vec{BA} + \vec{AC}$. Ta có $\vec{BA} \cdot \vec{BC} = \vec{BA} \cdot (\vec{BA} + \vec{AC}) = \vec{BA}^2 + \vec{BA} \cdot \vec{AC}$. Vì $BA \perp AC$ nên $\vec{BA} \cdot \vec{AC} = 0$. Vậy kết quả là $\vec{BA}^2 = AB^2 = a^2$."
            },
            { id: 182, topic: "Tích Vô Hướng", type: 'mcq',
                question: "Cho hai vector $\vec{a}, \vec{b}$ thỏa $|\vec{a}| = 1$, $|\vec{b}| = 1$ và $\vec{a} \cdot \vec{b} = \frac{1}{2}$. Tính góc $(\vec{a}, \vec{b})$.",
                options: ["$30^\circ$", "$45^\circ$", "$60^\circ$", "$90^\circ$"],
                answer: "$60^\circ$",
                tip: "Ta có $\cos(\vec{a}, \vec{b}) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| |\vec{b}|} = \frac{1/2}{1 \cdot 1} = \frac{1}{2}$. Góc (nhọn) có $\cos = 1/2$ là $60^\circ$."
            }
        ]
    },
    5: { // Chương 6
        name: "Lượng Giác",
        questions: [
            { id: 21, topic: "Lượng Giác", type: 'mcq',
                question: "Đổi số đo góc $150^\\circ$ sang radian.",
                options: ["$\\frac{5\\pi}{6}$", "$\\frac{2\\pi}{3}$", "$\\frac{3\\pi}{4}$", "$\\frac{5\\pi}{4}$"],
                answer: "$\\frac{5\\pi}{6}$",
                tip: "Công thức: $\\text{rad} = \\text{độ} \cdot \\frac{\\pi}{180^\\circ}$. Ta có $150 \cdot \\frac{\\pi}{180} = \\frac{5\\pi}{6}$."
            },
            { id: 22, topic: "Lượng Giác", type: 'mcq',
                question: "Cho $\\cos(\\alpha) = \\frac{3}{5}$ với $0 < \\alpha < \\frac{\\pi}{2}$ (Góc nhọn). Tính $\\sin(\\alpha)$.",
                options: ["$\\frac{4}{5}$", "$-\\frac{4}{5}$", "$\frac{3}{5}$", "$\frac{5}{3}$"],
                answer: "$\\frac{4}{5}$",
                tip: "Dùng $\\sin^2(\\alpha) + \\cos^2(\\alpha) = 1 \\Rightarrow \\sin^2(\\alpha) = 1 - (\\frac{3}{5})^2 = \\frac{16}{25}$. Vì $0 < \\alpha < \\frac{\\pi}{2}$ (góc phần tư thứ I), $\\sin(\\alpha) > 0$. Vậy $\\sin(\\alpha) = \\frac{4}{5}$."
            },
            { id: 23, topic: "Lượng Giác", type: 'fill',
                question: "Biết $\\sin(a) = \\frac{1}{3}$. Tính giá trị của $P = \\cos(2a)$. (Nhập đáp án dạng `a/b`)",
                answer: "7/9",
                tip: "Dùng công thức $\\cos(2a) = 1 - 2\\sin^2(a)$. $P = 1 - 2 \cdot (\\frac{1}{3})^2 = 1 - 2 \cdot \\frac{1}{9} = 1 - \\frac{2}{9} = \\frac{7}{9}$."
            },
            { id: 24, topic: "Lượng Giác", type: 'mcq',
                question: "Cho tam giác $\\triangle ABC$. Khẳng định nào sau đây là SAI (Định lý $\\sin$)?",
                options: ["$\\frac{a}{\\sin(A)} = 2R$", "$\\frac{b}{\\sin(B)} = 2R$", "$\\frac{c}{\\sin(C)} = 2R$", "$a \cdot \\sin(A) = 2R$"],
                answer: "$a \cdot \\sin(A) = 2R$",
                tip: "Định lý $\\sin$ phát biểu rằng: $\\frac{a}{\\sin(A)} = \\frac{b}{\\sin(B)} = \\frac{c}{\\sin(C)} = 2R$."
            },
            { id: 111, topic: "Lượng Giác", type: 'fill',
                question: "Tính giá trị của $\\sin(30^\\circ) + \\cos(60^\\circ)$. (Nhập đáp án là một con số)",
                answer: "1",
                tip: "Cả $\\sin(30^\\circ)$ và $\\cos(60^\\circ)$ đều bằng $\\frac{1}{2}$. Vậy tổng là $\\frac{1}{2} + \\frac{1}{2} = 1$."
            },
            { id: 112, topic: "Lượng Giác", type: 'mcq',
                question: "Khẳng định nào sau đây là đúng? (với $a, b$ là 2 góc phụ nhau)",
                options: ["$\\sin(a) = \\sin(b)$", "$\\cos(a) = \\cos(b)$", "$\\sin(a) = \\cos(b)$", "$\\tan(a) = \\tan(b)$"],
                answer: "$\\sin(a) = \\cos(b)$",
                tip: "Hai góc phụ nhau ($a+b=90^\\circ$) thì sin góc này bằng cos kia, tan góc này bằng cot kia. (Phụ chéo)"
            },
            { id: 183, topic: "Lượng Giác", type: 'mcq',
                question: "Đổi số đo góc $\frac{3\pi}{4}$ rad sang độ.",
                options: ["$135^\circ$", "$120^\circ$", "$150^\circ$", "$270^\circ$"],
                answer: "$135^\circ$",
                tip: "Công thức: $\text{độ} = \text{rad} \cdot \frac{180^\circ}{\pi}$. Ta có $\frac{3\pi}{4} \cdot \frac{180}{\pi} = 3 \cdot 45 = 135^\circ$."
            },
            { id: 184, topic: "Lượng Giác", type: 'mcq',
                question: "Khẳng định nào sau đây là đúng? (Hai góc bù nhau)",
                options: ["$\sin(180^\circ - \alpha) = \sin(\alpha)$", "$\cos(180^\circ - \alpha) = \cos(\alpha)$", "$\tan(180^\circ - \alpha) = \tan(\alpha)$", "$\cot(180^\circ - \alpha) = \cot(\alpha)$"],
                answer: "$\sin(180^\circ - \alpha) = \sin(\alpha)$",
                tip: "Với hai góc bù nhau, chỉ có $\sin$ là bằng nhau. 'Sin bù' - các giá trị $\cos, \tan, \cot$ đều đối nhau."
            },
            { id: 185, topic: "Lượng Giác", type: 'mcq',
                question: "Khẳng định nào sau đây là đúng? (Hai góc đối nhau)",
                options: ["$\cos(-\alpha) = \cos(\alpha)$", "$\sin(-\alpha) = \sin(\alpha)$", "$\tan(-\alpha) = \tan(\alpha)$", "$\cot(-\alpha) = \cot(\alpha)$"],
                answer: "$\cos(-\alpha) = \cos(\alpha)$",
                tip: "Với hai góc đối nhau, chỉ có $\cos$ là bằng nhau. 'Cos đối' - các giá trị $\sin, \tan, \cot$ đều đối nhau."
            },
            { id: 186, topic: "Lượng Giác", type: 'mcq',
                question: "Hệ thức cơ bản nào sau đây là đúng? (với điều kiện xác định)",
                options: ["$1 + \tan^2(\alpha) = \frac{1}{\cos^2(\alpha)}$", "$1 + \tan^2(\alpha) = \frac{1}{\sin^2(\alpha)}$", "$\sin^2(\alpha) - \cos^2(\alpha) = 1$", "$\tan(\alpha) = \frac{\cos(\alpha)}{\sin(\alpha)}$"],
                answer: "$1 + \tan^2(\alpha) = \frac{1}{\cos^2(\alpha)}$",
                tip: "Đây là một trong ba hệ thức cơ bản, được suy ra từ $\sin^2(\alpha) + \cos^2(\alpha) = 1$ (chia cả hai vế cho $\cos^2(\alpha)$)."
            },
            { id: 187, topic: "Lượng Giác", type: 'mcq',
                question: "Cho góc $\alpha$ thỏa mãn $90^\circ < \alpha < 180^\circ$ (Góc phần tư thứ II). Khẳng định nào sau đây là đúng?",
                options: ["$\sin(\alpha) > 0, \cos(\alpha) < 0$", "$\sin(\alpha) < 0, \cos(\alpha) > 0$", "$\sin(\alpha) > 0, \cos(\alpha) > 0$", "$\sin(\alpha) < 0, \cos(\alpha) < 0$"],
                answer: "$\sin(\alpha) > 0, \cos(\alpha) < 0$",
                tip: "Ở góc phần tư thứ II (trên bên trái), trục $\sin$ (trục tung) dương, trục $\cos$ (trục hoành) âm."
            },
            { id: 188, topic: "Lượng Giác", type: 'mcq',
                question: "Công thức nào sau đây dùng để tính diện tích $\triangle ABC$?",
                options: ["$S = \frac{1}{2}ab\sin(C)$", "$S = \frac{1}{2}ab\cos(C)$", "$S = 2ab\sin(C)$", "$S = \frac{a}{\sin(A)}$"],
                answer: "$S = \frac{1}{2}ab\sin(C)$",
                tip: "Diện tích tam giác bằng 1/2 tích hai cạnh nhân với $\sin$ của góc xen giữa."
            },
            { id: 189, topic: "Lượng Giác", type: 'fill',
                question: "Tính giá trị của $P = \tan(45^\circ) + \cot(45^\circ)$. (Nhập đáp án là một con số)",
                answer: "2",
                tip: "Cả $\tan(45^\circ)$ và $\cot(45^\circ)$ đều bằng 1. Vậy tổng là $1 + 1 = 2$."
            },
            { id: 190, topic: "Lượng Giác", type: 'mcq',
                question: "Khẳng định nào sau đây là đúng? (Góc hơn kém $\pi$)",
                options: ["$\tan(\alpha + \pi) = \tan(\alpha)$", "$\sin(\alpha + \pi) = \sin(\alpha)$", "$\cos(\alpha + \pi) = \cos(\alpha)$", "$\tan(\alpha + \pi) = -\tan(\alpha)$"],
                answer: "$\tan(\alpha + \pi) = \tan(\alpha)$",
                tip: "Hàm $\tan$ và $\cot$ có chu kỳ tuần hoàn là $\pi$. (Trong khi $\sin$ và $\cos$ thì $\sin(\alpha + \pi) = -\sin(\alpha)$)."
            },
            { id: 191, topic: "Lượng Giác", type: 'mcq',
                question: "Công thức cộng nào sau đây là đúng?",
                options: ["$\cos(a - b) = \cos a \cos b + \sin a \sin b$", "$\cos(a - b) = \cos a \cos b - \sin a \sin b$", "$\cos(a - b) = \cos a \sin b - \sin a \cos b$", "$\cos(a - b) = \sin a \sin b - \cos a \cos b$"],
                answer: "$\cos(a - b) = \cos a \cos b + \sin a \sin b$",
                tip: "Công thức $\cos$ thì 'cos cos sin sin, dấu trái'. Tức là $\cos(a-b)$ thì ở giữa là dấu cộng."
            },
            { id: 192, topic: "Lượng Giác", type: 'mcq',
                question: "Công thức nhân đôi nào sau đây là đúng?",
                options: ["$\sin(2a) = 2\sin(a)\cos(a)$", "$\sin(2a) = \sin^2(a) - \cos^2(a)$", "$\sin(2a) = 1 - 2\sin^2(a)$", "$\sin(2a) = 2\sin(a)$"],
                answer: "$\sin(2a) = 2\sin(a)\cos(a)$",
                tip: "Đây là công thức $\sin$ nhân đôi. (Các công thức kia là của $\cos(2a)$ hoặc sai)."
            },
            { id: 193, topic: "Lượng Giác", type: 'mcq',
                question: "Cho $\sin(\alpha) = \frac{1}{3}$ và $90^\circ < \alpha < 180^\circ$. Tính $\cos(\alpha)$.",
                options: ["$-\frac{2\sqrt{2}}{3}$", "$\frac{2\sqrt{2}}{3}$", "$\frac{1}{3}$", "$-\frac{1}{3}$"],
                answer: "$-\frac{2\sqrt{2}}{3}$",
                tip: "$\cos^2(\alpha) = 1 - \sin^2(\alpha) = 1 - (\frac{1}{3})^2 = 1 - \frac{1}{9} = \frac{8}{9}$. Vì $\alpha$ ở góc phần tư thứ II nên $\cos(\alpha) < 0$. Vậy $\cos(\alpha) = -\sqrt{\frac{8}{9}} = -\frac{2\sqrt{2}}{3}$."
            },
            { id: 194, topic: "Lượng Giác", type: 'fill',
                question: "Rút gọn biểu thức $P = \sin(x) + \sin(\pi - x)$. (Nhập đáp án rút gọn)",
                answer: "2sin(x)",
                tip: "Sử dụng quan hệ 'Sin bù', ta có $\sin(\pi - x) = \sin(x)$. Vậy $P = \sin(x) + \sin(x) = 2\sin(x)$."
            },
            { id: 195, topic: "Lượng Giác", type: 'fill',
                question: "Tính diện tích $\triangle ABC$ biết $a=4$, $b=5$, và góc $C = 30^\circ$. (Nhập đáp án là một con số)",
                answer: "5",
                tip: "Áp dụng công thức $S = \frac{1}{2}ab\sin(C) = \frac{1}{2} \cdot 4 \cdot 5 \cdot \sin(30^\circ) = \frac{1}{2} \cdot 4 \cdot 5 \cdot \frac{1}{2} = 5$."
            },
            { id: 196, topic: "Lượng Giác", type: 'fill',
                question: "Rút gọn $P = (\sin(x) + \cos(x))^2 - 2\sin(x)\cos(x)$. (Nhập đáp án là một con số)",
                answer: "1",
                tip: "Khai triển hằng đẳng thức: $(\sin^2(x) + 2\sin(x)\cos(x) + \cos^2(x)) - 2\sin(x)\cos(x)$. Sử dụng $\sin^2(x) + \cos^2(x) = 1$."
            }
        ]
    }
};