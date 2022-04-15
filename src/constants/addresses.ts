const ADDRESSES: { [key: string]: string; } = {
  STABLE_COIN_ADDRESS: "0xe3d9f491D84Fb39D0ACA6dB49ed02758Ed40AEcF"
};

export const getAddress = (key: string) => {
  return ADDRESSES[key];
}