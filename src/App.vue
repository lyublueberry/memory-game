<template>
  <h1>Game</h1>

  <section class="game-board">
    <Card v-for="(card, index) in cardList" :key="`card-${index}`"
    :value="card.value" :visible="card.visible"
      @select-card="flipCard" :position="card.position" :matched="card.matched" />
  </section>
  {{ status }}
</template>

<script>
import { ref, watch } from 'vue';
import Card from './components/Card.vue';

export default {
  name: 'App',
  components: {
    Card,
  },
  setup() {
    const userSelection = ref([]);
    const cardList = ref([]);
    const status = ref('');

    for (let i = 0; i < 30; i++) {
      cardList.value.push({
        value: i,
        visible: false,
        position: i,
        matched: false
      });
    }

    const flipCard = payload => {
      cardList.value[payload.position].visible = true;

      if (userSelection.value[0]) {
        userSelection.value[1] = payload;
      } else userSelection.value[0] = payload;
    }

    watch(userSelection, currentValue => {
      if (currentValue.length === 2) {
        const cardOne = currentValue[0];
        const cardTwo = currentValue[1];

        if (cardOne.facaValue === cardTwo.facaValue) {
          status.value = "Matched";
          cardList.value[cardOne.position].matched = true;
          cardList.value[cardTwo.position].matched = true;
        } else {status.value = 'Mismatch'}


          cardList.value[cardOne.position].visible = false;
        cardList.value[cardTwo.position].visible = false;
        userSelection.value.length = 0
      }
    }, { deep: true })

    return {
      cardList, flipCard, userSelection, status
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.game-board {
  display: grid;
  grid-template-columns: 100px 100px 100px 100px 100px;
  grid-template-rows: 100px 100px 100px 100px 100px 100px;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  justify-content: center;
}
</style>
