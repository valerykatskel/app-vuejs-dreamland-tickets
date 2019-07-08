<script>
	import TicketsForm from './components/TicketsForm.vue';
	import { eventEmitter } from './main';

	// объект настроек для отображения каждого типа билета
	const ticketsData = {
		tickets: [
			{
				refName: 'ticketType01',                                // реф для связи с нужным radio button, для безджаваскриптового переключчения "табов" с помощью css
				count: 1,                                               // если количество доступных билетов равно нулю, то появляется "растяжка" Продано http://joxi.ru/Vm6VZxKT4EKn8m  
				priceAdult: 21,                                         // стоимость взрослого билета
				priceChild: 13,                                         // стоимость детского билета
				classList: 'ticket-icon-01 label-best',                 // класс иконки (тип "Динамическая цена") для css + "растяжка" Лучшая цена, которая всегда показывается для типа Динамическая цена
				title: 'Динамическая цена',                             // название типа билета
				degValue: 21,                                           // значение в градусах для типа "Динамическая цена"
				description: '<span>Билет&nbsp;действителен</span> весь&nbsp;день&nbsp;<strong>{date}</strong> в&nbsp;день&nbsp;покупки&nbsp;билета', // плейсхолден {date} при рендеринге будет заменен на текущую дату
				activeByDefault: false,																	// указываем, какой тип билета активне (выбран) при загрузке страницы	
				ticketValidDuration: 1,																	// указываем, сколько дней действителен билет, если только сегодня, то указываем 1	
			},

			{
				refName: 'ticketType04',                                // реф для связи с нужным radio button, для безджаваскриптового переключчения "табов" с помощью css
				count: 1,                                               // если количество доступных билетов равно нулю, то появляется "растяжка" Продано http://joxi.ru/Vm6VZxKT4EKn8m  
				priceAdult: 60,                                         // стоимость взрослого билета
				priceChild: 0,                                          // стоимость детского билета для типа билетов VIP отстутствует со слов Вовы
				classList: 'ticket-icon-04',                            // класс иконки (тип "Пол дня") для css
				title: 'VIP',	                                        	// название типа билета
				degValue: 0,                                            // для типов, отличных от "Динамическая цена", значение градусов равно нулю
				description: 'Выбор даты. Доставка билетов, Вип парковка. Место в Вип зоне. Приветственный коктейль. Катание на горках без очереди!',
				activeByDefault: true,																	// указываем, какой тип билета активне (выбран) при загрузке страницы	
				ticketValidDuration: 1,																	// указываем, сколько дней действителен билет, если только сегодня, то указываем 1	
			},

			{
				refName: 'ticketType02',                                // реф для связи с нужным radio button, для безджаваскриптового переключчения "табов" с помощью css
				count: 1,                                               // если количество доступных билетов равно нулю, то появляется "растяжка" Продано http://joxi.ru/Vm6VZxKT4EKn8m  
				priceAdult: 18,                                         // стоимость взрослого билета
				priceChild: 9,                                          // стоимость детского билета
				classList: 'ticket-icon-02',                            // класс иконки (тип "Пол дня") для css
				title: 'Пол дня',                                       // название типа билета
				degValue: 0,                                            // для типов, отличных от "Динамическая цена", значение градусов равно нулю
				description: '<span>Билет&nbsp;действителен</span> после <strong>16:00</strong> в&nbsp;день&nbsp;покупки&nbsp;билета',
				activeByDefault: false,																	// указываем, какой тип билета активне (выбран) при загрузке страницы	
				ticketValidDuration: 1,																	// указываем, сколько дней действителен билет, если только сегодня, то указываем 1
			},

			{
				refName: 'ticketType03',                                // реф для связи с нужным radio button, для безджаваскриптового переключчения "табов" с помощью css
				count: 1,                                               // если количество доступных билетов равно нулю, то появляется "растяжка" Продано http://joxi.ru/Vm6VZxKT4EKn8m 
				priceAdult: 25,                                         // стоимость взрослого билета в ЛЮБОЙ день
				priceChild: 14,                                         // стоимость детского билета в ЛЮБОЙ день
				priceAdultWeekday: 30,                                  // стоимость взрослого билета в БУДНИЙ день
				priceChildWeekday: 16,                                  // стоимость детского билета в БУДНИЙ день
				classList: 'ticket-icon-03',                            // класс иконки (тип "Весь день") для css
				title: 'Весь день',                                     // название типа билета
				degValue: 0,                                            // для типов, отличных от "Динамическая цена", значение градусов равно нулю
				description: '<span>Билет&nbsp;действителен</span> <strong>3&nbsp;дня</strong> с&nbsp;момента&nbsp;покупки',
				activeByDefault: false,																	// указываем, какой тип билета активне (выбран) при загрузке страницы	
				ticketValidDuration: 3,																	// указываем, сколько дней действителен билет, если только сегодня, то указываем 1	
			},
		]
  };
  
  // объект данных приложения
  const appData = {
		countAdult: 0,                              // кол-во взрослых билетов в любой день
		countAdultWeekday: 0,                       // кол-во взрослых билетов в БУДНИЙ день
		countChild: 0,                              // кол-во детских билетов в любой день
		countChildWeekday: 0,                       // кол-во детских билетов в БУДНИЙ день
		priceAdult: 0,                              // цена взрослого билета в любой день для типа билетов "Весь день" и цена взрослого билета для остальных типов билетов
		priceChild: 0,                              // цена детского билета в любой день для типа билетов "Весь день" и цена детского билета для остальных типов билетов
		priceAdultWeekday: 0,                       // цена взрослого билета в будний день для типа билетов "Весь день"
		priceChildWeekday: 0,                       // цена детского билета в будний для типа билетов "Весь день"
		ticketType: null,                           // текстовое название типа билета
		ticketTypeRef: null,                        // id типа билета
		validText: '',															// текст, в котором описываеются условия, при которых билет действителен
		email: '',																	// храним адрес электронной почты покупателя билета в форме покупки
		userName: '',																// храним имя покупателя билета в форме покупки
		phone: '',																	// храним номер телефона покупателя билета в форме покупки
		agree: '',																	// храним значение чекбокса "Согласен" в форме покупки
    isWaterParkClosed: false,										// признак того, что аквапарк закрыт сегодня
    iconClear: './dist/assets/images/icon-clear.svg',
		iconQuestion: './dist/assets/images/icon-question.svg',
		supportPhone: '+375 (29) 000-00-00',
		ticketDateStart: new Date(),								// дата покупки билета,
		labelAnyDay: 'Любой день',
		labelWeekday: 'Будний день',			
		deliveryOption: false,											// Возможна ли доставка выбранного типа билета? Доступно лишь для билетов типа VIP, для остальных этот параметр будет всегда false
		deliveryOptionPrice: 10, 										// Цена за доставку билетов
	};

  export default {
		name: 'app',
		
    components: {
			ticketsForm: TicketsForm,
    },

    data: function() {
			return {...appData, ...ticketsData};
    },
    
		created: function() {
    	eventEmitter.$on('ticketTypeChanged', ticketRef => {
				// прослушиваем событие, которое инициализирует клик по типу билета
				this.getActiveTicketInformation(ticketRef);
				this.clearAllPrices();
			})
      
      eventEmitter.$on('buttonClickedGoBack', () => {
				// Слушатель события клика по кнопке "К выбору билета"
				this.clearAllPrices();
				this.ticketTypeRef = null;
				this.ticketType = null; 
				this.clearAllActiveClasses();
			})

    	eventEmitter.$on('changeAdult', count => {
				// Слушатель события, которое поднимается от потомка и после наступления которого нужно изменить значение количества взрослых билетов
				console.log(`change countAdult from child`);
				this.countAdult = count;
				this.setLabelTextForAnyDay();
			})

    	eventEmitter.$on('changeAdultWeekday', count => {
				// Слушатель события, которое поднимается от потомка и после наступления которого нужно изменить значение количества взрослых билетов в будний день
				console.log(`change countAdultWeekday from child`);
				this.countAdultWeekday = count;
				this.setLabelTextForWeekday();
			})

      eventEmitter.$on('changeChild', count => {
				// Слушатель события, которое поднимается от потомка и после наступления которого нужно изменить значение количества детских билетов
				console.log(`change countChild from child`);
				this.countChild = count;
				this.setLabelTextForAnyDay();
			})

      eventEmitter.$on('changeChildWeekday', count => {
				// Слушатель события, которое поднимается от потомка и после наступления которого нужно изменить значение количества детских билетов в будний день
				console.log(`change countChildWeekday from child`);
				this.countChildWeekday = count;
				this.setLabelTextForWeekday();
			})

      eventEmitter.$on('checkboxDeliveryOptionChange', data => {
				// Слушатель события клика по чекбоксу "Доставка (10 руб.)"
				this.deliveryOption = data.target.checked;
			})
    },
    
		mounted: function() {
			this.$nextTick(function () {
				if (this.runInIframe) {
					// подстраивать высоту контента нужно лишь в том случае, если приложение запускается в iframe
					window.addEventListener('resize', this.ajustParentIframeHeight);
					this.ajustParentIframeHeight();
				}
				// smart mode определяется наличием класса smart в родительском элементе html (для случая, когда приложение запущено в iframe)
				if (!this.isSmartMode) this.getActiveTicketInformation();
			})
		},

		updated: function () {
			this.$nextTick(function () {
				// код, который будет запущен только после обновления всех вьюшек, т.е. после прорисовки DOM
				if (this.runInIframe) {
					this.ajustParentIframeHeight();
				}
			})
		},

		beforeDestroy: function () {
			// уберем за собой из-за ненадобности обработчик resize по правилам хорошего тона
			// делаем это лишь для случая, когда приложение запускается в iframe
			if (this.runInIframe) {
				window.removeEventListener('resize', this.ajustParentIframeHeight)
			}
		},
				
		methods: {
			clearAllActiveClasses () {
				this.tickets.map(ticket => {
					ticket.activeByDefault = false;
				})
			},

			handleChangeTicketType (e) {
				this.ticketType = e.target.value;
				this.ticketTypeRef = e.target.id;
				this.getActiveTicketInformation(e.target.id);
				this.clearAllPrices();
				if (this.runInIframe) {
					this.ajustParentIframeHeight();
				}
			},

			handleClickGoBack () {
				this.ticketType = null;
				$('.user-data-wrapper, .submit-wrapper').addClass('hidden');
				$('.booking-form').removeClass('goback');

				this.clearAllPrices();
			},

			clearAllPrices () {
				this.countAdult = 0;
				this.countAdultWeekday = 0;
				this.countChild = 0;
				this.countChildWeekday = 0;
				this.ticketDateStart = new Date();
			},

			ajustParentIframeHeight () {
				//TODO
				//debugger
				//parent.document.body.getElementById('booking-iframe').style.height = document.body.height();
			},

			getActiveTicketInformation (refName) {
				let activeTicket = null; 
				// дальше получим параметры инициализации активного билета
				// в зависимости от того, передан refName или нет, мы будем или брать активный по-умолчанию из настроек инициализации 
				// или активный, по которому кликнули
				
				if (typeof refName === 'undefined') {
					activeTicket = this.tickets.filter(function (ticket) {return ticket.activeByDefault})[0];
				} else {
					// если для выбранного типа билетов все билеты проданы или
					// если аквапарт закрыт в этот день, то ничего не переключаем и оставляем выбранным предыдущий тип билетов
					if (!!this.tickets.filter(ticket => { return ticket.refName === refName && ticket.count }).length && !this.isWaterParkClosed) {
						this.tickets.map(ticket => {
							// удалим класс active с текущего активного типа билета (со всех)
							// дополнительная проверка, если тип билета, на который кликнули в статусе Продано или Закрыто, 
							// то оставляем активным предыдущий тип билетов
							if (!!ticket.count && !this.isWaterParkClosed) {
								ticket.activeByDefault = false;
							}
							// устанавливаем класс active на тот, по которому кликнули, за исключением ситуаций,
							// когда Продано или Закрыто или когда мы в версии для смарт
							if (ticket.refName === refName) {
								if (!!ticket.count) {
									ticket.activeByDefault = true;
									activeTicket = ticket;
								}
							}
						});
					}
				};
		
				if (activeTicket !== null) {
					// передадим значения цен на билеты в зависимости от цен активного типа билетов
					this.priceAdult = activeTicket.priceAdult;
					this.priceChild = activeTicket.priceChild;

					// в зависимости от выбранного типа билета сформируем корректное описание срока действия билета и не только
					this.updateTicketValidText(activeTicket);

					// обновим название типа билета в зависимости от активного типа билета
					this.ticketType = activeTicket.title;
					this.ticketTypeRef = activeTicket.refName;
				}
			},

			updateTicketValidText (ticket) {
				// Метод обновляет значение для переменной, в которой хранится текст о сроке действия билета выбранного типа
				if (ticket.refName === 'ticketType01') {
					this.validText = `Весь день ${this.getRangeDate(ticket.ticketValidDuration)}`;
				}
				if (ticket.refName === 'ticketType02') {
					this.validText = `После 16:00  ${this.getRangeDate(ticket.ticketValidDuration)}`;
				}
				if (ticket.refName === 'ticketType03') {
					this.validText = this.getRangeDate(ticket.ticketValidDuration);
					// для типа билетов "Весь день" обновим цены билетов для варианта "Будний день"
					this.priceAdultWeekday = ticket.priceAdultWeekday;
					this.priceChildWeekday = ticket.priceChildWeekday;
				}
				if (ticket.refName === 'ticketType04') {
					this.validText = `Весь день ${this.getRangeDate(ticket.ticketValidDuration)}`;
				}
			},

			getRangeDate (daysRange) {
				const monthStart = this.getMonthNameById(this.ticketDateStart.getMonth());
				
				// если билет действителен только сегодня, то в параметре передается 0
				if (daysRange > 1) {
					const dateEnd = new Date();
					dateEnd.setDate(this.ticketDateStart.getDate() + daysRange - 1);
					const dateEndMonth = dateEnd.getMonth();
					const monthEnd = this.getMonthNameById(dateEnd.getMonth());

					if (this.ticketDateStart.getMonth() === dateEndMonth) {
						return `${this.ticketDateStart.getDate()}-${dateEnd.getDate()} ${monthStart}`;
					} else {
						return `${this.ticketDateStart.getDate()} ${monthStart} - ${dateEnd.getDate()} ${monthEnd}`;
					}
				} else {
					return this.formatDate(new Date());
				}
			},
			
			formatDate (date) {
				const monthId = date.getMonth();
				const monthStart = this.getMonthNameById(monthId);
				return `${date.getDate()} ${monthStart}`;
			},

			changeTicketStartDate (date) {
				this.ticketDateStart = date;
				this.validText = `Весь день ${this.formatDate(this.ticketDateStart)}`;
			},

			getMonthNameById (id) {
				const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
				return monthNames[id];
			},

			setLabelTextForAnyDay () {
				if (this.ticketTypeRef === 'ticketType03') this.validText = `<span>${this.labelAnyDay}</span>`;
			},

			setLabelTextForWeekday () {
				if (this.ticketTypeRef === 'ticketType03') this.validText = `<span>${this.labelWeekday}</span>`;
			},		
		},

		computed: {
			totalCount () {
				return parseInt(this.countAdult, 10) + parseInt(this.countChild, 10) + parseInt(this.countAdultWeekday, 10) + parseInt(this.countChildWeekday, 10);
			},
		
			showTicketTotalPrice () {
				let totalPrice = parseInt(this.priceAdult, 10) * this.countAdult
					+ parseInt(this.priceChild, 10) * this.countChild
					+ parseInt(this.priceAdultWeekday, 10) * this.countAdultWeekday
					+ parseInt(this.priceChildWeekday, 10) * this.countChildWeekday;

				// Для билетов типа VIP нужно в общую стоимость учесть также и стоимость доставки, если она выбрана
				if (this.ticketTypeRef === 'ticketType04' && this.deliveryOption) {
					totalPrice += this.deliveryOptionPrice;
				}
				
				return totalPrice;
			},
		
			isUserDataValid () {
				return !this.email || !this.userName || !this.phone || !this.agree;
			},
		
			countChildTotal () {
				return parseInt(this.countChild, 10) + parseInt(this.countChildWeekday, 10);
			},
		
			countAdultTotal () {
				return parseInt(this.countAdult, 10) + parseInt(this.countAdultWeekday, 10);
			},
		
			isSmartMode () {
				return parent.document.documentElement.classList.contains('smart');
			},
		
			runInIframe () {
				return window.location !== window.parent.location;
			},

			getCorrectTicketString () {
				var n = Math.abs(this.totalCount) % 100;
				var n1 = n % 10;
				var text_forms = 'билет,билета,билетов'.split(',');

				if (n > 10 && n < 20) {
					return text_forms[2];
				}

				if (n1 > 1 && n1 < 5) {
					return text_forms[1];
				}

				if (n1 == 1) {
					return text_forms[0];
				}

				return text_forms[2];
			},

			supportPhoneLink () {
				return 'tel:' + this.supportPhone.split(' ').join('');
			},

			showVipBlock () {
				// Вычисляемое свойство показывает, нужно ли показывать блок для типа билетов VIP
				return this.ticketTypeRef === 'ticketType04';
			},
		}
  }
