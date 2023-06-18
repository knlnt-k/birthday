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
      help.audio.help.play();
    },
    handleInputAnswer(value: string, help: Person["helps"][0]) {
      help.value = value;

      if (help.value.toLowerCase() === help.word.toLowerCase()) {
        help.is_answer = true;
        help.audio.yes.play();
      } else if (this.person) {
        this.person.no[
          Math.floor(Math.random() * this.person.no.length)
        ].play();
      }
    },
  },
});
