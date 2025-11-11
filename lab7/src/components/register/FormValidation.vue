<script setup>
/* eslint-disable no-undef */
import IMask from 'imask'
import { ref, onMounted, inject, watch } from 'vue'
const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, required: true },
  placeholder: { type: String, required: true },
  required: { type: Boolean, required: false },
  validate: { type: Function, required: false },
})

const formData = inject('formData')
const value = ref('')
const errorMessage = ref('')
const inputRef = ref(null)
let mask = null

watch(value, (newVal) => {
  if (formData && props.id) {
    formData[props.id] = newVal
  }
})

watch(
  () => formData[props.id],
  (newVal) => {
    if (newVal === '') value.value = ''
  }
)

onMounted(() => {
  if (props.id === 'phone' && inputRef.value) {
    mask = IMask(inputRef.value, {
      mask: '+{38}(\\000) 000-00-00',
    })
    mask.on('accept', () => {
      value.value = mask.value
      validatePhone()
    })
  }
})
function handleInput() {
  if (props.validate) {
    const error = props.validate(value.value)
    errorMessage.value = error || ''
  }
}

function validatePhone() {
  if (!mask) return
  const unmasked = mask.unmaskedValue + 1
  if (!unmasked || unmasked.length < 12) {
    errorMessage.value = 'Ви не вказали номер телефону'
  } else {
    errorMessage.value = ''
  }
}
</script>
<template>
  <div class="block">
    <label :for="id" class="form-label">{{ label }}</label>
    <input
      :type="type"
      class="form-control"
      :id="id"
      ref="inputRef"
      v-model="value"
      :placeholder="placeholder"
      @input="handleInput"
      :required="required"
    />
    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
  </div>
</template>