</script>

<template>
  <div class="booking-form-wrapper">
    <form action class="booking-form" :class="ticketType !== null ? 'goback' : ''">
      <input type="hidden" id="ticketType" name="ticket-type" v-model="ticketType" />

      <tickets-form
        :tickets="tickets"
        :isWaterParkClosed="isWaterParkClosed"
        :ticketType="ticketType"
        :ticketTypeRef="ticketTypeRef"
        :isSmartMode="isSmartMode"
        :getRangeDate="getRangeDate"
        :countAdult="countAdult"
        :countAdultWeekday="countAdultWeekday"
        :countChild="countChild"
        :countChildWeekday="countChildWeekday"
        :changeTicketStartDate="changeTicketStartDate"
        :ticketDateStart="ticketDateStart"
        :formatDate="formatDate"
				:showVipBlock="showVipBlock"
				:deliveryOption="deliveryOption"
				:priceAdult="priceAdult"
				:priceAdultWeekday="priceAdultWeekday"
				:priceChild="priceChild"
				:priceChildWeekday="priceChildWeekday"
      ></tickets-form>

      <fieldset class="user-data-wrapper" :class="totalCount === 0 ? 'hidden' : ''">
        <table class="user-data">
          <tr>
            <th>
              <label for="email">
                Эл. почта
                <span class="red">*</span>
              </label>
            </th>
            <td>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="На указанный e-mail мы вышлем электронный билет"
                required
                v-model="email"
              />
              <p class="descr">На указанный e-mail мы вышлем электронный билет</p>
            </td>
          </tr>
          <tr>
            <th>
              <label for="name">Представьтесь</label>
            </th>
            <td>
              <input
                name="name"
                id="name"
                type="text"
                placeholder="Мы можем указать ваше имя на билете"
                v-model="userName"
              />
              <p class="descr">Мы можем указать ваше имя на билете</p>
            </td>
          </tr>
          <tr>
            <th>
              <label for="phone">
                Номер телефона
                <span class="red">*</span>
              </label>
            </th>
            <td>
              <input
                name="phone"
                id="phone"
                type="tel"
                required
                placeholder="+XXX (XX) XXX-XX-XX"
                pattern="(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*"
                v-model="phone"
              />
              <p class="descr">В формате +XXX (XX) XXX-XX-XX</p>
            </td>
          </tr>
          <tr>
            <th></th>
            <td>
              <p
                class="descr"
              >Ваши данные могут быть переданы организаторам для сообщения важной информации</p>
            </td>
          </tr>
          <tr>
            <th></th>
            <td>
              <label class="checkbox-agree">
                <input
                  class="checkbox"
                  type="checkbox"
                  name="checkbox-agree"
                  id="agree"
                  required
                  v-model="agree"
                />
                <span class="checkbox-custom"></span>
                <span class="label">Согласен</span>
              </label>
            </td>
          </tr>
        </table>
        <p>
          <span class="red">*</span> — обязательно для заполнения
        </p>
      </fieldset>

      <fieldset class="submit-wrapper" :class="totalCount === 0 ? 'hidden' : ''">
        <button
          type="reset"
          id="close-form"
          @click="clearAllPrices"
          :disabled="totalCount === 0"
          class="remove-item button button--with-icon"
        >
          <img src="iconClear" width="14" height="14" alt />Очистить форму
        </button>

        <p class="b-phone">
          <span>
            <img src="iconQuestion" alt width="20" height="20" />
          </span>
          <a :href="supportPhoneLink">{{supportPhone}}</a>
        </p>
        <div class="submit">
          <div class="ticket-total-info">
            <div class="tickets-count">
              <div class="row">
                <span class="title">Тип билета</span>
                <span class="tickets-count__type">
                  <strong>{{ ticketType }}</strong>
                </span>
              </div>
              <div class="row">
                <span class="title">{{ totalCount===1? 'Действителен' : 'Действительны'}}</span>
                <span class="tickets-count__valid">
                  <strong v-html="validText"></strong>
                </span>
              </div>
              <div class="row" v-if="!showVipBlock">
                <span class="title">Детских</span>
                <span class="tickets-count__child">
                  <strong>{{ countChildTotal }}</strong>
                </span>
              </div>
              <div class="row">
                <span class="title">Взрослых</span>
                <span class="tickets-count__adult">
                  <strong>{{ countAdultTotal }}</strong>
                </span>
              </div>
            </div>

            <div class="tickets-price">
              <div class="row">
                <span class="title">Всего:</span>
                <span id="tickets-count">{{ totalCount }}</span>
                {{ getCorrectTicketString }}
              </div>
              <div class="row">
                <span class="title">Итого:</span>
                <span id="tickets-price">{{ showTicketTotalPrice }}</span> руб.
              </div>
            </div>
          </div>
          <input type="submit" value="Оплатить" class="button" :disabled="isUserDataValid" />
        </div>
      </fieldset>
    </form>
  </div>
