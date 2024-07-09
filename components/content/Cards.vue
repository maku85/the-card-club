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

  defineProps({
    cards: {
      type: String,
      required: false,
      default: () => 'ace,2,3,4,5,6,7,8,9,10,jack,queen,king',
    },
  });

  function getCardImage(card) {
    switch (card) {
      case 'ace':
        return ace;
      case 'two':
        return two;
      case 'three':
        return three;
      case 'four':
        return four;
      case 'five':
        return five;
      case 'six':
        return six;
      case 'seven':
        return seven;
      case 'eight':
        return eight;
      case 'nine':
        return nine;
      case 'ten':
        return ten;
      case 'jack':
        return jack;
      case 'queen':
        return queen;
      case 'king':
        return king;
      default:
    }
  }
</script>

<template>
  <div class="flex">
    <span v-for="card in cards.split(',')" :key="card">
      <img :src="getCardImage(card)" alt="card" />
    </span>
  </div>
</template>
