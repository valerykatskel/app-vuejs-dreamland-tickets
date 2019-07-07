<script>
    import TicketTemplate from './TicketTemplate.vue'
    export default {
		props: [
			'tickets',
			'isWaterParkClosed',
			'ticketType',
			'ticketTypeRef',
            'isSmartMode',
            'getRangeDate',
            'formatDate'
		],
		methods: {
			getTicketPrice: function (ticket) {
				var res = '';
				if (ticket.refName === 'ticketType03') {
					// для типа билетов "Весь день" будем выводить минимальную цену в формате "от n руб." поскольку для этого типа билетов разные цены для обычного дня и рабочего
					res = 'от ' + Math.min(ticket.priceAdult, ticket.priceAdultWeekday) + ' руб.';
				} else {
					res = ticket.priceAdult + ' руб.';
				}
				return res;
            },

            getTicketDescription (description) {
                const placeholder = /{date}/gi
				const today = this.formatDate(new Date())
				return description.replace(placeholder, today)
			}
        },
        
        components: {
            ticketTemplate: TicketTemplate
        }
    }
</script>

<template>
    <div class="b-choise-ticket">
        <template v-for="ticket in tickets">
            <ticket-template 
                :key="ticket.refName"
                :ticket="ticket" 
                :ref="ticket.refName"
                :isWaterParkClosed="isWaterParkClosed"
                :ticketType="ticketType"
                :ticketTypeRef="ticketTypeRef"
                :isSmartMode="isSmartMode"
            >
                <label slot="ticketContent" class="ticket-content" :for="ticket.refName">
                    <div class="ticket-title">{{ticket.title}}</div>
                    <div class="ticket-icon"><template v-if="ticket.degValue"><span class="deg-value">+{{ticket.degValue}}°</span></template></div>
                    <div class="ticket-description" v-html="getTicketDescription(ticket.description)"></div> 
                    <div class="ticket-price">{{getTicketPrice(ticket)}}</div>  
                </label>
            </ticket-template>
        </template>
    </div>
</template>