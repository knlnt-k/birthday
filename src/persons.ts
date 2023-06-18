import QRCode from "qrcode";

export type Person = {
  id: string;
  name: string;
  qr(idCanvas: string): Promise<void>;
  color: string;
  helps: {
    audio: {
      help: HTMLAudioElement;
      yes: HTMLAudioElement;
    };
    word: string;
    value: string;
    is_answer: boolean;
  }[];
  no: HTMLAudioElement[];
};

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

export const PERSONS: Person[] = [
  {
    id: "dashka",
    name: "Дашка",
    qr(idCanvas) {
      return getQRCode(this, idCanvas);
    },
    color: "#9b59b6",
    helps: [
      {
        word: "кастрюля",
        value: "",
        audio: {
          help: new Audio(
            "https://github.com/knlnt-k/birthday/raw/main/public/msc/dashka/yes.m4a"
          ),
          yes: new Audio(
            "https://github.com/knlnt-k/birthday/raw/main/public/msc/dashka/yes.m4a"
          ),
        },
        is_answer: false,
      },
      {
        word: "каша",
        value: "",
        audio: {
          help: new Audio("/msc/dashka/1.m4a"),
          yes: new Audio(
            "https://github.com/knlnt-k/birthday/raw/main/public/msc/dashka/yes.m4a"
          ),
        },
        is_answer: false,
      },
      {
        word: "соль",
        value: "",
        audio: {
          help: new Audio("/msc/dashka/1.m4a"),
          yes: new Audio(
            "https://github.com/knlnt-k/birthday/raw/main/public/msc/dashka/yes.m4a"
          ),
        },
        is_answer: false,
      },
    ],
    no: [
      new Audio(
        "https://github.com/knlnt-k/birthday/raw/main/public/msc/dashka/no/1.m4a"
      ),
      new Audio(
        "https://github.com/knlnt-k/birthday/raw/main/public/msc/dashka/no/2.m4a"
      ),
      new Audio(
        "https://github.com/knlnt-k/birthday/raw/main/public/msc/dashka/no/3.m4a"
      ),
      new Audio(
        "https://github.com/knlnt-k/birthday/raw/main/public/msc/dashka/no/4.m4a"
      ),
      new Audio(
        "https://github.com/knlnt-k/birthday/raw/main/public/msc/dashka/no/5.m4a"
      ),
    ],
  },
  {
    id: "maks",
    name: "Макс",
    qr(idCanvas) {
      return getQRCode(this, idCanvas);
    },
    color: "#1abc9c",
    helps: [
      {
        word: "",
        value: "",
        audio: {
          help: new Audio("/msc/dashka/1.m4a"),
          yes: new Audio("/msc/dashka/1.m4a"),
        },
        is_answer: false,
      },
    ],
    no: [],
  },
  {
    id: "regina",
    name: "Регина",
    qr(idCanvas) {
      return getQRCode(this, idCanvas);
    },
    color: "#e74c3c",
    helps: [
      {
        word: "",
        value: "",
        audio: {
          help: new Audio("/msc/dashka/1.m4a"),
          yes: new Audio("/msc/dashka/1.m4a"),
        },
        is_answer: false,
      },
    ],
    no: [],
  },
];
