import { ConfigProvider } from "antd";
import theme from "../../theme";
import "@sass/main.scss";

export default function Home() {
  return (
    <ConfigProvider theme={theme}>
      <main>
        <h1>WELCOME TO THE HOMEPAGE</h1>
      </main>
    </ConfigProvider>
  );
}
