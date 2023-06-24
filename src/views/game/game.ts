import { defineComponent } from "vue";
import { type Person, PERSONS } from "@/persons";
import debounce from "@/debounce";

export default defineComponent({
  name: "Game",
  data() {
    return {
      person: null as Person | null,
      handleInputAnswerDebounce: debounce(
        this.handleInputAnswer,
        1000
      ) as typeof this.handleInputAnswer,
      audio: null as HTMLAudioElement | null,
    };
  },
  computed: {
    helpers(): Person["helps"] {
      return (this.person || { helps: [] as Person["helps"] }).helps.filter(
        (_, i) => {
          return !!(i === 0 || this.person?.helps[i - 1]?.is_answer);
        }
      );
    },
  },
  beforeMount() {
    const person = PERSONS.find(p => p.id === this.$route.params.id);

    if (person) {
      this.person = person;
      document.title = person.name;
    }
  },
  methods: {
    handleClickQuest(help: Person["helps"][0]) {
      this.getAudio(help.audio).play();
    },
    async handleInputAnswer(event: InputEvent, help: Person["helps"][0]) {
      help.value = (event.target as HTMLInputElement).value.trim();

      if (help.value.toLowerCase() === help.word.toLowerCase()) {
        help.is_answer = true;

        if (this.person && this.person.helps.every(h => h.is_answer)) {
          this.finish();
        } else {
          await this.getRandomAudio("yes")?.play();
        }
      } else if (this.person) {
        this.getRandomAudio("no")?.play();
      }
    },
    getRandomAudio(type: "yes" | "no") {
      if (this.person) {
        return this.getAudio(
          this.person[type][
            Math.floor(Math.random() * this.person[type].length)
          ]
        );
      }
      return undefined;
    },
    async handleClickInput() {
      if (this.person) {
        this.getAudio(this.person.start_audio).play();
      }
    },
    async finish() {
      if (this.person) {
        const audio = this.getAudio(this.person.finish_word_audio);
        const okG = encodeURIComponent(this.person.okG);

        await audio.play();
        audio.addEventListener("ended", () => {
          window.location.href = "https://www.google.ru/search?q=" + okG;
        });
      }
    },
    getAudio(src: string): HTMLAudioElement {
      if (this.audio) {
        this.audio.src = src;
      } else {
        this.audio = new Audio(src);
      }

      return this.audio as HTMLAudioElement;
    },
  },
});
