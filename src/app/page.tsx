"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

export default function Home() {
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

  const groupHighlightConfig: Record<string, { members: string[]; color: string }> = {
    함께: { members: ["발토", "카스퍼", "밀로"], color: "#f5d576" },
  };

  const isDialogueHighlighted = (characterId: string) => {
    if (!selectedCharacter) return false;
    if (selectedCharacter === characterId) return true;
    const group = groupHighlightConfig[characterId];
    return group ? group.members.includes(selectedCharacter) : false;
  };

  const getHighlightColor = (characterId: string) => {
    const char = characters.find(c => c.id === characterId);
    if (char) return char.color;
    const group = groupHighlightConfig[characterId];
    return group?.color;
  };

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
    if (isDialogueHighlighted(characterId)) {
      return "transition-all duration-300 rounded p-3";
    }
    if (selectedCharacter) {
      return "opacity-30 transition-all duration-300";
    }
    return "transition-all duration-300";
  };

  const getDialogueInlineStyle = (characterId: string) => {
    const color = getHighlightColor(characterId);
    if (!color) return {};

    if (isDialogueHighlighted(characterId)) {
      return {
        backgroundColor: `${color}20`,
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: color,
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
            세 아이의 시작
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
            무대는 완전한 어둠. 천천히 별 하나가 떠오른다
          </motion.div>
          
          <motion.p 
            className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`}
            style={getDialogueInlineStyle("해설")}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            해설자 (장난스럽게): "들어보셨을 거예요. 별을 따라간 세 동방박사 이야기. 근데 이런 건 들어보셨나요? 사실 그 박사들은 박사가 아니라 그냥 아이들이었다는 거. 후대 사람들이 그들을 '동방박사'라고 불렀지만, 사실은 세 명의 특별한 아이들이었답니다."
          </motion.p>

          <motion.p 
            className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`}
            style={getDialogueInlineStyle("해설")}
          >
            해설자: "옛날 옛적에, 아니 그냥 옛날에! (웃음) 이제 그 아이들의 이야기를 시작할까요?"
          </motion.p>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            첫 번째 그림자, 발토가 어색하게 히죽거리며 등장
          </div>

          <p className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`} style={getDialogueInlineStyle("해설")}>
            해설자: "발토. 열다섯 살. 가족을 다 잃었는데도 항상 웃으려고 해요. 왜냐하면요, 울면 진짜 슬퍼질 것 같아서. 그래서 그냥 계속 웃는 거죠. 근데 별을 보는 순간, 엄마의 따뜻함이 느껴졌대요."
          </p>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            두 번째 그림자, 카스퍼가 두툼한 책을 들고 비틀거리며 등장, 별을 보고 황급히 두루마리를 펼친다
          </div>

          <p className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`} style={getDialogueInlineStyle("해설")}>
            해설자: "카스퍼. 열네 살. 학자 아들. 모든 걸 이해하고 싶어 하는 아이예요. '신? 어디 있는데? 보여줘봐!' (한숨) 친구는 많지 않았어요. 근데 말이죠, 이 친구가 별을 딱 보는 순간! 아무것도 모르지만 심장이 '쿵!' 뛰었대요."
          </p>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 번째 그림자, 밀로가 플룻을 꼭 껴안고 조심스럽게 등장. 별을 보고 걸음을 멈춘다
          </div>

          <p className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`} style={getDialogueInlineStyle("해설")}>
            해설자: "밀로. 열세 살. 말을 안 해요. 무서워서요. 전쟁으로 모든 걸 잃었거든요. 아빠가 만들어준 플룻만 꼭 안고 다니죠. 천재 연주자지만, 한 번도 불어본 적 없어요. 근데 저 별을 보는 순간, 처음으로 말하고 싶어졌대요."
          </p>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 그림자가 중앙에서 만난다. 서로를 의식하며 어색하게
          </div>

          <p
            className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`}
            style={getDialogueInlineStyle("해설")}
          >
            해설자: "그렇게, 완전히 다른 세 아이가 별 하나 때문에 만났어요. (웃음) 이게 운명이라는 건가요?"
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
            별 아래서 모인 세 아이
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
            세 그림자가 서로를 발견하고 화들짝 놀란다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (급작스레 멈추며, 어이없어):</p>
            <p className="text-[#ddd]">"어?! 뭐야, 너희도 여기 있어? (별을 가리키며) 저 별 때문이야? 나만 그런 게 아니었구나!"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (안경 치켜올리며):</p>
            <p className="text-[#ddd]">"저 별, 과학적으로 말이 안 돼. 근데 마치 '이리 와!' 하고 날 부르는 것 같았어. (당황) 내가 지금 뭐라고 한 거야?"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (진지해지며):</p>
            <p className="text-[#ddd]">"나도 그랬어. 저 별 보는 순간, 엄마 생각이 났어. (목이 메어) 이상하게 들리지? 근데 진짜였어."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 말없이 별을 가리킨다. 세 아이가 잠시 침묵한다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (밀로에게):</p>
            <p className="text-[#ddd]">"너는 말 안 하는 스타일? (밀로가 고개 젓자, 웃음이 사라지며) 괜찮아. 나도 비슷해."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (혼잣말):</p>
            <p className="text-[#ddd]">"별이 사람을 부를 수 없어. 근데 왜 나는 여기 있지? 왜 가슴이 뛰지?"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            잠시 침묵. 세 아이가 서로를 바라본다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (손 내밀며):</p>
            <p className="text-[#ddd]">"무섭지만 같이 갈래? 혼자보단 셋이 낫잖아."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (손을 맞잡으며):</p>
            <p className="text-[#ddd]">"말이 안 되는데, 맞는 것 같기도 하고..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 손을 내밀어 두 사람의 손 위에 포갠다. 처음으로 작게 미소 짓는다
          </div>

          <div
            className={`my-6 text-base leading-loose ${getDialogueClass("함께")}`}
            style={getDialogueInlineStyle("함께")}
          >
            <p className="text-[#f5d576] font-medium mb-2">함께:</p>
            <p className="text-[#ddd]">"가보자!"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 그림자가 손을 맞잡고 별을 향해 걷기 시작한다
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
            서로를 감싸 안은 따뜻함
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
            무대가 어두워진다. 격렬한 바람 소리<br/>세 아이의 그림자가 폭풍에 휘청이며 비틀거린다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (바람에 떠밀리며):</p>
            <p className="text-[#ddd]">"이거 뭐야?! 진짜 폭풍이잖아!"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (소리치며):</p>
            <p className="text-[#ddd]">"너무 세! 정말 위험해!"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            발토의 그림자가 그대로 쓰러진다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (쓰러지며, 힘없이):</p>
            <p className="text-[#ddd]">"미안... 못 가겠어... 다리에... 힘도 없어..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (다급하게):</p>
            <p className="text-[#ddd]">"발토야! 일어나! 여기 있으면 얼어버려요!"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (울먹이며, 처음으로 웃지 않고):</p>
            <p className="text-[#ddd]">"엄마... 나 진짜 혼자구나..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 아무 말 없이 자신의 옷을 벗어 발토에게 덮어준다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (놀라 소리치며):</p>
            <p className="text-[#ddd]">"밀로야! 너 지금 뭐 하는 거야! 넌 어떡하려고!"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 고개를 젓고 카스퍼의 손을 잡아 발토에게 이끈다<br/>세 그림자가 서로를 꼭 감싼다. 격렬하게 흩어지던 그림자들이 천천히 하나의 큰 그림자로 합쳐진다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (떨리는 목소리로):</p>
            <p className="text-[#ddd]">"따뜻해... 진짜... 따뜻하다..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (작게, 떨리며):</p>
            <p className="text-[#ddd]">"우린 셋이야"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            폭풍이 점점 잦아든다. 별빛이 다시 나타난다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (천천히 일어서며, 다시 미소 지으며):</p>
            <p className="text-[#ddd]">"고마워... 진짜로. 이제... 갈 수 있을 것 같아."</p>
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
            진심이 만든 작은 기적
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
            어두운 마을. 갑자기 여러 그림자들이 사방에서 튀어나온다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("마을사람1")}`} style={getDialogueInlineStyle("마을사람1")}>
            <p className="text-[#ee8b60] font-medium mb-2">마을 사람 1 (창을 들고 위협적으로):</p>
            <p className="text-[#ddd]">"야! 거기 멈춰! 손들어!"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("마을사람2")}`} style={getDialogueInlineStyle("마을사람2")}>
            <p className="text-[#ee8b60] font-medium mb-2">마을 사람 2 (의심하며):</p>
            <p className="text-[#ddd]">"한밤중에 애들이 셋이나? 백프로 도둑이다!"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 아이가 화들짝 놀라 뒤로 물러선다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (양손 번쩍 들며, 오버하게 웃으며):</p>
            <p className="text-[#ddd]">"오해예요! 우리 도둑 아니에요! (너무 밝게) 우린 그냥 여행객! 맞아, 관광! 한밤중 관광! 요즘 대세잖아요? 야간 관광?"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("마을사람2")}`} style={getDialogueInlineStyle("마을사람2")}>
            <p className="text-[#ee8b60] font-medium mb-2">마을 사람 2 (어이없어하며):</p>
            <p className="text-[#ddd]">"한밤중에 관광? 애들이 셋이나 함께 돌아다녀? 이거 분명 도둑이야!"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            마을 사람들이 점점 다가온다. 발토가 계속 웃으려 하지만 떨린다. 카스퍼는 땀을 뻘뻘 흘린다
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            카스퍼가 천천히 머리 가발 같은 것을 벗는다. 진지한 표정
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (진지하게, 목소리를 낮춰):</p>
            <p className="text-[#ddd]">"사실은... 저희는 동방박사입니다. 별을 따라서..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (카스퍼의 머리를 툭 치며, 당황해서):</p>
            <p className="text-[#ddd]">"야! 너 무슨 말하는 거야! 정신차려!"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            카스퍼가 당황하며 바로 가발을 다시 쓴다. 어리둥절한 표정
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (멍하니, 실수했단 표정으로):</p>
            <p className="text-[#ddd]">"아... 저, 저희는... 그냥 야간 관광 중이에요! 맞아요! 야간 관광!"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("마을사람1")}`} style={getDialogueInlineStyle("마을사람1")}>
            <p className="text-[#ee8b60] font-medium mb-2">마을 사람 1 (비웃으며):</p>
            <p className="text-[#ddd]">"야간 관광? 동방박사? 방금 전엔 박사라더니 이젠 관광객? 말이 계속 바뀌잖아!"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 갑자기 앞으로 걸어 나간다. 발토와 카스퍼가 놀라 쳐다본다. 모두가 동작을 멈춘다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
            <p className="text-[#81c995] font-medium mb-2">밀로 (작지만 또렷하게, 처음으로 입을 열며):</p>
            <p className="text-[#ddd]">"...왕이... 태어나셨어요."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세상이 멈춘 듯한 정적. 바람 소리조차 사라진다. 발토와 카스퍼가 밀로를 경악한 표정으로 바라본다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (속삭이듯, 놀라서):</p>
            <p className="text-[#ddd]">"...밀로... 네가... 말을..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("마을사람2")}`} style={getDialogueInlineStyle("마을사람2")}>
            <p className="text-[#ee8b60] font-medium mb-2">마을 사람 2 (당황하며):</p>
            <p className="text-[#ddd]">"...왕? 어, 어디에?"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 떨리는 손으로 별을 가리킨다. 눈빛이 확고하다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("마을사람1")}`} style={getDialogueInlineStyle("마을사람1")}>
            <p className="text-[#ee8b60] font-medium mb-2">마을 사람 1 (비웃으려다 멈추며):</p>
            <p className="text-[#ddd]">"별 속에... 왕이? 그, 그게 무슨..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            노파의 그림자가 천천히 앞으로 나온다. 밀로를 뚫어지게 바라본다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("노파")}`} style={getDialogueInlineStyle("노파")}>
            <p className="text-[#c58af9] font-medium mb-2">노파 (부드럽게, 하지만 단호하게 손을 들어 제지하며):</p>
            <p className="text-[#ddd]">"조용히 하거라. (밀로를 바라보며) ...얘야, 너... 지금 말을 한 거니?"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
            <p className="text-[#81c995] font-medium mb-2">밀로 (고개를 끄덕이며):</p>
            <p className="text-[#ddd]">"진짜예요 정말이에요"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            발토와 카스퍼가 밀로를 보며 서로를 힐끔 바라본다
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 입을 열려 하지만 더 이상 말이 안 나온다. 눈물만 조용히 흐른다. 플룻을 꼭 안는다
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            아주 긴 침묵. 노파가 천천히, 천천히 무릎을 꿇는다. 마을 사람들이 숨을 죽인다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("노파")}`} style={getDialogueInlineStyle("노파")}>
            <p className="text-[#c58af9] font-medium mb-2">노파 (눈물을 흘리며, 떨리는 목소리로):</p>
            <p className="text-[#ddd]">"나도 너희만큼 어렸을 때 그렇게 순수하게 믿었단다. 하지만 세월이 흐르면서 잊어버렸구나. (천천히 일어서며) 동쪽으로 가거라. 베들레헴. (확신에 차서) 그곳에 너희가 찾는 분이 기다리고 계실 거야."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            노파가 품에서 빵을 꺼내 발토에게 건넨다. 아무 말 없이
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (떨리는 손으로 빵을 받으며):</p>
            <p className="text-[#ddd]">"감사합니다... 정말로..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            마을 사람들이 천천히 길을 열어준다. 아무 말 없이
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
            플룻 선율에 담긴 위로
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
            끝없는 길. 세 그림자가 하나씩 쓰러진다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (쓰러지며):</p>
            <p className="text-[#ddd]">"안 돼... 다리가 안 움직여..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (주저앉으며):</p>
            <p className="text-[#ddd]">"다 헛된 거였어 아무것도 없어"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로도 무릎을 꿇는다. 별빛마저 희미해진다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (처음으로 진짜 울음을 터뜨리며):</p>
            <p className="text-[#ddd]">"엄마... 미안해... 집에 가고 싶어..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 천천히 플룻을 꺼낸다. 두 친구를 바라본다<br/>발토와 카스퍼가 고개를 든다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (힘없이):</p>
            <p className="text-[#ddd]">"...밀로?"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 천천히 플룻을 입에 댄다. 눈을 감는다
          </div>

          <motion.div 
            className="text-[#d4af37] font-medium my-8 p-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-l-4 border-[#d4af37] text-center text-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            [ 플룻 독주 - 1분 ]<br/>
            <span className="text-sm text-[#999] block mt-2">밀로가 아버지를 향해, 친구들을 향해, 그리고 잃어버린 모든 것들을 향해 연주한다</span>
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            부드럽고 애절한 플룻 선율이 어둠을 가른다. 밀로의 그림자가 점점 커지고, 세 아이 뒤로 잃어버린 가족들의 희미한 형상이 천천히 나타났다가 사라진다. 엄마의 미소, 아버지의 손, 함께했던 순간들... 음악이 슬픔에서 시작해 위로로, 그리고 희망으로 변해간다. 별빛이 점점 더 밝게 빛난다.
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            긴 침묵. 마지막 선율이 사라진다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (눈물 흘리며):</p>
            <p className="text-[#ddd]">"밀로야... 너무... 아름다웠어..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
            <p className="text-[#81c995] font-medium mb-2">밀로 (작게, 떨리며):</p>
            <p className="text-[#ddd]">"무서웠어 불면 울 것 같아서. 근데 아빠가 그랬어. 이 플룻은 누군가 힘들 때 위로하려고 부는 거라고. 그게 사랑이라고"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 처음으로 눈물을 흘린다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (일어서며):</p>
            <p className="text-[#ddd]">"위로됐어... 처음으로... 누군가 날 위로해 줬어..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (일어서며, 미소로):</p>
            <p className="text-[#ddd]">"엄마도... 들었을 것 같아..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로가 일어선다. 세 아이가 서로를 바라본다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
            <p className="text-[#81c995] font-medium mb-2">밀로 (또렷하게, 가슴을 가리키며):</p>
            <p className="text-[#ddd]">"다 여기 있었어"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (가슴에 손, 깨닫듯):</p>
            <p className="text-[#ddd]">"맞아... 엄마도 여기 계셨어..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (감격하며):</p>
            <p className="text-[#ddd]">"우리가 찾던 게... 처음부터..."</p>
          </div>

          <div
            className={`my-6 text-base leading-loose ${getDialogueClass("함께")}`}
            style={getDialogueInlineStyle("함께")}
          >
            <p className="text-[#f5d576] font-medium mb-2">함께:</p>
            <p className="text-[#ddd]">"...여기 있었어."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 아이가 껴안는다. 하나의 그림자가 된다
          </div>

          <div className="my-6 text-base leading-loose">
            <p className="text-[#f5d576] font-medium mb-2">발토: "끝까지?" / 카스퍼: "끝까지." / 밀로: "같이."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            별이 환하게 빛난다. 세 그림자가 빛 속으로 걸어간다
          </div>
        </motion.div>

        {/* 5장: 도착 - 빛 */}
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
            5장: 도착 - 빛
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            말구유에서 만난 작은 빛
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

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            따뜻하고 부드러운 빛이 천천히 무대를 가득 채운다. 말구유의 형상이 나타난다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (숨을 죽이며, 떨리는 목소리로):</p>
            <p className="text-[#ddd]">"...저기... 저기야..."</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 아이가 천천히, 조심스럽게 무릎을 꿇는다. 고개를 숙인다
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            발토가 떨리는 손으로 빵을 내려놓는다<br/>
            카스퍼가 책을 조심스럽게 바친다<br/>
            밀로가... 천천히 플룻을 내려놓으려 한다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (놀라며 밀로를 보며):</p>
            <p className="text-[#ddd]">"밀로... 그건... 네 아버지가..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
            <p className="text-[#81c995] font-medium mb-2">밀로 (평온한 미소로):</p>
            <p className="text-[#ddd]">"아빠가 이렇게 쓰라고 만들어주신 거예요"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 아이가 아기를 바라본다. 아주 긴 침묵<br/>부드러운 음악만이 흐른다
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (눈물이 흐르며, 경이로움에 차서):</p>
            <p className="text-[#ddd]">"이렇게 작은데, 어떻게 이렇게 따뜻할까"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (목이 메어, 경외하며):</p>
            <p className="text-[#ddd]">"별보다 밝아 온 세상을 비추는 것 같아"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
            <p className="text-[#81c995] font-medium mb-2">밀로 (환한 미소로, 눈물을 흘리며):</p>
            <p className="text-[#ddd]">"정말 아름다워요"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 아이가 계속 아기를 바라본다. 시간이 멈춘 듯한 순간
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (작게, 떨리며):</p>
            <p className="text-[#ddd]">"우리... 정말... 잘 찾아온 거 맞지?"</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (확신에 차서):</p>
            <p className="text-[#ddd]">"응... 우린... 정말 잘 찾아왔어... 이게... 우리가 찾던 거였어..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("밀로")}`} style={getDialogueInlineStyle("밀로")}>
            <p className="text-[#81c995] font-medium mb-2">밀로 (천천히):</p>
            <p className="text-[#ddd]">"이제... 돌아가야겠다... 사람들에게... 이야기해줘야 해..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("발토")}`} style={getDialogueInlineStyle("발토")}>
            <p className="text-[#f5d576] font-medium mb-2">발토 (고개를 끄덕이며):</p>
            <p className="text-[#ddd]">"응... 우리가... 여기서 본 걸..."</p>
          </div>

          <div className={`my-6 text-base leading-loose ${getDialogueClass("카스퍼")}`} style={getDialogueInlineStyle("카스퍼")}>
            <p className="text-[#8ab4f8] font-medium mb-2">카스퍼 (서로를 바라보며):</p>
            <p className="text-[#ddd]">"근데... 우린..."</p>
          </div>

          <div
            className={`my-6 text-base leading-loose ${getDialogueClass("함께")}`}
            style={getDialogueInlineStyle("함께")}
          >
            <p className="text-[#f5d576] font-medium mb-2">함께 (서로의 손을 잡으며, 확신에 차서):</p>
            <p className="text-[#ddd]">"우린 이미 달라졌어"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 아이가 마지막으로 아기에게 고개를 숙인다. 빛이 더욱 밝아진다
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
            우리 안에 있던 신
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
              src="/09.png"
              alt="에필로그"
              width={1200}
              height={600}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </motion.div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 그림자가 천천히 변한다. 키가 크고, 자세가 당당한 어른의 모습으로
          </div>

          <p className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`} style={getDialogueInlineStyle("해설")}>
            해설자: "그날 밤 이후, 세 아이는 진짜 자신을 찾았어요. 그들은 어른이 되어 각자의 땅으로 돌아갔어요."
          </p>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 그림자가 서로를 마지막으로 바라보며 각자의 길로 걸어간다. 아주 느리게
          </div>

          <p className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`} style={getDialogueInlineStyle("해설")}>
            해설자: "그리고 이야기했죠. 별을 따라간 이야기를. 빛을 만난 이야기를."
          </p>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            밀로의 그림자가 플룻을 들어 올린다. 조용히 연주를 시작한다
          </div>

          <p className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`} style={getDialogueInlineStyle("해설")}>
            해설자: "밀로는 평생 플룻을 불며 사람들을 위로했답니다"
          </p>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            무대가 천천히 밝아진다. 플룻 소리가 조용히 흐른다
          </div>

          <p className={`italic text-[#ccc] my-6 pl-4 border-l-2 border-[#444] font-extralight ${getDialogueClass("해설")}`} style={getDialogueInlineStyle("해설")}>
            해설자: "사람들이 물었어요. '정말 신을 봤느냐'고."
          </p>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            세 그림자가 동시에 가슴을 가리킨다
          </div>

          <div
            className={`my-6 text-base leading-loose ${getDialogueClass("함께")}`}
            style={getDialogueInlineStyle("함께")}
          >
            <p className="text-[#f5d576] font-medium mb-2">함께 (확신에 차서):</p>
            <p className="text-[#ddd]">"처음부터 이 안에 계셨어요"</p>
          </div>

          <div className="my-6 text-[#999] text-base p-4 bg-[#1a1a1a] rounded">
            무대 전체가 따뜻한 빛으로 가득 찬다<br/>플룻 선율이 천천히 커진다
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
            피날레: 합주
          </h1>
          <p className="text-center text-[#888] mt-3 text-base md:text-lg tracking-wide font-extralight">
            사막의 별
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
        </motion.div>

        {/* 연출 노트 */}
        <motion.div 
          id="notes"
          className="mt-16 mb-8 pt-8 pb-12 px-6 bg-[#0f0f0f] border-t border-[#333]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl text-[#d4af37] mb-8 font-semibold tracking-wide">
            연출 노트
          </h2>

          {/* 기획의도 */}
          <div className="mb-4">
            <button
              onClick={() => toggleSection("concept-notes")}
              className="w-full bg-[#1a1a1a] text-[#d4af37] border border-[#333] p-4 text-left rounded font-normal text-base transition-colors hover:bg-[#222] flex justify-between items-center"
            >
              <span>기획의도</span>
              <span className={`transform transition-transform ${expandedSections.includes("concept-notes") ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                expandedSections.includes("concept-notes") ? "max-h-[2000px] mt-4" : "max-h-0"
              }`}
            >
              <div className="text-[#b0b0b0] leading-relaxed space-y-4">
                {/* 작품의 출발점 카드 */}
                <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-6">
                  <h4 className="text-lg text-[#d4af37] mb-3 font-medium">작품의 출발점</h4>
                  <p className="leading-loose">
                    전통적으로 동방박사는 나이 든 현자로 그려지지만, 이 작품은 그들을 <span className="text-[#d4af37]">13-15세 세 아이</span>로 재해석했습니다. 
                    신앙의 여정이 나이나 지혜가 아닌 <span className="text-[#d4af37]">순수한 갈망과 용기</span>에서 시작된다는 메시지를 담았습니다.
                  </p>
                </div>

                {/* 그림자극이라는 형식 카드 */}
                <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-6">
                  <h4 className="text-lg text-[#d4af37] mb-3 font-medium">그림자극이라는 형식</h4>
                  <p className="leading-loose">
                    빛과 어둠, 형태와 움직임만으로 이야기를 전달하는 절제된 비주얼은 감정의 순도를 높이고 관객의 상상력을 자극합니다. 
                    그림자는 누구나 될 수 있기에 보편성을 획득하며, 학생들도 부담 없이 진정성 있게 연기할 수 있습니다.
                  </p>
                </div>

                {/* 세 아이 카드 */}
                <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-6">
                  <h4 className="text-lg text-[#d4af37] mb-3 font-medium">세 아이, 현대 청소년의 거울</h4>
                  <div className="space-y-3">
                    <p><span className="text-[#d4af37] font-medium">발토 (15세)</span> - 상실의 슬픔을 밝음 뒤에 숨기는 아이. 진짜 감정을 드러내는 용기를 배웁니다.</p>
                    <p><span className="text-[#d4af37] font-medium">카스퍼 (14세)</span> - 모든 것을 증명하려는 회의주의자. 증명할 수 없는 것의 가치를 발견합니다.</p>
                    <p><span className="text-[#d4af37] font-medium">밀로 (13세)</span> - 트라우마로 말을 잃었지만 플룻으로 소통. 말보다 깊은 위로의 힘을 보여줍니다.</p>
                  </div>
                </div>

                {/* 핵심 메시지 카드 */}
                <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-6">
                  <h4 className="text-lg text-[#d4af37] mb-3 font-medium">핵심 메시지</h4>
                  <p className="leading-loose mb-3">
                    <span className="text-[#d4af37]">"신은 멀리 있지 않았어요. 우리 안에 있었어요."</span>
                  </p>
                  <p className="leading-loose">
                    세 아이가 발견한 것은 베들레헴의 기적이 아닌, 폭풍 속 서로를 감싸 안을 때의 따뜻함, 
                    진심이 통했을 때 받은 빵, 위로의 플룻 선율이었습니다. 신성은 거창한 곳이 아니라 <span className="text-[#d4af37]">일상의 사랑과 연대</span> 속에 있습니다.
                  </p>
                </div>

                {/* 제작 방식 카드 */}
                <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-6">
                  <h4 className="text-lg text-[#d4af37] mb-3 font-medium">제작 방식</h4>
                  <p className="leading-loose">
                    학생들의 목소리를 선녹음 후 그림자 연기를 촬영합니다. 자신의 목소리로 캐릭터를 만들어가며, 
                    반복 촬영으로 완성도를 높입니다. 기본 그림자 촬영 후 영상편집으로 배경과 디테일을 보완합니다.
                  </p>
                </div>

                {/* 영감 카드 */}
                <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-6">
                  <p className="leading-loose italic text-[#888]">
                    T.S. 엘리엇의 《동방 박사들의 여정》에서 영감을 받아, 여정의 낭만이 아닌 실제적인 고난과 의심, 
                    그 속에서 발견하는 서로 안의 빛을 그립니다. 2000년 전 이야기를 21세기 청소년의 언어로 재해석한 작품입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 캐릭터 재설정 */}
          <div className="mb-4">
            <button
              onClick={() => toggleSection("character-notes")}
              className="w-full bg-[#1a1a1a] text-[#d4af37] border border-[#333] p-4 text-left rounded font-normal text-base transition-colors hover:bg-[#222] flex justify-between items-center"
            >
              <span>캐릭터 설정</span>
              <span className={`transform transition-transform ${expandedSections.includes("character-notes") ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                expandedSections.includes("character-notes") ? "max-h-[2500px] mt-4" : "max-h-0"
              }`}
            >
              <div className="text-[#b0b0b0] leading-relaxed space-y-4">
                {/* 주요 인물 카드 */}
                <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-6">
                  <h4 className="text-lg text-[#d4af37] mb-3 font-medium">주요 인물</h4>
                  <div className="space-y-4">
                    <p>
                      <strong className="text-[#d4af37]">발토 (Balto, 15세):</strong> 세 아이 중 가장 나이가 많은 소년. 병으로 가족을 잃었다. 슬픔을 감추기 위해 항상 웃으려 하지만, 내면의 외로움이 깊다. 별을 보고 엄마를 떠올리며 여정을 시작한다. 황금을 선물로 바친다. 밝고 긍정적인 성격이지만 폭풍 속에서 무너지는 연약한 모습도 보인다.
                    </p>
                    <p>
                      <strong className="text-[#d4af37]">카스퍼 (Casper, 14세):</strong> 학자의 아들로 똑똑하고 이성적이다. 신을 믿지 않으며 모든 것을 과학적으로 증명하려 한다. 별의 위치가 천문학적으로 이상하다는 것을 알아차리고 호기심에 여정을 떠난다. 유향을 선물로 바친다. 회의적이지만 점차 마음을 열어가며 "우린 혼자가 아니야"라는 깨달음을 얻는다.
                    </p>
                    <p>
                      <strong className="text-[#d4af37]">밀로 (Milo, 13세):</strong> 세 아이 중 가장 어리다. 전쟁으로 가족을 잃고 집도 잃었으며, 말을 할 수 있지만 두려움 때문에 침묵한다. 아버지가 만들어준 플룻을 항상 지니고 다닌다. 말수는 적지만 행동으로 사랑을 표현한다(폭풍에서 옷을 벗어 발토를 덮어줌). 플룻 연주로 친구들을 위로하며, 몰약 대신 플룻을 바치려 하지만 다시 돌려받는다. 가장 순수하고 공감 능력이 뛰어난 아이.
                    </p>
                  </div>
                </div>

                {/* 조연 인물 카드 */}
                <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-6">
                  <h4 className="text-lg text-[#d4af37] mb-3 font-medium">조연 인물</h4>
                  <div className="space-y-4">
                    <p>
                      <strong className="text-[#d4af37]">해설자 (Narrator):</strong> 따뜻하고 부드러운 목소리로 이야기를 전달한다. 관객과 무대를 연결하는 역할. 세 아이의 과거와 감정을 설명하며, 마치 오래된 동화를 들려주듯 이야기한다.
                    </p>
                    <p>
                      <strong className="text-[#d4af37]">마을 사람 1 (창을 든 사람):</strong> 낯선 이들에게 경계심이 강하고 공격적이다. 한밤중에 나타난 아이들을 도둑으로 의심한다.
                    </p>
                    <p>
                      <strong className="text-[#d4af37]">마을 사람 2:</strong> 의심 많고 불신이 가득한 인물. 아이들의 말을 쉽게 믿지 않지만 점차 설득된다.
                    </p>
                    <p>
                      <strong className="text-[#d4af37]">노파 (Old Woman):</strong> 마을의 지혜로운 어르신. 과거에 자신도 순수하게 믿었던 경험이 있어 아이들의 진심을 알아본다. 부드럽고 자비로운 성격으로 아이들에게 베들레헴으로 가는 길을 알려준다. 무릎을 꿇으며 아이들의 순수함에 경의를 표한다.
                    </p>
                  </div>
                </div>

                {/* 상징적 존재 카드 */}
                <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-6">
                  <h4 className="text-lg text-[#d4af37] mb-3 font-medium">상징적 존재</h4>
                  <div className="space-y-4">
                    <p>
                      <strong className="text-[#d4af37]">별:</strong> 세 아이를 인도하는 신비로운 존재. 희망과 신앙의 상징.
                    </p>
                    <p>
                      <strong className="text-[#d4af37]">아기 예수:</strong> 말구유에서 태어난 아기. 직접 등장하지 않지만 빛과 따뜻함으로 표현된다.
                    </p>
                    <p>
                      <strong className="text-[#d4af37]">가족들의 그림자:</strong> 플룻 연주 시 희미하게 나타나는 세 아이의 잃어버린 가족들. 추억과 그리움의 상징.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 핵심 연출 */}
          <div className="mb-4">
            <button
              onClick={() => toggleSection("core-direction")}
              className="w-full bg-[#1a1a1a] text-[#d4af37] border border-[#333] p-4 text-left rounded font-normal text-base transition-colors hover:bg-[#222] flex justify-between items-center"
            >
              <span>핵심 연출</span>
              <span className={`transform transition-transform ${expandedSections.includes("core-direction") ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                expandedSections.includes("core-direction") ? "max-h-[3500px] mt-4" : "max-h-0"
              }`}
            >
              <div className="space-y-4 text-[#b0b0b0] leading-relaxed">
                {/* 1단계 카드 */}
                <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-6">
                  <h3 className="text-xl text-[#d4af37] mb-3 font-normal">1단계: 사전 준비</h3>
                  <div className="space-y-3">
                    <p>
                      <strong className="text-[#d4af37]">📹 영상팀 (그림자 영상):</strong><br/>
                      • 아이들의 대사 음성 먼저 녹음<br/>
                      • 녹음된 음성을 들으며 아이들이 동일하게 연기하는 그림자 영상 촬영<br/>
                      • 영상의 배경 및 디테일은 편집으로 보완
                    </p>
                    <p>
                      <strong className="text-[#d4af37]">🎵 음악팀:</strong><br/>
                      • 플룻 독주자 섭외 및 리허설 (4장 클라이맥스용)<br/>
                      • "사막의 별" 합주 및 합창 준비<br/>
                      • 플룻 독주 파트를 합주곡에 삽입
                    </p>
                  </div>
                </div>

                {/* 2단계 카드 */}
                <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-6">
                  <h3 className="text-xl text-[#d4af37] mb-3 font-normal">2단계: 무대 배치</h3>
                  <div className="space-y-3">
                    <p>
                      <strong className="text-[#d4af37]">무대 구성:</strong><br/>
                      • 전면: 대형 스크린 (그림자 영상 투사)<br/>
                      • 중앙 하단: 플룻 연주자 자리<br/>
                      • 양쪽: 합주단 배치 (피날레용)<br/>
                      • 후면 또는 좌우: 합창단 위치<br/>
                      
                    </p>
                  </div>
                </div>

                {/* 3단계 카드 */}
                <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-6">
                  <h3 className="text-xl text-[#d4af37] mb-3 font-normal">3단계: 장면별 연출 가이드</h3>
                  <p>
                    <strong className="text-[#d4af37]">프롤로그</strong> (50초) → 
                    <strong className="text-[#d4af37]"> 1장: 만남</strong> (30초) → 
                    <strong className="text-[#d4af37]"> 2장: 폭풍</strong> (1분) → 
                    <strong className="text-[#d4af37]"> 3장: 마을</strong> (1분 30초) → 
                    <strong className="text-[#d4af37]"> 4장: 플룻 독주</strong> (1분 30초) → 
                    <strong className="text-[#d4af37]"> 5장: 도착</strong> (50초) → 
                    <strong className="text-[#d4af37]"> 에필로그</strong> (30초) → 
                    <strong className="text-[#d4af37]"> 피날레: 합주</strong> (3분 30초)
                  </p>
                </div>

                {/* 4단계 카드 */}
                <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-6">
                  <h3 className="text-xl text-[#d4af37] mb-3 font-normal">4단계: 피날레 합주 진행</h3>
                  <div className="space-y-3">
                    <p>
                      • 에필로그 마지막 대사 후 잠시 암전<br/>
                      • "하나의 별빛" 화면 투사<br/>
                      • 무대 조명이 서서히 켜지며 합주단 등장
                    </p>
                    <p>
                      <strong className="text-[#d4af37]">진행 순서 예시 (총 3분 30초):</strong><br/>
                      1️⃣ 플룻 독주로 시작 (40초)<br/>
                      2️⃣ 합주 시작 (1분 30초)<br/>
                      3️⃣ 합창단 합류 (1분 20초)<br/>
                      4️⃣ 플룻 독주 → 전체 합주 → 크레센도 → 마무리
                    </p>
                    <p>
                      <strong className="text-[#d4af37]">연출 포인트:</strong><br/>
                      • 플룻을 무대 중앙에 배치하여 시각적 초점<br/>
                      • 모든 악기가 플룻을 중심으로 어우러지는 장면 연출<br/>
                      • 합창단은 그림자처럼 뒤쪽에서 목소리만<br/>
                      • 마지막 음에서 모든 조명이 별빛처럼 밝게
                    </p>
                  </div>
                </div>

                {/* 5단계 카드 */}
                <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-6">
                  <h3 className="text-xl text-[#d4af37] mb-3 font-normal">5단계: 기술 체크리스트</h3>
                  <div className="space-y-3">
                    <p>
                      <strong className="text-[#d4af37]">✅ 영상팀:</strong><br/>
                      □ 그림자 영상 촬영 완료<br/>
                      □ 음성과 영상 동기화 편집<br/>
                      □ 프로젝터 또는 LED 스크린 설치<br/>
                      □ 예비 장비 준비
                    </p>
                    <p>
                      <strong className="text-[#d4af37]">✅ 음향팀:</strong><br/>
                      □ 해설 내레이션 녹음<br/>
                      □ 플룻 독주자 마이크 세팅<br/>
                      □ 합주단 음향 밸런스 조정<br/>
                      □ 음향 큐 리스트 작성
                    </p>
                    <p>
                      <strong className="text-[#d4af37]">✅ 무대팀:</strong><br/>
                      □ 스크린 설치 및 테스트<br/>
                      □ 합주단 배치 확정<br/>
                      □ 동선 확인 (합주단 등장)<br/>
                      □ 무대 안전 점검
                    </p>
                  </div>
                </div>

                {/* 6단계 카드 */}
                <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 md:p-6">
                  <h3 className="text-xl text-[#d4af37] mb-3 font-normal">6단계: 리허설 일정</h3>
                  <p>
                    <strong className="text-[#d4af37]">1차:</strong> 영상 + 사운드 동기화 확인<br/>
                    <strong className="text-[#d4af37]">2차:</strong> 플룻 독주 장면 집중 연습<br/>
                    <strong className="text-[#d4af37]">3차:</strong> 피날레 합주 전체 연습<br/>
                    <strong className="text-[#d4af37]">최종:</strong> 통합 리허설 (영상+음향+합주)
                  </p>
                </div>

                <div className="bg-[#1a1a1a] p-4 rounded border-l-4 border-[#d4af37]">
                  <p className="text-[#d4af37] font-medium mb-2">⏱️ 시간 구성</p>
                  <p className="mb-3">
                    <strong className="text-[#f5d576]">그림자극 본편:</strong><br/>
                    프롤로그 (50초) + 1장 (30초) + 2장 (1분) + 3장 (1분 30초) + 4장 (1분 30초) + 5장 (50초) + 에필로그 (30초)<br/>
                    = <strong className="text-[#f5d576]">총 6분 30초</strong>
                  </p>
                  <p className="mb-3">
                    <strong className="text-[#f5d576]">피날레 합주:</strong> <strong className="text-[#f5d576]">3분 30초</strong>
                  </p>
                  <p className="text-lg">
                    <strong className="text-[#f5d576]">🎭 전체 공연 시간: 10분</strong>
                  </p>
                </div>

                <div className="bg-[#1a1a1a] p-4 rounded border-l-4 border-[#d4af37] mt-4">
                  <p className="text-[#d4af37] font-medium mb-2">⚠️ 핵심 포인트</p>
                  <p>
                    • <strong>4장 플룻 독주</strong>가 극의 감정적 클라이맥스 → 가장 집중적으로 연습<br/>
                    • 영상과 사운드의 분위기 그림자극에 어울리게 연출 필요<br/>
                    • 피날레는 관객에게 남는 마지막 인상 → 완벽한 준비 필수
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 무대구성 */}
          <div className="mb-4">
            <button
              onClick={() => toggleSection("stage-setup")}
              className="w-full bg-[#1a1a1a] text-[#d4af37] border border-[#333] p-4 text-left rounded font-normal text-base transition-colors hover:bg-[#222] flex justify-between items-center"
            >
              <span>무대 구성</span>
              <span className={`transform transition-transform ${expandedSections.includes("stage-setup") ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                expandedSections.includes("stage-setup") ? "max-h-[2000px] mt-4" : "max-h-0"
              }`}
            >
              <div className="space-y-4">
                <h4 className="text-lg text-[#d4af37] font-medium">무대 구성도</h4>
                
                <motion.div 
                  className="w-full rounded overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-[#d4af37] text-sm mb-2 p-2">무대 구성도 1</p>
                  <div className="w-full flex justify-center items-center bg-black/20 p-4 rounded">
                    <Image
                      src="/22.png"
                      alt="무대 구성도"
                      width={1200}
                      height={800}
                      className="w-full h-auto max-w-full object-contain"
                      style={{ maxHeight: '80vh' }}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  className="w-full rounded overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <p className="text-[#d4af37] text-sm mb-2 p-2">무대 구성도 2</p>
                  <div className="w-full flex justify-center items-center bg-black/20 p-4 rounded">
                    <Image
                      src="/23.png"
                      alt="무대 구성도 2"
                      width={1200}
                      height={800}
                      className="w-full h-auto max-w-full object-contain"
                      style={{ maxHeight: '80vh' }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* 레퍼런스 */}
          <div className="mb-4">
            <button
              onClick={() => toggleSection("reference-videos")}
              className="w-full bg-[#1a1a1a] text-[#d4af37] border border-[#333] p-4 text-left rounded font-normal text-base transition-colors hover:bg-[#222] flex justify-between items-center"
            >
              <span>그림자극 레퍼런스</span>
              <span className={`transform transition-transform ${expandedSections.includes("reference-videos") ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                expandedSections.includes("reference-videos") ? "max-h-[2000px] mt-4" : "max-h-0"
              }`}
            >
              <div className="space-y-6">
                {/* 레퍼런스 이미지 */}
                <div className="space-y-4">
                  <h4 className="text-lg text-[#d4af37] font-medium">그림자극 레퍼런스 이미지</h4>
                  
                  <motion.div 
                    className="w-full rounded overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-[#d4af37] text-sm mb-2 p-2">레퍼런스 이미지 1</p>
                    <Image
                      src="/s1.png"
                      alt="그림자극 레퍼런스 1"
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </motion.div>

                  <motion.div 
                    className="w-full rounded overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <p className="text-[#d4af37] text-sm mb-2 p-2">레퍼런스 이미지 2</p>
                    <Image
                      src="/s2.png"
                      alt="그림자극 레퍼런스 2"
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </motion.div>
                </div>

                {/* 레퍼런스 영상 */}
                <div className="space-y-4">
                  <h4 className="text-lg text-[#d4af37] font-medium">그림자극 레퍼런스 영상</h4>
                  
                  <div className="bg-black rounded overflow-hidden">
                    <p className="text-[#d4af37] text-sm mb-2 p-2">레퍼런스 영상 1</p>
                    <iframe
                      src="https://www.youtube.com/embed/1ReuOnKSi0s"
                      className="w-full h-64 border-0"
                      allowFullScreen
                    />
                  </div>

                  <div className="bg-black rounded overflow-hidden">
                    <p className="text-[#d4af37] text-sm mb-2 p-2">레퍼런스 영상 2</p>
                    <iframe
                      src="https://www.youtube.com/embed/ZrflpPulnDU"
                      className="w-full h-64 border-0"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
