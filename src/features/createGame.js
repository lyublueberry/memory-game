import _ from 'lodash';
import { ref, computed } from 'vue';

export default function createGame(deck) {
    const newPalyer = ref(true);

    const startGame = () => {
        newPalyer.value = false;
        restartGame();
    }

    const restartGame = () => {
        deck.value = _.shuffle(deck.value);

        deck.value = deck.value.map((card, index) => {
            return {
              ...card,
              matched: false,
              position: index,
              visible: true
            }
          });
          setTimeout(() => {
            deck.value = deck.value.map((card, index) => {
              return {
                ...card,
                matched: false,
                position: index,
                visible: false
              }
            });
          }, 3000)

    }

    const status = computed(() => {
        if (remainingPairs.value === 15) {
          return "Wins";
        } else return `Осталось: ${remainingPairs.value}`;
      })
  
      const remainingPairs = computed(() => {
        const remainingCards = deck.value.filter(card => card.matched === true).length
        return remainingCards / 2;
      });

      
    return {
        newPalyer,
        restartGame,
        status,
        remainingPairs,
        startGame
      }
}