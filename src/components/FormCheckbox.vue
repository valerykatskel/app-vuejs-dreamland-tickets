<script>
import { eventEmitter } from '../main';

export default {
  props: {
    label: {
      type: String
    },

    model: {
      type: String
    },

    required: {
      type: Boolean
    },

    id: {
      type: String
    },

    name: {
      type: String
    },

    disabled: {
      type: Boolean
    },
  },

  data: function() {
    return {
    };
  },

  methods: {
    handleCheckboxEvent (model) {
      // Метод обработчик изменения чекбокса. В методе генерируется событие, которое слушает родительский компонент
      eventEmitter.$emit('updateCheckboxModel', model);
    },
  },

  computed: {
    showLabel () {
      // Вычисляемое свойство возвращает true, если текст лейбла передан в пропсах и его нужно отобразить
      return this.label !== undefined && !!this.label.length > 0;
    },
  },
};
</script>

<template>
  <label 
    class="app-checkbox-custom"
    :class="{'disabled': this.disabled}"
  >
    <input
      class="checkbox"
      type="checkbox"
      :name="this.name"
      :id="this.id"
      :required="this.required"
      :disabled="this.disabled"
      @change="handleCheckboxEvent(model)"
    />
    <span class="checkbox-custom"></span>
    <span 
      v-if="showLabel"
      class="label"
    >{{label}}</span>
  </label>
</template>

