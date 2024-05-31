const body = document.querySelector("body"),
 modeToggle = body.querySelector(".mode-toggle");
 sidebar = body.querySelector("nav");
 sidebarToggle = body.querySelector(".sidebar-toggle");
let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
 body.classList.toggle("dark");
}
let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
 sidebar.classList.toggle("close");
}
modeToggle.addEventListener("click", () =>{
 body.classList.toggle("dark");
    if(body.classList.contains("dark")){
 localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});
sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
})

var newMemberAddBtn = document.querySelectorAll('.addMemberBtn'),
darkBg = document.querySelectorAll('.dark_bg'),
popupForm = document.querySelectorAll('.popup'),
crossBtn = document.querySelectorAll('.closeBtn'),
submitBtn = document.querySelectorAll('.submitBtn'),
 modalTitle = document.querySelectorAll('.modalTitle'),
 popupFooter = document.querySelectorAll('.popupFooter'),
 imgInput = document.querySelectorAll('.img'),
 imgHolder = document.querySelectorAll('.imgholder')
 form = document.querySelectorAll('form'),
formBtn = document.querySelectorAll(".submitBtn"),
 formInputFields = document.querySelectorAll('form input'),
  uploadimg = document.querySelector("#uploadimg"),
  uploadimgObj = document.querySelector("#uploadimgObj"),
  uploadimgSer = document.querySelector("#uploadimgSer"),
  uploadimgSer1 = document.querySelector("#uploadimgSer1"),
  fName = document.getElementById("fName"),
  fNameObjects = document.getElementById("fNameObjects"),
  lNameServices = document.getElementById("lNameServices"),
  entries = document.querySelectorAll(".showEntries"),
  userInfo = document.querySelectorAll(".userInfo"),
  table = document.querySelectorAll("table"),
  filterData = document.getElementById("search"),
  action = document.querySelectorAll(".action")
  text1 = document.getElementById("text1"),
  text2 = document.getElementById("text2"),
  text3 = document.getElementById("text3"),
  text4 = document.getElementById("text4"),
  text5 = document.getElementById("text5"),
  text6 = document.getElementById("text6")

let originalData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []
let getData = [...originalData]


let isEdit = false, editId

var arrayLength = 0
var tableSize = 10
var startIndex = 1
var endIndex = 0
var currentIndex = 1
var maxIndex = 0

newMemberAddBtn[0].addEventListener('click', ()=> {
    isEdit = false
    submitBtn[0].innerHTML = "Добавить"
    modalTitle[0].innerHTML = "Добавление нового блока"
    action[0].value = 'Добавить';
    fName.value = "";
    popupFooter[0].style.display = "block"
    imgInput[0].src = "./img/pic1.png"
    darkBg[0].classList.add('active')
    popupForm[0].classList.add('active')
})


if(document.getElementById("userRole").textContent.toLowerCase() === "оператор заявок"){
    document.querySelectorAll(".adminItem").forEach(el => {
        el.style.display = "none";
    });
}


crossBtn[0].addEventListener('click', ()=>{
    darkBg[0].classList.remove('active')
    popupForm[0].classList.remove('active')
    form[0].reset()
})

uploadimg.onchange = function(){
    if(uploadimg.files[0].size < 1000000){   // 1MB = 1000000
        var fileReader = new FileReader()

        fileReader.onload = function(e){
            var imgUrl = e.target.result
            imgInput[0].src = imgUrl
        }

        fileReader.readAsDataURL(uploadimg.files[0])
    }

    else{
        alert("")
    }

}

newMemberAddBtn[1].addEventListener('click', ()=> {
    isEdit = false
    submitBtn[1].innerHTML = "Добавить"
    modalTitle[1].innerHTML = "Добавление нового блока"
    action[1].value = 'Добавить';
    fNameObjects.value = "";
    popupFooter[1].style.display = "block"
    imgInput[1].src = "./img/pic1.png"
    darkBg[1].classList.add('active')
    popupForm[1].classList.add('active')
})

