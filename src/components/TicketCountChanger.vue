<script>
	import { eventEmitter } from '../main'
    
    export default {
		props: {
            lockUsualDay: {
                type: Boolean
            },
            countAdult: {
                type: Number
            },
            countAdultWeekday: {
                type: Number
            },
            countChild: {
                type: Number
            },
            countChildWeekday: {
                type: Number
            },
            kindOfTicket: {
                type: String,
                validator: function (value) {
                    // Значение должно соответствовать одной из этих строк
                    return ['adult', 'adultWeekday', 'child', 'childWeekday'].indexOf(value) !== -1
                }
            },
            ticketCount: {
                type: Number
            }
		},
		data: function () {
			return {
                iconMinus: require('../assets/images/icon-minus.svg'),
                iconPlus: require('../assets/images/icon-plus.svg')
			}
        },

        updated: function () {
            this.$nextTick(function () {
                this[this.kindOfTicket] = this.ticketCount
            })
        },
        
        created: function() {
            
        },

        watch: {
            ticketCount: function (value) {
                console.log('watching ticketCount')
                if (value < 0) this.ticketCount = 0
                
                if (this.kindOfTicket === 'adult') {
                    this.handleChangeTicketAdult(value)
                }
                
                if (this.kindOfTicket === 'child') {
                    this.handleChangeTicketChild(value)
                }
                
                if (this.kindOfTicket === 'adultWeekday') {
                    this.handleChangeTicketAdultWeekday(value)
                }
                
                if (this.kindOfTicket === 'childWeekday') {
                    this.handleChangeTicketChildWeekday(value)
                }
            },
        },

		methods: {
            handleChangeTicketAdult (count) {
                eventEmitter.$emit('ticketChangeAdult', count);
            },

            handleChangeTicketChild (count) {
                eventEmitter.$emit('ticketChangeChild', count);
            },

            handleChangeTicketAdultWeekday (count) {
                eventEmitter.$emit('ticketChangeAdultWeekday', count);
            },

            handleChangeTicketChildWeekday (count) {
                eventEmitter.$emit('ticketChangeChildWeekday', count);
            },


            handleClickAddTicketCount (count) {
                this.ticketCount = parseInt(this.ticketCount, 10) + 1
                //eventEmitter.$emit('ticketAddChild', type)
            },

            handleClickRemoveTicketCount (count) {
                this.ticketCount = parseInt(this.ticketCount, 10) - count
                //eventEmitter.$emit('ticketRemoveChild', type)
            },
		},
        computed: {
            getPriceForOneTicket () {
                let price = 0;
                return price
            }
        }
    }
</script>

<template>
    <div class="number-wrapper">
        <fieldset class="choise-number">
            <button 
                :disabled="this.lockUsualDay" 
                class="reduce" 
                @click="handleClickRemoveTicketCount(1)" 
                type="button"
            ><img :src="iconMinus" alt=""></button>
            <input 
                :disabled="this.lockUsualDay" 
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
            >
            <button 
                :disabled="this.lockUsualDay" 
                class="enhance"
                @click="handleClickAddTicketCount(1)" 
                type="button"
            ><img :src="iconPlus" alt=""></button>
        </fieldset>
        <p class="price-descr"><span class="price"><strong>{{ getPriceForOneTicket }}</strong> руб.</span></p>
    </div>
</template>