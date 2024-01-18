import "@sass/main.scss";
import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import StyledComponentsRegistry from "../../lib/AntdRegistry";
import { NotificationProvider } from "@hooks/useNotification";
import { RQProvider } from "@hooks/useReactQuery";
import theme from "@root/theme";
import "./preload-resources";
import { motion, AnimatePresence } from "framer-motion";
import ClientSide from "@hooks/useClientSide";

const metadata: Metadata = {
  title: "My Property",
  viewport: "width=device-width, initial-scale=1.0",
  description: "Property management system",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ClientSide>
          <StyledComponentsRegistry>
            <NotificationProvider>
              {/* <ConfigProvider theme={theme}> */}
              <RQProvider>{children}</RQProvider>
              {/* </ConfigProvider> */}
            </NotificationProvider>
          </StyledComponentsRegistry>
        </ClientSide>
      </body>
    </html>
  );
};

export default RootLayout;
