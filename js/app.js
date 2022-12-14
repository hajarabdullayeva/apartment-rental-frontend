const searchBtn = document.querySelector('.search-btn')
const dateIn = document.querySelector('.date-in')
const dateOut = document.querySelector('.date-out')
const adultCount = document.querySelector('.adult-count')
const kidCount = document.querySelector('.kid-count')
const checkInError = document.querySelector('.check-in-error')
const checkOutError = document.querySelector('.check-out-error')
const adultCountError = document.querySelector('.adult-count-error')
const kidCountError = document.querySelector('.kid-count-error')
const btn = document.querySelector('.burger-menu')
const sidebar = document.querySelector('.sidebar')
const closeBtn = document.querySelector('.close')
const body = document.getElementsByTagName('body')[0]
const images = document.querySelectorAll('.i-list')
const activeImg = document.querySelector('.active-img')
const title = document.querySelector('.title')
const subsBtn = document.querySelector('.subs-btn')
const modal = document.querySelector('.modal')
const subBtn = document.querySelector('.btn_dark')
const modalInput = document.querySelector('.modal__input')
const mailErr = document.querySelector('.mail-err')
const sendButton = document.querySelector('.send-button')
const nameInput = document.querySelector('.name-input')
const emailInput = document.querySelector('.email-input')
const messageInput = document.querySelector('.message-input')
const nameError = document.querySelector('.name-error')
const emailError = document.querySelector('.email-error')
const messageError = document.querySelector('.message-error')

// ! Open sidebar when burger menu is clicked
btn.addEventListener('click', () => {
  sidebar.style.display = 'block'
  closeBtn.style.display = 'flex'
  body.classList.add('nonscroll')
})

// ! Close sidebar when x is clicked
closeBtn.addEventListener('click', () => {
  sidebar.style.display = 'none'
  body.classList.remove('nonscroll')
})

// ! Close sidebar and modal when anywhere in window is clicked
window.onclick = function (e) {
  if (e.target == body) {
    sidebar.style.display = 'none'
    body.classList.remove('nonscroll')
  } else if (e.target == modal) {
    modal.style.display = 'none'
    body.classList.remove('nonscroll')
  }
}

// ! Change image of poster
Array.from(images).forEach((image) => {
  image.addEventListener('click', (e) => {
    activeImg.src = e.target.getAttribute('src')
    title.innerText = e.target.id
  })
})

// ! Open modal when click subscribe button
subsBtn.addEventListener('click', () => {
  modal.style.display = 'block'
})

// ! Validate email
subBtn.addEventListener('click', function () {
  let isValid = ValidateEmail(modalInput.value)
  if (isValid) {
    modal.style.display = 'none'
    modalInput.value = ''
  } else {
    console.log('email is invalid')
    mailErr.innerText = 'Email is not valid'
  }
})

function ValidateEmail(mail) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)
}

//! Check if input is empty
const isEmpty = () => {
  if (!dateIn.value) {
    checkInError.innerHTML = 'This field is required'
  } else {
    checkInError.innerHTML = ''
  }
  if (!dateOut.value) {
    checkOutError.innerHTML = 'This field is required'
  } else {
    checkOutError.innerHTML = ''
  }
  if (!adultCount.value) {
    adultCountError.innerHTML = 'This field is required'
  } else {
    adultCountError.innerHTML = ''
  }
  if (!kidCount.value) {
    kidCountError.innerHTML = 'This field is required'
  } else {
    kidCountError.innerHTML = ''
  }
}

// ! Check if apartment is available
searchBtn.addEventListener('click', (e) => {
  e.preventDefault()

  fetch('https://apartment-rental-backend.herokuapp.com/api/v1/dates')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)

      if (dateIn.value && dateOut.value && adultCount.value && kidCount.value) {
        if (Number(kidCount.value) <= data[0].kids) {
          document.getElementById('availability').innerText =
            'Apartment is found.'
          document.getElementById('availability').style.color = '#4caf50'
        } else {
          document.getElementById('availability').innerText =
            'Apartment not found.'
          document.getElementById('availability').style.color = 'red'
        }
      }
    })

  isEmpty()
})

// ! Check if Contact section inputs are empty

sendButton.addEventListener('click', (e) => {
  if (!nameInput.value) {
    nameError.innerHTML = 'This field is required'
  } else {
    nameError.innerHTML = ''
  }
  if (!emailInput.value) {
    emailError.innerHTML = 'This field is required'
  } else {
    let isValid = ValidateEmail(modalInput.value)

    if (!isValid) {
      emailError.innerText = 'E-mail is not valid'
    } else {
      emailError.innerHTML = ''
    }
  }
  if (!messageInput.value) {
    messageError.innerHTML = 'This field is required'
  } else {
    messageError.innerHTML = ''
  }
})
