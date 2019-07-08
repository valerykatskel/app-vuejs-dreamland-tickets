<script>
import { eventEmitter } from "../main";

export default {
  props: {
    kindOfTicket: {
      type: String,
      validator: function(value) {
        // Значение пропса должно соответствовать одной из этих строк
        return (
          ["adult", "adultWeekday", "child", "childWeekday"].indexOf(value) !==
          -1
        );
      }
    },

    ticketCount: {
      type: Number
    },

    // activeTicket: {
    //   type: Object
    // }
    price: {
      type: Number
    },
  },

  data: function() {
    return {
      iconMinus: require("../assets/images/icon-minus.svg"),
      iconPlus: require("../assets/images/icon-plus.svg"),
      ticketCountInitial: 0
    };
  },

  updated: function() {
    this.$nextTick(function() {
      //this[this.kindOfTicket] = this.ticketCount;
    });
  },

  created: function() {},

  watch: {
    // count: function(value) {
    //   console.log("watching changes for count");
    //   //if (value < 0) this.count = 0;
    //   if (this.kindOfTicket === "adult") {
    //     eventEmitter.$emit("ticketChangeAdult", value);
    //   }
    //   if (this.kindOfTicket === "child") {
    //     eventEmitter.$emit("ticketChangeChild", value);
    //   }
    //   if (this.kindOfTicket === "adultWeekday") {
    //     eventEmitter.$emit("ticketChangeAdultWeekday", value);
    //   }
    //   if (this.kindOfTicket === "childWeekday") {
    //     eventEmitter.$emit("ticketChangeChildWeekday", value);
    //   }
    // }
  },

  methods: {
    reduceCount(cnt) {
      // Метод обработчик клика по кнопке уменьшения количества билетов.
      // В параметре передается, на сколько нужно меньшить количество билетов нужного типа:
      // взрослый билет в обычный день,
      // взрослый билет в будний день,
      // детский билет в обычный день,
      // детский билет в будний день

      const newValue = this.ticketCount - cnt < 0 ? 0 : this.ticketCount - cnt;

      if (this.kindOfTicket === "adult") {
        eventEmitter.$emit("changeAdult", newValue);
      }

      if (this.kindOfTicket === "child") {
        eventEmitter.$emit("changeChild", newValue);
      }

      if (this.kindOfTicket === "adultWeekday") {
        eventEmitter.$emit("changeAdultWeekday", newValue);
      }

      if (this.kindOfTicket === "childWeekday") {
        eventEmitter.$emit("changeChildWeekday", newValue);
      }
    },

    increaseCount(cnt) {
      // Метод обработчик клика по кнопке добавления количества билетов.
      // В параметре передается, на сколько нужно увеличить количество билетов нужного типа:
      // взрослый билет в обычный день,
      // взрослый билет в будний день,
      // детский билет в обычный день,
      // детский билет в будний день

      const newValue = this.ticketCount + cnt;

      if (this.kindOfTicket === "adult") {
        eventEmitter.$emit("changeAdult", newValue);
      }

      if (this.kindOfTicket === "child") {
        eventEmitter.$emit("changeChild", newValue);
      }

      if (this.kindOfTicket === "adultWeekday") {
        eventEmitter.$emit("changeAdultWeekday", newValue);
      }

      if (this.kindOfTicket === "childWeekday") {
        eventEmitter.$emit("changeChildWeekday", newValue);
      }
    },
  },

  mounted: function() {
    this.$nextTick(function() {
      //this.ticketPrice
    });
  }
};
</script>

<template>
  <div class="number-wrapper">
    <fieldset class="choise-number">
      <button 
        class="reduce" 
        @click="reduceCount(1)" 
        type="button"
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
        v-model.number="this.ticketCount"
        @input="console.log('enter new value')"
      />

      <button 
        class="enhance" 
        @click="increaseCount(1)" 
        type="button"
      >
        <img :src="iconPlus" alt="+" />
      </button>
    </fieldset>
    <p class="price-descr">
      <span class="price">
        <strong>{{ this.price }}</strong> руб.
      </span>
    </p>
  </div>
</template>