<style scoped>
  .app-checkbox-custom {
    display: inline-block;
    cursor: pointer;
    outline: 0 none;
    box-shadow: none;
  }
  .app-checkbox-custom.disabled {
    opacity: 0.5;
  }
  .app-checkbox-custom .checkbox-custom, 
  .app-checkbox-custom .label {
    display: initial;
    vertical-align: middle;
    margin-right: 10px;
  }
  .app-checkbox-custom .checkbox {
    display: none;
  }
  .app-checkbox-custom .checkbox-custom {
    border: 1px solid rgb(204, 204, 204);
    display: inline-block;
    vertical-align: middle;
    position: relative;
    width: 20px;
    height: 20px;
    background: #fff;
  }
  .app-checkbox-custom:hover:not(.disabled) .checkbox-custom::before,
  .app-checkbox-custom .checkbox:checked+.checkbox-custom:before {
    content: "";
    display: block;
    position: absolute;
    width: 29px;
    height: 22px;
    bottom: 0px;
    left: 0px;
    background-size: 100% auto;
    opacity: 0.15;
  }
  .app-checkbox-custom .checkbox:checked+.checkbox-custom:before {
    opacity: 1;
  }
  /* custom checkbox icon :hover */
  .app-checkbox-custom:hover .checkbox-custom:before,
  .app-checkbox-custom .checkbox:checked+.checkbox-custom:before {
    background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAWCAYAAAA8VJfMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAQNGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdE1mcz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL01hbmlmZXN0SXRlbSMiIHhtbG5zOmlsbHVzdHJhdG9yPSJodHRwOi8vbnMuYWRvYmUuY29tL2lsbHVzdHJhdG9yLzEuMC8iIHhtbG5zOnBkZj0iaHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyIgeG1sbnM6cGRmeD0iaHR0cDovL25zLmFkb2JlLmNvbS9wZGZ4LzEuMy8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA0LTEyVDE5OjA5OjM1KzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wNC0xMlQxOToxMDoyNyswMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wNC0xMlQxOToxMDoyNyswMzowMCIgeG1wTU06UmVuZGl0aW9uQ2xhc3M9InByb29mOnBkZiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjY1RTYzOTA2ODZDRjExREJBNkUyRDg4N0NFQUNCNDA3IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YmZmZGExNmItZGE3My02NzQ0LWE0NjctNTAzYmUyYWU3MDA2IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMxZTFmOGJjLWExNDctNDE3MC1iMGM3LTI0NGFhZDRiOTdiYyIgaWxsdXN0cmF0b3I6U3RhcnR1cFByb2ZpbGU9IldlYiIgcGRmOlByb2R1Y2VyPSJBZG9iZSBQREYgbGlicmFyeSAxNS4wMCIgcGRmeDpDcmVhdG9yVmVyc2lvbj0iMjEuMC4wIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjcyMDAwMC8xMDAwMCIgdGlmZjpZUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIiB0aWZmOlJlc29sdXRpb25Vbml0PSIyIiBleGlmOkNvbG9yU3BhY2U9IjEiIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIyOSIgZXhpZjpQaXhlbFlEaW1lbnNpb249IjIyIj4gPGRjOnRpdGxlPiA8cmRmOkFsdD4gPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5XZWI8L3JkZjpsaT4gPC9yZGY6QWx0PiA8L2RjOnRpdGxlPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyZjNkYmMwZC04OTM3LTRjYmItOTQ2NC04NGQ1N2UzYjcwZTciIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowNjRjNTk2Yy03ZWEyLTExN2ItYWNmYS1kNDZiN2RmMTA2MGIiIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0idXVpZDo2NUU2MzkwNjg2Q0YxMURCQTZFMkQ4ODdDRUFDQjQwNyIgc3RSZWY6cmVuZGl0aW9uQ2xhc3M9InByb29mOnBkZiIvPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5OWNkYzFmMi0wOGU5LTQwZDEtODM2NS0zN2Q2ZmJlNjQwNWIiIHN0RXZ0OndoZW49IjIwMTgtMDQtMTFUMjE6MzQ6MzYrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIElsbHVzdHJhdG9yIENDIDIyLjAgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjJiMWU5ZWJlLTFmNWQtNDM5ZC1iZjg0LTUxM2NkZmFjZDY4NyIgc3RFdnQ6d2hlbj0iMjAxOC0wNC0xMlQxOTowOTozNSswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgSWxsdXN0cmF0b3IgQ0MgMjIuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3gtcGhvdG9zaG9wIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmU1NDE3OWUzLTMyMmUtNDMzMy1hZjk4LTQwYTY5MjhhMjRhOCIgc3RFdnQ6d2hlbj0iMjAxOC0wNC0xMlQxOTowOTo0MSswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgSWxsdXN0cmF0b3IgQ0MgMjIuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3gtcGhvdG9zaG9wIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM0NmQ4NDI4LTM3MTMtNGJlNy1hMzc5LWVjZjU5ZmEwN2U4MiIgc3RFdnQ6d2hlbj0iMjAxOC0wNC0xMlQxOTowOTo0MSswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgSWxsdXN0cmF0b3IgQ0MgMjIuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MmYzZGJjMGQtODkzNy00Y2JiLTk0NjQtODRkNTdlM2I3MGU3IiBzdEV2dDp3aGVuPSIyMDE4LTA0LTEyVDE5OjEwOjI3KzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjMxZTFmOGJjLWExNDctNDE3MC1iMGM3LTI0NGFhZDRiOTdiYyIgc3RFdnQ6d2hlbj0iMjAxOC0wNC0xMlQxOToxMDoyNyswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8eG1wTU06TWFuaWZlc3Q+IDxyZGY6U2VxPiA8cmRmOmxpPiA8cmRmOkRlc2NyaXB0aW9uIHN0TWZzOmxpbmtGb3JtPSJFbWJlZEJ5UmVmZXJlbmNlIj4gPHN0TWZzOnJlZmVyZW5jZSBzdFJlZjpmaWxlUGF0aD0iL1ZvbHVtZXMvV09SSy9Ecm9wYm94L9Ch0LrRgNC40L3RiNC+0YLRiy/QodC60YDQuNC90YjQvtGCIDIwMTgtMDQtMTIgMTYuMTYuNTAucG5nIiBzdFJlZjpkb2N1bWVudElEPSIwIiBzdFJlZjppbnN0YW5jZUlEPSIwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpsaT4gPC9yZGY6U2VxPiA8L3htcE1NOk1hbmlmZXN0PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PggZCNoAAACuSURBVEiJvdPRDcMgDEXRS+fJPh2GATJhlsgQdX9CRRJIbQwg+Qd4HAkMIsLIAhYgnuYmgDsgwDocvYCSwzPBVHE2uAPLdPB2vUBMC6PAEwqspQ29wR+agdWNvcAjQ7QEvGBCW4NNufx6bW/iAK+NpGt3J1j6Mv8OfHvBG6qAa2X6Zi1d6QKrqAE2g49or6Yxow9wM6hCC7ALVKMZvHlBESEcB6pGCOElIh91oDK+WDAs159U6uUAAAAASUVORK5CYII=') center no-repeat;
  }
  /* custom checkbox end */
</style>