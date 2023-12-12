import "@sass/main.scss";
import type { Metadata } from "next";
import StyledComponentsRegistry from "../../lib/AntdRegistry";
import { NotificationProvider } from "@hooks/useNotification";
import { RQProvider } from "@hooks/useReactQuery";
import "./preload-resources";
import { motion, AnimatePresence } from "framer-motion";
import ClientSide from "@utils/ClientSide";

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
              <RQProvider>{children}</RQProvider>
            </NotificationProvider>
          </StyledComponentsRegistry>
        </ClientSide>
      </body>
    </html>
  );
};

export default RootLayout;
