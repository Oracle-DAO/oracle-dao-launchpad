const ADDRESSES: { [key: string]: string; } = {
  STABLE_COIN_ADDRESS: "0x4eD3fA53325D4AE5eE4CdEdA77831d37fDA7a7Ca"
};

export const getAddress = (key: string) => {
  return ADDRESSES[key];
}