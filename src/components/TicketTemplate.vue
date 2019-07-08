<script>
    import { eventEmitter } from '../main'
    
    export default {
        props: [
            'ticket',
            'isWaterParkClosed',
            'ticketType',
            'ticketTypeRef',
            'isSmartMode',
        ],

        methods: {
            handleClickTicketType: function (e) {
                var newTicketTypeRef = e.target.closest('.ticket-view').dataset.ref;
                // известим родительский компонент о том, что тип билета перевыбран
                eventEmitter.$emit('ticketTypeChanged', newTicketTypeRef);
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
                }
                return res;
            }
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
        @click="this.handleClickTicketType"
        v-if="this.needDisplayInSmartMode(ticket, isSmartMode, ticketTypeRef)"
    >
        <div class="left-decor"></div>
        <slot name="ticketContent"></slot>
        <div class="right-decor"></div>
    </div>
</template>

<style>
    .ticket-icon-01 .ticket-icon .deg-value {
        font-size: 48px;
        padding-left: 40px;
        line-height: 93px;
        color: #808080;
        font-family: "Arial Black", Arial;
        font-weight: 900;
        padding-top: 35px;
    }
</style>
