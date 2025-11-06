"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

export default function MusicalVersion() {
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
    { id: "앙상블", name: "앙상블", color: "#ee8b60" },
    { id: "노파", name: "노파", color: "#c58af9" },
  ];

  // 캐릭터별 색상 매핑
  const getCharacterColor = (text: string) => {
    if (text.includes("발토")) return { id: "발토", color: "#f5d576" };
    if (text.includes("카스퍼")) return { id: "카스퍼", color: "#8ab4f8" };
    if (text.includes("밀로")) return { id: "밀로", color: "#81c995" };
    if (text.includes("해설")) return { id: "해설", color: "#9aa0a6" };
    if (text.includes("앙상블")) return { id: "앙상블", color: "#ee8b60" };
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
          alt="별을 따라서 - 뮤지컬 버전"
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
            뮤지컬 버전 - A Musical Journey
          </p>
          <p className="text-base md:text-lg text-center text-[#999] mt-2 tracking-wide drop-shadow-lg font-extralight">
            장덕동성당 중고등부 성탄절 무대공연
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
            { id: "overture", name: "서곡" },
            { id: "opening", name: "오프닝 넘버" },
            { id: "act1-scene1", name: "Act I, Scene 1" },
            { id: "act1-scene2", name: "Act I, Scene 2" },
            { id: "act1-finale", name: "Act I 피날레" },
            { id: "intermission", name: "막간" },
            { id: "act2-scene1", name: "Act II, Scene 1" },
            { id: "act2-scene2", name: "Act II, Scene 2" },
            { id: "finale", name: "그랜드 피날레" },
            { id: "curtain-call", name: "커튼콜" },
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
        {/* 서곡 (Overture) */}
        <motion.div
          id="overture"
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
            서곡 (Overture)
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            음악이 시작되다
          </p>
          <div className="flex items-center gap-4 mt-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>

          <motion.div
            className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            [무대는 완전한 어둠. 오케스트라 피트에서 신비로운 멜로디가 흘러나온다. 천천히 무대 위로 별들이 반짝이기 시작한다. 하나, 둘, 셋... 점점 많아지는 별들. 그 중 가장 밝은 별 하나가 천천히 떠오른다. 음악이 점점 웅장해진다.]
          </motion.div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37] text-center text-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            [ 오케스트라 연주 - 3분 ]<br/>
            <span className="text-sm text-[#999] block mt-2">주요 테마들의 프리뷰: &quot;별을 따라서&quot;, &quot;우리는 하나&quot;, &quot;아버지의 플룻&quot;, &quot;빛 속으로&quot;</span>
          </motion.div>
        </motion.div>

        {/* Opening Number: 별을 따라서 */}
        <motion.div
          id="opening"
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
            Opening Number: &quot;별을 따라서&quot;
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            세 아이의 소개
          </p>
          <div className="flex items-center gap-4 mt-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>

          <motion.div
            className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            [별빛이 무대를 가득 채운다. 무대 중앙에서 해설자가 등장한다. 우아하고 신비로운 분위기.]
          </motion.div>

          <motion.p
            className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`}
            style={getDialogueInlineStyle("해설")}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            해설자 (관객을 향해, 따뜻하게 미소 지으며):<br/>
            &quot;옛날 어느 밤, 별 하나가 하늘에 떠올랐죠. 그 별은 보통 별이 아니었어요. 세상을 바꿀 빛을 예고하는 별이었답니다.&quot;
          </motion.p>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [음악이 시작된다. 신비롭고 희망찬 멜로디. 무대 왼쪽에서 발토가 등장한다. 밝은 옷을 입었지만 어딘가 쓸쓸해 보인다.]
          </div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl mb-4">[ 발토의 노래 ]</p>
            <div className={`text-[#f5d576] space-y-3 ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
              <p className="text-[#ddd] italic">&quot;난 웃어요, 매일매일<br/>
              슬픔을 감추려 웃어요<br/>
              엄마가 떠난 그날부터<br/>
              눈물 대신 웃음을 배웠죠&quot;</p>
              <p className="text-[#ddd] italic mt-4">&quot;하지만 오늘 밤, 저 별을 봤죠<br/>
              마치 엄마가 손짓하는 듯<br/>
              &apos;발토야, 이리 와&apos;<br/>
              난 따라갈 수밖에 없었어요&quot;</p>
            </div>
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [무대 오른쪽에서 카스퍼가 등장한다. 두꺼운 책을 안고 있고, 안경을 쓰고 있다. 지적이지만 외로워 보인다.]
          </div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl mb-4">[ 카스퍼의 노래 ]</p>
            <div className={`text-[#8ab4f8] space-y-3 ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
              <p className="text-[#ddd] italic">&quot;책 속엔 모든 게 있다 했죠<br/>
              신? 그건 우화일 뿐이라 했죠<br/>
              증명할 수 없는 건 믿지 않아<br/>
              그게 내가 아는 진리였죠&quot;</p>
              <p className="text-[#ddd] italic mt-4">&quot;하지만 저 별을 보았을 때<br/>
              가슴이 말하더군요<br/>
              &apos;진리는 책이 아닌 곳에도 있다&apos;고<br/>
              난 대답을 찾아 떠나야 해요&quot;</p>
            </div>
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [무대 중앙 뒤쪽에서 밀로가 조심스럽게 등장한다. 플룻을 꼭 안고 있다. 입을 다문 채, 눈으로만 말한다.]
          </div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl mb-4">[ 밀로의 노래 - 마임과 함께 ]</p>
            <div className={`text-[#81c995] space-y-3 ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
              <p className="text-[#ddd] italic">&quot;(앙상블이 밀로를 위해 노래한다)<br/>
              말을 잃어버린 아이<br/>
              전쟁이 앗아간 목소리<br/>
              아버지의 플룻만이<br/>
              그의 유일한 친구죠&quot;</p>
              <p className="text-[#ddd] italic mt-4">&quot;하지만 저 별을 보았을 때<br/>
              침묵 속에서 노래가 들렸죠<br/>
              &apos;밀로야, 두려워 마&apos;<br/>
              그 별을 따라 가야 해요&quot;</p>
            </div>
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [세 아이가 무대의 다른 지점에서 동시에 별을 올려다본다. 조명이 그들 각각을 비춘다. 음악이 점점 웅장해진다.]
          </div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl mb-4">[ 세 아이가 함께 노래한다 - 화음으로 ]</p>
            <div className="text-[#ddd] space-y-3 italic">
              <p>&quot;별을 따라서, 별을 따라<br/>
              우리는 가야 해요<br/>
              무엇이 기다리는지 몰라도<br/>
              이 빛이 이끄는 곳으로&quot;</p>
              <p className="mt-4">&quot;외로운 발걸음이었지만<br/>
              이제는 혼자가 아니에요<br/>
              별을 따라서, 함께 가요<br/>
              새로운 세상을 향해!&quot;</p>
            </div>
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [세 아이가 천천히 서로를 향해 걸어간다. 무대 중앙에서 만난다. 서로를 바라보며 놀란다. 음악이 부드럽게 마무리된다.]
          </div>

          <p className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`} style={getDialogueInlineStyle("해설")}>
            해설자 (관객에게 미소 지으며):<br/>
            &quot;그렇게 세 아이는 만났습니다. 별 하나가 만들어낸 운명의 만남이었죠.&quot;
          </p>
        </motion.div>

        {/* Act I, Scene 1: 만남 */}
        <motion.div
          id="act1-scene1"
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
            Act I, Scene 1: 운명의 만남
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            별 아래 모인 세 영혼
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

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [세 아이가 무대 중앙에서 서로를 발견한다. 각자의 조명이 그들을 비춘다. 놀란 표정으로 서로를 바라본다.]
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (손을 들어 인사하며, 밝게):</p>
            <p className="text-[#ddd]">&quot;어... 안녕? 너희도 저 별 때문에 여기 온 거야? 나만 이상한 게 아니었구나!&quot;</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (책을 들고, 당황하며):</p>
            <p className="text-[#ddd]">&quot;말도 안 돼... 천문학적으로 불가능한 일인데... 하지만 내 가슴은... 저 별이 날 부르고 있다고 말해...&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [밀로가 조용히 별을 가리킨다. 그의 눈빛이 말한다: &apos;나도 그래.&apos;]
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (밀로에게 다가가며):</p>
            <p className="text-[#ddd]">&quot;너는... 말을 하지 않는구나. 괜찮아. 때로는 침묵이 더 많은 걸 말해주니까.&quot;</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (세 사람을 번갈아 보며):</p>
            <p className="text-[#ddd]">&quot;우리... 모두 뭔가를 찾고 있는 것 같아. 잃어버린 것을. 혹은... 아직 찾지 못한 것을.&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [잠시 침묵. 별빛이 더 밝게 빛난다. 세 아이 위로 하나의 빛줄기가 내려온다.]
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (손을 내밀며, 진지하게):</p>
            <p className="text-[#ddd]">&quot;혼자서는... 무서워. 하지만 함께라면... 용기가 날 것 같아. 같이 갈래?&quot;</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (손을 맞잡으며):</p>
            <p className="text-[#ddd]">&quot;이성적으로는... 말도 안 되지만... 내 마음은 이미 결정했어.&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [밀로가 조용히 손을 내밀어 두 사람의 손 위에 포갠다. 처음으로 작게 미소 짓는다.]
          </div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl mb-4">[ 듀엣: &quot;우리는 함께&quot; (Part 1) ]</p>
            <div className="text-[#ddd] space-y-3 italic">
              <p className="text-[#f5d576]">발토: &quot;혼자였던 어둠 속에서&quot;</p>
              <p className="text-[#8ab4f8]">카스퍼: &quot;길을 잃고 헤맸죠&quot;</p>
              <p className="text-[#81c995]">밀로 (앙상블): &quot;말없이 울던 밤들&quot;</p>
              <p className="mt-4">함께: &quot;하지만 이제는 혼자가 아니에요<br/>
              우리는 함께, 별을 향해<br/>
              함께 걷는 이 길 위에서<br/>
              우리는 하나가 되어가요&quot;</p>
            </div>
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [세 아이가 손을 맞잡고 별을 향해 걷기 시작한다. 무대가 천천히 어두워진다. 별빛만 그들을 비춘다.]
          </div>
        </motion.div>

        {/* Act I, Scene 2: 폭풍 */}
        <motion.div
          id="act1-scene2"
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
            Act I, Scene 2: 폭풍의 시련
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            서로를 감싸 안은 온기
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

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [무대 효과: 강렬한 바람 소리, 번개와 천둥. 무대가 격렬하게 흔들리는 듯한 조명 효과. 세 아이가 폭풍에 휘청인다. 무용수들이 폭풍을 형상화하며 무대를 가로지른다.]
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (비틀거리며, 외치듯):</p>
            <p className="text-[#ddd]">&quot;이건... 너무 강해! 버틸 수가 없어!&quot;</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (소리치며):</p>
            <p className="text-[#ddd]">&quot;손을 잡아! 흩어지면 안 돼!&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [발토가 무릎을 꿇는다. 쓰러질 듯 흔들린다. 웃음기가 완전히 사라진 얼굴.]
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (쓰러지며, 목이 메어):</p>
            <p className="text-[#ddd]">&quot;미안해... 더는... 걸을 수가 없어... 엄마... 보고 싶어...&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [밀로가 조용히 자신의 망토를 벗어 발토에게 덮어준다. 카스퍼가 놀라 외친다.]
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (다급하게):</p>
            <p className="text-[#ddd]">&quot;밀로! 너까지 얼어버리면 어떡해!&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [밀로가 고개를 젓고, 카스퍼의 손을 잡아 발토에게 이끈다. 세 아이가 서로를 꼭 감싸 안는다. 조명이 부드러워진다.]
          </div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl mb-4">[ Act I 피날레: &quot;우리는 하나&quot; ]</p>
            <div className="text-[#ddd] space-y-3 italic">
              <p className="text-[#f5d576]">발토 (떨리는 목소리로): &quot;너희의 온기가 느껴져...&quot;</p>
              <p className="text-[#8ab4f8]">카스퍼: &quot;우린 혼자가 아니야...&quot;</p>
              <p className="text-[#81c995]">밀로 (앙상블): &quot;함께니까... 견딜 수 있어...&quot;</p>
              <p className="mt-4">함께 (강렬하게, 폭풍을 향해):<br/>
              &quot;폭풍이 몰아쳐도<br/>
              우리는 하나, 우리는 하나<br/>
              서로를 감싸 안고<br/>
              우리는 이겨낼 거야!<br/><br/>

              어둠이 덮쳐와도<br/>
              우리는 하나, 우리는 하나<br/>
              함께하는 우리는<br/>
              무너지지 않아!&quot;</p>
            </div>
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [폭풍이 점점 잦아든다. 무용수들이 천천히 무대를 떠난다. 별빛이 다시 나타나며 세 아이를 비춘다. 그들은 여전히 서로를 껴안고 있다.]
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (천천히 일어서며, 눈물을 닦으며):</p>
            <p className="text-[#ddd]">&quot;고마워... 너희가 없었다면... 난 여기서 포기했을 거야.&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [세 아이가 일어서서 별을 바라본다. 손을 꼭 잡고. 음악이 희망차게 전환된다.]
          </div>

          <div className="my-6 text-base leading-loose">
            <p className="text-[#d4af37] font-medium mb-2">함께 (별을 향해):</p>
            <p className="text-[#ddd] italic">&quot;계속 가자... 끝까지!&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [막이 내린다. 무대는 암전. 관객들의 박수.]
          </div>
        </motion.div>

        {/* 막간 (Intermission) */}
        <motion.div
          id="intermission"
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
            막간 (Intermission)
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            15분 휴식
          </p>
          <div className="flex items-center gap-4 mt-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>

          <motion.div
            className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            [오케스트라가 주요 테마들의 변주곡을 연주한다. 관객들은 잠시 휴식을 취한다.]
          </motion.div>

          <div className="my-8 text-center text-[#ccc]">
            <p className="text-xl mb-4">지금까지의 이야기</p>
            <p className="text-base leading-relaxed">
              별 하나가 세 아이를 불렀습니다.<br/>
              발토는 잃어버린 어머니를 찾아,<br/>
              카스퍼는 믿음의 답을 찾아,<br/>
              밀로는 침묵 속 목소리를 찾아...<br/><br/>

              폭풍을 함께 이겨낸 그들은<br/>
              이제 더 먼 여정을 향해 나아갑니다.
            </p>
          </div>
        </motion.div>

        {/* Act II, Scene 1: 마을 */}
        <motion.div
          id="act2-scene1"
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
            Act II, Scene 1: 의심의 마을
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            진실이 만든 기적
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

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [무대 전환: 어두운 마을 풍경. 앙상블이 마을 사람들로 등장한다. 창과 횃불을 들고 위협적인 대형을 이룬다. 세 아이가 조심스럽게 무대 중앙으로 걸어온다.]
          </div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl mb-4">[ 앙상블 코러스: &quot;의심&quot; ]</p>
            <div className={`text-[#ee8b60] space-y-3 ${getDialogueClass("앙상블")}`} style={getDialogueInlineStyle("앙상블")}>
              <p className="text-[#ddd] italic">&quot;누구냐, 밤의 방랑자들<br/>
              어둠 속을 헤매는 자들<br/>
              우리는 믿지 않아<br/>
              의심만이 우리를 지킨다&quot;</p>
            </div>
          </motion.div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (손을 들며, 웃으며):</p>
            <p className="text-[#ddd]">&quot;우리는 도둑이 아니에요! 그저... 별을 따라가는 여행자들일 뿐이에요!&quot;</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("앙상블")}`} style={getDialogueInlineStyle("앙상블")}>
            <p className="text-[#ee8b60] font-medium mb-2">마을 사람들 (비웃으며):</p>
            <p className="text-[#ddd]">&quot;별을 따라? 한밤중에? 거짓말이다!&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [긴장이 고조된다. 마을 사람들이 점점 다가온다. 밀로가 천천히 앞으로 걸어 나간다. 모두가 동작을 멈춘다. 무대에 정적이 흐른다.]
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
            <p className="text-[#81c995] font-medium mb-2">밀로 (작지만 또렷하게, 처음으로 말하며):</p>
            <p className="text-[#ddd]">&quot;...왕이 태어나셨어요.&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [세상이 멈춘다. 발토와 카스퍼가 밀로를 놀라서 바라본다. 앙상블도 얼어붙는다. 오케스트라가 신비로운 음을 낸다.]
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (속삭이듯, 떨리며):</p>
            <p className="text-[#ddd]">&quot;밀로... 네가... 말을 했어...&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [밀로가 떨리는 손으로 별을 가리킨다. 그의 눈에서 눈물이 흐른다. 노파가 앙상블 사이에서 천천히 앞으로 걸어 나온다.]
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("노파")}`} style={getDialogueInlineStyle("노파")}>
            <p className="text-[#c58af9] font-medium mb-2">노파 (밀로를 바라보며, 경외하듯):</p>
            <p className="text-[#ddd]">&quot;아이야... 네 안에서... 빛이 보인다. 순수한... 진실의 빛이...&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [노파가 천천히 무릎을 꿇는다. 앙상블이 하나둘 무릎을 꿇기 시작한다. 음악이 부드럽고 경건해진다.]
          </div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl mb-4">[ 노파의 발라드: &quot;잊어버린 믿음&quot; ]</p>
            <div className={`text-[#c58af9] space-y-3 ${getDialogueClass("노파")}`} style={getDialogueInlineStyle("노파")}>
              <p className="text-[#ddd] italic">&quot;오래전 나도 너희처럼<br/>
              순수한 마음으로 믿었지<br/>
              하지만 세월이 흐르며<br/>
              그 빛을 잃어버렸구나&quot;</p>
              <p className="text-[#ddd] italic mt-4">&quot;이 아이의 눈을 보니<br/>
              잊었던 것이 떠올라<br/>
              진실은 말이 아닌<br/>
              마음에서 나오는 것&quot;</p>
            </div>
          </motion.div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("노파")}`} style={getDialogueInlineStyle("노파")}>
            <p className="text-[#c58af9] font-medium mb-2">노파 (일어서며, 품에서 빵을 꺼내며):</p>
            <p className="text-[#ddd]">&quot;동쪽으로 가거라, 베들레헴으로. 이 빵을 가져가라. 그리고... 그분께 내 믿음도 함께 전해다오.&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [앙상블이 천천히 길을 열어준다. 합창이 부드럽게 세 아이를 축복한다.]
          </div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl mb-4">[ 앙상블 코러스: &quot;축복&quot; ]</p>
            <div className={`text-[#ee8b60] space-y-3 ${getDialogueClass("앙상블")}`} style={getDialogueInlineStyle("앙상블")}>
              <p className="text-[#ddd] italic">&quot;가라, 별의 아이들아<br/>
              빛을 따라 걸어가라<br/>
              우리의 희망을 싣고<br/>
              새로운 세상을 향해&quot;</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Act II, Scene 2: 절망과 희망 */}
        <motion.div
          id="act2-scene2"
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
            Act II, Scene 2: 절망 너머의 노래
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            플룻이 전하는 사랑
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

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [무대: 끝없는 사막. 조명이 어둡고 차갑다. 세 아이가 하나씩 쓰러진다. 오케스트라가 슬프고 무거운 음악을 연주한다.]
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (무릎을 꿇으며):</p>
            <p className="text-[#ddd]">&quot;더는... 걸을 수 없어... 힘이... 다 빠졌어...&quot;</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (쓰러지며):</p>
            <p className="text-[#ddd]">&quot;내가... 틀렸어... 별은... 그저 별일 뿐이야... 우린... 바보들이었어...&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [밀로도 무릎을 꿇는다. 별빛마저 희미해진다. 세 아이가 모두 고개를 떨군다. 긴 침묵.]
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (처음으로 진심으로 울며):</p>
            <p className="text-[#ddd]">&quot;엄마... 미안해... 여기까지인가 봐... 집에... 가고 싶어...&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [밀로가 천천히 플룻을 꺼낸다. 두 친구를 바라본다. 눈물이 흐른다. 발토와 카스퍼가 고개를 든다.]
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (힘없이):</p>
            <p className="text-[#ddd]">&quot;밀로... 너... 뭐 하려고...?&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [밀로가 플룻을 입에 댄다. 눈을 감는다. 무대에 스포트라이트가 그를 비춘다.]
          </div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37] text-center text-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-2xl mb-4">[ 밀로의 솔로: &quot;아버지의 플룻&quot; ]</p>
            <span className="text-sm text-[#999] block mt-2">
              플룻 독주 - 3분<br/>
              무용수들이 등장하여 잃어버린 가족들, 추억들, 사랑했던 순간들을 표현한다.<br/>
              음악은 슬픔에서 시작해 위로로, 그리고 희망으로 변해간다.<br/>
              별빛이 점점 밝아진다.
            </span>
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [플룻 연주가 끝난다. 긴 침묵. 무대에 부드러운 빛이 가득하다. 발토와 카스퍼의 눈에서 눈물이 흐른다.]
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (떨리는 목소리로):</p>
            <p className="text-[#ddd]">&quot;밀로야... 아름다웠어... 정말... 아름다웠어...&quot;</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
            <p className="text-[#81c995] font-medium mb-2">밀로 (목소리가 나오며, 눈물로):</p>
            <p className="text-[#ddd]">&quot;아빠가... 말씀하셨어... 이 플룻은... 사랑하는 이를 위로하라고... 만들어주신 거라고... 그게... 진정한 사랑이라고...&quot;</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (일어서며, 깨달음에 차서):</p>
            <p className="text-[#ddd]">&quot;난 이제... 알겠어... 우리가 찾던 게... 멀리 있는 게 아니었어...&quot;</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (가슴에 손을 얹으며):</p>
            <p className="text-[#ddd]">&quot;엄마도... 여기 계셨어... 내 안에... 우리 안에...&quot;</p>
          </div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl mb-4">[ 트리오: &quot;우리 안에 있던 빛&quot; ]</p>
            <div className="text-[#ddd] space-y-3 italic">
              <p className="text-[#f5d576]">발토: &quot;폭풍 속 너희의 온기&quot;</p>
              <p className="text-[#8ab4f8]">카스퍼: &quot;마을에서 받은 믿음&quot;</p>
              <p className="text-[#81c995]">밀로: &quot;이 플룻에 담긴 사랑&quot;</p>
              <p className="mt-4">함께:<br/>
              &quot;우리가 찾던 빛은<br/>
              먼 곳에 있지 않았어<br/>
              서로를 사랑하는 마음<br/>
              그 안에 신이 계셨어<br/><br/>

              우리 안에, 우리 안에<br/>
              빛이 있었던 거야<br/>
              함께하는 이 순간에<br/>
              우리는 이미 도착했어&quot;</p>
            </div>
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [세 아이가 서로를 껴안는다. 별빛이 환하게 빛난다. 그들의 그림자가 하나로 합쳐진다.]
          </div>

          <div className="my-6 text-base leading-loose">
            <p className="text-[#d4af37] font-medium mb-2">함께 (결의에 차서):</p>
            <p className="text-[#ddd] italic">&quot;하지만... 끝까지 가보자. 그분을 만나러. 이 기쁨을 전하러!&quot;</p>
          </div>
        </motion.div>

        {/* Grand Finale: 빛 속으로 */}
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
            Grand Finale: &quot;빛 속으로&quot;
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            영원한 빛과의 만남
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
              alt="도착"
              width={1200}
              height={600}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [무대가 서서히 밝아진다. 황금빛이 무대를 가득 채운다. 무대 중앙에 말구유가 나타난다. 부드럽고 신성한 빛이 그곳에서 흘러나온다. 오케스트라가 장엄하고 아름다운 멜로디를 연주한다.]
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (숨을 죽이며, 경외하듯):</p>
            <p className="text-[#ddd]">&quot;저기... 저기야... 우리가... 찾던...&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [세 아이가 천천히, 경건하게 무릎을 꿇는다. 머리를 숙인다. 음악이 부드러워진다.]
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [발토가 황금을 내려놓는다. 카스퍼가 유향을 바친다. 밀로가... 플룻을 내려놓으려 한다. 잠시 망설인다.]
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
            <p className="text-[#81c995] font-medium mb-2">밀로 (미소 지으며):</p>
            <p className="text-[#ddd]">&quot;아빠... 이해했어요. 이 플룻의 진정한 의미를... 사랑은 나눌 때 더 커진다는 걸...&quot;</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [밀로가 플룻을 조심스럽게 내려놓는다. 세 아이가 아기 예수를 바라본다. 긴 침묵. 세상이 숨을 죽인다.]
          </div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl mb-4">[ 세 아이의 노래 ]</p>
            <div className="text-[#ddd] space-y-3 italic">
              <p className="text-[#f5d576]">발토 (경이로움에 차서):<br/>
              &quot;이렇게 작고 연약한데<br/>
              어떻게 이리 따뜻할까요&quot;</p>
              <p className="text-[#8ab4f8]">카스퍼 (눈물로):<br/>
              &quot;별보다 더 밝은 빛<br/>
              온 세상을 비추는 빛&quot;</p>
              <p className="text-[#81c995]">밀로 (환한 미소로):<br/>
              &quot;아름다워요... 정말<br/>
              너무나 아름다워요&quot;</p>
            </div>
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [앙상블이 무대 뒤편에서 등장한다. 노파, 마을 사람들, 그리고 모든 이들이 함께 모인다. 무대가 점점 밝아진다.]
          </div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-2xl mb-4">[ 그랜드 피날레: &quot;빛 속으로&quot; - 전체 합창 ]</p>
            <div className="text-[#ddd] space-y-4 italic">
              <p className="font-bold text-lg">세 아이:</p>
              <p>&quot;별을 따라 걸었던 길<br/>
              외롭고 험난했지만<br/>
              우리는 발견했어요<br/>
              사랑이 곧 빛이라는 걸&quot;</p>

              <p className="font-bold text-lg mt-6">앙상블:</p>
              <p>&quot;어둠 속을 헤매던 우리에게<br/>
              빛이 찾아왔네<br/>
              작은 아기의 모습으로<br/>
              희망이 태어났네&quot;</p>

              <p className="font-bold text-lg mt-6">전체 (웅장하게):</p>
              <p>&quot;빛 속으로, 빛 속으로<br/>
              우리 모두 걸어가요<br/>
              사랑이 이끄는 곳<br/>
              그곳이 천국이에요<br/><br/>

              별을 따라서, 함께 걸어<br/>
              우리는 하나가 되었어요<br/>
              빛 속으로, 영원히<br/>
              이 사랑은 계속될 거예요!&quot;</p>
            </div>
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [무대 전체가 황금빛으로 가득 찬다. 모든 배우들이 손을 맞잡고 있다. 오케스트라가 최고조에 이른다. 별들이 무대 전체에 쏟아진다. 음악이 장엄하게 마무리된다. 긴 여운.]
          </div>

          <p className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`} style={getDialogueInlineStyle("해설")}>
            해설자 (무대 앞으로 나오며, 관객에게):<br/>
            &quot;그들은 별을 따라 왔습니다. 그리고 발견했죠. 찾던 빛은 멀리 있지 않았다는 것을. 우리 안에, 서로를 사랑하는 그 마음 안에 이미 계셨다는 것을. 하지만 그 빛은 또한 여기, 이 작은 아기 안에도 있었습니다. 그리고... (관객을 가리키며) 여러분 안에도 있습니다.&quot;
          </p>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [막이 천천히 내린다. 오케스트라가 부드럽게 메인 테마를 연주한다.]
          </div>
        </motion.div>

        {/* 커튼콜 */}
        <motion.div
          id="curtain-call"
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
            커튼콜 (Curtain Call)
          </h1>
          <div className="flex items-center gap-4 mt-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic">
            [막이 다시 올라간다. 배우들이 순서대로 등장하여 인사한다.]
          </div>

          <div className="my-6 text-[#ccc] space-y-4">
            <p className="text-center text-lg">앙상블 (마을 사람들, 무용수들)</p>
            <p className="text-center text-lg">노파</p>
            <p className="text-center text-lg">해설자</p>
            <p className="text-center text-lg">밀로</p>
            <p className="text-center text-lg">카스퍼</p>
            <p className="text-center text-lg">발토</p>
            <p className="text-center text-lg mt-8 font-medium">전체 출연진</p>
          </div>

          <motion.div
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl mb-4 text-center">[ 커튼콜 송: &quot;별을 따라서&quot; (리프라이즈) ]</p>
            <div className="text-[#ddd] space-y-3 italic text-center">
              <p>전체 출연진:<br/>
              &quot;별을 따라서, 우리는 왔어요<br/>
              빛을 찾아서, 사랑을 찾아서<br/>
              이제 우리는 알아요<br/>
              빛은 우리 안에 있었다는 걸<br/><br/>

              성탄의 기쁨을<br/>
              여러분과 나누고 싶어요<br/>
              별을 따라서<br/>
              우리 모두 함께 걸어가요!&quot;</p>
            </div>
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded italic text-center">
            [전체 출연진이 손을 맞잡고 깊이 인사한다. 관객들의 기립 박수. 막이 내린다.]
          </div>

          <div className="my-8 text-center text-[#d4af37] text-xl">
            <p>메리 크리스마스!</p>
            <p className="mt-2 text-base text-[#999]">Merry Christmas!</p>
          </div>
        </motion.div>

        {/* 제작 노트 */}
        <motion.div
          className="my-16 md:my-24 bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl text-[#d4af37] text-center mb-6 diphylleia-regular">뮤지컬 제작 노트</h2>

          <div className="space-y-6 text-[#ccc]">
            <div>
              <h3 className="text-xl text-[#d4af37] mb-3">음악 스타일</h3>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>오프닝 넘버 &quot;별을 따라서&quot;: 밝고 희망찬 Broadway 스타일</li>
                <li>Act I 피날레 &quot;우리는 하나&quot;: 파워풀한 록 발라드 스타일 (레미제라블의 &quot;One Day More&quot; 느낌)</li>
                <li>&quot;아버지의 플룻&quot;: 서정적인 플룻 솔로 (클래식과 민속음악의 융합)</li>
                <li>그랜드 피날레 &quot;빛 속으로&quot;: 장엄한 합창 (교회 음악 + 뮤지컬의 융합)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl text-[#d4af37] mb-3">무대 연출</h3>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>별: LED 조명과 프로젝션을 활용한 역동적 표현</li>
                <li>폭풍: 무용수들의 군무 + 조명 효과 + 사운드 이펙트</li>
                <li>그림자 연출: 백라이트를 활용한 실루엣 효과</li>
                <li>말구유: 중앙 무대에 회전 무대 활용</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl text-[#d4af37] mb-3">의상 디자인</h3>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>발토: 황금빛 계열, 활동적인 스타일</li>
                <li>카스퍼: 청색 계열, 학자풍 로브</li>
                <li>밀로: 녹색 계열, 부드러운 실루엣</li>
                <li>앙상블: 중동 전통 의상 모티브</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl text-[#d4af37] mb-3">공연 시간</h3>
              <p className="pl-4">
                Act I: 약 45분<br/>
                막간: 15분<br/>
                Act II: 약 40분<br/>
                총 공연시간: 약 100분
              </p>
            </div>

            <div>
              <h3 className="text-xl text-[#d4af37] mb-3">뮤지컬 버전의 특징</h3>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>각 장면마다 대표 넘버가 있어 음악적 몰입도가 높음</li>
                <li>앙상블의 적극적 활용으로 스펙타클한 무대 구성</li>
                <li>무용과 연기가 결합된 종합 예술적 접근</li>
                <li>관객과의 정서적 교감을 위한 직접적인 어드레싱</li>
                <li>서사시적 규모감과 개인적 감동의 조화</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-[#333] py-8 px-4">
        <div className="text-center text-[#888]">
          <p className="mb-2">별을 따라서 - 뮤지컬 버전</p>
          <p className="text-sm">장덕동성당 중고등부 성탄절 무대공연</p>
          <p className="text-sm mt-4 text-[#666]">
            Musical Adaptation inspired by &quot;The Wizard of Oz&quot;, &quot;Wicked&quot;, and &quot;Les Misérables&quot;
          </p>
        </div>
      </footer>
    </div>
  );
}
