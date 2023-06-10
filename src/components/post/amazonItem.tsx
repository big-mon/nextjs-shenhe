"use client";

import { AmazonBlock } from "@big-mon/react-component-amazon";
import { AMAZON_AFFILIATE } from "constants/owner";
import styles from "styles/amazon.module.scss";
import { Noto_Serif_JP } from "next/font/google";

type Props = {
  asin: string;
  name: string;
};

const notoSerif = Noto_Serif_JP({
  weight: "400",
  subsets: ["latin"],
});

const AmazonItem = ({ asin, name }: Props) => {
  return (
    <div className={styles.amazonBox}>
      <AmazonBlock asin={asin} id={AMAZON_AFFILIATE}>
        {name}
      </AmazonBlock>
    </div>
  );
};

export default AmazonItem;
