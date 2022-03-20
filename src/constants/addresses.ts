const ADDRESSES: { [key: string]: string; } = {
  STABLE_COIN_ADDRESS: "0x3BC5fDA6bC97bfC32BED5258350CbbE3e09D7938"
};

export const getAddress = (key: string) => {
  return ADDRESSES[key];
}