crossBtn[1].addEventListener('click', ()=>{
    darkBg[1].classList.remove('active')
    popupForm[1].classList.remove('active')
    form[1].reset()
})

uploadimgObj.onchange = function(){
    if(uploadimgObj.files[0].size < 1000000){   // 1MB = 1000000
        var fileReader = new FileReader()

        fileReader.onload = function(e){
            var imgUrl = e.target.result
            imgInput[1].src = imgUrl
        }

        fileReader.readAsDataURL(uploadimgObj.files[0])
    }

    else{
        alert("")
    }

}

newMemberAddBtn[2].addEventListener('click', ()=> {
    isEdit = false
    submitBtn[2].innerHTML =  "Добавить"
    modalTitle[2].innerHTML = "Добавление новой услуги"
    action[2].value = 'Добавить';
    fNameObjects.value = "";
    popupFooter[2].style.display = "block"
    imgInput[2].src = "./img/pic1.png"
    darkBg[2].classList.add('active')
    popupForm[2].classList.add('active')
})

crossBtn[2].addEventListener('click', ()=>{
    darkBg[2].classList.remove('active')
    popupForm[2].classList.remove('active')
    form[2].reset()
})

uploadimgSer.onchange = function(){
    if(uploadimgSer.files[0].size < 1000000){   // 1MB = 1000000
        var fileReader = new FileReader()

        fileReader.onload = function(e){
            var imgUrl = e.target.result
            imgInput[2].src = imgUrl
        }

        fileReader.readAsDataURL(uploadimgSer.files[0])
    }

    else{
        alert("")
    }

}

uploadimgSer1.onchange = function(){
    if(uploadimgSer1.files[0].size < 1000000){   // 1MB = 1000000
        var fileReader = new FileReader()

        fileReader.onload = function(e){
            var imgUrl = e.target.result
            document.querySelector(".img1").src = imgUrl
        }

        fileReader.readAsDataURL(uploadimgSer1.files[0])
    }

    else{
        alert("")
    }

}

function editInfo(id, pic, fname){
    console.log("Edit")
    isEdit = true
    editId = id


    fName.value = fname


    darkBg[0].classList.add('active')
    popupForm[0].classList.add('active')
    popupFooter[0].style.display = "block"
    modalTitle[0].innerHTML = "Редактирование блока"
    submitBtn[0].innerHTML = "Изменить";
    document.getElementById("plusId").value = `${id}`;
    action[0].value = 'Изменить';
    formInputFields[0].forEach(input => {
        input.disabled = false
    })


    imgHolder[0].style.pointerEvents = "auto"
}

function deleteInfo(index){
    if(confirm("Вы уверены, что хотите удалить блок?")){
        var xhr = new XMLHttpRequest();
        let id = document.getElementById("id").value;
        xhr.open("POST", "/deletepluses", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                console.log(xhr.responseText);
                document.getElementById(index).style.display = 'none';
            }
        };
        xhr.send(JSON.stringify({id: id, plusId: index}));
    }
}

function editInfoObjects(id, pic, fname){
    console.log("Edit")
    isEdit = true
    editId = id


    fNameObjects.value = fname


    darkBg[1].classList.add('active')
    popupForm[1].classList.add('active')
    popupFooter[1].style.display = "block"
    modalTitle[1].innerHTML = "Редактирование блока"
    submitBtn[1].innerHTML = "Изменить";
    document.getElementById("plusIdObj").value = `${id}`;
    action[1].value = 'Изменить';
    formInputFields[1].forEach(input => {
        input.disabled = false
    })


    imgHolder[1].style.pointerEvents = "auto"
}

function deleteInfoObjects(index){
    if(confirm("Вы уверены, что хотите удалить блок?")){
        var xhr = new XMLHttpRequest();
        let id = document.getElementById("id").value;
        xhr.open("POST", "/deleteobjects", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                console.log(xhr.responseText);
                document.getElementById(`obj${index}`).style.display = 'none';
            }
        };
        xhr.send(JSON.stringify({id: id, plusId: index}));
    }
}

