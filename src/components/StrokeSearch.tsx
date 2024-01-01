import { Input } from "antd";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import { fullToHalf, halfToFull } from "~/lib/utils";
import classifier from "~/lib/classifier";

interface StrokeSearchProps {
  sequence: string;
  setSequence: (s: string) => void;
}

const StrokeSearch = ({ sequence, setSequence }: StrokeSearchProps) => {
  const numbers = Object.values(classifier);
  const valid = Array.from(sequence).every((x) =>
    numbers.includes(parseInt(x, 10)),
  );
  return (
    <Input
      placeholder="输入笔画（１２３４５．．．）搜索"
      status={valid ? undefined : "error"}
      onChange={(event) => {
        setSequence(fullToHalf(event.target.value));
      }}
      prefix={<SearchOutlined />}
      value={halfToFull(sequence)}
    />
  );
};

export default StrokeSearch;
