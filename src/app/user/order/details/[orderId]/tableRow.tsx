import { Text, View } from "@react-pdf/renderer";
import { FC } from "react";

const TableBody: FC<{
  contents: {
    title: string;
    width: number;
  }[];
}> = ({ contents }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: "10px",
        fontWeight: 100,
        color: "#374151",
      }}
    >
      {contents.map((content, index) => (
        <Text
          key={index}
          style={{
            width: `${content.width}%`,
            textAlign:
              index === 0
                ? "left"
                : index === contents.length - 1
                ? "right"
                : "center",
          }}
        >
          {content.title}
        </Text>
      ))}
    </View>
  );
};

export default TableBody;
