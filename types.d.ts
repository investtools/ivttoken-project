interface Ethereum {
  isMetaMask?: boolean;
  request(args: { method: string; params?: any[] }): Promise<any>;
}

interface Window {
  ethereum?: Ethereum;
}
