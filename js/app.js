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

searchBtn.addEventListener('click', (e) => {
  e.preventDefault()

  fetch('http://localhost:8080/api/v1/dates')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if (Number(kidCount.value) <= data[0].kids) {
        // console.log('sert duzdur')
        document.getElementById('testkid').innerText = 'Four apartments are found.'
      }
    })

  isEmpty()
})