</template>

<style>
.ticket-icon-01 .ticket-icon {
  background-image: url(./assets/images/ticket-icon-01.svg);
  background-position: 50% 20px;
}
.ticket-icon-02 .ticket-icon {
  background-image: url(./assets/images/ticket-icon-02.svg);
  background-position: 50%;
}
.ticket-icon-03 .ticket-icon {
  background-image: url(./assets/images/ticket-icon-03.svg);
  background-position: 50%;
}
.ticket-icon-04 .ticket-icon {
  background-image: url(./assets/images/ticket-icon-04.svg);
  background-position: 50%;
}
.choise-ticket-wrapper
  .ticket-icon-01.active:not(.label-sold):not(.label-close)
  .ticket-icon,
.choise-ticket-wrapper
  .ticket-icon-01.active:not(.label-sold):not(.label-close):hover
  .ticket-icon,
.choise-ticket-wrapper
  .ticket-icon-01:not(.label-sold):not(.label-close):hover
  .ticket-icon {
  background-image: url(./assets/images/ticket-icon-01-active.svg);
}
.choise-ticket-wrapper
  .ticket-icon-02.active:not(.label-sold):not(.label-close)
  .ticket-icon,
.choise-ticket-wrapper
  .ticket-icon-02.active:not(.label-sold):not(.label-close):hover
  .ticket-icon,
