
import "./globals.css";

export const metadata = {
  title: "Jishnu Santhosh | Full Stack Web Developer",
  description:
    "Jishnu Santhosh is a Full Stack Web Developer specializing in React, Next.js, Node.js, Express.js and MongoDB.",
  keywords: [
    "Jishnu Santhosh",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "JavaScript Developer",
  ],
  authors: [{ name: "Jishnu Santhosh" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
