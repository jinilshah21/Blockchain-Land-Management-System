const Blockchain = require('./blockchain');
const Registration = require('./registration');
const Transaction = require('./transaction');
const buySellFunction = new Transaction();
const bitcoin = new Blockchain();
const userReg = new Registration();
const SHA256 = require('sha256');
const buySell = require('./transaction');
const prompt = require('prompt-sync')();
const _prevHash = bitcoin.chain[0].prevHash;

console.log(bitcoin.chain[0]);//Prints the genesis block in terminal

var _transactionNum = 0;
var n = 1; //to 
var m = 1;
var TXLength = 0 ; //to store number of new transactions created

function options() {

    
    var temp = prompt(
        "Select any one of the following : \n" +
        "Click 0 : Add transactions \n" +
        "Click 1 : See transactions added \n" +
        "Click 2 : Start mining block \n" +
        "Click 3 : Register New user\n" +
        "Click 4 : Buy Property\n" +
        "Click 5 : Sell Property\n" + 
        "Click 6 : Exit\n"
    )

    return temp ;
}



var whatNext = options();


while(whatNext !=6 ){


if(whatNext == 1){ //this option will allow us to see the transaction history of a particular given property
    //the propertyId is taken as an input and searched 
    var transID = prompt("Property ID : ");
    for(let i = 0 ; i < bitcoin.newTransaction.length ; i++){
        if(transID == bitcoin.newTransaction[i].amount){
            console.log(bitcoin.newTransaction[i]);
            break;
        }
    }
    let owned = 0;
    //the transaction history is stored in the "transHistory" array of the buySellFunction
    for(let j = 0 ; j < buySellFunction.transHistory.length - 1 ; j++){
        if(transID == buySellFunction.transHistory[2*j + 1]){
            if(owned == 0){
                //the buyer of the property
                console.log("Owner : " +  buySellFunction.transHistory[2*j] + " Property Id : " + buySellFunction.transHistory[2*j+1]);
                owned = 1;
            }
            
            else {
                //the seller of the property
                console.log("seller : " +  buySellFunction.transHistory[2*j] + " Property Id : " + buySellFunction.transHistory[2*j+1]);
                owned = 0;
            }
    
        }
    }
    whatNext = options();
}

else if(whatNext == 2){
    
    if(m > 0){//sell 
        //the new sell transaction is added into the newTransaction array which will be used in mining the block
        TXLength = bitcoin.newTransaction.length ;
        _transactionNum = TXLength ;
        m--;
    }

    if(n > 0){//buy 
        TXLength = bitcoin.newTransaction.length ;
        _transactionNum = TXLength;
        n--;
    }
    else {
        TXLength = 0;
    }
     

    if(_transactionNum > 0){
        console.log(bitcoin.POW(_prevHash));//the new inputted transactions are send to the bitcoin.Pow function to add them to the block
        if(_transactionNum != 1){
            //
            _transactionNum = _transactionNum - 2 ;
        }
        
        else
        break;
    }
    else {
        break;
    }
    

}


else if(whatNext == 3){
    //this option is used to register new users
    prompt("Click Enter to register yourself ");
    //userId and propertyId is taken as an input
    var _userId =  prompt("User Id : ") ;
    var _propertyId = prompt("Property Id :");

    console.log(userReg.addUser(_userId,_propertyId));//the addUser function adds the user and propertyId to the array of new users
//the addUser will check if user already exists or if the property already belongs to someone
    whatNext = options();
}

else if(whatNext == 4){
//the buy transaction input function

//userId and propertyId is taken as an input
    var buyer  = prompt('Buyer Id : ');
    var propertyToBuys = prompt('Property Id : ');

    console.log(buySellFunction.buy(buyer , propertyToBuys));//the buy function is called along with sending the inputted parameters
    bitcoin.createNewTrans(buyer , propertyToBuys , 0 );

    whatNext = options();
    
}

else if(whatNext == 0){
    
    //new transactions can be inoutted and mined dyamically
    //this option was created to explore the properties we created with the merkle tree
    //the buy and sell options are used as actual transactions


    //we take number of transactions as input before taking the transactions input
    _transactionNum = prompt("Number of transactions : ");
    
    for(let i = 0 ; i< _transactionNum ; i++){

        var _seller = prompt("Seller ID : ");
        var _buyer =   prompt("Buyer ID : ");
        var _amount =   prompt("Property ID : ");
        if(i<_transactionNum-1)
            var next = prompt("Click enter for new transaction ->>");

    bitcoin.createNewTrans(
        _amount , _seller , _buyer , _transactionNum
    ) 

    
    }

    whatNext = options();
}

else {
    //sell function 
    //this is similar to the buy function 
    var seller  = prompt('Seller Id : ');
    var sellerPropID = prompt('Property ID : ');
    console.log(buySellFunction.sell(seller , sellerPropID));
    bitcoin.createNewTrans(seller , sellerPropID , 0 );
    whatNext = options();
}

}
