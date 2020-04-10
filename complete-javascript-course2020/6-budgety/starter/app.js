// module pattern
// how ro use the module pattern
// More about private and public data, encapsulation and separation of concerns
// why do we need modules: keep pieces of code, that are related to each other, together - inside of separate, independant and organized units
// each of this modules will have variables and functions that are private, which means that they are only accessible inside of the module
// no other code should overwrite our data
// data encapsulation: allows us to hide the implementation details of a specific module from the outside scope, so that we only expose a public interface 
// which is sometimes called an API 
// For the implementation of modules all we need to know is the concepts of closures and IIFE

// var budgetController = (function(){
//     var x = 23;  // from outside we dont have access to the inner scope .. x will be undefined 
//     var add = function(a){  // add function will also not available outside, because it is a private function
//         return x + a;
//     }
//     return{
//         // the publicTest function that we return has always access to the x variable and the add function, because a closure was created 
//         publicTest: function(b){ // public exposed: thanks to closures an inner function has always access to the variables and parameters of its outer function, even if the outer function has returned

//             return add(b);
//         }
//     }
// })();




// Budget Controller 
var budgetController = (function(){
    // we need a data model for expenses and incomes here
    // each new item will have a description and a value!
    // we should be able to distinguish between incomes and expenses -> have them a unique ID number
    // solution -> object, that has a value and an ID
    // if we have to create a lots of objects -> create function constructors- that we can use to extantiate lots of objects   
    //          CREATE A CUSTOM DATATYPE FOR INCOME AND EXPENSES

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // we need a good datastructure to store all Expenses and Incomes --> ARRAYS
     var data = {
         allItems:{
             exp:  [],
             inc: [] 
         }, 
         totals:{
             exp: 0,
             inc: 0

         }
     }

     // public method, that allows other modules to add a new item into our data structure
     return {
         addItem: function(type, des, val  ){
             var newItem, ID;
            // [1 2 3 4 5], next ID = 6 // this can be a huge problem if we delete items from this
            // [1 2 4 6 8 ]  next id should be 9// if we now would say the next id is 6, than we would have a huge problem-with 2 6's
            // ID = last ID + 1 
            // create new ID
            // when the array is empty, then the new ID should be 0
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length -1].id +1;

            }else {
                ID = 0;
            }
             
             
             // Create new item based on 'inc' or 'exp' type 
             if(type === 'exp'){
                 // add a new expense
             newItem =  new Expense(ID, des, val);
             }else if (type === 'inc'){
                 newItem = new Income(ID, des, val);
             }
             // Push it into our data structure
             data.allItems[type].push(newItem); // type can be exp or inc
             return newItem; 
             
         },

         // testing in the console - because the datasturcure (data) is not visible
         testing: function(){
             console.log(data);
         } 
     };

})();



// the 2 modules that we created now, there are completely independent modules, there will not be any interaction between these 2 ever
// they should be standalone and as independent as possible 
// example: if we want to create a more complex budget app, with a completely different user interface, you can take the budget controller module
// and expand it and not think about the user interface at all, because the user interface is seperated from the data - they dont communicate at all
// that is called separation of concerns -> means each part of the application should only be interested in doing one thing independently 
// AGAIN: The 2 controllers dont know about each other  --> stand alone -- 
// but we need some way to have these two connected -- a way to read data from the user interface and then add 
// that data as a new expanse in the budgetController and thats why we create a 3rd module, which is the app controller, and 
// 

// UI APP CONTROLLER - controller calling some methods which are not defined here - but in other modules- methods in modules do something and return also

