<template>
  <main v-if="person" :style="{ backgroundColor: person.color }" class="game">
    <h1>{{ person.name }}</h1>
    <ul class="helps">
      <li class="helps__item" v-for="(help, i) in helpers" :key="i">
        <div
          class="helps__item-index"
          :class="{ 'helps__item-index_active': help.is_answer }"
        >
          {{ i + 1 }}
        </div>
        <input
          type="text"
          v-model.trim="help.value"
          :disabled="help.is_answer"
          :placeholder="i === 0 ? '------------->' : ''"
          @input="handleInputAnswerDebounce($event, help)"
        />
        <div
          class="helps__item-quest"
          v-if="!help.is_answer"
          @click="handleClickQuest(help)"
        >
          ?
        </div>
      </li>
    </ul>
  </main>
  <main v-else>ща...</main>
</template>

<script lang="ts" src="./game.ts"></script>
<style scoped src="./game.css"></style>
