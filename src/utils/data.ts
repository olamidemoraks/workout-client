export const alphabetsColor: { [key: string]: string } = {
  A: "bg-[#B19470]/70",
  B: "bg-[#76453B]/70",
  C: "bg-[#88AB8E]/70",
  D: "bg-[#DC84F3]/70",
  E: "bg-[#F7B787]/70",
  G: "bg-[#DC8686]/70",
  H: "bg-[#B4BDFF]/70",
  I: "bg-[#CE5A67]/70",
  J: "bg-[#FF6969]/70",
  K: "bg-[#B19470]/70",
  L: "bg-[#76453B]/70",
  M: "bg-[#88AB8E]/70",
  N: "bg-[#DC84F3]/70",
  O: "bg-[#F7B787]/70",
  P: "bg-[#DC8686]/70",
  Q: "bg-[#B4BDFF]/70",
  R: "bg-[#CE5A67]/70",
  S: "bg-[#FF6969]/70",
  T: "bg-[#B19470]/70",
  U: "bg-[#76453B]/70",
  V: "bg-[#88AB8E]/70",
  X: "bg-[#DC84F3]/70",
  Y: "bg-[#F7B787]/70",
  Z: "bg-[#DC8686]/70",
};

export function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}
