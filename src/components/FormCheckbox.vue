<script>
import { eventEmitter } from "../main";

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

    class: {
      type: String
    }
  },

  data: function() {
    return {
    };
  },

  methods: {
    handleCheckboxEvent (model) {
      // известим родительский компонент о том, что мы нужно обновить родительскую модель
      eventEmitter.$emit("updateCheckboxModel", model);
    }
  },

  computed: {
    showLabel () {
      return this.label !== undefined && !!this.label.length > 0;
    }
  },
};
</script>

<template>
  <label 
    class="app-checkbox-custom"
    :class="this.class"
    >
    <input
      class="checkbox"
      type="checkbox"
      :name="this.name"
      :id="this.id"
      :required="this.required"
      @change="handleCheckboxEvent(model)"
    />
    <span class="checkbox-custom"></span>
    <span 
      v-if="showLabel"
      class="label"
    >{{label}}</span>
  </label>
</template>

<style>
  .app-checkbox-custom {
    display: inline-block;
    cursor: pointer;
    outline: 0 none;
    box-shadow: none;
    height: 50px;
  }
  .app-checkbox-custom .checkbox-custom, 
  .app-checkbox-custom .label {
    display: inline-block;
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
  .app-checkbox-custom:hover .checkbox-custom::before,
  .app-checkbox-custom:hover .checkbox-custom::before {
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
</style>