function editInfoServices(id){
    console.log("Edit")
    isEdit = true
    editId = id




    darkBg[2].classList.add('active')
    popupForm[2].classList.add('active')
    popupFooter[2].style.display = "block"
    modalTitle[2].innerHTML = "Редактирование блока"
    submitBtn[2].innerHTML = "Изменить";
    document.getElementById("plusIdSer").value = `${id}`;
    action[2].value = 'Изменить';
    console.log(document.getElementById("plusIdSer").value )

    imgHolder[2].style.pointerEvents = "auto"
}

function deleteInfoServices(index){
    if(confirm("Вы уверены, что хотите удалить блок?")){
        var xhr = new XMLHttpRequest();
        let id = document.getElementById("id").value;
        xhr.open("POST", "/deleteservice", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                console.log(xhr.responseText);
                document.getElementById(`ser${index}`).style.display = 'none';
            }
        };
        xhr.send(JSON.stringify({id: id, plusIdSer: index}));
    }
}

const contentField = document.getElementById('content');
const allServicesBtn = document.getElementById('allServicesBtn');
const servicesBtn = document.getElementById("servicesBtn");
const allConsultationsBtn = document.getElementById('allConsultationsBtn');
const consultationsBtn = document.getElementById("consultationsBtn");
const saveBtn = document.getElementById("save");
const actions = document.querySelectorAll(".actions");
const profileBtn = document.getElementById("profileBtn");
const contentItem = document.querySelectorAll(".contentItem");
const saveAboutBtn = document.getElementById("saveAbout");
const aboutContentBtn = document.getElementById("aboutContentBtn");
const requestsContentBtn = document.getElementById("requestsContentBtn");
const plusesContentBtn = document.getElementById("plusesContentBtn");
const contactsContentBtn = document.getElementById("contactsContentBtn");
const gradeContentBtn = document.getElementById("gradeContentBtn");
const addServiceBtn = document.querySelector(".addServiceBtn");
const serviceWindow = document.querySelector(".addWindow");
const objectsContentBtn = document.getElementById("objectsContentBtn");
const servicesContentBtn = document.getElementById("servicesContentBtn");
const titleContentBtn = document.getElementById("titleContentBtn");
let deleteGradeBtn;
const allGrades = document.querySelector(".allGrades");
let userAction = "Общая информация";

const serviceTemplate = (lastname, firstname, patronymic, service, phone, email, id, date) =>  {
    return `
                <tr id="${id}">
                    <td>${lastname}</td>
                    <td>${firstname}</td>
                    <td>${patronymic}</td>
                    <td>${service}</td>
                    <td>${phone}</td>
                    <td>${email}</td>
                    <td>${date}</td>
                    <td><button class="accept">Принять</button>
                    <button class="delete">Отклонить</button></td>
                </tr>
                `;}

const serviceTemplateAll = (id, lastname, firstname, patronymic, service, phone, email, status, date) =>  {
    return `
                <tr id="${id}">
                    <td>${lastname}</td>
                    <td>${firstname}</td>
                    <td>${patronymic}</td>
                    <td>${service}</td>
                    <td>${phone}</td>
                    <td>${email}</td>
                    <td>${date}</td>
                    <td class="serviceStatus">${status}</td>
                    <td ><button style="cursor: pointer;" class="exelDownload">Скачать</button></td>
                </tr>
                `;}

const consultationTemplate = (lastname, firstname, patronymic, phone, email, message, id, date) =>  {
    return `
                <tr id="${id}">
                    <td>${lastname}</td>
                    <td>${firstname}</td>
                    <td>${patronymic}</td>
                    <td>${phone}</td>
                    <td>${email}</td>
                    <td>${message}</td>
                    <td>${date}</td>
                    <td><button class="accept">Принять</button>
                    <button class="delete">Отклонить</button></td>
                </tr>
                `;}
const consultationTemplateAll = (lastname, firstname, patronymic, phone, email, message, status,date) =>  {
    return `
                <tr>
                    <td>${lastname}</td>
                    <td>${firstname}</td>
                    <td>${patronymic}</td>
                    <td>${phone}</td>
                    <td>${email}</td>
                    <td>${message}</td>
                    <td>${date}</td>
                    <td class="serviceStatus">${status}</td>
                </tr>
                `;}

