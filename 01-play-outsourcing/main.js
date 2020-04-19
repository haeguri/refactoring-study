import { htmlStatement } from "./statement.js";
import invoices from "./data/invoices.js";
import plays from "./data/plays.js";

document.querySelector("#result").innerHTML = htmlStatement(invoices[0], plays);
