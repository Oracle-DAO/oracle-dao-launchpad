const ADDRESSES: { [key: string]: string; } = {
  STABLE_COIN_ADDRESS: "0xC2E42479c18438A2aa31499FE971bb06Af243d24"
};

export const getAddress = (key: string) => {
  return ADDRESSES[key];
}