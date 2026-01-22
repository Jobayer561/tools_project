const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const signbtn = document.getElementById('signbtn');

console.log(name,email,password,signbtn);

signbtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const userData = {
        name: name.value,
        email: email.value,
        password: password.value
    };
    console.log('User Data:', userData);
});