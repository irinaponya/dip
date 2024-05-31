document.addEventListener('mousemove', e =>{
    Object.assign(document.documentElement,{
        style: `
        --move-x: ${(e.clientX - window.innerWidth / 2) * -.005}deg;
        --move-y: ${(e.clientY- window.innerHeight / 2) * -.01}deg;
        `
    })
})

const servicesContent = (id, img, title, text) => {
    return `
    <div class="card">
        <img src="${img}" alt="">
        <div class="card-content">
        <h1>${title}</h1>
        <p>${text}</p>
        <button onclick="aboutService(${id})">Подробнее</button>
        </div>
    </div>
    `;
};

window.addEventListener('scroll', e =>{
    document.body.style.cssText += `--scrollTop: ${this.scrollY}px`
})

const listItem = (text) => {
    return `
    <li>${text}</li>
    `;
};

function aboutService(id){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/getservicesinfo", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            document.getElementById("infoTitle").textContent = data[0].title;
            document.getElementById("infoText").textContent = data[0].text;
            document.getElementById("infoImg").src = `/uploads/${data[0].filename}`;
            document.getElementById("infoSubtitle").textContent = data[0].subtitle;
            let str = data[0].list.split("|");
            let list = document.getElementById("infoList");
            list.innerHTML = "";
            str.forEach(el => {
                list.insertAdjacentHTML("beforeend", listItem(el));
            });
        }
    };
    xhr.send(JSON.stringify({id: id}));
    document.getElementById("my-modal-1").classList.add("open")
}

fetch('/getservicesitems')
.then(response => response.json())
.then(items => {
    items.forEach((item, i) => {
        document.querySelector(".card-container").insertAdjacentHTML("beforeend", servicesContent(item.item_id, `/uploads/${item.filename}`, item.title, item.text));
    });
})
.catch(error => console.error('Error fetching images:', error));

// Закрыть модальное окно
document.getElementById("close-my-modal-btn").addEventListener("click", function() {
    document.getElementById("my-modal-1").classList.remove("open")
})

// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.getElementById("my-modal-1").classList.remove("open")
    }
});

// Закрыть модальное окно при клике вне его
document.querySelector("#my-modal-1 .modal__box").addEventListener('click', event => {
    event._isClickWithInModal = true;
});
document.getElementById("my-modal-1").addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
});

// Форма заявки

const modal = document.getElementById("form");
const submit = document.getElementById("submit");

function openModal(){
    modal.style.display="flex";
}

function closeModal(){
    modal.style.display="none";
}

submit.onclick = openModal

window.onclick = function(e){
    if(e.target === modal){
        closeModal();
    }
}

// Анимация выпадающего списка

function DropDown(el) {
    this.dd = el;
    this.initEvents();
}
DropDown.prototype = {
    initEvents : function() {
        var obj = this;

        obj.dd.on('click', function(event){
            $(this).toggleClass('active');
            event.stopPropagation();
        });
    }
}

// Первая услуга


        // // Открыть модальное окно
        // document.getElementById("open-modal-btn").addEventListener("click", function() {
        //     document.getElementById("my-modal").classList.add("open")
        // })

        // // Закрыть модальное окно
        // document.getElementById("close-my-modal-btn").addEventListener("click", function() {
        //     document.getElementById("my-modal").classList.remove("open")
        // })

        // // Закрыть модальное окно при нажатии на Esc
        // window.addEventListener('keydown', (e) => {
        //     if (e.key === "Escape") {
        //         document.getElementById("my-modal").classList.remove("open")
        //     }
        // });

        // // Закрыть модальное окно при клике вне его
        // document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
        //     event._isClickWithInModal = true;
        // });
        // document.getElementById("my-modal").addEventListener('click', event => {
        //     if (event._isClickWithInModal) return;
        //     event.currentTarget.classList.remove('open');
        // });

//         // Вторая услуга

//         // Открыть модальное окно
//         document.getElementById("open-modal-btn-2").addEventListener("click", function() {
//             document.getElementById("my-modal-2").classList.add("open")
//         })

//         // Закрыть модальное окно
//         document.getElementById("close-my-modal-btn-2").addEventListener("click", function() {
//             document.getElementById("my-modal-2").classList.remove("open")
//         })

//         // Закрыть модальное окно при нажатии на Esc
//         window.addEventListener('keydown', (e) => {
//             if (e.key === "Escape") {
//                 document.getElementById("my-modal-2").classList.remove("open")
//             }
//         });

//         // Закрыть модальное окно при клике вне его
//         document.querySelector("#my-modal-2 .modal__box-1").addEventListener('click', event => {
//             event._isClickWithInModal = true;
//         });
//         document.getElementById("my-modal-2").addEventListener('click', event => {
//             if (event._isClickWithInModal) return;
//             event.currentTarget.classList.remove('open');
//         });

//         // Третья услуга

//         // Открыть модальное окно
//         document.getElementById("open-modal-btn-3").addEventListener("click", function() {
//             document.getElementById("my-modal-3").classList.add("open")
//         })

//         // Закрыть модальное окно
//         document.getElementById("close-my-modal-btn-3").addEventListener("click", function() {
//             document.getElementById("my-modal-3").classList.remove("open")
//         })

//         // Закрыть модальное окно при нажатии на Esc
//         window.addEventListener('keydown', (e) => {
//             if (e.key === "Escape") {
//                 document.getElementById("my-modal-3").classList.remove("open")
//             }
//         });

