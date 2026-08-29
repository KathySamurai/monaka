export const SAISEN_AMOUNTS = [
  { id: "500", label: "¥500", note: "コーヒー1杯ぶんの応援" },
  { id: "1000", label: "¥1,000", note: "ちょっと本気の気持ち" },
  { id: "3000", label: "¥3,000", note: "毎月いっしょにあそぶ" },
  { id: "10000", label: "¥10,000", note: "がっつり仲間として" },
  { id: "1000000", label: "¥1,000,000", note: "…え、いいんですか！？" },
  { id: "omakase", label: "おまかせ", note: "気持ちのぶんだけ" },
] as const;

export const SAISEN_DEFAULT_ID = "1000";

export type SaisenAmountId = (typeof SAISEN_AMOUNTS)[number]["id"];
