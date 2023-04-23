import { ref } from 'vue';

const cardList = ref([]);

const cardItems = ['sticker', 'sticker1', 'sticker2', 'sticker3', 'sticker4', 'sticker5',
'sticker6', 'sticker7', 'sticker8', 'sticker9', 'sticker10',
'sticker11', 'sticker12', 'sticker13', 'sticker14'];

const initDeck = deckData => {
    deckData.forEach(item => {
        cardList.value.push({
          value: item,
          variant: 1,
          visible: false,
          position: null,
          matched: false
        });
        
        cardList.value.push({
          value: item,
          variant: 2,
          visible: false,
          position: null,
          matched: false
        });
        });
}

const updateCardPosition = () => {
cardList.value = cardList.value.map((card, index) => {
    return {
      ...card,
      position: index
    }
    });
}

export default function createDeck() {
    initDeck(cardItems);
    updateCardPosition();
    return { cardList }

}