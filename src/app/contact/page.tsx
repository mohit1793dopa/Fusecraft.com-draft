import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Fusecrafts about custom detail work.",
};

export default function ContactPage() {
  return <ContactClient />;
}
