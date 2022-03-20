const ADDRESSES: { [key: string]: string; } = {
  STABLE_COIN_ADDRESS: "0x997AC2c1bbDcF188494DafAB18C22323Ddc9947A"
};

export const getAddress = (key: string) => {
  return ADDRESSES[key];
}