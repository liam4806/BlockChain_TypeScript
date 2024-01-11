import crypto from "crypto";

interface BlockShape {
  hash: string;
  prev_hash: string;
  data: string;
  height: number;
}
class Block implements BlockShape {
  public hash: string;
  constructor(
    public prev_hash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.GenerateHash(prev_hash, height, data);
  }
  static GenerateHash(prev_hash: string, height: number, data: string): string {
    const temp_hash = `${prev_hash}${height}${data}`;
    return crypto.createHash("sha256").update(temp_hash).digest("hex");
  }
}

class BlockChain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private GetPrev_Hash(): string {
    if (this.blocks.length === 0) {
      return "";
    } else {
      return this.blocks[this.blocks.length - 1].hash;
    }
  }
  public addBlock(data: string) {
    const newblock = new Block(
      this.GetPrev_Hash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newblock);
  }
  public viewBlock(): Block[] {
    return [...this.blocks];
  }
}

const testblockchain = new BlockChain();
testblockchain.addBlock("Test1");
testblockchain.addBlock("Test2");
testblockchain.addBlock("Test3");

console.log(testblockchain.viewBlock());
