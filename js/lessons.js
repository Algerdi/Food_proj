'use strict'; 

// Регулярные выражения 
    // new RegExp('pattern', 'flags');
    // /pattern/f


    // const ans = prompt('введите ваше имя');

    // const reg = /n/ig;
    
    //  Флаги в регулярке
    // i - независимо от регистра
    // g - поиск нескольки вхождений
    // m - многострочный режим

    // console.log(ans.search(reg));
    // console.log(ans.match(reg));

    // const pass = prompt('password');

    // console.log(pass.replace(/love/g, 'pizza'));

    // console.log('12-34-56'.replace(/-/g, ':'));



    // const reg = /[^a]/g;

    // const ans = prompt('введите вашу строку');

    // // console.log(reg.test(ans));

    // //  \d - цифры
    // //  \w - буквы
    // //  \s - пробелы
    // console.log(ans.match(reg));





//  LOCAL STORAGE

    // localStorage.setItem('number', 5);
    // console.log(localStorage.getItem('number'));
    // localStorage.removeItem('number');
    // localStorage.clear();




// Incapsulation

    // function User(name, age) {
    //     this.name = name;
    //     let userAge = age;

    //     this.say = function() {
    //         console.log(`Username: ${this.name}, age ${userAge}`);
    //     };

    //     this.getAge = function() {
    //         return userAge;
    //     };

    //     this.setAge = function(age) {
    //         if (typeof age === 'number' && age > 0 & age < 110) {
    //             userAge = age;  
    //         } else {
    //             console.log('Unacceptable');
    //         }
    //     };
    // }

    // const ivan = new User('Ivan', 27);
    // console.log(ivan.name);
    // console.log(ivan.getAge());

    // ivan.setAge(30);
    // ivan.setAge(300);
    // console.log(ivan.getAge());

    // ivan.say();


    //   Class incaps

    // class User{
    //     constructor(name, age) {
    //         this.name = name;
    //         this._age = age;
    //     }

    //     #surname = 'Kozlov';
      

    //     say = () => {
    //         console.log(`Username: ${this.name} ${this.#surname}, age ${this._age}`);
    //     }

    //     get age() {
    //         return this._age;
    //     }

    //     set age(age) {
    //         if (typeof age === 'number' && age > 0 & age < 110) {
    //             this._age = age;  
    //         } else {
    //             console.log('Unacceptable');
    //         }
    //     }
    // }

    // const ivan = new User('Ivan', 27);
    // console.log(ivan.surname);

    // ivan.say();



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




    // Try/Catch

    // try {
    //     console.log('normal');
    // } catch(error) {
    //     console.log('error');
    // } finally{
    //     console.log('хочу пиццы');
    // }


    


