<script setup>
import { reactive, provide } from 'vue'
import { inputs } from './arrInputs.js'
import ChooseGender from './ChooseGender.vue'
import FormValidation from './FormValidation.vue'
import TableUsers from './TableUsers.vue'
const formData = reactive({
  surname: '',
  name: '',
  email: '',
  phone: '',
  birthDate: '',
  gender: 'male',
})

provide('formData', formData)
</script>

<template>
  <div class="register">
    <div class="card-register">
      <div class="welcome">
        <img src="../icons/logo.svg" alt="logo" class="logo" />
        <h1>Ласкаво просимо</h1>
      </div>

      <p>Створіть обліковий запис, щоб насолодитися ароматною кавою ☕</p>

      <form class="auth-form">
        <FormValidation
          v-for="input in inputs"
          :key="input.id"
          v-bind="input"
        />
        <ChooseGender />
      </form>
    </div>

    <TableUsers />
  </div>
</template>
