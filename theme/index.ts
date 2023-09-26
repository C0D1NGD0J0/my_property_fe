import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: "#52c41a",
  },
  components: {
    Steps: {
      customIconFontSize: 10,
    },
  },
  hashed: false,
};

export default theme;