const buttonsListener = (root) => {
    const deleteBtn = document.querySelectorAll(".delete");
    const deferBtn = document.querySelectorAll(".defer");
    const acceptBtn = document.querySelectorAll(".accept");
    deleteBtn.forEach(btn => {
        btn.addEventListener("click", function(){
            var xhr = new XMLHttpRequest();
            xhr.open("POST", root, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    console.log(xhr.responseText);
                }
            };
            xhr.send(JSON.stringify({ action: "delete", number: btn.parentNode.parentNode.id }));
            console.log(btn.id);
            btn.parentNode.parentNode.style.display = 'none';
        })
    });
    deferBtn.forEach(btn => {
        btn.addEventListener("click", function(){
            var xhr = new XMLHttpRequest();
            xhr.open("POST", root, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    console.log(xhr.responseText);
                }
            };
            xhr.send(JSON.stringify({ action: "defer", number: btn.parentNode.parentNode.id }));
            console.log(btn.id);
            btn.parentNode.parentNode.style.display = 'none';
        })
    });
    acceptBtn.forEach(btn => {
        btn.addEventListener("click", function(){
            var xhr = new XMLHttpRequest();
            xhr.open("POST", root, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    console.log(xhr.responseText);
                }
            };
            xhr.send(JSON.stringify({ action: "accept", number: btn.parentNode.parentNode.id }));
            console.log(btn.id);
            btn.parentNode.parentNode.style.display = 'none';
        })
    });
};

const plusesItem = (index, id, img, text) => {
    return `<tr id="${id}" class = "employeeDetails">
                <td>${index + 1}</td>
                <td><img src="${img}" alt="" width="40" height="40"></td>
                <td>${text}</td>
                <td>

                    <button onclick="editInfo('${id}', '${img}', '${text}')"><i class="fa-regular fa-pen-to-square"></i></button>

                    <button onclick = "deleteInfo(${id})"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>`
};

const objectsItem = (index, id, img, text) => {
    return `<tr id="obj${id}" class = "employeeDetails">
                <td>${index + 1}</td>
                <td><img src="${img}" alt="" width="40" height="40"></td>
                <td>${text}</td>
                <td>

                    <button onclick="editInfoObjects('${id}', '${img}', '${text}')"><i class="fa-regular fa-pen-to-square"></i></button>

                    <button onclick = "deleteInfoObjects(${id})"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>`
};

const servicesItem = (index, id, img, title, text) => {
    return `<tr id="ser${id}" class = "employeeDetails">
                <td>${index + 1}</td>
                <td><img src="${img}" alt="" width="40" height="40"></td>
                <td>${title}</td>
                <td>${text}</td>
                <td>

                    <button onclick="editInfoServices('${id}')"><i class="fa-regular fa-pen-to-square"></i></button>

                    <button onclick = "deleteInfoServices(${id})"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>`
};

const gradeItem = (id, service, name, text) => {
    return `
    <tr id="grade${id}">
    <td>${service}</td>
    <td>${name}</td>
    <td>${text}</td>
    <td><button class="deleteGrade">Удалить</button></td>
    </tr>
    `;
};

const sortByStatus = () => {
    document.querySelectorAll(".sortStatus").forEach(el => {
        el.addEventListener("click", function(){
            if(el.textContent === "Проведенные"){
                document.querySelectorAll(".serviceStatus").forEach(status => {
                    if(status.textContent !== "Принята"){
                        status.parentNode.style.display = 'none';
                    }else{
                        status.parentNode.style.display = 'table-row';
                    }
                })
            }else if(el.textContent === "Отложенные"){
                document.querySelectorAll(".serviceStatus").forEach(status => {
                    if(status.textContent !== "Отложена"){
                        status.parentNode.style.display = 'none';
                    }else{
                        status.parentNode.style.display = 'table-row';
                    }
                })
            }else if(el.textContent === "Отклоненные"){
                document.querySelectorAll(".serviceStatus").forEach(status => {
                    if(status.textContent !== "Отклонена"){
                        status.parentNode.style.display = 'none';
                    }else{
                        status.parentNode.style.display = 'table-row';
                    }
                })
            }
        })
    });
};

