const phoneMask = document.getElementById('phone')
const emailInput = document.getElementById('email')
const emailError = document.getElementById('emailError')
const surnameInput = document.getElementById('surname')
const surnameError = document.getElementById('surnameError')
const nameInput = document.getElementById('name')
const nameError = document.getElementById('nameError')
const middleNameInput = document.getElementById('middleName')
const middleNameError = document.getElementById('middleNameError')
const passwordInput = document.getElementById('password')
const passwordError = document.getElementById('passwordError')
const phoneError = document.getElementById('phoneError')

const tableBody = document.getElementById('tableBody')
const createbtn = document.getElementById('createbtn')
const form = document.querySelector('.auth-form')
const deleteBtn = document.getElementById('delete')
const addBtn = document.getElementById('add')
const mask = IMask(phoneMask, {
  mask: '+{38}(\\000) 000-00-00',
})
function checkPhone() {
  console.log(mask)
  const unmasked = mask.unmaskedValue
  const lengthPhone = unmasked.length + 1
  if (!lengthPhone || lengthPhone < 12) {
    phoneError.textContent = 'Ви не вказали номер телефону'
    return undefined
  } else {
    phoneError.textContent = ''
    return lengthPhone
  }
}

phoneMask.addEventListener('input', checkPhone)
function validateEmail() {
  const email = emailInput.value.trim()
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  emailError.textContent =
    email && !pattern.test(email) ? 'Неправильний email' : ''
}

emailInput.addEventListener('input', validateEmail)

function validateSurname() {
  const surname = surnameInput.value.trim()
  const pattern = /^[А-Яа-яЇїІіЄєҐґ'-]{2,}(?:[\s-][А-Яа-яЇїІіЄєҐґ'-]{2,})*$/
  surnameError.textContent =
    (20 <= surname.length || surname.length >= 3) && pattern.test(surname)
      ? ''
      : 'Неправильно введено прізвище'
}
surnameInput.addEventListener('input', validateSurname)

function validateName() {
  const name = nameInput.value.trim()
  const pattern = /^[А-Яа-яЇїІіЄєҐґ'-]{2,}(?:[\s-][А-Яа-яЇїІіЄєҐґ'-]{2,})*$/
  nameError.textContent =
    (20 <= name.length || name.length >= 3) && pattern.test(name)
      ? ''
      : "Неправильно введено ім'я"
}
nameInput.addEventListener('input', validateName)

function validateMiddleName() {
  const middleName = middleNameInput.value.trim()
  const pattern = /^[А-Яа-яЇїІіЄєҐґ'-]{2,}(?:[\s-][А-Яа-яЇїІіЄєҐґ'-]{2,})*$/
  if (middleName === '') {
    middleNameError.textContent = ''
    return
  }
  middleNameError.textContent =
    (20 <= middleName.length || middleName.length >= 5) &&
    pattern.test(middleName)
      ? ''
      : 'Неправильно введено по-батькові'
}
middleNameInput.addEventListener('input', validateMiddleName)

function validatePassword() {
  const password = passwordInput.value.trim()
  passwordError.textContent =
    password.length > 5 ? '' : 'Пароль має бути не менше 5 символів'
}
passwordInput.addEventListener('input', validatePassword)

function checkAge() {
  const input = document.getElementById('birthDate')
  const dateError = document.getElementById('dateError')

  if (!input.value) {
    dateError.textContent = ''
    return
  }

  const birthDate = new Date(input.value)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--
  }

  if (age < 16 || age > 80) {
    dateError.textContent = 'Вік має бути від 16 до 80 років'
    return (age = undefined)
  } else {
    dateError.textContent = ''
    return age
  }
}
function getGender() {
  const gender = document.querySelector('input[name="gender"]:checked').value
  return gender
}
function addToTable() {
  const age = checkAge()
  const name = nameInput.value.trim()
  const email = emailInput.value.trim()
  const surname = surnameInput.value.trim()
  const phone = checkPhone()
  if (!name || !surname || !email || !age || !phone) {
    alert('Заповніть усі поля!')
    return
  }
  const row = document.createElement('tr')
  row.innerHTML = `
    <td><input type="checkbox" class="row-check"></td>
    <td>${surname} ${name}</td>
     <td>${mask.value}</td>
    <td>${email}</td>
    <td>${age}</td>
    <td>${getGender()}</td>
  `
  tableBody.appendChild(row)

  form.reset()
  phoneMask.value = ''
}
createbtn.addEventListener('click', addToTable)

function deleteFunc() {
  const checkboxes = tableBody.querySelectorAll('.row-check')

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.closest('tr').remove()
    }
  })
}
function addFunc() {
  const checkboxes = tableBody.querySelectorAll('.row-check')

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const row = checkbox.closest('tr')
      const clone = row.cloneNode(true)
      clone.querySelector('.row-check').checked = false
      tableBody.appendChild(clone)
    }
  })
}

deleteBtn.addEventListener('click', deleteFunc)
addBtn.addEventListener('click', addFunc)
