/*
Every javascript object has a prototype property, which makes inheritance possible in JS
The prototype property of an object is where we put methods and properties that we want other objects to inherit
The constuctors prototype property is NOT the prototype of the Constructor itslef, its the prototype of all instances that are created through it

When a certain method (or property) is called, the search starts in the object itself, and if it cannot be found, the search moves on to the 
objects prototype. This continous until the method is found: prototype chain.
*/



// Function constructor -> writing a blueprint 

//  

// Function constructor: starts with a capital letter 
// var Person = function(name, yearOfBirth, job){

//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
    
// }

// creating a new object using the new constructor function--> instantiation
// This new object is instances of the Person object    
// when we use the new operator, a brand new empty object is created    
// Then a constructor function (Person) is called with the arguments that we specified 
// Calling a function creates a new execution context, that also has a this variable 
// In regular function call the this variable points to the global object
// What the new operator does, is to the this variable not to the global object, but to the new empty object, that was created in the beginning when we use the this operator

// comment out ctrl + k + c 
// uncomment ctrl + k + u

// Person.prototype.calculateAge = 
// function(){
//     console.log(2020-this.yearOfBirth);
// };  

// Person.prototype.lastName = 'Smith';
// var john = new Person('John', 1993, 'Teacher');
// var Usman = new Person('Usman',1993,'Programmer');

// Usman.calculateAge();
// john.calculateAge();
// console.log(Usman.lastName);
// console.log(john.lastName);



     
// // object.create
// // we first define an object that will act as the prototype and then create a new object based on that prototype 
// var personPrototype = {  // is not a function constructor - we dont use a capital letter 
//     calculateAge:function(){
//         console.log(2016-this.yearOfBirth);
//     }
// };

// var john = Object.create(personPrototype);
// john.name = 'John';
// john.yearOfBirth = 1990;
// john.job = 'teacher';

// var jane = Object.create(personPrototype,
//     {
//         name:{value:'Jane'},
//         yearOfBirth:{value:1993},
//         job:{value:'coder'}
//     });




//     // primitives vs objects 
//     // variables containing primitives actually hold that data inside of the variable itself
//     // objects: variables associated with objects dont actually contain the object, but instead they contain a reference to the place in memory
//     // where the object is stored

//     // primitives
//     var a = 123;
//     var b = a;
//     a = 46;

//     // objects
//     var obj1 = {
//         name:'john',
//         age:26
//     };

//     var obj2 = obj1; // here we dont create an object, no copy was created her, we only create a new reference which points to the first object
//     // oj1 and obj2 variable both hold a refernce that point to exact same object in the memory, if we change the age in object1 - the 
//     // change is also reflected in obj2, because it is the same object 
//     obj1.age = 30;
//     console.log(obj1.age);
//     console.log(obj2.age);

//     // Functions
//     var age = 27;
//     var obj = {
//         name:'Jonas',
//         city:'Lisbon',

//     };

//     function change(a,b){ // we just pass the reference to an object 
//         a = 30;
//         b.city = 'San Francisco'
//     };

//     change(age,obj); // when we pass a primitive to a function, a simple copy is created we can chang a as much as we want it will never affect the variable on the outside, because it is a primitive
//     console.log(age); // primitive will remain unchanged 
//     console.log(obj.city); // city has changed from Lisbon to San Francisco
    


//                     //Functions are also objects in JS
//     // A function is an instance of the Object type
//     // a function behaves like any other object
//     // we can store functions in a variable
//     // we can pass an function as an argument to another function
//     // we can return a function from a function
//                     // because of that we say in JS: fUNCTIONS ARE FIRST CLASS FUNCTIONS



// // passing function as arguments
// var years = [1990,1965,1937,2005, 1998];
// // fn in this case is a callback function
// function arrayCalc(arr,fn){
//     var arrRes = [];
//     for(i = 0; i <arr.length;i++){
//         arrRes.push(fn(arr[i]));
        
//     }
    
//     return arrRes;
 
// }

// function calculateAge(el){
//     return 2016 - el;
// }

// function isFullAge(el){
//     return el >=18;
// }


// function maxHeartRate(el){
//     if(el >= 18 && el <=81){
//         return Math.round(206.9- (0.67 * el));  
//     }else{
//         return -1;
//     }
    
// }
// var ages = arrayCalc(years, calculateAge);

// var fullAges = arrayCalc(years,isFullAge);

// var rates = arrayCalc(ages, maxHeartRate);

// console.log(ages);

// console.log(fullAges);

// console.log(rates);


// // functions returning functions
// function interviewQuestion(job){
//     if(job === 'designer'){
//         return function (name){ // this is a anonymous function
//             console.log(name + ', can you please explain what ux design is?')

//         }
//     }else if (job === 'teacher'){
//         return function (name){
//             console.log('What subject do you teach,' + name + '?');
//         }
//     }else{
//         return function(name){
//             console.log('Hello '+ name + ', what do you do?'); 
//         }
//     }
// }

// var teacherQuestion = interviewQuestion('teacher');
// teacherQuestion('John');

// var designerQuestion = interviewQuestion('designer');
// designerQuestion('John');
// designerQuestion('Usman');
// designerQuestion('Dieter');
// designerQuestion('Joachim');
// designerQuestion('Michael');