servicesBtn.addEventListener("click", function(){
    contentItem.forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById("content").style.display = 'block';
    contentField.innerHTML = '';
    let content;
        let getData = new Promise( (resolve, reject) => {
            let data;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/getservices", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    data = xhr.responseText;
                    data = JSON.parse(data);
                    resolve(data);
                }
            };
            xhr.send(JSON.stringify({message: "current"}));
        });
        getData.then((result) => {
            if(result.length === 0){
                content = "<h1> Заявок нет </h1>"
            }else{
                content = `<div class="header_fixed"><table><tbody id="services"> <thead><tr><th>Фамилия</th><th>Имя</th><th>Отчество</th><th>Услуга</th><th>Номер телефона</th><th>Почта</th><th>Дата</th><th>Статус</th></tr></thead>`;
                result.forEach(user => {
                    content += serviceTemplate(user.lastname, user.firstname, user.patronymic, user.service, user.phone, user.email, user.id, user.date);
                });
                content += `</tbody></table></div>`;
            }
            contentField.innerHTML = content;
            buttonsListener("/processservices");
        })
    
});
allServicesBtn.addEventListener("click", function(){
    contentItem.forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById("content").style.display = 'block';
    contentField.innerHTML = '';
    let content;
        let getData = new Promise( (resolve, reject) => {
            let data;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/getservices", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    data = xhr.responseText;
                    data = JSON.parse(data);
                    resolve(data);
                }
            };
            xhr.send(JSON.stringify({message: "all"}));
        });
        getData.then((result) => {
            if(result.length === 0){
                content = "<h1> Заявок нет </h1>"
            }else{
                content = `<div class="header_fixed"><table><tbody id="services"><thead><tr><th>Фамилия</th><th>Имя</th><th>Отчество</th><th>Услуга</th><th>Номер телефона</th><th>Почта</th><th>Дата</th><th class="dropdown"><button class="dropbtn">Выбрать статус заявки</button><div class="dropdown-content"><a class="sortStatus" href="#">Проведенные</a><a class="sortStatus" href="#">Отклоненные</a></div></th><th>Скачать</th></tr></thead>`;
                result.forEach(user => {
                    content += serviceTemplateAll(user.id, user.lastname, user.firstname, user.patronymic, user.service, user.phone, user.email, user.status, user.date);
                });
                content += `</tbody></table></div>`;
            }
            contentField.innerHTML = content;
            sortByStatus();
            document.querySelectorAll(".exelDownload").forEach(el => {
                el.addEventListener("click", function (){
                    fetch('/download-excel', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: el.parentElement.parentElement.id })
                    })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.blob();
                })
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = 'report.xlsx';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => console.error('There was a problem with the fetch operation:', error));
                });
            });
        })
});

