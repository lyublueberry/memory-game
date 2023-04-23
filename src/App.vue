<template>
  <h1 class="game__title">Тренируй память</h1>
  <button class="btn__start" @click="restartGame">
    <img class="btn__img" src="../public/images/startbtn.png" width="100px" height="100px" alt="btn" />
  </button>

  <transition-group tag="section" class="game-board" name="shuffle-card">

    <Card v-for="(card) in cardList" :key="`${card.value}-${card.variant}`" :value="card.value" :visible="card.visible"
      @select-card="flipCard" :position="card.position" :matched="card.matched" />
  </transition-group>
  <p>test task for ROWI Факторинг Плюс </p>
  <span> made by <a class="link__tg" href="https://t.me/lyublueberry">Chernikova Lyubov</a></span>
</template>

<script>
import createDeck from './features/createDeck';
import createGame from './features/createGame';
import { ref, watch } from 'vue';
import { launchConfetti } from './utilities/confetti';
import Card from './components/Card.vue';
import picDeck from './data/picDeck.json';

export default {
  name: 'App',
  components: {
    Card,
  },
  setup() {
    const { cardList } = createDeck(picDeck);
    const { 
      restartGame,
      status,
      remainingPairs,
      startGame } = createGame(cardList);

    const userSelection = ref([]);

    const flipCard = payload => {
      cardList.value[payload.position].visible = true;

      if (userSelection.value[0]) {
        if (userSelection.value[0].position === payload.position && userSelection.value[0].faceValue === payload.faceValue) {
          return
        } else {
          userSelection.value[1] = payload;
        }
      } else {
        userSelection.value[0] = payload;
      }
    }

    watch(remainingPairs, currentValue => {
      if (currentValue === 0) {
        launchConfetti()
      }
    }),

      watch(userSelection, currentValue => {
        if (currentValue.length === 2) {
          const cardOne = currentValue[0];
          const cardTwo = currentValue[1];

          if (cardOne.faceValue === cardTwo.faceValue) {
            cardList.value[cardOne.position].matched = true;
            cardList.value[cardTwo.position].matched = true;
          } else {
            setTimeout(() => {
              cardList.value[cardOne.position].visible = false;
              cardList.value[cardTwo.position].visible = false;
            }, 1000)

          }

          userSelection.value.length = 0
        }
      },
        { deep: true })

    return {
      cardList,
      flipCard,
      userSelection,
      status,
      restartGame,
      startGame
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background-image: url(../public/images/White+Honeybomb+Backgrounds.jpg);
}

.game-board {
  display: grid;
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: repeat(6, 100px);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  justify-content: center;
  margin-bottom: 24px;
}

.btn__start {
  margin-bottom: 24px;
  width: 100px;
  height: 100px;
}

.game__title {
  margin: 0;
  padding-top: 12px;
  margin-bottom: 24px;
}

.btn__img {
  width: 90px;
  height: 90px;
}

.game__subtitle {
  margin: 0;
  margin-bottom: 14px;
}

.link__tg {
  text-decoration: none;
  color: #ffffff;
}

.shuffle-card-move {
  transition: transform 0.8s ease-in;
}
</style>
