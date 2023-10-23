import "@sass/main.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "../../lib/AntdRegistry";
import { NotificationProvider } from "../contexts/notification";

const inter = Inter({ subsets: ["latin"] });
type NotificationType = "success" | "info" | "warning" | "error";

export const metadata: Metadata = {
  title: "My Property",
  viewport: "width=device-width, initial-scale=1.0",
  description: "Property management system",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <NotificationProvider>{children}</NotificationProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