consultationsBtn.addEventListener("click", function(){
    contentItem.forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById("content").style.display = 'block';
    contentField.innerHTML = '';
    let content;
        let getData = new Promise( (resolve, reject) => {
            let data;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/getconsultations", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    data = xhr.responseText;
                    data = JSON.parse(data);
                    resolve(data);
                }
            };
            xhr.send(JSON.stringify({message: "current"}));
        });
        getData.then((result) => {
            if(result.length === 0){
                content = "<h1> Заявок нет </h1>"
            }else{
                content = `<div class="header_fixed"><table><tbody id="services"><thead><tr><th>Фамилия</th><th>Имя</th><th>Отчество</th><th>Номер телефона</th><th>Почта</th><th>Сообщение</th><th>Дата</th><th>Статус</th></tr></thead>`;
                result.forEach(user => {
                    content += consultationTemplate(user.lastname, user.firstname, user.patronymic, user.phone, user.email, user.message, user.id, user.date);
                });
                content += `</tbody></table></div>`;
            }
            contentField.innerHTML = content;
            buttonsListener("/processconsultations");
        })
    
});
allConsultationsBtn.addEventListener("click", function(){
    contentItem.forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById("content").style.display = 'block';
    contentField.innerHTML = '';
    let content;
        let getData = new Promise( (resolve, reject) => {
            let data;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/getconsultations", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    data = xhr.responseText;
                    data = JSON.parse(data);
                    console.log(data);
                    resolve(data);
                }
            };
            xhr.send(JSON.stringify({message: "all"}));
        });
        getData.then((result) => {
            if(result.length === 0){
                content = "<h1> Заявок нет </h1>"
            }else{
                content = `<div class="header_fixed"><table><tbody id="services"><thead><tr><th>Фамилия</th><th>Имя</th><th>Отчество</th><th>Номер телефона</th><th>Почта</th><th>Сообщение</th><th>Дата</th><th class="dropdown"><button class="dropbtn">Выбрать статус заявки</button><div class="dropdown-content"><a class="sortStatus" href="#">Проведенные</a><a class="sortStatus" href="#">Отклоненные</a></div></th>></tr></thead>`;
                result.forEach(user => {
                    content += consultationTemplateAll(user.lastname, user.firstname, user.patronymic, user.phone, user.email, user.message, user.status, user.date);
                });
                content += `</tbody></table></div>`;
            }
            contentField.innerHTML = content;
            sortByStatus();
        })
    
});

saveBtn.addEventListener("click", function () {
    if(userAction === "Общая информация"){
        const userData = document.querySelectorAll(".user-data");
        console.log(userData)
        const userDataJson = {
            id: userData[0].value,
            lastname: userData[1].value,
            firstname: userData[2].value,
            patronymic: userData[3].value,
            username: userData[4].value,
            email: userData[5].value,
            role: userData[6].value
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/saveuser", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                console.log(xhr.responseText);
            }
        };
        xhr.send(JSON.stringify(userDataJson));
    }else{
        const passwordData = document.querySelectorAll(".password-data");
        if(passwordData[1].value === "" || passwordData[2].value === "" || passwordData[0].value === ""){
            document.querySelector(".error").textContent = "Заполните все поля";
            document.querySelector(".error").style.display = 'flex';
        }
        else if(passwordData[1].value !== passwordData[2].value){
            document.querySelector(".error").textContent = " Пароли не совпадают";
            document.querySelector(".error").style.display = 'flex';
        }else{
            document.querySelector(".error").style.display = 'none';
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/changepassword", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    if(xhr.responseText === "0"){
                        document.querySelector(".error").textContent = "Неправильный текущий пароль";
                        document.querySelector(".error").style.display = 'flex';
                    }else{
                        document.querySelector(".error").style.display = 'none';
                        passwordData.forEach(el => {
                            el.value = "";
                        })
                    }
                }
            };
            xhr.send(JSON.stringify({old: passwordData[0].value, new: passwordData[1].value, id: document.getElementById("id").value}));
        }
    }
});
actions.forEach(action => {
    action.addEventListener("click", function(){
        userAction = action.textContent;
    })
});
profileBtn.addEventListener("click", function() {
    contentItem.forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById("user").style.display = 'block';
});

aboutContentBtn.addEventListener("click", function(){
    contentItem.forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById("aboutContent").style.display = 'block';
});

requestsContentBtn.addEventListener("click", function(){
    contentItem.forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById("requestsContent").style.display = 'block';
});

plusesContentBtn.addEventListener("click", function(){
    contentItem.forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById("pluses").style.display = 'block';
});

contactsContentBtn.addEventListener("click", function(){
    contentItem.forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById("contactsContent").style.display = 'block';
});

gradeContentBtn.addEventListener("click", function(){
    contentItem.forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById("gradeContent").style.display = 'block';
});

objectsContentBtn.addEventListener("click", function(){
    contentItem.forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById("objectsContent").style.display = 'block';
});

servicesContentBtn.addEventListener("click", function(){
    contentItem.forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById("servicesContent").style.display = 'block';
});

titleContentBtn.addEventListener("click", function(){
    contentItem.forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById("titleContent").style.display = 'block';
});

