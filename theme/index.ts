import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontSize: 9,
    colorPrimary: "#52c41a",
  },
  components: {
    Steps: {
      iconFontSize: 12,
      customIconFontSize: 10,
    },
  },
  hashed: false,
};

export default theme;
