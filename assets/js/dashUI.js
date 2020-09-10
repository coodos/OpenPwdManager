let addAccount = document.querySelector('.newCredentials');
let backdrop = document.querySelector('.drop');
let newEntry = document.querySelector('.newEntry');

addAccount.addEventListener('click', () => {
    backdrop.style.display = 'block';
    newEntry.style.display = 'block';
});

document.querySelector('.newEntry .close').addEventListener('click', () => {
    backdrop.style.display = 'none';
    newEntry.style.display = 'none';
});

let credentialButtons = document.querySelectorAll('.credential');

for (let i = 0; i < credentialButtons.length; i++) {
    let button = credentialButtons[i];
    console.log(button);
    button.addEventListener('click', () => {
        console.log(button.innerText);
    });
}