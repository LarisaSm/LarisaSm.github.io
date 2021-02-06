const submitBtn = document.getElementById('submit')
const email = document.getElementById('email')
const username = document.getElementById('username')
const text = document.getElementById('user_feedback')
const spinner = document.getElementById('spinner')
const emailSuccess = document.getElementById('emailSuccess')
const emailFail = document.getElementById('emailFail')
const readMore = document.getElementById('readMore')
const readShort = document.getElementById('readShort');
const descriptionShort = document.getElementById('descriptionShort')
const descriptionLong = document.getElementById('descriptionLong')

readMore.addEventListener('click', reedMore);
readShort.addEventListener('click', reedMore);

// async () => {
    // descriptionShort.classList.toggle('hide')
//     // descriptionLong.classList.toggle('hide')
// })

function reedMore () {
    descriptionShort.classList.toggle('hide')
    descriptionLong.classList.toggle('hide')
}

submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    username.reportValidity()
    email.reportValidity()
    if(email.checkValidity() && username.checkValidity()) {
        spinner.classList.remove("hide");
        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://web.monovar.ru/api/send/email', true)
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify({email: email.value, username: username.value, text: text.value}))
        xhr.onload = function () {
            spinner.classList.add("hide");
            emailSuccess.classList.remove("hide");
            setTimeout(()=>{
                emailSuccess.classList.add("hide");
            }, 3000)
        };

        xhr.onerror = function () { // происходит, только когда запрос совсем не получилось выполнить
            spinner.classList.add("hide");
            emailFail.classList.remove("hide");
            setTimeout(()=>{
                emailFail.classList.add("hide");
            }, 3000)
        };
    }
})