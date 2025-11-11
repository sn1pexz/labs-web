<script setup>
import { inputs } from './arrInputs.js'
import { inject, ref } from 'vue'

const formData = inject('formData')
const tableBody = ref(null)

function calculateAge(birthDate) {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate()))
    age--
  return age
}

function hasErrors() {
  for (const input of inputs) {
    const validator = input.validate
    if (validator) {
      const error = validator(formData[input.id])
      if (error) return true
    }
  }

  if (!formData.phone || formData.phone.length < 17) return true

  return false
}

function addToTable() {
  if (hasErrors()) {
    alert('Виправте помилки у формі перед додаванням!')
    return
  }

  const row = document.createElement('tr')
  row.innerHTML = `
    <td><input type="checkbox" class="row-check"></td>
    <td>${formData.surname} ${formData.name}</td>
    <td>${formData.phone}</td>
    <td>${formData.email}</td>
    <td>${calculateAge(formData.birthDate)}</td>
    <td>${formData.gender}</td>
  `
  tableBody.value.appendChild(row)

  for (const key in formData) {
    formData[key] = key === 'gender' ? 'male' : ''
  }
}

function deleteSelected() {
  const checkboxes = tableBody.value.querySelectorAll('.row-check')
  checkboxes.forEach((cb) => {
    if (cb.checked) cb.closest('tr').remove()
  })
}

function duplicateSelected() {
  const checkboxes = tableBody.value.querySelectorAll('.row-check')
  checkboxes.forEach((cb) => {
    if (cb.checked) {
      const row = cb.closest('tr')
      const clone = row.cloneNode(true)
      clone.querySelector('.row-check').checked = false
      tableBody.value.appendChild(clone)
    }
  })
}
</script>

<template>
  <div>
    <div class="blockBtn">
      <button type="button" class="btn btn-dark" @click="addToTable">
        Створити
      </button>
    </div>
    <button type="button" class="delAnddub" @click="deleteSelected">
      Видалити відмічені
    </button>
    <button type="button" class="delAnddub" @click="duplicateSelected">
      Дублювати відмічені
    </button>
  </div>

  <table id="usersTable">
    <thead>
      <tr>
        <th></th>
        <th>Прізвище та ім'я</th>
        <th>Телефон</th>
        <th>Email</th>
        <th>Вік</th>
        <th>Стать</th>
      </tr>
    </thead>
    <tbody ref="tableBody"></tbody>
  </table>
</template>
