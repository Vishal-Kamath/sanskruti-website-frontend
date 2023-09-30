import { Text, View } from "@react-pdf/renderer";
import { FC } from "react";

const TableHead: FC<{
  headings: {
    title: string;
    width: number;
  }[];
}> = ({ headings }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        borderBottom: "1px",
        paddingBottom: "3px",
        borderBottomColor: "#000000",
        fontWeight: 900,
      }}
    >
      {headings.map((header, index) => (
        <Text
          key={index}
          style={{
            width: `${header.width}%`,
            textAlign:
              index === 0
                ? "left"
                : index === headings.length - 1
                ? "right"
                : "center",
          }}
        >
          {header.title}
        </Text>
      ))}
    </View>
  );
};

export default TableHead;
