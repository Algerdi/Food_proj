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
            this.price = (this.price * this.tranfer).toFixed(2);
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



    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`У тебя ошибка в фетч ${url} со статусом ${res.status}`);
        }

        return await res.json();
    };


    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price})=> {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price})=> {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });


    // getResource('http://localhost:3000/menu')
    // .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src="${img}" alt="${altimg}">
    //             <h3 class="menu__item-subtitle">${title}"</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> BYN/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container'). append(element);

    //     });
    // }

    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'That`s all. We`ll call you later!',
        failure: 'Oops!',
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display:block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            // const object = {};
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

  
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanks(message.success);
            })
            .catch(() => {
                showThanks(message.failure);
            })
            .finally(() => {
                form.reset();
                statusMessage.remove();
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


    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));

    // fetch('http://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST',
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         'Content-type': 'application/json',
    //     }
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json));


    



































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


    // //  Task 049

    // const log = function(a, b, ...rest) {
    //     console.log(a, b, rest);
    // };
    
    // log('basic', 'rest', 'oper', 'usage');


    // function calcOrDouble(number, basis = 2) {
    //     console.log(number * basis);
    // }
    // calcOrDouble(3);


    // Task 057

    // const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemart'];
    // const shortNames = names.filter(function(name) {
    //     return name.length < 5;
    // });
    // console.log(shortNames);



    // const answers = ['ivAn', 'AnnA', 'Hello'];
    // const result = answers.map(item => item.toLowerCase());
    // console.log(result);



    // const some = [4, 'qwq', 'stsqbsf'];
    // console.log(some.some(item => typeof(item) === 'number'));


    // const ev = [4, 'qwq', 'stsqbsf'];
    // console.log(ev.every(item => typeof(item) === 'number'));



    // const arr = [4, 5, 1, 3, 2, 6];
    // const res = arr.reduce((sum, current) => sum + current, 21);
    // console.log(res);



    // const obj = {
    //     ivan: 'persone',
    //     ann: 'persone',
    //     dog: 'animal',
    //     cat: 'animal',
    // };

    // const newArr = Object.entries(obj)
    // .filter(item => item[1] === 'persone')
    // .map(item => item[0]);
    // console.log(newArr);





});


