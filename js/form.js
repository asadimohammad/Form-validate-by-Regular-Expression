//Variables
const form = document.querySelector('#form'),
    sendBtn = document.querySelector('#sendBtn'),
    resetBtn = document.querySelector('#resetBtn'),
    name = document.querySelector('#name'),
    zipCode = document.querySelector('#zipcode'),
    email = document.querySelector('#email'),
    phoneNumber = document.querySelector('#phonenumber');

//Eventlisteners
Eventlisteners()
function Eventlisteners() {
    document.addEventListener('DOMContentLoaded', disableBtn)
    name.addEventListener('blur', validateFields)
    zipCode.addEventListener('blur', validateFields)
    email.addEventListener('blur', validateFields)
    phoneNumber.addEventListener('blur', validateFields)
    sendBtn.addEventListener('click', sendForm)
    resetBtn.addEventListener('click', resetForm)
}

//Functions

// disabled sendBtn on load DOMContent
function disableBtn() {
    sendBtn.disabled = true
}

// validation Fields
function validateFields() {
    // validate by length
    validateLength(this);
    //validate by type field
    if (this.type === 'email') {
        validateEmail(this)
    }
    activeBtn()
}
// validate by length
function validateLength(field) {
    if (field.value.length > 0) {
        field.style.borderBottomColor = 'green'
        field.classList.remove('error')
    } else {
        field.style.borderBottomColor = 'red'
        field.classList.add('error')
    }
}
// validate by email type
function validateEmail(field) {
    // Regular Expression
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Match the entered phrase to Regular Expression
    const resultRegex = re.test(String(field.value).toLowerCase());
    // result of Matching
    if (resultRegex == true) {
        field.style.borderBottomColor = 'green'
        field.classList.remove('error')
    } else {
        field.style.borderBottomColor = 'red'
        field.classList.add('error')

        //show a message Error for incorrect email
        const messageErr = document.createElement('span')
        messageErr.innerHTML = 'Enter a valid Email '
        messageErr.style.color = 'red'
        document.querySelector('.showError').appendChild(messageErr)
        setTimeout(() => {
            messageErr.style.display = 'none'
        }, 2000);

    }
}
// Active sendBtn whitout error
function activeBtn() {
    const errorClass = document.querySelectorAll('.error')
    if (errorClass.length === 0 && name.value !== '' && zipCode.value !== '' && email.value !== '' && phoneNumber.value !== '') {
        sendBtn.disabled = false
    } else {
        disableBtn()
    }
}
// after click on sendBtn
function sendForm(e) {
    e.preventDefault()
    //show spinner
    const loaders = document.querySelector('#loaders img')
    loaders.style.display = 'block'
    //a time for show spinner
    setTimeout(() => {
        loaders.style.display = 'none'

        // Show successfuly message by a gif
        const imgSendMail = document.createElement('img')
        imgSendMail.src = 'img/mail.gif'
        imgSendMail.style.display = 'block'
        document.querySelector('#loaders').appendChild(imgSendMail)

        // a time for show gif successfuly
        setTimeout(() => {
            imgSendMail.style.display = 'none'
            form.reset()
            disableBtn()
        }, 5000);
    }, 3000);
}
// Reset form after click on resetBtn
function resetForm(e) {
    e.preventDefault()
    form.reset()
}