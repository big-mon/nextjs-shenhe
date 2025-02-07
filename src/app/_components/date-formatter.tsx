import { format } from "date-fns";
import { ja } from "date-fns/locale";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = dateString;
  return (
    <time dateTime={dateString}>
      {format(date, "yyyy 年 M 月 d 日", { locale: ja })}
    </time>
  );
};

export default DateFormatter;
