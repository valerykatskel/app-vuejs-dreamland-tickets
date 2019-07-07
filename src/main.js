import Vue from 'vue'
import App from './App.vue'

// add element.closest() polyfill
(function (ELEMENT) {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
  ELEMENT.closest = ELEMENT.closest || function closest(selector) {
    if (!this) return null;
    if (this.matches(selector)) return this;
    if (!this.parentElement) { return null }
    else return this.parentElement.closest(selector)
  };
}(Element.prototype));

export const eventEmitter = new Vue()

new Vue({
  el: '#app',
  render: h => h(App)
})