//         // Закрыть модальное окно при клике вне его
//         document.querySelector("#my-modal-3 .modal__box-2").addEventListener('click', event => {
//             event._isClickWithInModal = true;
//         });
//         document.getElementById("my-modal-3").addEventListener('click', event => {
//             if (event._isClickWithInModal) return;
//             event.currentTarget.classList.remove('open');
//         });

//         // Четвертая услуга

//         // Открыть модальное окно
//         document.getElementById("open-modal-btn-4").addEventListener("click", function() {
//             document.getElementById("my-modal-4").classList.add("open")
//         })

//         // Закрыть модальное окно
//         document.getElementById("close-my-modal-btn-4").addEventListener("click", function() {
//             document.getElementById("my-modal-4").classList.remove("open")
//         })

//         // Закрыть модальное окно при нажатии на Esc
//         window.addEventListener('keydown', (e) => {
//             if (e.key === "Escape") {
//                 document.getElementById("my-modal-4").classList.remove("open")
//             }
//         });

//         // Закрыть модальное окно при клике вне его
//         document.querySelector("#my-modal-4 .modal__box-3").addEventListener('click', event => {
//             event._isClickWithInModal = true;
//         });
//         document.getElementById("my-modal-4").addEventListener('click', event => {
//             if (event._isClickWithInModal) return;
//             event.currentTarget.classList.remove('open');
//         });

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
    const imgOne = document.querySelector(".callback");
    imgOne.style.setProperty('--background-image', 'url(' + `/uploads/${images[0].filename}` + ')');
    document.getElementById("requestsText").textContent = images[0].text;
})
.catch(error => console.error('Error fetching images:', error));

const plusesContent = (img, text) => {
    return `
    <div class="company-card" data-aos="fade-down">
        <img class="company-card-img" src="${img}" alt=>
        <p class="company-card-title">${text}.</p>
    </div>
    `;
};

const objectsContent = (img, text) => {
    return `
        <li class="catalog__item catalog__item_big">
        <article class="product-card catalog__card product-card_big">
        <img class="product-card__img product-card__img_big" src="${img}" alt="Объект">
        <div class="product-card__body product-card__body_big">
            <div class="product-card__body-top">
            <h3 class="product-card__title">
                ${text}
            </h3>
            </div>
        </div>
        </article>
    </li>
    `;
};

fetch('/imagespluses')
.then(response => response.json())
.then(images => {
    images.forEach(el => {
        document.querySelector(".company-row").insertAdjacentHTML("beforeend", plusesContent(`/uploads/${el.filename}`, el.text));
    });
})
.catch(error => console.error('Error fetching images:', error));

fetch('/imagesobjects')
.then(response => response.json())
.then(images => {
    images.forEach(el => {
        document.querySelector(".catalog__list").insertAdjacentHTML("beforeend", objectsContent(`/uploads/${el.filename}`, el.text));
    });
})
.catch(error => console.error('Error fetching images:', error));

fetch('/getcontacts')
.then(response => response.json())
.then(contacts => {
    document.getElementById("contactsPhone").textContent = contacts[0].phone;
    document.getElementById("contactsEmail").textContent = contacts[0].email;
    document.getElementById("contactsAddress").textContent = contacts[0].address;
    // document.getElementById("contactsMap").src = contacts[0].map;
})
.catch(error => console.error('Error fetching images:', error));

const gradeTemplate = (service, name, text, star) => {
    let template = `
    <div class="item testimonial-card">
        <main class="test-card-body">
            <div class="quote">
            <i class="fa fa-quote-left"></i>
            <h2>${service}</h2>
            </div>
            <p>${text}</p>
            <div class="ratings">
            `
    let templateLast = `
    </div>
    </main>
    <div class="profile">
        <div class="profile-desc">
        <span>${name}</span>
        </div>
    </div>
    </div>
    `
    for(let i = 0; i < parseInt(star); i++){
        template += `<i class="fa-solid fa-star"></i>`;
    }
    template += templateLast;
    return template;
}

fetch('/getgrades')
.then(response => response.json())
.then(grades => {
    grades.forEach((el, i) => {
        document.getElementById("gradesContainer").insertAdjacentHTML("afterbegin", gradeTemplate(el.service, el.name, el.text, el.star));
    });

    $('.testimonials-container').owlCarousel({
        loop:true,
        autoplay:true,
        autoplayTimeout:6000,
        margin:10,
        nav:true,
        navText:["<i class='fa-solid fa-arrow-left'></i>",
                 "<i class='fa-solid fa-arrow-right'></i>"],
        responsive:{
            0:{
                items:1,
                nav:false
            },
            600:{
                items:1,
                nav:true
            },
            768:{
                items:2,
                nav:true
            },
        }
    })
})
.catch(error => console.error('Error fetching images:', error));


fetch('/gettitle')
.then(response => response.json())
.then(title => {
    document.getElementById("titleContent").textContent = title[0].text;
})
.catch(error => console.error('Error fetching images:', error));

fetch('/getserviceslist')
.then(response => response.json())
.then(list => {
    document.querySelectorAll(".servicesList").forEach(el => {
        list.forEach(item => {
            el.insertAdjacentHTML("beforeend", `<option value="${item.service}">${item.service}</option>`);
        });
    });
})
.catch(error => console.error('Error fetching images:', error));