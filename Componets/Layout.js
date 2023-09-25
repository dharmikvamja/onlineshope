// app/layout.js
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Hedear from "./Hedear";

config.autoAddCss = false;

export default function RootLayout({ children }) {
  return (


    <html>
     <Hedear/>

      <body>{children}</body>
    </html>
   

  )
}