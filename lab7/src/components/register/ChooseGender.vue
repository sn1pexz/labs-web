<script setup>
import { inject, ref, watch } from 'vue'

const formData = inject('formData')
const gender = ref(formData.gender || 'male')

watch(gender, (val) => {
  formData.gender = val
})

watch(
  () => formData.gender,
  (val) => {
    gender.value = val || 'male'
  }
)
</script>

<template>
  <div class="block genders">
    <label>Обрати стать:</label><br />
    <input type="radio" id="male" name="gender" value="male" v-model="gender" />
    <label for="male">Чоловіча</label>

    <input
      type="radio"
      id="female"
      name="gender"
      value="female"
      v-model="gender"
    />
    <label for="female">Жіноча</label>

    <input
      type="radio"
      id="other"
      name="gender"
      value="other"
      v-model="gender"
    />
    <label for="other">Інша</label>
  </div>
</template>