var UIController = (function(){

    var DOMstrings  = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'

    }


    return{
        // method returning all of the 3 inputs that we had in the user interface 
        getInput: function(){
            
            // return an object with 3 properties instead of having 3 separate varaibles 
            return{
             type: document.querySelector(DOMstrings.inputType).value, // will be either in or exp
             description: document.querySelector(DOMstrings.inputDescription).value,
             value:  document.querySelector(DOMstrings.inputValue).value

            };
            
        },

        addListItem : function(obj, type){
            var html, newHtml, element;
            // Create HTML string with placeholder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html ='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if (type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
           

           

            // Replace the placeholder text with some actual data (received from the object)
            newHtml = html.replace('%id%' ,obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            // beforeend keyword makes it so that all of our HTML will be inserted as a child of the containers (income and expenses) but as the last child/ last element in the list
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);  

        },


        clearFields: function(){
            var fields, fieldsArr;
            // querySelector does not return an array but a list - similar to array, but doesnt have the nice methods
            //solution - convert the array to a list and use the slice method -> returns a copy of the array that is called on
            // normally we pass in slice method an array and it returns an array -Trick: we can pass list and it returns an array 
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' +  DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields); // we set the this variable to the fields

            // using the for each method
            // we can access the current element thanks to the callback function- which has access to the 3 arguments
            // original array which is in this case the fields array 
            fieldsArr.forEach(function(current, index, array){ // current= actual element beeing processed
                current.value = "";

            });
        },

        getDOMstrings: function(){
            return DOMstrings; // exposing the DOMstrings object in to the public
        }
    };
})();









// Global APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){  // 2 parameters

    var setupEventListeners = function(){
    // inside the DOM variable we have all the strings that we have in the UIcontroller
    // because we exposed them to the public 
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
       
        document.addEventListener('keypress', function(event){
            //older browser dont use keyCode property, they use which
            if(event.keyCode=== 13 || event.which === 13){
                ctrlAddItem();
            } 
            
        });
    
    };


 

    var ctrlAddItem = function(){
        var input, newItem;
        //1. get the field input data
        input = UICtrl.getInput();
        
        
         //2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description,  input.value);
         // 3. Add the item to the user interface
         UICtrl.addListItem(newItem, input.type);

         // 4. Clear the fields
         UICtrl.clearFields();


         // 5. Calculate the budget



         // 6. Display the budget on the UI

    };

    return {
        // init function - have a place where we can put all the code that we want to be executed right at the beginning 
        // when out application starts 
        init: function(){
            console.log('Application has started');
            setupEventListeners();
        }
    }; 





  
})(budgetController, UIController);  // pass the arguments into the function- 
// above the budgetController will be assigned to the budgetCtrl, likewise UIController to UICtrl
// we do that like this, because if we would have to change the name module, we would have to do this all over our code


 // nothing is going to be happen without this line, because there will be no Eventlisteners
 // and without Eventlisteners we can not input data without data , there is no application
controller.init();
















































/*

// Budget controller 
// first enclosing parantheses makes the function an expression 
// last 2 parantheses tells the js compiler to invoke or call the (anonymous) function immediately
// popular use of IIFE: avoid declaring variables in the global scope and to create closures
// Many js libraries use this techniques so that variable names dont conflict between the library and the 
// programs that might use the library
var budgetController = (function(){

    // Some Code
})();



// UI Controller 
// the controller will call this method and it wants receive back all of these values-> we have to return something here

var UIController = (function(){

    var DOMstrings = {
        inputType:'.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn:'.add__btn'


    }
    return{
        getInput: function(){
            // return an object that contains all of these 3 properties
            // instead of having 3 separate variables - 1 object with 3 properties
            return{
                // read the data from the user interface
                 type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                 description : document.querySelector(DOMstrings.inputDescription).value,
                 value :  document.querySelector(DOMstrings.inputValue).value
            };
            

        },
            // because the Domstrings object is here (in different controller than the global controller, from where we dont have access)
            //best solution is to pass this object from one controller (module) to the other --> similar to getInput method
            getDOMstrings :function(){
                return DOMstrings; // we are exposing the private Domstrings object into the public
            }
    };
})();







// Global App controller

var controller  = (function(budgetCtrl, UICtrl){
    // get the DOMstrings
    var DOM = UICtrl.getDOMstrings;

    var ctrlAddItem = function(){
    // 1. get the field input data
    var input = UICtrl.getInput();
    console.log(input);

    // 2. add the item to the budget controller

    // 3. add the item to the UI

    // 4. Calculate the budget
    }

    document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

    document.addEventListener('keypress', function(event){
    
        if(event.keyCode === 13 || event.which === 13 ){
            ctrlAddItem();
        } 
    

    });

})(budgetController, UIController);


*/

