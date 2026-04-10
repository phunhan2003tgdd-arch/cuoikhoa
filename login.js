let btnlogin = document.getElementById('btnlogin')
btnlogin.onclick = function(){
    let nameinput = document.getElementById('username')
    let passinput = document.getElementById('pass')
    
    let username = nameinput.value
    let pass = passinput.value

    let user = localStorage.getItem("register_information")
    let userObject = JSON.parse(user)

    if(username != userObject.username){
        alert('wrong username or wrong password')
    }
    else if(pass != userObject.pass){
        alert('wrong password or wrong username')
    }
    else if(pass == "" || username == ""){
        alert('Please enter your password and username.')}
    else{
        alert("Login sucess")
        window.location.href="./nextfilx_fix.html"
    }
}