.choise-ticket-wrapper
  .ticket-icon-02:not(.label-sold):not(.label-close):hover
  .ticket-icon {
  background-image: url(./assets/images/ticket-icon-02-active.svg);
}
.choise-ticket-wrapper
  .ticket-icon-03.active:not(.label-sold):not(.label-close)
  .ticket-icon,
.choise-ticket-wrapper
  .ticket-icon-03.active:not(.label-sold):not(.label-close):hover
  .ticket-icon,
.choise-ticket-wrapper
  .ticket-icon-03:not(.label-sold):not(.label-close):hover
  .ticket-icon {
  background-image: url(./assets/images/ticket-icon-03-active.svg);
}
.choise-ticket-wrapper
  .ticket-icon-04.active:not(.label-sold):not(.label-close)
  .ticket-icon,
.choise-ticket-wrapper
  .ticket-icon-04.active:not(.label-sold):not(.label-close):hover
  .ticket-icon,
.choise-ticket-wrapper
  .ticket-icon-04:not(.label-sold):not(.label-close):hover
  .ticket-icon {
  background-image: url(./assets/images/ticket-icon-04-active.svg);
}
.booking-form-wrapper .ticket-view.label-best {
  background-position: right bottom;
  background-size: 86px;
  background-image: url(./assets/images/label-best.svg);
  background-repeat: no-repeat;
}

.booking-form-wrapper .ticket-view.label-sold {
  background-position: right bottom;
  background-size: 90px;
  background-image: url(./assets/images/label-sold.svg);
  background-repeat: no-repeat;
}

.booking-form-wrapper .ticket-view.label-close {
  background-position: right bottom;
  background-size: 90px;
  background-image: url(./assets/images/label-close.svg);
  background-repeat: no-repeat;
}

.booking-form-wrapper .ticket-view .left-decor:before {
  background-image: url(./assets/images/left-corner-bg.png);
  background-repeat: no-repeat;
  background-position: 100% 0;
  height: 30px;
  width: 30px;
  left: -15px;
}

.booking-form-wrapper .ticket-view .right-decor:before {
  background-image: url(./assets/images/right-corner-bg.png);
  background-repeat: no-repeat;
  background-position: 0 0;
  height: 30px;
  width: 30px;
  right: -17px;
}
</style>

