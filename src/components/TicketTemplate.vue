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
            }
        }
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
            !isSmartMode? (ticket.activeByDefault? 'active' : '') : '',
            isWaterParkClosed? 'label-close': (ticket.count === 0 ? 'label-sold' : '')
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
