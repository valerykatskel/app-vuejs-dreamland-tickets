<script>
	import TicketsForm from './components/TicketsForm.vue';
	import FormCheckbox from './components/FormCheckbox.vue';
	import { eventEmitter } from './main';
  
  export default {
		name: 'app',
		
    components: {
			ticketsForm: TicketsForm,
			formCheckbox: FormCheckbox,
    },

    data: function() {
			return {
        tickets: [],
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
        agree: false,																// храним значение чекбокса "Согласен" в форме покупки
        isWaterParkClosed: false,										// признак того, что аквапарк закрыт сегодня
        iconClear: require("./assets/images/icon-clear.svg"),
        iconQuestion: require("./assets/images/icon-question.svg"),
        supportPhone: '+375 (29) 000-00-00',
        ticketDateStart: new Date(),								// дата покупки билета,
        labelAnyDay: 'Любой день',
        labelWeekday: 'Будний день',			
				deliveryOption: false,											// Возможна ли доставка выбранного типа билета? Доступно лишь для билетов типа VIP, для остальных этот параметр будет всегда false
				deliveryOptionText: 'Доставка (10 руб.)',
        deliveryOptionPrice: 10, 										// Цена за доставку билетов
      };
    },

		created: function() {
      this.applyUserOptions();

			if (this.isSmartMode) {
				document.body.classList.add('smart')
			}
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
				this.countAdult = count;
				if (count === 0) {
					this.deliveryOption = false;
				}
				this.setLabelTextForAnyDay();
			})

    	eventEmitter.$on('changeAdultWeekday', count => {
				// Слушатель события, которое поднимается от потомка и после наступления которого нужно изменить значение количества взрослых билетов в будний день
				this.countAdultWeekday = count;
				this.setLabelTextForWeekday();
			})

      eventEmitter.$on('changeChild', count => {
				// Слушатель события, которое поднимается от потомка и после наступления которого нужно изменить значение количества детских билетов
				this.countChild = count;
				this.setLabelTextForAnyDay();
			})

      eventEmitter.$on('changeChildWeekday', count => {
				// Слушатель события, которое поднимается от потомка и после наступления которого нужно изменить значение количества детских билетов в будний день
				this.countChildWeekday = count;
				this.setLabelTextForWeekday();
			})

      eventEmitter.$on('changeTicketStartDate', date => {
				// Слушатель события выбора новой даты в datepicker
				this.ticketDateStart = date;
				this.validText = this.formatDate(this.ticketDateStart);
			}),

      eventEmitter.$on('updateCheckboxModel', model => {
				// Слушатель события клика по чекбоксу, который переключает значение для модели чекбокса
				this.toggleCheckboxModel(model);
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
				this.getActiveTicketInformation();
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

			isTicketsSold (ref) {
				return this.tickets.filter(ticket => {
					return ticket.refName === ref && ticket.count === 0
				}).length > 0;
			},

			clearAllPrices () {
				this.countAdult = 0;
				this.countAdultWeekday = 0;
				this.countChild = 0;
				this.countChildWeekday = 0;
				this.ticketDateStart = new Date();
			},

			ajustParentIframeHeight () {
        let appHeight = document.body.clientHeight;
				parent.document.getElementById('booking-iframe').setAttribute('style',`height:${appHeight}px`);
			},

			getActiveTicketInformation (refName) {
				let activeTicket = null; 
				const self = this;
				// дальше получим параметры инициализации активного билета
				// в зависимости от того, передан refName или нет, мы будем или брать активный по-умолчанию из настроек инициализации 
				// или активный, по которому кликнули
				
				if (typeof refName === 'undefined') {
					// Обработка ситуации выбора типа билета по-умолчанию, при заргузке. Для смарта ничего выделяться не должно
					if (!this.isSmartMode) {
						activeTicket = this.tickets.filter(function (ticket) {return ticket.activeByDefault})[0];
					}
				} else {
					// Если аквапарк закрыт и мы кликаем по билету Динамическая цена
					// или если мы кликаем по типу распроданых билетов, то ничего не делаем.
					if ((this.isWaterParkClosed && refName === 'ticketType01') || this.isTicketsSold(refName)) {
            return
          } else {
            this.tickets.map(ticket => {
              // удалим класс active с текущего активного типа билета (со всех)
              // дополнительная проверка, если тип билета, на который кликнули в статусе Продано или Закрыто, 
              // то оставляем активным предыдущий тип билетов
              ticket.activeByDefault = false;
              // устанавливаем класс active на тот, по которому кликнули, за исключением ситуаций,
              // когда Продано или Закрыто
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

			toggleCheckboxModel (model) {
				// Метод переключает значение модели, которая используется в качестве данных для чекбокса
				this[model] = !this[model];
			},

			updateTicketValidText (ticket) {
				// Метод обновляет значение для переменной, в которой хранится текст о сроке действия билета выбранного типа
				if (ticket.refName === 'ticketType01') {
					this.validText = `${this.getRangeDate(ticket.ticketValidDuration)}`;
				}
				if (ticket.refName === 'ticketType02') {
					this.validText = `После 16:00  ${this.getRangeDate(ticket.ticketValidDuration)}`;
				}
				if (ticket.refName === 'ticketType03') {
					this.validText = `${this.getRangeDate(ticket.ticketValidDuration)}`;
					// для типа билетов "Весь день" обновим цены билетов для варианта "Будний день"
					this.priceAdultWeekday = ticket.priceAdultWeekday;
					this.priceChildWeekday = ticket.priceChildWeekday;
				}
				if (ticket.refName === 'ticketType04') {
					this.validText = `${this.getRangeDate(ticket.ticketValidDuration)}`;
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
				const yearStart = date.getFullYear();
				return `${date.getDate()} ${monthStart} ${yearStart}г.`;
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
      
      applyUserOptions () {
        // Метод копирует значения, которые переданы прямо в html при рендеринге, если такие есть.
        if(!!Object.keys(initialTicketsData).length) {
          Object.keys(initialTicketsData).map(el => {
            this[el] = initialTicketsData[el];
          })
        }
      }
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

			deliveryPrice () {
				if (this.deliveryOption) {
					return `${this.deliveryOptionPrice} руб.`; 
				} else {
					return `без доставки`;
				}
				
			},
		}
  }
</script>

<template>
  <div class="booking-form-wrapper">
    <form action class="booking-form" :class="ticketType !== null ? 'goback' : ''">
      <input type="hidden" id="ticketType" name="ticket-type" v-model="ticketType" />
      <input type="hidden" id="countAdult" name="count-adult" v-model="countAdult" />
      <input type="hidden" id="countAdultWeekday" name="count-adult-weekday" v-model="countAdultWeekday" />
      <input type="hidden" id="countChild" name="count-child" v-model="countChild" />
      <input type="hidden" id="countChildWeekday" name="count-child-weekday" v-model="countChildWeekday" />
      <input type="hidden" id="ticketDateStart" name="ticket-date-start" v-model="ticketDateStart" />
      <input type="hidden" id="deliveryOption" name="delivery-option" v-model="deliveryOption" />
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
        :ticketDateStart="ticketDateStart"
        :formatDate="formatDate"
				:showVipBlock="showVipBlock"
				:deliveryOption="deliveryOption"
				:deliveryOptionText="deliveryOptionText"
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
							<form-checkbox
								model="agree"
								:value="agree"
								:required="true"
								id="agree"
								name="agree"
								label="Согласен"
							></form-checkbox>
            </td>
          </tr>
        </table>
        <p>
          <span class="red">*</span> — обязательно для заполнения
        </p>
      </fieldset>

      <fieldset class="submit-wrapper" :class="totalCount === 0 ? 'hidden' : ''">
        <p class="b-phone">
          <span>
            <img :src="iconQuestion" alt width="20" height="20" />
          </span>
          <a :href="supportPhoneLink">{{supportPhone}}</a>
        </p>
				<div class="tickets-count">
					<div class="row">
						<span class="title">Тип билета</span>
						<span class="tickets-count__type">
							<strong>{{ticketType}}</strong>
						</span>
					</div>
					<div class="row">
						<span class="title">{{totalCount===1? 'Действителен' : 'Действительны'}}</span>
						<span class="tickets-count__valid">
							<strong v-html="validText"></strong>
						</span>
					</div>
					<div class="row" v-if="!showVipBlock">
						<span class="title">Детских</span>
						<span class="tickets-count__child">
							<strong>{{countChildTotal}}</strong>
						</span>
					</div>
					<div class="row">
						<span class="title">Взрослых</span>
						<span class="tickets-count__adult">
							<strong>{{countAdultTotal}}</strong>
						</span>
					</div>
					<div class="row" v-if="showVipBlock">
						<span class="title">Доставка</span>
						<span class="tickets-count__valid">
							<strong>{{deliveryPrice}}</strong>
						</span>
					</div>
				</div>
        <div class="submit">
          <div class="ticket-total-info">
            <div class="tickets-price">
              <div class="row">
                <span class="title">Всего:</span>
                <span id="tickets-count">{{totalCount}}</span>
                {{getCorrectTicketString}}
              </div>
              <div class="row">
                <span class="title">Итого:</span>
                <span id="tickets-price">{{showTicketTotalPrice}}</span> руб.
              </div>
            </div>
          </div>
          <input type="submit" value="Купить" class="button" :disabled="isUserDataValid" />
					<span class="span-divider">Или</span>
					<button
						type="reset"
						id="close-form"
						@click="clearAllPrices"
						:disabled="totalCount === 0"
						class="remove-item button button--with-icon"
					>
						<img :src="iconClear" width="14" height="14" alt />Очистить форму
					</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

