let btnregister = document.getElementById('btnregister')

btnregister.onclick = function () {
    let nameinput = document.getElementById('username')
    let passinput = document.getElementById('pass')
    let emailinput = document.getElementById('email')

    let username = nameinput.value
    let pass = passinput.value
    let email = emailinput.value

    if (username == "") {
        alert('Làm ơn nhập tên')
    }
    else if (pass == "") {
        alert('Làm ơn nhập mật khẩu')
    }
    else if (email == "") {
        alert('Làm ơn nhập email')
    }
    else {
        let user = {
            username: username,
            pass: pass,
            email: email
        }

        localStorage.setItem('register_information', JSON.stringify(user))
        alert('Create account success')
    }
}
