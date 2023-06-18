<script setup lang="ts">
import { ref, nextTick } from "vue";
import { Person, PERSONS } from "@/persons";

const isShowQR = ref(false);

function handleClickPerson(person: Person) {
  isShowQR.value = true;
  nextTick(() => {
    person.qr("qr__canvas");
  });
}
</script>

<template>
  <main>
    <ul class="persons">
      <li
        class="person button"
        :style="{ backgroundColor: person.color }"
        v-for="(person, index) in PERSONS"
        :key="index"
        @click="handleClickPerson(person)"
      >
        {{ person.name }}
      </li>
    </ul>
    <div class="qr" v-if="isShowQR" @click="isShowQR = false">
      <canvas id="qr__canvas"></canvas>
    </div>
  </main>
</template>

<style scoped>
.persons {
  display: flex;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 0;
  padding: 0;
}

.person {
  font-size: 40px;
}
.person:hover {
  opacity: 0.7;
}

.qr {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#qr__canvas {
  border-radius: 15px;
}
</style>
