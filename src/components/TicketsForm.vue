<script>
import TicketTemplate from "./TicketTemplate.vue";
import TicketCountChanger from "./TicketCountChanger.vue";
import TicketsList from "./TicketsList.vue";
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import { ru } from "vuejs-datepicker/src/locale";
import { eventEmitter } from "../main";

export default {
  props: [
    "tickets",
    "countAdult",
    "countAdultWeekday",
    "countChild",
    "countChildWeekday",
    "isWaterParkClosed",
    "ticketType",
    "ticketTypeRef",
    "isSmartMode",
    "getRangeDate",
    "lockWeekday",
    "lockUsualDay",
    "changeTicketStartDate",
    "ticketDateStart",
    "formatDate"
  ],
  data: function() {
    return {
      title: "Быстрая покупка билета в аквапарк «Дримлэнд»",
      formDescription: "Выберите тип билета",
      goBackTitle: "К выбору билета",
      deliveryOptionText: "Доставка (10 руб.)",
      ru: ru,
      iconGoBack: require("../assets/images/icon-go-back.svg"),
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

    showVipBlock(ticketTypeRef) {
      return ticketTypeRef === "ticketType04";
    },

    handleClickGoBack() {
      // известим родительский компонент о том, что мы вернулись на исходное положение в выборе билетов в смарт версии
      eventEmitter.$emit("buttonClickedGoBack");
    },

    handleSelectVIPDate(date) {
      this.changeTicketStartDate(date);
    }
  },
  components: {
    datepicker: Datepicker,
    ticketsList: TicketsList,
    ticketCountChanger: TicketCountChanger
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
    }
  }
};
</script>

<template>
  <div>
    <fieldset class="choise-ticket-wrapper">
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
          <img src="iconGoBack" alt width="14" height="14" />
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
        class="choise-ticket"
        :class="this.lockUsualDay ? 'disabled' : ''"
        v-if="this.showChoiseTicket(isSmartMode, ticketTypeRef)"
      >
        <tr>
          <td class="td-number">
            <input type="hidden" id="selectVIPDate" />
            <datepicker
              :disabled-dates="disabledDates"
              name="ticketStartDate"
              :inline="true"
              :value="this.ticketDateStart"
              :language="ru"
              :monday-first="true"
              id="selectVIPDate"
              v-if="showVipBlock(ticketTypeRef)"
              @selected="handleSelectVIPDate"
            ></datepicker>

            <div class="td-number-inner">
              <div class="number-title">
                <div class="kind-of-day" v-if="this.showKindOfDay">Любой день</div>Взрослый билет
              </div>
              <ticket-count-changer
                :lockUsualDay="lockUsualDay"
                :countAdult="countAdult"
                :ticketCount="countAdult"
                kindOfTicket="adult"
              ></ticket-count-changer>

              <div v-if="!showVipBlock(ticketTypeRef)" class="number-title">
                Детский билет
                <span>(3-16 лет)</span>
              </div>
              <ticket-count-changer
                v-if="!showVipBlock(ticketTypeRef)"
                :lockUsualDay="lockUsualDay"
                :countChild="countChild"
                :ticketCount="countChild"
                kindOfTicket="child"
              ></ticket-count-changer>

              <div
                v-if="showVipBlock(ticketTypeRef)"
                class="number-title block-vip"
              >{{ deliveryOptionText }}</div>

              <div v-if="showVipBlock(ticketTypeRef)" class="number-wrapper block-vip">
                <p>Подарочный вариант</p>
                <p>C вами свяжется наш менеджер</p>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <table
        class="choise-ticket m-weekday"
        :class="this.lockWeekday ? 'disabled' : ''"
        v-if="!this.isWeekdayHidden"
      >
        <tr>
          <td class="td-number">
            <div class="number-title">
              <div class="kind-of-day" v-if="this.showKindOfDay">Будний день</div>Взрослый билет
            </div>
            <ticket-count-changer
              :lockUsualDay="lockUsualDay"
              :countAdultWeekday="countAdultWeekday"
              :ticketCount="countAdultWeekday"
              kindOfTicket="adultWeekday"
            ></ticket-count-changer>

            <div class="number-title">
              Детский билет
              <span>(3-16 лет)</span>
            </div>
            <ticket-count-changer
              :lockUsualDay="lockUsualDay"
              :countChildWeekday="countChildWeekday"
              :ticketCount="countChildWeekday"
              kindOfTicket="childWeekday"
            ></ticket-count-changer>
          </td>
        </tr>
      </table>
    </fieldset>
  </div>
</template>