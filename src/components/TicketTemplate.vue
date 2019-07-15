<script>
  import { eventEmitter } from '../main';
    
  export default {
    props: {
      ticket: {},
      isWaterParkClosed: {},
      ticketType: {},
      ticketTypeRef: {},
      isSmartMode: {},
    },

    methods: {
      handleClickTicketType: function (ref) {
        // известим родительский компонент о том, что тип билета перевыбран
        eventEmitter.$emit('ticketTypeChanged', ref);
      },

      needDisplayInSmartMode: function (ticket, isSmartMode, ticketTypeRef) {
        if (!isSmartMode) return true;
        if (ticketTypeRef === null) return true;
        if (ticket.refName === ticketTypeRef) {
          return true;
        } return false;
      },

      addActiveClassToTicket(active) {
        // Вычисляемое свойство добавляет активный класс для блока билета
        let result = '';
        if (this.ticketTypeRef === null) {
          // Если это первая прогрузка шаблона, то нужно проверить, если мы в смарте, то никакой класс active устанавливать не нужно
          if (!this.isSmartMode) {
            result = active? 'active' : '';     
          }
        } else {
          // Если это обычное переключение типов билетов, то всегда выставляем класс active для выбранного билета
          result = active? 'active' : '';     
        }
        return result;
      },

      addCloseClassToTicket(t) {
        // Метод добавляет класс label-close для тикета с динамической ценой, если аквапарк закрыт
        let res = '';
        if (t.refName === 'ticketType01') {
          res = this.isWaterParkClosed? 'label-close': (t.count === 0 ? 'label-sold' : '');
        } else {
          res = t.count === 0 ? 'label-sold' : '';
        }
        return res;
      },
    },
  }
</script>

<template>
  <div 
    :data-ref="ticket.refName"
    :data-count="ticket.count"
    :data-price-adult="ticket.priceAdult" 
    :data-price-child="ticket.priceChild"
    :data-price-adult-weekday="ticket.priceAdultWeekday" 
    :data-price-child-weekday="ticket.priceChildWeekday"
    :data-title="ticket.title"
    :class="[
      'ticket-view', 
      ticket.classList, 
      this.addActiveClassToTicket(ticket.activeByDefault),
      this.addCloseClassToTicket(ticket)
    ]"
    @click="handleClickTicketType(ticket.refName)"
    v-if="this.needDisplayInSmartMode(ticket, isSmartMode, ticketTypeRef)"
  >
    <div class="left-decor"></div>
    <slot name="ticketContent"></slot>
    <div class="right-decor"></div>
  </div>
</template>

<style scoped>
  .ticket-icon-01 .ticket-icon .deg-value {
    font-size: 48px;
    padding-left: 40px;
    line-height: 83px;
    color: #808080;
    font-family: "Arial Black", Arial;
    font-weight: 900;
    padding-top: 35px;
  }
  .ticket-icon-01 .ticket-icon {
    background-image: url(../assets/images/ticket-icon-01.svg);
    background-position: 50%;
  }
  .ticket-icon-02 .ticket-icon {
    background-image: url(../assets/images/ticket-icon-02.svg);
    background-position: 50%;
  }
  .ticket-icon-03 .ticket-icon {
    background-image: url(../assets/images/ticket-icon-03.svg);
    background-position: 50%;
  }
  .ticket-icon-04 .ticket-icon {
    background-image: url(../assets/images/ticket-icon-04.svg);
    background-position: 50%;
  }
  .ticket-view.label-sold .ticket-content,
  .ticket-view.label-close .ticket-content {
    cursor: default;
  }
  .choise-ticket-wrapper .ticket-icon-01.active:not(.label-sold):not(.label-close) .ticket-icon,
  .choise-ticket-wrapper .ticket-icon-01.active:not(.label-sold):not(.label-close):hover .ticket-icon,
  .choise-ticket-wrapper .ticket-icon-01:not(.label-sold):not(.label-close):hover .ticket-icon {
    background-image: url(../assets/images/ticket-icon-01-active.svg);
  }  
  .choise-ticket-wrapper .ticket-icon-02.active:not(.label-sold):not(.label-close) .ticket-icon,
  .choise-ticket-wrapper .ticket-icon-02.active:not(.label-sold):not(.label-close):hover .ticket-icon,
  .choise-ticket-wrapper .ticket-icon-02:not(.label-sold):not(.label-close):hover .ticket-icon {
    background-image: url(../assets/images/ticket-icon-02-active.svg);
  }
  .choise-ticket-wrapper .ticket-icon-03.active:not(.label-sold):not(.label-close) .ticket-icon,
  .choise-ticket-wrapper .ticket-icon-03.active:not(.label-sold):not(.label-close):hover .ticket-icon,
  .choise-ticket-wrapper .ticket-icon-03:not(.label-sold):not(.label-close):hover .ticket-icon {
    background-image: url(../assets/images/ticket-icon-03-active.svg);
  }
  .choise-ticket-wrapper .ticket-icon-04.active:not(.label-sold):not(.label-close) .ticket-icon,
  .choise-ticket-wrapper .ticket-icon-04.active:not(.label-sold):not(.label-close):hover .ticket-icon,
  .choise-ticket-wrapper .ticket-icon-04:not(.label-sold):not(.label-close):hover .ticket-icon {
    background-image: url(../assets/images/ticket-icon-04-active.svg);
  }
  .booking-form-wrapper .ticket-view.label-best {
    background-position: right bottom;
    background-size: 86px;
    background-image: url(../assets/images/label-best.svg);
    background-repeat: no-repeat;
  }

  .booking-form-wrapper .ticket-view.label-sold {
    background-position: right bottom;
    background-size: 90px;
    background-image: url(../assets/images/label-sold.svg);
    background-repeat: no-repeat;
  }

  .booking-form-wrapper .ticket-view.label-close {
    background-position: right bottom;
    background-size: 90px;
    background-image: url(../assets/images/label-close.svg);
    background-repeat: no-repeat;
  }

  .booking-form-wrapper .ticket-view .left-decor:before {
    background-image: url(../assets/images/left-corner-bg.png);
    background-repeat: no-repeat;
    background-position: 100% 0;
    height: 30px;
    width: 30px;
    left: -15px;
  }

  .booking-form-wrapper .ticket-view .right-decor:before {
    background-image: url(../assets/images/right-corner-bg.png);
    background-repeat: no-repeat;
    background-position: 0 0;
    height: 30px;
    width: 30px;
    right: -17px;
  }  
  .smart .booking-form-wrapper .ticket-view.label-sold,
  .smart .booking-form-wrapper .ticket-view.label-close {
    background-size: 150px;
  }
</style>
