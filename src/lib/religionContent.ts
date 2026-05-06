import type { Religion } from "@/types";

export type ReligionContent = {
  openingVerse: {
    arabicText?: string;
    verseText: string;
    verseReference: string;
    translation: string;
  };
  openingGreeting: string;
  closingGreeting: string;
  akadLabel: string;
  receptionLabel: string;
  invitationOpener: string;
  ornamentStyle: string;
};

export const RELIGION_CONTENT: Record<Religion, ReligionContent> = {
  islam: {
    openingVerse: {
      arabicText:
        "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ",
      verseText: "",
      verseReference: "QS. Ar-Rum: 21",
      translation:
        "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.",
    },
    openingGreeting: "Bismillahirrahmanirrahim",
    closingGreeting: "Wassalamu'alaikum Warahmatullahi Wabarakatuh",
    akadLabel: "Akad Nikah",
    receptionLabel: "Walimatul 'Ursy",
    invitationOpener:
      "Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami bermaksud menyelenggarakan pernikahan putra-putri kami:",
    ornamentStyle: "islamic",
  },
  kristen: {
    openingVerse: {
      verseText:
        "\"Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia.\"",
      verseReference: "Matius 19:6",
      translation: "",
    },
    openingGreeting: "Syalom,",
    closingGreeting: "Tuhan Yesus Memberkati",
    akadLabel: "Pemberkatan Nikah",
    receptionLabel: "Resepsi Pernikahan",
    invitationOpener:
      "Dengan penuh syukur atas berkat Tuhan Yang Maha Kasih, kami bermaksud menyelenggarakan pernikahan putra-putri kami:",
    ornamentStyle: "christian",
  },
  katolik: {
    openingVerse: {
      verseText:
        "\"Hendaklah kamu selalu rendah hati, lemah lembut, dan sabar. Tunjukkanlah kasihmu dalam hal saling membantu.\"",
      verseReference: "Efesus 4:2",
      translation: "",
    },
    openingGreeting: "Syalom dan Salam Damai Kristus,",
    closingGreeting: "Berkah Dalem",
    akadLabel: "Pemberkatan Pernikahan",
    receptionLabel: "Resepsi Pernikahan",
    invitationOpener:
      "Dengan penuh syukur kepada Tuhan Yang Maha Pengasih, kami bermaksud menyelenggarakan pesta pernikahan putra-putri kami:",
    ornamentStyle: "catholic",
  },
  hindu: {
    openingVerse: {
      verseText:
        "\"Semoga pikiran kita selalu harmonis, semoga hati kita selalu bersatu, semoga jiwa kita selalu damai, semoga kita berdua menjadi keluarga yang bahagia.\"",
      verseReference: "Atharwa Weda VII.53.1",
      translation: "",
    },
    openingGreeting: "Om Swastyastu,",
    closingGreeting: "Om Santhi, Santhi, Santhi Om",
    akadLabel: "Upacara Pawiwahan",
    receptionLabel: "Resepsi Pernikahan",
    invitationOpener:
      "Dengan memohon Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa, kami bermaksud menyelenggarakan upacara pernikahan putra-putri kami:",
    ornamentStyle: "hindu",
  },
  buddha: {
    openingVerse: {
      verseText:
        "\"Cinta adalah keinginan tulus untuk kebahagiaan orang lain. Semoga kita berdua saling mendukung dalam jalan menuju kedamaian sejati.\"",
      verseReference: "Dhammapada",
      translation: "",
    },
    openingGreeting: "Namo Buddhaya,",
    closingGreeting: "Sabbe Satta Bhavantu Sukhitatta",
    akadLabel: "Upacara Pernikahan",
    receptionLabel: "Resepsi Pernikahan",
    invitationOpener:
      "Dengan penuh rasa syukur atas berkah Tri Ratna, kami bermaksud menyelenggarakan upacara pernikahan putra-putri kami:",
    ornamentStyle: "buddhist",
  },
  konghucu: {
    openingVerse: {
      verseText:
        "\"Keluarga yang harmonis adalah dasar dari masyarakat yang baik. Suami dan istri yang saling menyayangi adalah fondasi dari keluarga bahagia.\"",
      verseReference: "Li Ji (Kitab Tata Cara)",
      translation: "",
    },
    openingGreeting: "Wei De Dong Tian,",
    closingGreeting: "Xian You Yi De",
    akadLabel: "Upacara Pernikahan",
    receptionLabel: "Resepsi Pernikahan",
    invitationOpener:
      "Dengan memohon berkat dan restu Tian Yang Maha Esa, kami bermaksud menyelenggarakan pernikahan putra-putri kami:",
    ornamentStyle: "confucian",
  },
};

export function getReligionContent(religion: Religion): ReligionContent {
  return RELIGION_CONTENT[religion] ?? RELIGION_CONTENT.islam;
}
