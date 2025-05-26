let container = document.getElementById('container');
let checkList = JSON.parse(localStorage.getItem('checklist')) || [];
let database = JSON.parse(localStorage.getItem('database')) || [{ "name": "", "password": "", "floor": "", "room": "", "email": "", "phonenumber": "", "reasons": "" }];


function display() {
    container.innerHTML = "";
    checkList.forEach(user => {
        if (user.status === 'considering') {
            let div = document.createElement('div');
            div.classList.add('box', 'p-4', 'rounded-5');
            div.innerHTML = `
                <h1 class="text-center bg-danger rounded-3 text-white"><b>${user.floor}${user.room}</b></h1>
                <p><b>Email:</b> <span>${user.email}</span></p>
                <p><b>Name:</b> <span>${user.name}</span></p>
                <p><b>Password:</b> <span>${user.password}</span></p>
                <p><b>Phone Number:</b> <span>${user.phonenumberroom}</span></p>
                <p><b>Reasons:</b> <span>${user.reasons}</span></p>
            `;

            // Tạo div bọc nút để căn giữa
            let buttonsWrapper = document.createElement('div');
            buttonsWrapper.classList.add('buttons-wrapper');

            // Accept button
            let acceptBtn = document.createElement('button');
            acceptBtn.classList.add('boxBtn', 'btn-accept', 'border-0', 'bg-danger', 'px-5', 'py-2', 'rounded-3', 'text-white', 'fw-bold');
            acceptBtn.innerHTML = 'Accept';
            acceptBtn.onclick = () => acceptFunc(user);
            buttonsWrapper.appendChild(acceptBtn);

            // Deny button
            let denyBtn = document.createElement('button');
            denyBtn.classList.add('boxBtn', 'btn-deny', 'border-0', 'bg-danger', 'px-5', 'py-2', 'rounded-3', 'text-white', 'fw-bold');
            denyBtn.innerHTML = 'Deny';
            denyBtn.onclick = () => denyFunc(user);
            buttonsWrapper.appendChild(denyBtn);

            div.appendChild(buttonsWrapper);

            container.appendChild(div);
        }
    });
}

function acceptFunc(user) {
    user.status = 'accept';

    //Tìm data 
    let userdata = database.find(
        (userdata) => userdata.floor === user.floor && userdata.room === user.room
    );
    console.log(userdata);

    if (userdata) {
        userdata.name = user.name;
        userdata.password = user.password;
        userdata.email = user.email;
        userdata.phonenumber = user.phonenumberroom;
        userdata.reasons = user.reasons;
        localStorage.setItem("database", JSON.stringify(database));
    }


    localStorage.setItem('checklist', JSON.stringify(checkList));
    display();


}

function denyFunc(user) {
    user.status = 'deny';
    localStorage.setItem('checklist', JSON.stringify(checkList));
    display();
}

// Lắng nghe sự kiện storage để cập nhật khi localStorage thay đổi ở tab khác
window.addEventListener('storage', (event) => {
    if (event.key === 'checklist') {
        checkList = JSON.parse(event.newValue) || [];
        display();
    }
});

// Khởi đầu gọi display
display();

// Đăng xuất
function goBack() {
    window.location.href = 'admin.html';
}


// if(user){
// user.name = nameId.value;
// user.password = passwordId.value;
// user.email = emailId.value;
// user.phonenumber = phoneNumberId.value;
// user.reasons = reasons.value;
// localStorage.setItem("database", JSON.stringify(database));
// }