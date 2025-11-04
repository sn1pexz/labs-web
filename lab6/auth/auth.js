const passwordInput = document.getElementById('password')
const passwordError = document.getElementById('passwordError')
const emailInput = document.getElementById('email')
const emailError = document.getElementById('emailError')

function validatePassword() {
  const password = passwordInput.value.trim()
  passwordError.textContent =
    password.length > 5 ? '' : 'Пароль має бути не менше 5 символів'
}
passwordInput.addEventListener('input', validatePassword)

function validateEmail() {
  const email = emailInput.value.trim()
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  emailError.textContent =
    email && !pattern.test(email) ? 'Неправильний email' : ''
}

emailInput.addEventListener('input', validateEmail)
