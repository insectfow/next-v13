import Header from "../components/Header";
import "./global.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <section className="container">
          <Header />
          {children}
        </section>
      </body>
    </html>
  );
}
