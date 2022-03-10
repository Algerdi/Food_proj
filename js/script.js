'use strict'; 

window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    const deadline = '2022-03-07';

    function getTimeRemaning(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaning(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }
    setClock('.timer', deadline);


    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
        //   modalCloseBtn = document.querySelector('[data-close]');


    
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });  

    

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    // modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    // Class for cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.tranfer = 3.3;
            this.changeToBYN();
        }

        changeToBYN() {
            this.price = this.price * this.tranfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length == 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            }
            this.classes.forEach(classname => element.classList.add(classname));
            element.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}"</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> BYN/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }


    // const div = new MenuCard();
    // div.render();

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        8,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        15,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        11,
        '.menu .container',
        'menu__item'
    ).render();



    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'That`s all. We`ll call you later!',
        failure: 'Oops!',
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display:block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'back.py');

            // request.setRequestHeader('Content-type', 'multipart/form-data');
            // const formData = new FormData(form);
            // request.send(formData);



            request.setRequestHeader('Content-type', 'aplication/json');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });
  
            const json = JSON.stringify(object);
            request.send(json);
            

            

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanks(message.success);
                    form.reset();
                    statusMessage.remove();
                    // setTimeout(() => {
                    //     statusMessage.remove();
                    // }, 2000);           
                } else {
                    showThanks(message.failure);
                    statusMessage.remove();
                }
            });

        });
    }

    function showThanks(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class='modal__content'>
                <div class='modal__close' data-close>×</div>
                <div class='modal__title'>${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
        
    }


    



































    //  Constructors 045

    // function User(name, id, human = true) {
    //     this.name = name;
    //     this.id = id;
    //     this.human = human;
    //     this.hello = function () {
    //         console.log(`Hello ${this.name}. income is ${this.id}`);
    //     };
    // }

    // User.prototype.exit = function() {
    //     console.log(`Пользователь ${this.name}!`);
    // };

    // const ivan = new User('Ivan', 24);
    // const dima = new User('Dima', 34, false);
    
    // console.log(ivan);
    // console.log(dima);
    // dima.hello();
    // dima.exit();



    //  Context call 046


    // 1 Обычная функция: this = window, но если 'use strict' - undefined

    // function showThis(a, b) {
    //     console.log(this);
    //     function sum() {
    //         console.log(this);
    //         return a + b;
    //     }
    //     console.log(sum());
    // }
    // showThis(4, 5);
    

    // 2 Контекст у методов объекта - сам объект

    // const obj = {
    //     a: 20,
    //     b: 15,
    //     sum: function() {
    //         function shout() {
    //             console.log(this);
    //         }
    //         shout();
    //     }
    // };
    // obj.sum();


    // 3 this в конструкторах и классах - это новый экземпляр объекта

    // function User(name, id) {
    //     this.name = name;
    //     this.id = id;
    //     this.human = true;
    // }
    // let ivan = new User('Ivan', 24);


    // 4 Ручная привязка this: call, apply, bind

    // function sayName(surname) {
    //     console.log(this);
    //     console.log(this.name + surname);
    // }

    // const user = {
    //     name: 'John'
    // };

    // sayName.call(user, 'Smith');
    // sayName.apply(user, ['Smith']);

    
    // function count(num) {
    //     return this * num;
    // }

    // const double = count.bind(2);

    // console.log(double(3));



    //  Video 047

    // class Rectangle {
    //     constructor(height, width) {
    //         this.height = height;
    //         this.width = width;
    //     }

    //     calcArea() {
    //         return this.height * this.width;
    //     }

    // }

    // class ColoredRectangleWithText extends Rectangle {
    //     constructor (height, width, text, bgColor) {
    //         super(height, width);
    //         this.text = text;
    //         this.bgColor = bgColor;            
    //     }

    //     showMyProps() {
    //         console.log(`Текст: ${this.text}, цвет: ${this.bgColor}`);
    //     }
    // }

    // const square = new Rectangle(5, 10);
    // console.log(square.calcArea());
    // const colorRec = new ColoredRectangleWithText(25, 10, 'dinamo', 'pink');
    // colorRec.showMyProps();
    // console.log(colorRec.calcArea());


    //  Task 049

    const log = function(a, b, ...rest) {
        console.log(a, b, rest);
    };
    
    log('basic', 'rest', 'oper', 'usage');


    function calcOrDouble(number, basis = 2) {
        console.log(number * basis);
    }
    calcOrDouble(3);


});


