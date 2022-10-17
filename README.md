# Blockchain Land Management System  
 A blockchain made using JavaScript which manages land ownership and transaction records 

This project aims at building land management system with the following features: 
1. To register new users to the system with previously owned property
2. The user can buy and sell the property.
3. Proof Of Work(PoW) consensus algorithm is incorporated to improve the security of the blockchain.
4. Implementation of Merkle tree to calculate root hash of all the transactions inside a block.
5. User can view the transaction history that is related to a property.


Installation

To run this project, you will require following packages:
1.Run the following command to install sha256 package:
$ npm install --save sha256

2.Run the following command to install prompt package:
$ npm install --save prompts

blockchain.js file
1. Blockchain(): This function initializes an empty array called chain which will contain all the blocks in sequential order.
It will also initialize an empty array called newTransaction which will contain all the transactions in chronological order.
It will create the genesis block.

3. createNewBlock()
It will have parameters of nonce, hash of previous block and hash of current block.
It will create a new block with all its data and add it to the array "chain".

4. getLastBlock()
This will return the last block in the array "chain".

5. createNewTrans()
This will take property Id, seller Id & buyer Id as parameters. It will create a new structure called 'newTransactions' which will have seller, buyer, and property Id. This transaction will be added into the array 'newTransaction'.


6. hashBlock():
This will take hash of previous block, merkel root & Nonce as parameters. This will use sha256 algorithm to calculate the hash of the block using all the parameters and current time. 

7. POW():
This will initialize the nonce as zero and call the hashBlock() function by giving current nonce as paramters and checking if the hash calculated has four zeroes at the start, if not then it will increment the value of nonce till it finds a hash that has four zeroes at the start. This function returns the calculated hash of the current block, timestamp and also the merkel root.

8. merkelRoot():
It takes number of transaction as a parameter. It implements the merkel tree to calculate the merkel root .



 
 
 registration.js file
 1.Registration(): It initializes the userId array which will contains the ids of all the registered users.It will also initialize the propertyId array which will contain Ids from 1 to 10.

 2. addUser():
This function will check if the property Id requested by the user is available in the propertyId array and if it is present the it will register the user by adding his Id in userId array, If not then it will throw the error ‘Property doesn’t exist in the system’.

 test.js:
It will include all the files in the project and give them object name. It will create instances of all the js files which then will be used to access all the functions from these files. This file creates a menu which displays all the options to be used to use all the features of the project like buying, selling and mining the block. This file is to be run to use this project.
To run this file use command “node test.js” in the terminal.

transaction.js file
1.	buySell():
It initializes the available property array called availableProp which has values from 1 to 10. It also initializes array called usersRegistered.

2.	buy():
It takes userId and propertyId as parameters and checks if property is owned by someone, If yes then it will throw the error ‘Property already owned by someone’. If no, then it assigns the property to that user.

3.	sell()
It takes userId and propertyId as parameters and checks if userId is assigned to that property. If it is, then it returns ‘success’  and removes the link between the user and property.
If it is not assigned then it throws the error ‘This is not your property’.

 