document.getElementById("exitBtn").addEventListener("click", function(){
    if(confirm("Вы уверены, что хотите выйти?")){
        document.getElementById("exitForm").submit();
    }
});

const listItem = (text) => {
    return `
    <div class="list__item">
        ${text}
    </div>
    `;
};

const listInput = document.getElementById("text6");
const infoList = document.getElementById("infoList");

document.querySelector(".addBtn").addEventListener("click", function(){
    document.querySelector(".list").insertAdjacentHTML("beforeend", listItem(listInput.value));
    if(infoList.value === ""){
        infoList.value = listInput.value;
    }else{
        infoList.value = infoList.value + "|" + listInput.value;
    }
    listInput.value = "";
    console.log(infoList.value);
});


fetch('/imagesabout')
    .then(response => response.json())
    .then(images => {
        const imgOne = document.getElementById("aboutImg1");
        imgOne.src = `/uploads/${images[0].filename_one}`;
        const imgTwo = document.getElementById("aboutImg2");
        imgTwo.src = `/uploads/${images[0].filename_two}`;
        document.getElementById("aboutText").textContent = images[0].text;
    })
    .catch(error => console.error('Error fetching images:', error));

fetch('/imagesrequests')
.then(response => response.json())
.then(images => {
    const imgOne = document.getElementById("requestsImg");
    imgOne.src = `/uploads/${images[0].filename}`;
    document.getElementById("requestsText").textContent = images[0].text;
})
.catch(error => console.error('Error fetching images:', error));

fetch('/imagespluses')
.then(response => response.json())
.then(images => {
    images.forEach((el, i) => {
        document.querySelector(".userInfo").insertAdjacentHTML("beforeend", plusesItem(i, el.id, `/uploads/${el.filename}`, el.text));
    })
})
.catch(error => console.error('Error fetching images:', error));


fetch('/getcontacts')
.then(response => response.json())
.then(contacts => {
    document.getElementById("contactsPhone").value = contacts[0].phone;
    document.getElementById("contactsEmail").value = contacts[0].email;
    document.getElementById("contactsAddress").value = contacts[0].address;
    document.getElementById("contactsMap").value = contacts[0].map;
})
.catch(error => console.error('Error fetching images:', error));

fetch('/getallgrades')
.then(response => response.json())
.then(grades => {
    grades.forEach(el => {
        allGrades.insertAdjacentHTML("beforeend", gradeItem(el.id, el.service, el.name, el.text));
    });
    document.querySelectorAll(".deleteGrade").forEach(el => {
        el.addEventListener("click", function(){
            let id = el.parentNode.parentNode.id.toString();
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/deletegrade", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    console.log(xhr.responseText);
                }
            };
            xhr.send(JSON.stringify({id: id[id.length - 1]}));
            el.parentNode.parentNode.style.display = 'none';
        });
    });
})
.catch(error => console.error('Error fetching images:', error));

fetch('/imagesobjects')
.then(response => response.json())
.then(images => {
    images.forEach((el, i) => {
        document.querySelector(".userInfoObjects").insertAdjacentHTML("beforeend", objectsItem(i, el.id, `/uploads/${el.filename}`, el.text));
    })
})
.catch(error => console.error('Error fetching images:', error));

fetch('/imagesservicestitle')
.then(response => response.json())
.then(images => {
    images.forEach((el, i) => {
        document.querySelector(".userInfoServices").insertAdjacentHTML("beforeend", servicesItem(i, el.item_id, `/uploads/${el.filename}`, el.title, el.text));
    })
})
.catch(error => console.error('Error fetching images:', error));

fetch('/gettitle')
.then(response => response.json())
.then(title => {
    document.getElementById("titleInput").value = title[0].text;
})
.catch(error => console.error('Error fetching images:', error));



var $rows = $('#');
$('#search').keyup(function() {
    
    var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        reg = RegExp(val, 'i'),
        text;
    
    $rows.show().filter(function() {
        text = $(this).text().replace(/\s+/g, ' ');
        return !reg.test(text);
    }).hide();
});