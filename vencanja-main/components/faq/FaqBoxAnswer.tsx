import { FC } from "react";
import { motion } from "framer-motion";
import styles from "./FaqBoxAnswer.module.css";
import Paragraph from "../shared/typography/Paragraph";

interface FaqBoxAnswerProps {
  descripiton: string;
}

const FaqBoxAnswer: FC<FaqBoxAnswerProps> = ({ descripiton }) => {
  return (
    <div className={styles.container}>
      <Paragraph className={styles.answer} center={false}>
        {descripiton}
      </Paragraph>
    </div>
  );
};
export default FaqBoxAnswer;
