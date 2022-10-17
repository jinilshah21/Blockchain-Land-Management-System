const sha256 = require('sha256');//required sha256 npm package
const transaction = require('./transaction');//required the transaction.js file to use its functions 
const buyselltrans = new transaction();

function Blockchain () {
    this.chain = []; 
    this.newTransaction = [];

    this.createNewBlock(0 , '0' , '0');//genesis block
}

Blockchain.prototype.createNewBlock = function (nonce , prevHash , hash){//function adds new block in the chain array and makes newTransaction array empty
    const newBlock = {// Structure of block 
        index: this.chain.length + 1, // Block index / block number
        timestamp : Date.now(), //UNIX Timestamp
        nonce: nonce, // Golden number which gives use hash under the difficulty level
        hash: hash, // Hash of current block which is under difficulty level
        prevHash: prevHash, // Hash of previous block with respect to current block
    }

    this.newTransaction = [];
    this.chain.push(newBlock);//the new block mined is pushed into the chain 

    return newBlock;
}


Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1];
}// returns last block details 

Blockchain.prototype.createNewTrans = function(amount , sender , reciever , transactionNum){
//This function is used for creating new transactions and pushing them in the newTransaction array    

        const newTransactions = {// Structure of newTransactions added from terminal
            amount: amount,// Amount is property ID
            sender: sender,//Sender is seller ID 
            reciever: reciever // Reciever is buyer ID
        };

        this.newTransaction.push(newTransactions);// We push the input to the newTransaction array

    
}
Blockchain.prototype.hashBlock = function(prevHash, merkelRoot , nonce){
    const dataAsString = prevHash + nonce.toString() + merkelRoot ; //block headder inputed in sha256 to find block hash
    const hash = sha256(dataAsString); // finding hash using dataAaString as first-pre-image

    return hash;
}

Blockchain.prototype.POW = function(prevHash){// Proof Of Work consensus mechanism function 
  

    let nonce = 0 ;//initially nonce is zero
    prevHash = this.chain[this.chain.length-1].hash; // we save the hash of previous block in prevHash variable and input it below
    let hash = this.hashBlock(prevHash, this.merkelRoot(2), nonce);//we get the hash of current block as a return value by calling hashBlock function

    while(hash.substring(0,4) !== '0000'){ //we can set the difficulty level by varying the number of zereos needed
        nonce++; //nonce changed and hash generated according to required difficulty level
        hash = this.hashBlock(prevHash,this.merkelRoot(2),nonce);
    }

    const blockStruct = {//Block Structure which gets printed in terminal as a new block 
        hash : hash,//current block hash
        timestamp : Date.now(),//block timestamp
        MerkelRoot : this.merkelRoot(2),//merkel root 
        Nonce : nonce,
        PrevHash : prevHash
    }

    this.chain.push(blockStruct);//pushing mined block in the chain array

    return [
        "hash : " + hash,//current block hash
        "TimeStamp : " + Date.now(),//block timestamp
        "Merkel Root : " + this.merkelRoot(2),//merkel root 
        "Nonce : " + nonce,
        "Prev Hash : " + prevHash,
    ]

    }
    
    

Blockchain.prototype.merkelRoot = function(_leafNodes) {// Merkel root implementation function 
    const leafNodes = _leafNodes ;//_leafNodes is the number of transactions a block can store 
    let nodePerItr = leafNodes;//nodePerItr is variable which gets updated every iteration of loop. It is number of leafNodes/hashNodes in each level of merkel tree
    
        let nodeArr = [];// nodeArr stores hashes in each nodes 
        let low = 0;// A low pointer 
        let h = low+1; //High pointer
        let i = 0;
        let j = 0;
        while(j < leafNodes){//loop used to stringify the transaction data
            nodeArr[j] =  sha256(JSON.stringify(this.newTransaction[j]));
            j++;
        }

        while(nodePerItr >1){//Loop executes untill we get the merkel root. Which means one hash node in merkel root level 

            if(nodePerItr % 2 == 0){ 
                while(h<=nodePerItr-1){
                  nodeArr[i] =  sha256(nodeArr[low] + nodeArr[h] + Date.now());
                  low = h+1;
                  h = low + 1;
                  i++;
              }
              nodePerItr = nodePerItr/2;
          }
          else {
  
                while(h<=nodePerItr-1){
                  nodeArr[i] =  sha256(nodeArr[low] + nodeArr[h] + Date.now());
                  low = h+1;
                  h = low + 1;
                  i++;
                  if(low == nodePerItr - 1){
                      h = low ;
                      continue;
                  }
              }
              nodePerItr = (nodePerItr + 1)/2;
          }

        }

        return [
            nodeArr[0],//current block merkel root 
        ]

    }
    
module.exports = Blockchain;