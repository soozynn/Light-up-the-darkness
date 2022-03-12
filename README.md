# 🔊 Louder!

---

## 프로젝트 소개

목소리의 볼륨을 조절하여 장애물과 몬스터들을 피해 깃발까지 완주해야하는 Web Audio API를 이용한 음성인식 웹 게임입니다.

## 프로젝트 동기

어릴 때 플래시게임에 대한 추억이 많아 개인 프로젝트로 간단한 플래시게임을 구현하고 싶은 마음이 컸습니다.

이전에 목소리를 이용한 게임을 재밌게 접했던 기억에서 아이디어를 얻어 Web Audio API를 이용한 음성인식 게임을 기획하게 되었습니다.

### Why chose Vanilla JavaScript?

초기에는 간단한 앱 게임으로 만들어보고자 React-native의 사용을 고려했었습니다. 하지만, React-native를 이용하여 게임 앱을 개발한다면, native에서 JS로 이벤트를 전송하고 JS에서 native로 UI 업데이트를 전송해야 하는 대기 시간으로 인해 게임에 눈에 띄는 지연이 발생할 수 있다는 것을 알게 되었습니다.

그러다 이전부터 생각해왔던 프레임워크와 라이브러리 없이 Vanilla JavaScript만을 이용하여 게임을 개발해보면 어떨까? 라는 생각이 문득 들게 되어 Vanilla JavaScript와 canvas만을 이용하여 프로젝트를 구현하게 되었습니다. 이번 프로젝트를 통해 Vanilla JavaScript의 OOP, closure, this, 구조 설계에 대해 많이 고민해볼 수 있었고, 이전에 제대로 정리하지 못했던 개념에 대해서도 다시 한번 공부할 수 있었던 기회를 가질 수 있었습니다.

## 기술 스택

- Vanilla Javascript
- HTML
- CSS
- Firebase
- Eslint
- Prettier
- Jest

## 🕹 게임 방법

![시작 페이지](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b0cc5db0-d54e-442e-9182-6ee18c6bfa9b/스크린샷_2022-03-11_오후_3.44.05.png)

시작 페이지

> 게임을 시작하기 전, How to play button을 통해 게임 조작 방법을 알 수 있습니다.

![How to play modal - 게임 조작 방법](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/17f37500-8e16-4225-b702-635aedb2b2f1/스크린샷_2022-03-11_오후_3.57.06.png)

How to play modal - 게임 조작 방법

> 목소리의 볼륨 크기를 통해 캐릭터를 조작

- **Soft volume:** to move
- **Loud volume:** to jump
- **Volume up**: higher jump

> 몬스터는 밟아 죽일 수 있지만,
> 머리 외에 몸통이 먼저 닿게되면 게임 종료

![Level select page - 난이도 선택 페이지](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2fa5305b-6702-4730-b872-437864ec33f3/스크린샷_2022-03-11_오후_3.51.44.png)

Level select page - 난이도 선택 페이지

> 게임의 난이도를 선택하여 진행할 수 있습니다.

![Level 1 - ice map](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/013407ed-ccd8-4098-a1aa-657eaa99b399/스크린샷_2022-03-11_오후_3.57.56.png)

Level 1 - ice map

> 게임을 clear 할 수 있는
> 깃발의 남은 위치를 %를 통해 알려 줍니다.

> Level에 따라 컨셉과 지형이 다르며,
> Level이 높을 수록 몬스터가 많아지고,
> 지형이 어려워집니다.

![Level 2 - fire map](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b704bae9-ced1-476a-b7b2-99e2b9c4bfc8/스크린샷_2022-03-11_오후_4.00.29.png)

Level 2 - fire map

> 우측 상단에는 Game의 bgm을
> 끄고 킬 수 있는 on/off 버튼이 있습니다.

![Level 3 - dark map](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/df06c10d-5d9d-480b-8f0e-c3d67c6cc86a/스크린샷_2022-03-11_오후_3.58.26.png)

Level 3 - dark map

> 좌측에 있는 타이머를 통해 초과된 시간을 알 수 있습니다.

## About the difficulties...

---

### Object Orient Programming (OOP)

개인프로젝트를 full stack으로 구현하는 많은 분들과는 달리, vanilla javascript만을 사용하여 구현하는 프로젝트였기에 여러가지 시도들이 필요하였습니다. 그 중, 구조 설계와 객체지향적인 접근에서 많은 어려움을 겪었습니다. 이번 프로젝트에서 캐릭터와 지형을 그려줄 때에 클래스 기반의 객체 지향 언어를 시도해보았는데, 처음에는 canvas와 클래스 문법에 익숙하지 않아 익히는 데에 많은 시간이 걸렸지만, 점차 객체 지향 언어에 대한 이해의 폭을 넓힐 수 있게 되었고, Vanilla JavaScript만을 사용하면서 프레임워크나 라이브러리들에 대한 장단점과 편리성에 대해서도 몸소 느껴볼 수 있는 시간이었습니다.

## 작업 기간

<aside>
💻 2022. 02. 21 ~ 2022. 03. 13 (3주)

</aside>

- 기획 단계: 2022년 2월 21일 ~ 2022년 2월 27일 (1주차)
  - 아이디어 구상 및 검토
  - 기술 스택 검증 및 검토
  - mockup 작업
  - kanban 생성
  - 사용할 game sprites 이미지, bgm 정리
- 개발 단계: 2022년 2월 28일 ~ 2022년 3월 13일 \*\*\*\*(2 & 3주차)
  - 기능 구현
  - 리팩토링 및 버그 해결
  - 테스트 코드 작성
  - 리드미 및 소개 페이지 작성

## 프로젝트를 마친 소감

이번 개인 프로젝트에서 무엇보다 가장 어려웠던 점은 어떤 막힘 속에서도 혼자서 해결해 나가야만 했던 과정이었습니다. 기획 단계부터 내가 생각해둔 기획이 구현이 가능한 방향인지 기술을 검증하고, API를 구현하고자하는 방향에 맞게 응용하는 부분에서부터 많은 어려움을 느꼈습니다. 2주라는 시간 안에 새로운 기술을 습득하고 적용해야하는 과정에서 심리적으로 많이 힘들었지만, 동시에 더 많이 성장할 수 있었던 경험이었습니다.

정확하지 못했던 기술 검증으로 인해 중간중간 목업과 기획을 많이 바꿔야했던 부분이 있었는데 이를 통해 개발 단계를 거치기 전 기술 검증과 기획의 중요성에 대해 다시 인지할 수 있었고, 한 개의 프로젝트를 만들기 위해 기획, 디자인, 개발 등 어느 하나 중요하지 않은 단계가 없다는 것을 몸소 체험할 수 있는 시간이었습니다.

또, 물리 엔진을 사용하지 않고 캐릭터와 지형의 충돌을 구현하는 부분에 있어서도 어려움이 많았지만 개발을 시작하기 이전부터 늘 만들어보고 싶었던 게임을 주제로 작업 할 수 있어 어려움을 뒤로하고 재밌게 구현할 수 있었습니다.