// interviewQuestion('teacher')('Mark'); // left part returns a function and the right part, with the second parameter we call the function which was called before
// // above is evaluated from left to right


// // immediately invoked function expression (IIFE)
// function game(){
//     var score = Math.random()* 10;
//     console.log( score >= 5);

// }

// game();


// // IIFE
// // without name and parentheses, then the js parser would think, that it is a function declaration -> we dont have name for the function declaration -> will throw an error
// // we have to trick the parser to make it belive that what we have here, is an expression and not a declaration--
// // ----> SOLUTION: pack the entire thing into parentheses -> what is nor inside of parentheses, cannot be a statement 
// // with this we cannot longer access the score variable - data privacy 
// (function(){
//     var score = Math.random()* 10;
//     console.log( score >= 5);
// })(); // 2 parentheses is for invoking the function 

// (function(goodLuck){
//     var score = Math.random()* 10;
//     console.log( score >= 5 * goodLuck);
// })(5);

// // in this case we created a new scope that is hidden from the outside scope - where we can safely put variables -> with this we obtained data privacy
// // and also dont interfere with other variables in our global execution context - it is not for reusable code - just for data privacy


// // Closures 
// function retirement(retirementAge){
//     var a = ' years left until retirement'
//     return function(yearOfBirth){
//         var age = 2019 - yearOfBirth;
//         console.log((retirementAge - age) + a);
//     }
// }

// var retirmentUS = retirement(66); // in retirementUs the returned function will be stored
// retirmentUS(1993);

// // alternative syntax 
// retirement(66)(1993); // first part retirement(66) will return a function, then we can call the new function with yearOfBirth

//                 // CLOSURE //
// // An inner function has always access to the variables and parameters of its outer function, even after the outer function has returned.
// // The current execution context has closed in the outer on the outer variable object, so that it can use it -> thats why it is called closure

// var retirementGermany = retirement(65);
// var retirementIsland = retirement(67);

// retirementGermany(1993);
// retirementIsland(1993);


// Bind, call and apply
// var john = {
//     name:'John',
//     age:26,
//     job:'teacher',
//     presentation: function(style, timeOfDay){
//         if(style === 'formal'){
//             console.log('good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' + this.name + ',I\'m a ' + this.job + ' and I\'m '+ this.age + ' years old.');
//         }else if(style === 'friendly'){
//             console.log('Hey! What\'s up? I\'m ' + this.name + ',I\'m a' + this.job + 'and I\'m '+ this.age + ' years old. Have a nice '+ timeOfDay + '.' );

//         }
//     }

// }


// john.presentation('formal','morning');

// var emily = {
//     name: 'Emily',
//     age:35,
//     job:'designer'
// }
// // we want to use the presentation method for the emily object, which does not have this presentation method -> usage of the call method
// john.presentation.call(emily,'friendly', 'afternoon');

// call is in a way a method borrowing, because we actually borrowed the method from John to use it here on the Emily object 

// APPLY method -> similar to call, only difference is that the apply method accetps the argument as an array -> only 2 arguments, 
//first one is the this variable and than an array where all the other argument goes
//john.presentation.apply(emily,['friendly', 'afternoon']); // this wont work as the presentation function does not accept any array


// bind method
//bind is also similar to the call method, allows also to set the this variable , difference: bind does not immediately call the function
// but instead it generates the copy of the function, so that we can store it somewhere -> helpful to create functions with preset arguments

// var johnFriendly = john.presentation.bind(john,'friendly'); // bind allows to preset some arguments

// johnFriendly('moring');

// var emilyFormal = john.presentation.bind(emily,'formal');
// emilyFormal('afternoon');




// code challenge
// function constructor

// use of immediately invoked function expression
// by using of IIFE -> if someone else includes the code in his project and also has a variable called question or a variable called
// n or answer - that will not interfere with our code- our code will be saved - no code is going to override it
(function(){
    function Question(question, answer, correct){
        this.question = question;
        this.answer = answer;
        this.correct= correct;  
    
    }
    
    
    
    Question.prototype.displayQuestion =
    function(){
        console.log(this.question);
    
        for(i = 0; i<this.answer.length;i++){
            console.log(i + ': ' + this.answer[i]);
        }
    }
    
    Question.prototype.checkAnswer = 
    function(ans){
        if(ans === this.correct){
            console.log('correct answer!');
        }else{
            console.log('wrong answer');
        }
    }
    
    // first question (object)
    var q1 = new Question('Is JavaScript the coolest programming language?', // the new operator creates a new empty object, then it calls the question function
                            ['Yes','No'],
                            0);
    
    
    var q2 = new Question('What is the name of the course\'s teacher', 
                                    ['John','Micheal','Jonas'],
                                    2);
    
    var q3 = new Question('What does best describe coding?',
                            ['boring','fun','hard', 'tedious'],
                            1);
    
    var questions = [q1,q2,q3];
    
    var n = Math.floor(Math.random() * questions.length);
    
    questions[n].displayQuestion();
    
    var answer = parseInt(prompt('Please select the correct answer'));    
    
    
    questions[n].checkAnswer(answer); 
})();

