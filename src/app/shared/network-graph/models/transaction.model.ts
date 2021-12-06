export class Transaction {
  public blockHash: string;
  public blockNumber: string;
  public confirmations: string;
  public contractAddress: string;
  public cumulativeGasUsed: string;
  public from: string;
  public gas: string;
  public gasPrice: string;
  public gasUsed: string;
  public hash: string;
  public input: string;
  public isError: string;
  public nonce: string;
  public timeStamp: string;
  public to: string;
  public transactionIndex: string;
  public txreceipt_status: string;
  public value: string;

  constructor(data: any) {
    this.blockHash = data.blockHash;
    this.blockNumber = data.blockNumber;
    this.confirmations = data.confirmations;
    this.contractAddress = data.contractAddress;
    this.cumulativeGasUsed = data.cumulativeGasUsed;
    this.from = data.from;
    this.gas = data.gas;
    this.gasPrice = data.gasPrice;
    this.gasUsed = data.gasUsed;
    this.hash = data.hash;
    this.input = data.input;
    this.isError = data.isError;
    this.nonce = data.nonce;
    this.timeStamp = data.timeStamp;
    this.to = data.to;
    this.transactionIndex = data.transactionIndex;
    this.txreceipt_status = data.txreceipt_status;
    this.value = data.value;
  }
}
