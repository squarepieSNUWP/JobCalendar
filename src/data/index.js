export const jobs = [
    {
        id: 1,
        title: '프론트엔드 개발자 (3년 이상)',
        summary:`• 프론트 개발 경력 3년 이상 이신 분
        • Vue.js, Javascript(ES6+) 개발에 능숙하신 분
        • Git에 대한 이해 및 소스 코드 관리 경험이 있으신 분
        `,
        company: "네모난파이",
        occupation: "프론트엔드 개발자",
        startDate: "2023-05-01T00:00",
        endDate: "2023-05-29T24:00",
        reviews: [
            {
                question: "협업하면서 가장 힘들었던 기억은?",
                answer: "깃헙 사용이 어려웠어요.",
                tags: [{
                    id: 1,
                    title: "협업",
                    color: "rgba(230, 126, 34,0.7)"
                }],
            }, {
                question: "가장 자신있는 프로그래밍 언어는?",
                answer: "자바스크립트랑 파이썬이요.",
                tags: [{
                    id: 2,
                    title: "언어",
                    color: "rgba(231, 76, 60,0.7)"
                }],
            }, {
                question: "실제 프로젝트를 배포해본 경험이 있나요?",
                answer: "취뽀달력 만들면서 배포해봤어요.",
                tags: [{
                    id: 3,
                    title: "프로젝트",
                    color: "rgba(22, 160, 133,0.7)"
                }, {
                    id: 4,
                    title: "배포",
                    color: "rgba(44, 62, 80,0.7)"
                }],
            }
        ],
        generalReview: `개인 프로젝트 내용을 한번 더 훑고 가지 않은 점이 아쉬웠다.
        내가 진행한 프로젝트임에도 구체적으로 답변하지 못햇다.
        다음부터는 소스코드를 한번 더 살펴보고 면접을 가야겠다.`,
        generalRating: {
            id: 1,
            title: "대참사",
            color: "rgba(192, 57, 43,0.7)",
        },
        // generalReview: "",
        // generalRating: null,
    },
    {
        id: 2,
        title: '백엔드 개발자 (3년 이상)',
        summary:`• 백 개발 경력 3년 이상 이신 분
        • Java, Spring Boot 개발에 능숙하신 분
        • 대규모 트래픽을 다뤄본 경험이 있으신 분
        `,
        company: "웹프개",
        occupation: "백엔드 개발자",
        startDate: "2023-05-01T00:00",
        endDate: "2023-05-29T24:00",
        reviews: [
            {
                question: "왜 백엔드에 지원했나요?",
                answer: "UI를 만드는 작업보다 데이터를 다루는 작업이 더 재밌어서요.",
                tags: [{
                    id: 3,
                    title: "프로젝트",
                    color: "rgba(22, 160, 133,0.7)"
                }, {
                    id: 4,
                    title: "배포",
                    color: "rgba(44, 62, 80,0.7)"
                }],
            }
        ],
        generalReview: `CS관련 질문에 대답을 잘 했다.
        스터디를 통해 CS지식을 많이 쌓은 것 같다.
        가장 자신 없던 부분이었는데, 이제는 OS / DB / 네트워크에 대해 잘 알고 있다.`,
        generalRating: {
            id: 4,
            title: "만족해요",
            color: "rgba(39, 174, 96,0.7)",
        },
    },
]

export const ratings = [
    {
        id: 1,
        title: "대참사",
        color: "rgba(192, 57, 43,0.7)",
    },
    {
        id: 2,
        title: "아쉬워요",
        color: "rgba(230, 126, 34,0.7)",
    },
    {
        id: 3,
        title: "그저 그래요",
        color: "rgba(241, 196, 15,0.7)",
    },
    {
        id: 4,
        title: "만족해요",
        color: "rgba(39, 174, 96,0.7)",
    },
    {
        id: 5,
        title: "최고의 면접",
        color: "rgba(52, 152, 219,0.7)",
    },
]