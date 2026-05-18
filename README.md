# 오늘 뭐먹지 · 나만의 영양사 🥗

AI가 매일 맞춤 식단을 추천해주는 PWA 영양사 앱.

## 기능

- 🎯 6가지 식단 목표 (벌크업/감량/유지/스트레스 해소/에너지/장 건강)
- 🤖 Gemini AI 기반 맞춤 식단 추천 (BYOK)
- 📊 개인 정보 기반 칼로리 자동 계산 (Mifflin-St Jeor)
- 🍳 레시피 + 영양정보 + 영양사 한마디
- 🛒 장보기 목록 자동 생성 (카테고리별 분류)
- 📝 식단 히스토리 (최근 60일)
- 📱 PWA - 홈 화면에 추가해서 앱처럼 사용
- 🔌 오프라인 작동 (식단 생성 제외)

## 사용법

1. [Google AI Studio](https://aistudio.google.com/apikey)에서 무료 Gemini API 키 발급
2. 앱 우측 상단 ⚙️ 설정에서 API 키 등록
3. "목표" 탭에서 내 정보(나이/키/몸무게) 입력
4. "오늘" 탭에서 "AI 식단 받기" 클릭!

## 파일 구성

```
.
├── index.html              # 메인 앱
├── manifest.json           # PWA manifest
├── service-worker.js       # 오프라인 캐싱
├── icon-192.png            # 앱 아이콘 (192x192)
├── icon-512.png            # 앱 아이콘 (512x512)
└── icon-512-maskable.png   # Android 마스커블 아이콘
```

## 기술 스택

- Vanilla HTML/CSS/JavaScript (의존성 0)
- Pretendard 폰트 (CDN)
- Gemini 2.5 Flash API
- localStorage (데이터 저장)
- Service Worker (PWA)

## 라이선스

MIT
