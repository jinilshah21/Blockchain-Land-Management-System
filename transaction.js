function buySell () {
    //list of properties existing in the system :
    this.availableProp = [1,2,3,4,5,6,7,8,9,10] ;
    //an array to store history of transactions involving the properties :
    this.transHistory = [];
    //registered Users :
    this.usersRegistered = [];
}

//A one-one map between the properties and User
//Each User can own only one property at a time
const userData = new Map() ;

//a buyer is registered into the system automatically
buySell.prototype.buy = function(userId , propertyId){
    //loop through the list of properties
    for(let i = 0 ; i<this.availableProp.length - 1 ; i++){
        if(propertyId == this.availableProp[i]){
            //if property is not owned by anyone it gets assigned to the user
            if(userData.get(propertyId) == undefined){
                //mapping user and property
                userData.set(propertyId , userId)
                //the successful transaction is added to the transaction history array
                this.transHistory.push(userId);
                this.transHistory.push(propertyId);
                return "Success!!!" ;
            }
            else {
                //if property is owned by someone then it doesn't change anything
                return 'Property is already owned by someone' ;
            }
        }
        else {
            //if property is not part of the system then
            if(i == this.availableProp.length - 2)
            return "Property does not exist";
            else 
            continue;
        }
    }
       
    
}

buySell.prototype.sell = function(userId , propertyId){
//sell transactions
        if(userData.get(propertyId) != undefined){
            userData.set(propertyId , undefined);
            //successful transaction is being added to the transaction history array
            this.transHistory.push(userId);
            this.transHistory.push(propertyId);
            return "success" ;
        
        }
        else {
            //a non-registered user can't sell and a user can't sell someone else's property
            return 'This is not your property' ;
        }
}

module.exports = buySell ;
