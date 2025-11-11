export const inputs = [
  {
    id: 'surname',
    label: 'Прізвище',
    type: 'text',
    placeholder: 'Введіть прізвище',
    required: true,
    validate: validateSurname,
  },
  {
    id: 'name',
    label: "Ім'я",
    type: 'text',
    placeholder: "Введіть iм'я",
    required: true,
    validate: validateName,
  },
  {
    id: 'middleName',
    label: 'По-батькові',
    type: 'text',
    placeholder: 'Введіть по-батькові',
    required: false,
    validate: validateMiddleName,
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Введіть email',
    required: true,
    validate: validateEmail,
  },

  {
    id: 'phone',
    label: 'Телефон',
    placeholder: '+38(0__) ___-__-__',
    type: 'tel',
    required: true,
  },
  {
    id: 'password',
    label: 'Пароль',
    type: 'password',
    placeholder: 'Введіть пароль',
    required: true,
    validate: validatePassword,
  },
  {
    id: 'birthDate',
    label: 'Дата народження',
    type: 'date',
    required: true,
    validate: checkAge,
  },
]
export function validateSurname(value) {
  console.log(value)
  const pattern = /^[А-Яа-яЇїІіЄєҐґ'-]{3,20}$/u
  if (!pattern.test(value)) return 'Неправильно введено прізвище'
  return ''
}

export function validateName(value) {
  console.log(value)
  const pattern = /^[А-Яа-яЇїІіЄєҐґ'-]{3,20}$/u
  if (!pattern.test(value)) return "Неправильно введено ім'я"
  return ''
}

export function validateMiddleName(value) {
  console.log(value)
  if (!value) return ''
  const pattern = /^[А-Яа-яЇїІіЄєҐґ'-]{3,20}$/u
  if (!pattern.test(value)) return 'Неправильно введено по-батькові'
  return ''
}

export function validatePassword(value) {
  console.log(value)
  if (value.length < 5) return 'Пароль має бути не менше 5 символів'
  return ''
}

export function validateEmail(value) {
  console.log(value)
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!pattern.test(value)) return 'Неправильний email'
  return ''
}

export function checkAge(value) {
  console.log(value)
  if (!value) return ''
  const birth = new Date(value)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate()))
    age--
  if (age < 16 || age > 80) return 'Вік має бути від 16 до 80 років'
  return ''
}
