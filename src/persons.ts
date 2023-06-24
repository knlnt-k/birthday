import QRCode from "qrcode";
import * as process from "process";

type PersonType = "dashka" | "maks" | "regina";

export type Person = {
  id: PersonType;
  name: string;
  qr(idCanvas: string): Promise<void>;
  finish_word_audio: string;
  okG: string;
  color: string;
  start_audio: string;
  helps: {
    audio: string;
    word: string;
    value: string;
    is_answer: boolean;
  }[];
  no: string[];
  yes: string[];
};

const BASE_PATH =
  process.env.NODE_ENV === "development"
    ? "/msc/"
    : "https://github.com/knlnt-k/birthday/raw/main/public/msc/";

function getQRCode(person: Person, idCanvas: string) {
  const canvas = document.getElementById(idCanvas) as HTMLCanvasElement;
  const url = window.location.origin + "/birthday/#/game/" + person.id;

  return QRCode.toCanvas(canvas, url, {
    color: {
      dark: person.color,
      light: "#34495e",
    },
    width: window.innerWidth * 0.5,
  });
}

function getHelps(person: PersonType, words: string[]): Person["helps"] {
  return words.map((word, i) => {
    const help: Person["helps"][0] = {
      audio: `${BASE_PATH + person}/helps/${i + 1}.m4a`,
      word,
      value: "",
      is_answer: false,
    };

    return help;
  });
}

function getYesNo(person: PersonType, type: "yes" | "no"): string[] {
  const answer: string[] = [];

  for (let i = 1; i < 5; i++) {
    answer.push(`${BASE_PATH + person}/${type}/${i}.m4a`);
  }

  return answer;
}

export const PERSONS: Person[] = [
  {
    id: "dashka",
    name: "Дашка",
    qr(idCanvas) {
      return getQRCode(this, idCanvas);
    },
    finish_word_audio: BASE_PATH + "dashka/finish_word_audio.m4a",
    okG: "ок гугл, как охереть и не встать?",
    start_audio: BASE_PATH + "dashka/start_audio.m4a",
    color: "#9b59b6",
    helps: getHelps("dashka", [
      "Ириска",
      "Рижская",
      "Синтезатор",
      "Ландыши",
      "Лазаревское",
      "Иремель",
      "Тимур",
      "Ириска",
    ]),
    no: getYesNo("dashka", "no"),
    yes: getYesNo("dashka", "yes"),
  },
  {
    id: "maks",
    name: "Макс",
    qr(idCanvas) {
      return getQRCode(this, idCanvas);
    },
    color: "#1abc9c",
    finish_word_audio: BASE_PATH + "maks/finish_word_audio.m4a",
    okG: "ок гугл, как да как так то а?",
    start_audio: BASE_PATH + "maks/start_audio.m4a",
    helps: getHelps("maks", [
      "Опарыш",
      "img",
      "Каскадеры",
      "Вулкан",
      "Луна",
      "Нарды",
      "Юпитер",
      "Рыбалка",
    ]),
    no: getYesNo("maks", "no"),
    yes: getYesNo("maks", "yes"),
  },
  {
    id: "regina",
    name: "Регина",
    qr(idCanvas) {
      return getQRCode(this, idCanvas);
    },
    color: "#e74c3c",
    finish_word_audio: BASE_PATH + "regina/finish_word_audio.m4a",
    start_audio: BASE_PATH + "regina/start_audio.m4a",
    okG: "ok Google, how will it be in Russian fucked up trash",
    helps: getHelps("regina", [
      "Spoon",
      "SpongeBob",
      "Своя компания",
      "Роза",
      "44",
      "Н169тх",
      "Сыр",
      "3",
    ]),
    no: getYesNo("regina", "no"),
    yes: getYesNo("regina", "yes"),
  },
];
