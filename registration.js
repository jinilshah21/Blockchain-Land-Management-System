function Registration() {//function registers new users with previously owned property

    this.userId =[];//user id will get stored in this array
    this.propertyId = [1,2,3,4,5,6,7,8,9,10];//fixed number of properties to buy/own
    this.propertyTaken = [];//the property which have already been taken by a registered user is stored in this array
}

Registration.prototype.addUser = function(_id, _property) {//function takes user id and user property as inputs and registers them 

    


    for(let i = 0 ; i < this.propertyId.length - 1 ; i++){//loop to check if that property is actually owned by that guy
        if(_property == this.propertyId[i]){
            const newUser = {
                id : _id ,
                property: _property
            }
        
            this.userId.push(newUser.id);
            this.propertyTaken.push(newUser.property);
            for(let j = 0 ; j < this.propertyTaken.length - 1 ; j++){
                //loop through the taken properties array and check if it is already owned by someone
                if(_property == this.propertyTaken[j])
                return "Property Owned by someone" ;
            }
            for(let j = 0 ; j < this.userId.length - 1 ; j++){
                //an already registered user is not allowed to register again
                if(_id == this.userId[j])
                return "You are Already registered" ;
            }

            return "Success You are registered";
        }
        else{
            //if the property is not part if the system at all
            if(i == this.propertyId.length - 2){
                 return "Property does not exist in the system" ;
            }
            else 
            continue;
        }
        
       
    }

}

module.exports = Registration ;