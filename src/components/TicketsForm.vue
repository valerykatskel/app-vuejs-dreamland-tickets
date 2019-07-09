<script>
import TicketTemplate from './TicketTemplate.vue';
import TicketCountChanger from './TicketCountChanger.vue';
import TicketsList from './TicketsList.vue';
import Datepicker from 'vuejs-datepicker/dist/vuejs-datepicker.esm.js';
import { ru } from 'vuejs-datepicker/src/locale';
import FormCheckbox from './FormCheckbox.vue';
import { eventEmitter } from '../main';

export default {
  props: {
    tickets: {},
    countAdult: {},
    countAdultWeekday: {},
    countChild: {},
    countChildWeekday: {},
    isWaterParkClosed: {},
    ticketType: {},
    ticketTypeRef: {},
    isSmartMode: {},
    getRangeDate: {},
    ticketDateStart: {},
    formatDate: {},
    showVipBlock: {
      type: Boolean
    },
    deliveryOption: {
      type: Boolean
    },
    deliveryOptionText: {
      type: String
    },
    priceAdult: {
      type: Number
    },
    priceAdultWeekday: {
      type: Number
    },
    priceChild: {
      type: Number
    },
    priceChildWeekday: {
      type: Number
    }
  },
  data: function() {
    return {
      title: 'Быстрая покупка билета в аквапарк «Дримлэнд»',
      formDescription: 'Выберите тип билета',
      goBackTitle: 'К выбору билета',
      ru: ru,
      iconGoBack: require('../assets/images/icon-go-back.svg'),
      disabledDates: {
        from: new Date(2019, 7, 20), // номера месяцев начинаются с нуля, поэтому 20 августа будет так описано, день когда аквапарк закрывается
        to: new Date(new Date().setDate(new Date().getDate() - 1)) // вчерашний день уже незачем выбирать
      }
    };
  },

  methods: {
    showChoiseTicket(isSmartMode, ticketTypeRef) {
      if (isSmartMode) {
        if (ticketTypeRef !== null) {
          return true;
        } else return false;
      } else return true;
    },

    handleClickGoBack() {
      // Метод обработчик клика по кнопке возврата назад к выбору билетов
      eventEmitter.$emit('buttonClickedGoBack');
    },

    handleSelectDate(date) {
      // Метод обработчик выбора даты в календаре
      eventEmitter.$emit('changeTicketStartDate', date);
    },

    handleDeliveryOptionChange(data) {
      eventEmitter.$emit('checkboxDeliveryOptionChange', data);
    },
  },
  components: {
    datepicker: Datepicker,
    ticketsList: TicketsList,
    ticketCountChanger: TicketCountChanger,
    formCheckbox: FormCheckbox,
  },

  computed: {
    isWeekdayHidden() {
      return (
        this.tickets.filter(function(el) {
          return el.refName === "ticketType03" && el.activeByDefault === true;
        }).length === 0
      );
    },

    showKindOfDay() {
      return this.ticketTypeRef === "ticketType03";
    },

    addClassDisabledForWeekdaySection() {
      // Вычисляемое свойство добавляет класс disabled для секции с выбором количества билетов "Будний день", если добавлен хотя бы один билет в секции "Любой день".
      return this.countAdult > 0 || this.countChild > 0 ? "disabled" : "";
    },

    addClassDisabledForUsualDaySection() {
      // Вычисляемое свойство добавляет класс disabled для секции с выбором количества билетов "Любой день", если добавлен хотя бы один билет в секции "Будний день".
      return this.countAdultWeekday > 0 || this.countChildWeekday > 0;
    }
  }
};
</script>

<template>
  <div>
    <fieldset 
      class="choise-ticket-wrapper"
      :class="ticketTypeRef"
    >
      <h1>{{title}}</h1>

      <div class="choise-ticket-comment">
        <span class="ticket-comment__text">{{formDescription}}</span>
        <button
          v-show="this.ticketType"
          @click="this.handleClickGoBack"
          class="go-back-button button button--with-icon"
          id="goBackButton"
          type="button"
        >
          <img :src="iconGoBack" alt width="14" height="14" />
          {{goBackTitle}}
        </button>
      </div>

      <tickets-list
        :tickets="tickets"
        :isWaterParkClosed="isWaterParkClosed"
        :ticketType="ticketType"
        :ticketTypeRef="ticketTypeRef"
        :isSmartMode="isSmartMode"
        :getRangeDate="getRangeDate"
        :formatDate="formatDate"
      ></tickets-list>

      <table
        v-if="this.showChoiseTicket(isSmartMode, ticketTypeRef)"
        class="choise-ticket"
        :class="{disabled: this.addClassDisabledForUsualDaySection}"
      >
        <tr>
          <td class="td-number">
            <datepicker
              :disabled-dates="disabledDates"
              name="ticketStartDate"
              :inline="true"
              :value="this.ticketDateStart"
              :language="ru"
              :monday-first="true"
              v-if="this.showVipBlock"
              @selected="handleSelectDate"
            ></datepicker>

            <div class="td-number-inner">
              <div class="number-title">
                <div class="kind-of-day" v-if="this.showKindOfDay">Любой день</div>Взрослый билет
              </div>
              <ticket-count-changer
                :ticketCount="countAdult"
                :price="priceAdult"
                kindOfTicket="adult"
              ></ticket-count-changer>

              <div v-if="!this.showVipBlock" class="number-title">
                Детский билет
                <span>(3-16 лет)</span>
              </div>
              <ticket-count-changer
                v-if="!this.showVipBlock"
                :ticketCount="countChild"
                :price="priceChild"
                kindOfTicket="child"
              ></ticket-count-changer>

              <div v-if="this.showVipBlock" class="number-title block-vip">
                <form-checkbox
                  model="deliveryOption"
                  :value="this.deliveryOption"
                  :required="true"
                  id="deliveryOption"
                  name="delivery-option"
                  :label="this.deliveryOptionText"
                ></form-checkbox>
              </div>

              <div v-if="this.showVipBlock" class="number-wrapper block-vip">
                <p>Подарочный вариант</p>
                <p>C вами свяжется наш менеджер</p>
              </div>
            </div>
          </td>
        </tr>
      </table>

      <table
        v-if="!this.isWeekdayHidden"
        class="choise-ticket m-weekday"
        :class="this.addClassDisabledForWeekdaySection"
      >
        <tr>
          <td class="td-number">
            <div class="number-title">
              <div class="kind-of-day" v-if="this.showKindOfDay">Будний день</div>Взрослый билет
            </div>
            <ticket-count-changer
              :ticketCount="countAdultWeekday"
              :price="priceAdultWeekday"
              kindOfTicket="adultWeekday"
            ></ticket-count-changer>

            <div class="number-title">
              Детский билет
              <span>(3-16 лет)</span>
            </div>
            <ticket-count-changer
              :ticketCount="countChildWeekday"
              :price="priceChildWeekday"
              kindOfTicket="childWeekday"
            ></ticket-count-changer>
          </td>
        </tr>
      </table>
    </fieldset>
  </div>
</template>