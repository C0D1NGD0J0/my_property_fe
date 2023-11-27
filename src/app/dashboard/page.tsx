"use client";
import { ContentHeader } from "@components/PageHeader";

export default function Page() {
  return (
    <ContentHeader
      showBtn={false}
      pageTitle={"Dashboard"}
      onButtonClick={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
}
