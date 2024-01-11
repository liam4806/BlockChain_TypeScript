# BlockChain_TypeScript

### Implementing BlockChain with TypeScript and Object Oriented Programming. 

## Sample Output
```TypeScript
[
  Block {
    prev_hash: '',
    height: 1,
    data: 'Test1',
    hash: '9d6612acca329bfc67e013429f90377f8cee77a28ad483d3324f58de59edd5bc'
  },
  Block {
    prev_hash: '9d6612acca329bfc67e013429f90377f8cee77a28ad483d3324f58de59edd5bc',
    height: 2,
    data: 'Test2',
    hash: 'f0413f528b6ffd6205fc6685e22a78ec32bc81190a78b9fe10356d76a0b4a75e'
  },
  Block {
    prev_hash: 'f0413f528b6ffd6205fc6685e22a78ec32bc81190a78b9fe10356d76a0b4a75e',
    height: 3,
    data: 'Test3',
    hash: 'af67b5e6ab8b236754316669b017c63ae7b19edf472346681bc8b5c1467f6d1d'
  }
]

```

## Start
```TypeScript
import crypto from "crypto";
```
Used **crypto module** from types/node to generate a hash value. 

## Interface

```TypeScript
interface BlockShape {
    hash:string
    prev_hash:string
    data:string
    height:number
}
```
Initializing the shape of the block using an interface that will be added inside the blockchain later. 

There are four essential values: hash, previous hash, data, and height of the block. 

## Class Block

```TypeScript
class Block implements BlockShape{
    public hash: string; //initializing the hash value outside of the constructor.
    constructor(
      public prev_hash:string,
      public height: number,
      public data: string,  
    ){
        this.hash = Block.GenerateHash(prev_hash, height, data) //Setting the hash value using the static method of the Block class.
    }
    static GenerateHash(prev_hash:string, height: number, data:string):string{
        const temp_hash = `${prev_hash}${height}${data}` //Setting hash value(previous hash + height + data)
        return crypto.createHash("sha256").update(temp_hash).digest("hex"); ##Getting hash value in form of hexadecimal digits.
    }
}
```
It initializes the hash value outside of the constructor because we are going to create the hash value later inside this class using prev_hash, height, and data.

It will compress prev_hash, height, and data. The compress variable temp_hash will be used to create a hash value using the createHash method inside the crypto and get a hash value consisting of hexadecimal digits.

```TypeScript
class BlockChain { 
    private blocks: Block[]; //'blocks' as a array with class Block.
    constructor(){
        this.blocks=[]
    }
    private GetPrev_Hash():string{ //Used to get previous hash value
        if(this.blocks.length===0){  //If the block array is empty, returns empty string.
            return ""
        }else{
            return this.blocks[this.blocks.length-1].hash //Else, gets the latest hash value.
        }
    }
    public addBlock(data:string){
        const newblock = new Block(this.GetPrev_Hash(), this.blocks.length+1, data) //Create new Block 
        this.blocks.push(newblock)
    }
    public viewBlock():Block[]{
        return [...this.blocks] //Returns block with a new array to private giving access to the original block array.
    }
}
```
Class BlockChain will have an array that must consist of class Block. 

It will create a Block class inside with the given string data and push it to the blockchain.

Method viewBlock will not return the array block directly to prevent giving access to the original blocks array. Instead, it will create a new array with the same data.

## Testing

```TypeScript
const testblockchain = new BlockChain();
testblockchain.addBlock("Test1");
testblockchain.addBlock("Test2");
testblockchain.addBlock("Test3");

console.log(testblockchain.viewBlock())
```

## Sample Output
```TypeScript
[
  Block {
    prev_hash: '',
    height: 1,
    data: 'Test1',
    hash: '9d6612acca329bfc67e013429f90377f8cee77a28ad483d3324f58de59edd5bc'
  },
  Block {
    prev_hash: '9d6612acca329bfc67e013429f90377f8cee77a28ad483d3324f58de59edd5bc',
    height: 2,
    data: 'Test2',
    hash: 'f0413f528b6ffd6205fc6685e22a78ec32bc81190a78b9fe10356d76a0b4a75e'
  },
  Block {
    prev_hash: 'f0413f528b6ffd6205fc6685e22a78ec32bc81190a78b9fe10356d76a0b4a75e',
    height: 3,
    data: 'Test3',
    hash: 'af67b5e6ab8b236754316669b017c63ae7b19edf472346681bc8b5c1467f6d1d'
  }
]

```
