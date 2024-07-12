<script setup>
  import ace from '/img/cards/ace.svg';
  import two from '/img/cards/two.svg';
  import three from '/img/cards/three.svg';
  import four from '/img/cards/four.svg';
  import five from '/img/cards/five.svg';
  import six from '/img/cards/six.svg';
  import seven from '/img/cards/seven.svg';
  import eight from '/img/cards/eight.svg';
  import nine from '/img/cards/nine.svg';
  import ten from '/img/cards/ten.svg';
  import jack from '/img/cards/jack.svg';
  import queen from '/img/cards/queen.svg';
  import king from '/img/cards/king.svg';
  import aceIT from '/img/cards/italian/ace.png';
  import twoIT from '/img/cards/italian/two.png';
  import threeIT from '/img/cards/italian/three.png';
  import fourIT from '/img/cards/italian/four.png';
  import fiveIT from '/img/cards/italian/five.png';
  import sixIT from '/img/cards/italian/six.png';
  import sevenIT from '/img/cards/italian/seven.png';
  import jackIT from '/img/cards/italian/jack.png';
  import queenIT from '/img/cards/italian/queen.png';
  import kingIT from '/img/cards/italian/king.png';

  defineProps({
    cards: {
      type: String,
      required: false,
      default: () => 'ace,2,3,4,5,6,7,8,9,10,jack,queen,king',
    },
    cardStyle: {
      type: String,
      required: false,
      default: () => '',
    },
  });

  function getCardImage(card, style) {
    switch (card) {
      case 'ace':
        return style === 'italian' ? aceIT : ace;
      case 'two':
        return style === 'italian' ? twoIT : two;
      case 'three':
        return style === 'italian' ? threeIT : three;
      case 'four':
        return style === 'italian' ? fourIT : four;
      case 'five':
        return style === 'italian' ? fiveIT : five;
      case 'six':
        return style === 'italian' ? sixIT : six;
      case 'seven':
        return style === 'italian' ? sevenIT : seven;
      case 'eight':
        return eight;
      case 'nine':
        return nine;
      case 'ten':
        return ten;
      case 'jack':
        return style === 'italian' ? jackIT : jack;
      case 'queen':
        return style === 'italian' ? queenIT : queen;
      case 'king':
        return style === 'italian' ? kingIT : king;
      default:
    }
  }
</script>

<template>
  <div class="flex">
    <span v-for="card in cards.split(',')" :key="card">
      <img :src="getCardImage(card, cardStyle)" alt="card" >
    </span>
  </div>
</template>
