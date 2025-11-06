"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

export default function V3Page() {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCharacterClick = (character: string) => {
    setSelectedCharacter(selectedCharacter === character ? null : character);
  };

  const characters = [
    { id: "발토", name: "발토", color: "#f5d576" },
    { id: "카스퍼", name: "카스퍼", color: "#8ab4f8" },
    { id: "밀로", name: "밀로", color: "#81c995" },
    { id: "해설", name: "해설", color: "#9aa0a6" },
    { id: "마을사람1", name: "마을 사람 1", color: "#ee8b60" },
    { id: "마을사람2", name: "마을 사람 2", color: "#ee8b60" },
    { id: "노파", name: "노파", color: "#c58af9" },
  ];

  // 캐릭터별 색상 매핑
  const getCharacterColor = (text: string) => {
    if (text.includes("발토")) return { id: "발토", color: "#f5d576" };
    if (text.includes("카스퍼")) return { id: "카스퍼", color: "#8ab4f8" };
    if (text.includes("밀로")) return { id: "밀로", color: "#81c995" };
    if (text.includes("해설")) return { id: "해설", color: "#9aa0a6" };
    if (text.includes("마을 사람 1") || text.includes("마을사람1")) return { id: "마을사람1", color: "#ee8b60" };
    if (text.includes("마을 사람 2") || text.includes("마을사람2")) return { id: "마을사람2", color: "#ee8b60" };
    if (text.includes("노파")) return { id: "노파", color: "#c58af9" };
    return null;
  };

  // 대사 하이라이트 스타일 헬퍼
  const getDialogueClass = (characterId: string) => {
    if (selectedCharacter === characterId) {
      return "transition-all duration-300 rounded p-3";
    }
    if (selectedCharacter) {
      return "opacity-30 transition-all duration-300";
    }
    return "transition-all duration-300";
  };

  const getDialogueInlineStyle = (characterId: string) => {
    const char = characters.find(c => c.id === characterId);
    if (!char) return {};

    if (selectedCharacter === characterId) {
      return {
        backgroundColor: `${char.color}20`,
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: char.color,
      };
    }
    return {};
  };

  return (
    <div className="bg-black text-[#e0e0e0] leading-relaxed overflow-x-hidden">
      {/* Hero Section */}
      <motion.div
        className="w-full h-screen relative flex items-center justify-center overflow-hidden bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/01.png"
          alt="별을 따라서"
          fill
          className="object-cover md:object-cover object-contain"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none" />
        <motion.div
          className="absolute top-32 md:top-auto md:bottom-64 left-0 right-0 px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal text-center text-white tracking-wider drop-shadow-2xl" style={{ fontFamily: "'HsBombaram21', sans-serif" }}>
            별을 따라서
          </h1>
          <p className="text-lg md:text-xl text-center text-[#d4af37] mt-4 tracking-wide drop-shadow-lg font-extralight">
            V3: 코미디 연극 버전
          </p>
        </motion.div>
      </motion.div>

      {/* 등장인물 섹션 */}
      <motion.div
        className="px-4 py-8 md:px-24 bg-gradient-to-b from-black to-[#0a0a0a]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="text-2xl md:text-3xl text-[#d4af37] text-center mb-6 diphylleia-regular">등장인물 선택</h2>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {characters.map((character) => (
            <button
              key={character.id}
              onClick={() => handleCharacterClick(character.id)}
              className={`px-5 py-2.5 rounded-xl backdrop-blur-sm border transition-all duration-300 font-medium ${
                selectedCharacter === character.id
                  ? "scale-110 shadow-lg"
                  : "hover:scale-105"
              }`}
              style={{
                backgroundColor: selectedCharacter === character.id
                  ? `${character.color}40`
                  : `${character.color}0D`,
                borderColor: selectedCharacter === character.id
                  ? `${character.color}99`
                  : `${character.color}4D`,
                color: character.color,
                boxShadow: selectedCharacter === character.id
                  ? `0 10px 25px ${character.color}33`
                  : "none",
              }}
            >
              {character.name}
            </button>
          ))}
          {selectedCharacter && (
            <button
              onClick={() => setSelectedCharacter(null)}
              className="px-5 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/30 text-white hover:bg-white/10 hover:border-white/60 transition-all duration-300 font-medium"
            >
              전체 보기
            </button>
          )}
        </div>
      </motion.div>

      {/* 장 네비게이션 */}
      <motion.div
        className="px-4 py-8 md:px-24 bg-gradient-to-b from-black to-[#0a0a0a]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="text-2xl md:text-3xl text-[#d4af37] text-center mb-6 diphylleia-regular">챕터 선택</h2>
        <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
          {[
            { id: "prologue", name: "프롤로그" },
            { id: "chapter1", name: "1장: 만남" },
            { id: "chapter2", name: "2장: 폭풍" },
            { id: "chapter3", name: "3장: 마을" },
            { id: "chapter4", name: "4장: 절망" },
            { id: "chapter5", name: "5장: 도착" },
            { id: "epilogue", name: "에필로그" },
            { id: "finale", name: "피날레" },
            { id: "notes", name: "연출 노트" },
          ].map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => {
                const element = document.getElementById(chapter.id);
                element?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="px-5 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/20 hover:border-[#d4af37]/60 hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all duration-300 font-medium"
            >
              {chapter.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-4 py-12 md:px-24">
        {/* 프롤로그 */}
        <motion.div
          id="prologue"
          className="my-16 md:my-24 bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-center text-[#d4af37] tracking-wider diphylleia-regular">
            프롤로그
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            세 아이의 빵터지는 시작
          </p>
          <div className="flex items-center gap-4 mt-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>

          <motion.div
            className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            무대는 완전한 어둠. 갑자기 별 하나가 "뿅!" 하고 떠오른다 (효과음: 만화 효과음)
          </motion.div>

          <motion.p
            className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`}
            style={getDialogueInlineStyle("해설")}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            해설자 (관객에게 직접 말하듯, 친근하게): "여러분! 동방박사 이야기 아시죠? (손가락 세 개 들며) 세 명의 박사가 별 따라가서 아기 예수님 만났다는 거! 근데요... (관객 쪽으로 몸을 숙이며 속삭이듯) 완전 거짓말이에요. 아니, 거짓말은 아니고... (당황) 약간 과장? 사실 그 박사님들... (극적으로) 그냥 애들이었어요! 여러분 나이 또래! 대박이죠? (웃음) 후대 사람들이 멋있게 포장한 거예요. '동방박사'라고. 원래는 '동방세아이' 정도? (관객 반응 기다리며) 안 웃기면 말고요..."
          </motion.p>

          <motion.p
            className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`}
            style={getDialogueInlineStyle("해설")}
          >
            해설자 (기분 좋게): "자, 그럼 시작할까요? 옛날 옛적에... (갑자기 멈추고) 아 요즘은 이렇게 안 하죠? 그냥 '예전에'! (웃음) 첫 번째 주인공 나와요~"
          </motion.p>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            발토가 등장... 하려다 문턱에 걸려 넘어진다. 벌떡 일어나 괜찮은 척 웃는다
          </div>

          <p className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`} style={getDialogueInlineStyle("해설")}>
            해설자 (발토를 가리키며): "저기 넘어진 친구! 발토! 열다섯 살! 특기는 웃기. 아니, 웃는 거. (한숨) 가족을 다 잃었는데도 맨날 웃어요. 울면 진짜 슬플까봐. 그래서 어떻게든 웃어요. 근데 말이죠... (별을 가리키며) 저 별 보는 순간 이 친구가 뭐라고 했는지 아세요? '어? 엄마 냄새 난다!' (웃음) 별에서 엄마 냄새가 나요? 근데 진심이었대요. 진짜로."
          </p>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            카스퍼가 두툼한 책을 들고 등장. 책이 너무 무거워 비틀거린다. 별을 보고 급히 두루마리를 펼치다가 땅에 다 떨어뜨린다
          </div>

          <p className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`} style={getDialogueInlineStyle("해설")}>
            해설자 (카스퍼를 보며 웃음): "두 번째! 카스퍼! 열네 살! 학자 집안 아들. 전형적인 '나 똑똑해' 스타일. (안경 쓰는 시늉) 신이 어디 있냐고, 증명해보라고, 과학적 근거가 뭐냐고... (한숨) 친구 당연히 없죠. 근데 이 친구가 별 딱 보는 순간! (심장 두드리는 시늉) '쿵!' 심장이 미친 듯이 뛰었대요. 왜냐고요? (어깨 으쓱) 저도 모르죠. 근데 본인도 몰라요. 헐."
          </p>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 플룻을 꼭 껴안고 조심조심 등장. 너무 조심스러워서 슬로우모션처럼 느리게 걷는다. 별을 보고 멈춘다
          </div>

          <p className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`} style={getDialogueInlineStyle("해설")}>
            해설자 (진지해지며): "마지막. 밀로. 열세 살. 말 안 해요. 무서워서. (목소리 낮추며) 전쟁으로 다 잃었거든요. 아빠가 만들어준 플룻만 꼭 안고 다녀요. 천재 연주자래요. 근데... (극적으로) 한 번도 안 불어봤대요! 딱 한 번도! (관객에게) 이게 말이 돼요? 플룻은 왜 가지고 다녀요? (한숨) 근데 이 친구도 별 보는 순간... 처음으로 말하고 싶어졌대요. 뭐라고요? (고개 저으며) 저도 기다려봐야 알 것 같아요."
          </p>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 아이가 중앙에서 딱 마주친다. 서로를 보고 "헉!" 하며 뒤로 물러선다. 코미디 타이밍
          </div>

          <p className="italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight">
            해설자 (박수 치며): "자! 이렇게 완전 다른 세 친구가 별 하나 때문에 만났어요! (관객에게) 이게 운명? 우연? 아니면 그냥... (어깨 으쓱) 별이 장난친 건가? 자, 궁금하시죠? 저도 궁금해요. 같이 봅시다!"
          </p>
        </motion.div>

        {/* 1장: 만남 */}
        <motion.div
          id="chapter1"
          className="my-16 md:my-24 bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-center text-[#d4af37] tracking-wider diphylleia-regular">
            1장: 만남
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            별 아래서 모인 세 명의... 이상한 친구들?
          </p>
          <div className="flex items-center gap-4 mt-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>

          <motion.div
            className="w-full my-8 rounded overflow-hidden flex items-center justify-center max-h-[70vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/04.png"
              alt="세 아이의 만남"
              width={1200}
              height={600}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 아이가 서로를 발견하고 화들짝 놀란다. 발토가 너무 놀라서 뒤로 넘어진다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (벌떡 일어나 손 내저으며, 당황):</p>
            <p className="text-[#ddd]">"헉! 깜짝이야! 야 진짜! 나 혼자 이상한 줄 알았는데 너희도 있네? (별 가리키며) 너희도 저거 때문이야? 저 별? 나만 이상한 거 아니지?"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (안경 치켜올리며, 진지하게):</p>
            <p className="text-[#ddd]">"저 별... 천문학적으로 완전 말도 안 돼. 궤도도 이상하고 밝기도 이상하고... 근데 왜 마치 '야! 이리 와!' 이러는 것 같지? (당황하며 머리 긁적) 내가 지금 별한테 말 걸린 거야? 미쳤나?"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (눈 커지며, 흥분해서):</p>
            <p className="text-[#ddd]">"오! 나도 그랬어! 나는 저거 보는 순간 엄마 냄새가 났어! (급히 손사래 치며) 아니 냄새는 아니고... 느낌? 막 '엄마다!' 이런 느낌! (목소리 작아지며) ...미친놈 같지? 나도 알아..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 말없이 별을 가리킨다. 세 아이가 잠시 침묵한다. 바람 소리만
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (밀로에게 다가가며):</p>
            <p className="text-[#ddd]">"너는... 말 안 하는 스타일? (밀로가 고개 젓자, 웃음이 사라지며) ...아. 괜찮아. 나도 사실... (힘없이 웃으며) 말하면 울 것 같아서 계속 웃는 거거든. 그래서 너 완전 이해해."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (혼잣말로, 중얼거리며):</p>
            <p className="text-[#ddd]">"별이 사람을 부를 리 없어. 과학적으로 말도 안 돼. 근데 왜 나는 여기 있는 거야? 왜 심장이 뛰는 거야? (머리 쥐어뜯으며) 이거 완전 비논리적이잖아!"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            어색한 침묵. 세 아이가 서로를 힐끔힐끔 본다. 발토가 먼저 웃는다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (손 내밀며, 밝게):</p>
            <p className="text-[#ddd]">"야, 우리 같이 갈래? 어차피 다 이상한 애들끼리! (웃음) 혼자 가기 무섭잖아. 셋이면 좀 덜 무섭지 않을까?"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (망설이다 손 잡으며):</p>
            <p className="text-[#ddd]">"이거 완전 비합리적인 선택인데... 왜 맞는 것 같지? (한숨) 아 몰라, 가자!"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 망설이다가 손을 내밀어 두 사람 손 위에 포갠다. 처음으로 작게 미소 짓는다
          </div>

          <div className="my-6 text-base leading-loose">
            <p className="text-[#f5d576] font-medium mb-2">셋이 함께 (힘차게):</p>
            <p className="text-[#ddd]">"가보자고!"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 아이가 손잡고 걷기 시작한다... 근데 발토가 또 넘어진다. 일어나서 웃으며 다시 걷는다
          </div>
        </motion.div>

        {/* 2장: 첫 번째 시험 - 폭풍 */}
        <motion.div
          id="chapter2"
          className="my-16 md:my-24 bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-center text-[#d4af37] tracking-wider diphylleia-regular">
            2장: 폭풍
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            날씨도 우리 편은 아니었다
          </p>
          <div className="flex items-center gap-4 mt-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>

          <motion.div
            className="w-full my-8 rounded overflow-hidden flex items-center justify-center max-h-[70vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/05.png"
              alt="폭풍"
              width={1200}
              height={600}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            무대가 어두워진다. 격렬한 바람 소리. 세 아이가 폭풍에 이리저리 휘청인다. 슬랩스틱 코미디처럼 과장되게
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (바람에 날아가듯 휘청이며):</p>
            <p className="text-[#ddd]">"야! 이거 뭐야! 폭풍 예보 없었잖아! 날씨 앱 거짓말쟁이!"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (소리 지르며, 안경이 날아갈까봐 붙잡으며):</p>
            <p className="text-[#ddd]">"풍속 측정 결과! 초속 20미터 이상! 완전 위험! 대박! 이거 진짜 죽을 수도 있어요!"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            발토가 바람에 밀려 펑 하고 쓰러진다. 일어나려다 다시 넘어진다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (바닥에 엎드린 채, 힘없이):</p>
            <p className="text-[#ddd]">"미안... 나 못 가겠어... 다리에 힘이 하나도 없어... (웃으려다 실패) 엄마... 엄마 생각나..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (달려가며, 다급하게):</p>
            <p className="text-[#ddd]">"발토야! 일어나! 여기 있으면 체온 급강하로 저체온증 와! 그럼 진짜 위험해!"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (울먹이며, 처음으로 웃지 않고):</p>
            <p className="text-[#ddd]">"나... 진짜 혼자구나... 완전히 혼자... (작게) 무서워..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 아무 말 없이 자기 옷을 벗어 발토에게 덮어준다. 추워서 부들부들 떤다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (놀라서 소리치며):</p>
            <p className="text-[#ddd]">"야! 밀로야! 너 미쳤어? 넌 어떡하려고! 너도 얼어죽어!"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 고개 젓고 카스퍼의 손을 잡아 발토에게 이끈다. 세 아이가 서로를 꼭 감싼다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (떨리는 목소리로, 놀라며):</p>
            <p className="text-[#ddd]">"헐... 따뜻해... 진짜 따뜻하다... 대박..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (작게, 떨리며):</p>
            <p className="text-[#ddd]">"체온 공유... 과학적으로 맞는 방법이야... (목소리 작아지며) 근데 생각보다 훨씬 더... 따뜻하네..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            폭풍이 점점 잦아든다. 별빛이 다시 나타난다. 세 아이가 천천히 일어선다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (천천히 일어서며, 다시 미소 지으며):</p>
            <p className="text-[#ddd]">"고마워... 진심으로. 너희가 없었으면 진짜 죽을 뻔했어. (웃으며) 이제 갈 수 있을 것 같아. 가자!"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (멋쩍게):</p>
            <p className="text-[#ddd]">"뭘... 당연한 거지... (작게) 우린... 팀이잖아..."</p>
          </div>
        </motion.div>

        {/* 3장: 두 번째 시험 - 마을 */}
        <motion.div
          id="chapter3"
          className="my-16 md:my-24 bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-center text-[#d4af37] tracking-wider diphylleia-regular">
            3장: 마을
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            의심받는 세 명의 수상한 아이들
          </p>
          <div className="flex items-center gap-4 mt-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>

          <motion.div
            className="w-full my-8 rounded overflow-hidden flex items-center justify-center max-h-[70vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/06.png"
              alt="마을"
              width={1200}
              height={600}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            어두운 마을. 갑자기 여러 마을 사람들이 사방에서 "와!" 하고 튀어나온다. 세 아이가 "악!" 하고 놀란다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("마을사람1")}`} style={getDialogueInlineStyle("마을사람1")}>
            <p className="text-[#ee8b60] font-medium mb-2">마을 사람 1 (창 들고 위협적으로):</p>
            <p className="text-[#ddd]">"거기 멈춰! 손들어! 빨리!"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("마을사람2")}`} style={getDialogueInlineStyle("마을사람2")}>
            <p className="text-[#ee8b60] font-medium mb-2">마을 사람 2 (의심 가득한 눈빛으로):</p>
            <p className="text-[#ddd]">"한밤중에 애들이 셋이나 떼거지로? 이거 백프로 도둑이야! 백프로!"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 아이가 화들짝 놀라 뒤로 물러선다. 발토가 양손을 번쩍 든다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (양손 번쩍 들며, 과장되게 웃으며):</p>
            <p className="text-[#ddd]">"와와와와! 완전 오해세요! 우리 도둑 아니에요! 진짜 진짜! (너무 밝게) 우리는 그냥... 관광객! 맞아! 야간 관광! 요즘 대세잖아요? 밤에 돌아다니는 거! 별 관광! (땀 뻘뻘)"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("마을사람2")}`} style={getDialogueInlineStyle("마을사람2")}>
            <p className="text-[#ee8b60] font-medium mb-2">마을 사람 2 (어이없어하며):</p>
            <p className="text-[#ddd]">"야간 관광? 한밤중에? 애들이? (웃음) 이거 핑계가 너무 웃긴데?"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            카스퍼가 갑자기 머리에 쓴 가발 같은 걸 벗는다. 진지한 표정으로 변신
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (갑자기 진지하게, 목소리 낮춰):</p>
            <p className="text-[#ddd]">"사실은... 저희는 동방박사입니다. 별을 따라서 왔습니다. (멋있는 포즈)"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (카스퍼 머리를 탁 치며, 당황):</p>
            <p className="text-[#ddd]">"야! 너 지금 뭐 하는 거야! 동방박사는 무슨! 정신차려!"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            카스퍼가 당황하며 급히 가발을 다시 쓴다. "아차!" 하는 표정
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (당황하며, 어색하게):</p>
            <p className="text-[#ddd]">"아... 죄송합니다... 저희는... 그냥 야간 관광객입니다! 맞아요! 별 구경! (손사래)"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("마을사람1")}`} style={getDialogueInlineStyle("마을사람1")}>
            <p className="text-[#ee8b60] font-medium mb-2">마을 사람 1 (폭소하며):</p>
            <p className="text-[#ddd]">"하하하! 야간 관광에서 동방박사로 갔다가 다시 야간 관광? 이 친구들 완전 개그네! 어디서 온 거야?"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 갑자기 앞으로 걸어 나간다. 발토와 카스퍼가 "어?" 하며 쳐다본다. 모두가 동작을 멈춘다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
            <p className="text-[#81c995] font-medium mb-2">밀로 (작지만 또렷하게, 처음으로 입을 열며):</p>
            <p className="text-[#ddd]">"...왕이... 태어나셨어요."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세상이 멈춘 듯한 정적. 발토와 카스퍼가 입을 떡 벌린다. "헉!"
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (속삭이듯, 충격):</p>
            <p className="text-[#ddd]">"...밀로... 네가... 말을 했어... 대박..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (놀라서):</p>
            <p className="text-[#ddd]">"처음 듣는 목소리..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("마을사람2")}`} style={getDialogueInlineStyle("마을사람2")}>
            <p className="text-[#ee8b60] font-medium mb-2">마을 사람 2 (당황하며):</p>
            <p className="text-[#ddd]">"...왕? 어디에? 무슨 왕?"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 떨리는 손으로 별을 가리킨다. 눈빛이 확고하다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("마을사람1")}`} style={getDialogueInlineStyle("마을사람1")}>
            <p className="text-[#ee8b60] font-medium mb-2">마을 사람 1 (비웃으려다 멈추며):</p>
            <p className="text-[#ddd]">"별... 속에 왕이? 그게... 무슨..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            노파가 천천히 앞으로 나온다. 밀로를 뚫어지게 바라본다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("노파")}`} style={getDialogueInlineStyle("노파")}>
            <p className="text-[#c58af9] font-medium mb-2">노파 (부드럽게, 손 들어 제지하며):</p>
            <p className="text-[#ddd]">"조용히들 해라. (밀로를 바라보며) ...얘야, 너... 지금 처음 말한 거니?"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
            <p className="text-[#81c995] font-medium mb-2">밀로 (고개 끄덕이며, 떨리는 목소리로):</p>
            <p className="text-[#ddd]">"...네. 왜냐면... 진짜니까요. 너무 진짜라서... 말 안 하면 안 될 것 같았어요..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 더 이상 말이 안 나온다. 눈물만 흐른다. 플룻을 꼭 안는다
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            긴 침묵. 노파가 천천히 무릎을 꿇는다. 마을 사람들이 숨을 죽인다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("노파")}`} style={getDialogueInlineStyle("노파")}>
            <p className="text-[#c58af9] font-medium mb-2">노파 (눈물 흘리며):</p>
            <p className="text-[#ddd]">"나도... 너희만큼 어렸을 때... 그렇게 순수하게 믿었단다. 하지만 세월이 흐르면서... 잊어버렸구나. (일어서며) 동쪽으로 가거라. 베들레헴. 거기에... 너희가 찾는 분이... 계실 거야."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            노파가 빵을 꺼내 건넨다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (떨리는 손으로 빵을 받으며):</p>
            <p className="text-[#ddd]">"감사합니다... 진짜로..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            마을 사람들이 천천히 길을 열어준다. 세 아이가 걷기 시작한다
          </div>
        </motion.div>

        {/* 4장: 세 번째 시험 - 절망 */}
        <motion.div
          id="chapter4"
          className="my-16 md:my-24 bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-center text-[#d4af37] tracking-wider diphylleia-regular">
            4장: 절망
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            포기하고 싶을 때 들려온 선율
          </p>
          <div className="flex items-center gap-4 mt-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>

          <motion.div
            className="w-full my-8 rounded overflow-hidden flex items-center justify-center max-h-[70vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/07.png"
              alt="플룻 연주"
              width={1200}
              height={600}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            끝없는 길. 세 아이가 비틀거리다 하나씩 쓰러진다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (쓰러지며, 지쳐서):</p>
            <p className="text-[#ddd]">"안 돼... 다리가 완전 말을 안 들어... 헬스 안 해서 이래... (힘없이 웃음)"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (주저앉으며, 자조적으로):</p>
            <p className="text-[#ddd]">"내가 맞았어... 신 같은 건 없어. 우린 그냥 바보들이야... 완전 멍청이..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로도 무릎을 꿇는다. 별빛이 희미해진다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (처음으로 진짜 울음 터뜨리며):</p>
            <p className="text-[#ddd]">"엄마... 미안해... 나 집에 가고 싶어... 무서워..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 천천히 플룻을 꺼낸다. 두 친구를 바라본다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (고개 들며, 힘없이):</p>
            <p className="text-[#ddd]">"...밀로?"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 플룻을 입에 댄다. 눈을 감는다
          </div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37] text-center text-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            [ 플룻 독주 - 1분 ]<br/>
            <span className="text-sm text-[#999] block mt-2">밀로가 처음으로 플룻을 분다. 아버지를 향해, 친구들을 향해, 잃어버린 모든 것들을 향해</span>
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            부드럽고 애절한 플룻 선율. 세 아이 뒤로 잃어버린 가족들의 희미한 형상이 나타났다가 사라진다. 음악이 슬픔에서 위로로, 그리고 희망으로 변한다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (눈물 흘리며):</p>
            <p className="text-[#ddd]">"밀로야... 너무... 예쁘다... 진짜..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
            <p className="text-[#81c995] font-medium mb-2">밀로 (작게, 떨리며):</p>
            <p className="text-[#ddd]">"무서웠어... 불면 울 것 같아서... 근데 아빠가 그랬어. 이 플룻은 누군가 힘들 때 위로하려고 부는 거라고. 그게... 사랑이라고..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 처음으로 눈물을 흘린다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (일어서며):</p>
            <p className="text-[#ddd]">"위로됐어... 처음으로 누군가 날 위로해줬어..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (일어서며, 미소로):</p>
            <p className="text-[#ddd]">"엄마도... 들었을 것 같아..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
            <p className="text-[#81c995] font-medium mb-2">밀로 (또렷하게, 가슴을 가리키며):</p>
            <p className="text-[#ddd]">"우리... 바보 아니야. 폭풍 속에서 서로 감싸줬잖아. 마을에서 빵도 받았잖아. 지금 위로도 받았고. (가슴 누르며) 다... 여기 있어."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (깨닫듯, 가슴에 손):</p>
            <p className="text-[#ddd]">"헐... 대박... 엄마도 여기 계셨어..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (감격하며):</p>
            <p className="text-[#ddd]">"우리가 찾던 게... 처음부터..."</p>
          </div>

          <div className="my-6 text-base leading-loose">
            <p className="text-[#f5d576] font-medium mb-2">셋이 함께:</p>
            <p className="text-[#ddd]">"...여기 있었어."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 아이가 껴안는다. 하나의 그림자가 된다
          </div>
        </motion.div>

        {/* 5장: 도착 */}
        <motion.div
          id="chapter5"
          className="my-16 md:my-24 bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-center text-[#d4af37] tracking-wider diphylleia-regular">
            5장: 도착
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            별이 멈춘 곳
          </p>
          <div className="flex items-center gap-4 mt-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>

          <motion.div
            className="w-full my-8 rounded overflow-hidden flex items-center justify-center max-h-[70vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/08.png"
              alt="베들레헴 마구간"
              width={1200}
              height={600}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            작은 마구간. 별빛이 그곳을 비춘다. 세 아이가 조심스럽게 다가간다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (속삭이며):</p>
            <p className="text-[#ddd]">"여기... 여기인가봐... 별이 멈췄어..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (놀라며):</p>
            <p className="text-[#ddd]">"근데... 여기 그냥 마구간인데? 왕이 태어날 곳이... 이런 곳?"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            아기의 울음소리. 세 아이가 숨을 죽이고 다가간다
          </div>

          <motion.div
            className="w-full my-8 rounded overflow-hidden flex items-center justify-center max-h-[70vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/09.png"
              alt="아기 예수"
              width={1200}
              height={600}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </motion.div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (작게, 놀라며):</p>
            <p className="text-[#ddd]">"...아기야... 진짜 아기..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (떨리는 목소리로):</p>
            <p className="text-[#ddd]">"이게... 이게 우리가 찾던... (무릎 꿇으며) 왕?"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 무릎 꿇고 플룻을 아기 앞에 조심스럽게 놓는다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
            <p className="text-[#81c995] font-medium mb-2">밀로 (작게):</p>
            <p className="text-[#ddd]">"이거... 제가 가진 전부예요..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (웃음을 내려놓으며):</p>
            <p className="text-[#ddd]">"나도... 내 웃음... 드릴게요... 진짜 웃음으로..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (눈물 흘리며):</p>
            <p className="text-[#ddd]">"저는... 제 의심... 다 내려놓을게요..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            아기가 세 아이를 바라보며 미소 짓는다. 별빛이 더욱 밝아진다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (깨달으며):</p>
            <p className="text-[#ddd]">"우리가... 찾던 신은... 여기 있었구나... 처음부터..."</p>
          </div>

          <div className="my-6 text-base leading-loose">
            <p className="text-[#f5d576] font-medium mb-2">셋이 함께 (가슴에 손을 얹으며):</p>
            <p className="text-[#ddd]">"...우리 안에."</p>
          </div>
        </motion.div>

        {/* 에필로그 */}
        <motion.div
          id="epilogue"
          className="my-16 md:my-24 bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-center text-[#d4af37] tracking-wider diphylleia-regular">
            에필로그
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            별을 따라온 세 아이의 이야기
          </p>
          <div className="flex items-center gap-4 mt-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>

          <motion.div
            className="w-full my-8 rounded overflow-hidden flex items-center justify-center max-h-[70vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/10.png"
              alt="귀환"
              width={1200}
              height={600}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </motion.div>

          <p className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`} style={getDialogueInlineStyle("해설")}>
            해설자 (관객에게 다정하게): "이 이야기가 어땠나요? (웃음) 재미있었어요? 감동적이었어요? 둘 다? (박수 유도) 사실 이 세 친구의 이야기는 여기서 끝이 아니에요. 후대 사람들이 이 이야기를 듣고 '동방박사'라고 불렀죠. 멋있게 포장한 거예요. 근데 말이죠..."
          </p>

          <p className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`} style={getDialogueInlineStyle("해설")}>
            해설자: "진짜 중요한 건... (관객 가리키며) 여러분도 별을 따라갈 수 있다는 거예요. 별이 뭐냐고요? (가슴 가리키며) 여기 있어요. 여러분 안에. 그게 믿음이에요. 그게 사랑이에요. 그게... 신이에요."
          </p>

          <p className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`} style={getDialogueInlineStyle("해설")}>
            해설자 (밝게): "자, 그럼 이제 마지막으로! 세 친구가 다시 한 번 인사드릴게요!"
          </p>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 아이가 무대 중앙으로 걸어 나온다. 손을 잡고 있다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (환하게 웃으며):</p>
            <p className="text-[#ddd]">"저는 이제 진짜로 웃어요! 가짜가 아니라!"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (안경 벗으며):</p>
            <p className="text-[#ddd]">"저는 이제 의심 대신 믿음을 선택해요!"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
            <p className="text-[#81c995] font-medium mb-2">밀로 (또렷하게):</p>
            <p className="text-[#ddd]">"저는 이제 말할 수 있어요. 사랑한다고!"</p>
          </div>

          <div className="my-6 text-base leading-loose">
            <p className="text-[#f5d576] font-medium mb-2">셋이 함께 (관객을 향해):</p>
            <p className="text-[#ddd]">"여러분도 별을 따라가 보세요! 여러분 안에 있는 별을!"</p>
          </div>
        </motion.div>

        {/* 피날레 */}
        <motion.div
          id="finale"
          className="my-16 md:my-24 bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-center text-[#d4af37] tracking-wider diphylleia-regular">
            피날레
          </h1>
          <div className="flex items-center gap-4 mt-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>

          <motion.div
            className="w-full my-8 rounded overflow-hidden flex items-center justify-center max-h-[70vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/11.png"
              alt="함께"
              width={1200}
              height={600}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            모든 배우가 무대에 나온다. 별빛이 무대를 가득 채운다
          </div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37] text-center text-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            [ 전체 합창 - "별을 따라서" ]<br/>
            <span className="text-sm text-[#999] block mt-2">모든 배우가 함께 노래한다. 관객도 함께 부를 수 있도록</span>
          </motion.div>

          <div className="my-8 p-6 bg-[#1a1a1a] rounded text-center">
            <p className="text-[#d4af37] text-2xl mb-4 diphylleia-regular">메리 크리스마스!</p>
            <p className="text-[#999]">여러분 안에 있는 별을 찾으시길</p>
          </div>
        </motion.div>

        {/* 연출 노트 */}
        <motion.div
          id="notes"
          className="my-16 md:my-24 bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-center text-[#d4af37] tracking-wider diphylleia-regular">
            연출 노트
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            코미디 연극 버전 연출 가이드
          </p>
          <div className="flex items-center gap-4 mt-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>

          <div className="space-y-6 text-[#ccc]">
            <div className="p-4 bg-[#1a1a1a] rounded">
              <h3 className="text-xl text-[#d4af37] mb-3">코미디 연극 스타일 특징</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong className="text-[#f5d576]">현대 한국어 구어체:</strong> "야 진짜!", "대박", "헐" 등 현대 청소년 언어 사용</li>
                <li><strong className="text-[#8ab4f8]">슬랩스틱 요소:</strong> 발토가 자주 넘어지는 등 신체적 코미디</li>
                <li><strong className="text-[#81c995]">4th Wall 깨기:</strong> 해설자가 관객에게 직접 말하기</li>
                <li><strong className="text-[#ee8b60]">티키타카:</strong> 캐릭터 간 빠른 대사 주고받기</li>
                <li><strong className="text-[#c58af9]">예상을 깨는 반전:</strong> 카스퍼의 가발 벗기 등</li>
              </ul>
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded">
              <h3 className="text-xl text-[#d4af37] mb-3">캐릭터별 연기 포인트</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong className="text-[#f5d576]">발토:</strong> 과장된 밝음, 자주 넘어지지만 바로 일어남, 코미디 타이밍 중요</li>
                <li><strong className="text-[#8ab4f8]">카스퍼:</strong> "아는 척" 캐릭터, 안경 치켜올리기, 진지한데 웃긴 상황</li>
                <li><strong className="text-[#81c995]">밀로:</strong> 조용하지만 임팩트 있는 순간들, 감동 포인트</li>
                <li><strong className="text-[#9aa0a6]">해설자:</strong> 관객과 적극 소통, 친근하고 유머러스하게</li>
              </ul>
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded">
              <h3 className="text-xl text-[#d4af37] mb-3">코미디와 감동의 균형</h3>
              <p className="mb-3">이 버전은 웃기면서도 따뜻한 이야기입니다:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>프롤로그~2장: 코미디 중심 (60% 웃음, 40% 진심)</li>
                <li>3장: 밸런스 (50% 웃음, 50% 감동)</li>
                <li>4장~에필로그: 감동 중심 (30% 웃음, 70% 감동)</li>
                <li>피날레: 따뜻한 마무리 (관객과 함께)</li>
              </ul>
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded">
              <h3 className="text-xl text-[#d4af37] mb-3">관객 참여 포인트</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>해설자의 질문에 관객이 대답할 수 있도록 여유 두기</li>
                <li>마을 장면에서 관객석 쪽을 바라보며 연기</li>
                <li>에필로그에서 관객에게 직접 말하기</li>
                <li>피날레 합창에 관객 참여 유도</li>
              </ul>
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded">
              <h3 className="text-xl text-[#d4af37] mb-3">음악과 효과음</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>만화 같은 효과음 활용 (넘어질 때, 놀랄 때)</li>
                <li>폭풍 장면: 과장된 바람 소리</li>
                <li>플룻 독주: 진지하고 아름답게 (감동 포인트)</li>
                <li>피날레: 밝고 희망찬 합창</li>
              </ul>
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded">
              <h3 className="text-xl text-[#d4af37] mb-3">핵심 메시지</h3>
              <p>웃기지만 진심은 있습니다:</p>
              <ul className="space-y-2 list-disc list-inside mt-2">
                <li>신은 멀리 있는 게 아니라 우리 안에 있다</li>
                <li>서로를 감싸주는 것이 사랑이다</li>
                <li>별을 따라간다는 것은 믿음을 선택하는 것</li>
                <li>완벽하지 않아도 괜찮다 (넘어져도 다시 일어나면 된다)</li>
              </ul>
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded">
              <h3 className="text-xl text-[#d4af37] mb-3">참고 작품</h3>
              <p className="mb-2">이 버전의 영감이 된 한국 코미디 연극들:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>김종욱 찾기:</strong> 일상적이고 공감 가는 유머</li>
                <li><strong>난타:</strong> 비언어적 코미디와 타이밍</li>
                <li><strong>옥탑방 고양이:</strong> 웃기면서도 따뜻한 감동</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="py-12 text-center text-[#666] border-t border-[#333]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="mb-2">장덕동성당 중고등부 성탄절 무대공연</p>
        <p className="text-sm">V3: 한국 코미디 연극 스타일</p>
        <p className="text-xs mt-4 text-[#444]">별을 따라서 - 웃기지만 따뜻한 이야기</p>
      </motion.footer>
    </div>
  );
}
