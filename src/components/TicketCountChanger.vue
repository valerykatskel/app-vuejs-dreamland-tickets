<script>
import { eventEmitter } from '../main';

export default {
  props: {
    kindOfTicket: {
      type: String,
      validator: value => ['adult', 'adultWeekday', 'child', 'childWeekday'].indexOf(value) !== -1 // Значение пропса должно быть равно одному из перечисленных
    },

    ticketCount: {
      type: Number
    },

    price: {
      type: Number
    },

    disabled: {
      type: Boolean
    }
  },

  data: function() {
    return {
      iconMinus: require('../assets/images/icon-minus.svg'),
      iconPlus: require('../assets/images/icon-plus.svg'),
      ticketCountInitial: 0
    };
  },

  methods: {
    reduceCount(cnt) {
      // Метод обработчик клика по кнопке уменьшения количества билетов

      const newValue = this.ticketCount - cnt < 0 ? 0 : this.ticketCount - cnt;

      if (this.kindOfTicket === 'adult') {
        eventEmitter.$emit('changeAdult', newValue);
      }

      if (this.kindOfTicket === 'child') {
        eventEmitter.$emit('changeChild', newValue);
      }

      if (this.kindOfTicket === 'adultWeekday') {
        eventEmitter.$emit('changeAdultWeekday', newValue);
      }

      if (this.kindOfTicket === 'childWeekday') {
        eventEmitter.$emit('changeChildWeekday', newValue);
      }
    },

    increaseCount(cnt) {
      // Метод обработчик клика по кнопке добавления количества билетов

      const newValue = this.ticketCount + cnt;

      if (this.kindOfTicket === 'adult') {
        eventEmitter.$emit('changeAdult', newValue);
      }

      if (this.kindOfTicket === 'child') {
        eventEmitter.$emit('changeChild', newValue);
      }

      if (this.kindOfTicket === 'adultWeekday') {
        eventEmitter.$emit('changeAdultWeekday', newValue);
      }

      if (this.kindOfTicket === 'childWeekday') {
        eventEmitter.$emit('changeChildWeekday', newValue);
      }
    },
  },
};
</script>

<template>
  <div class="number-wrapper">
    <fieldset class="choise-number">
      <button 
        class="reduce" 
        @click="reduceCount(1)" 
        type="button"
        :disabled="this.disabled"
      >
        <img :src="iconMinus" alt="-" />
      </button>

      <input
        type="number"
        name="number-tikets"
        placeholder="0"
        min="0"
        max="99"
        step="1"
        id="num1"
        required
        readonly
        v-model.number="this.ticketCount"
      />

      <button 
        class="enhance" 
        @click="increaseCount(1)" 
        type="button"
        :disabled="this.disabled"
      >
        <img :src="iconPlus" alt="+" />
      </button>
    </fieldset>
    <p class="price-descr">
      <span class="price">
        <strong>{{this.price}}</strong> руб.
      </span>
    </p>
  </div>
</template>

<style scoped>
  .choise-number input[type=number]::-webkit-inner-spin-button,
  .choise-number input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
  .choise-number button[disabled] {
    cursor: default;
  }
  .choise-number button[disabled]:hover {
    cursor: default;
  }
  .choise-number button:hover:not(:disabled) {
    color: #fff;
    background-color: #f9f9f9;
  }
  .choise-number button:focus:not(:disabled),
  .choise-number button:active:not(:disabled) {
    background-color: #e6e6e6;
  }
</style>