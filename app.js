const {
  ThermalPrinter,
  PrinterTypes,
  CharacterSet,
  BreakLine,
} = require("node-thermal-printer");
const express = require("express");

const app = express();
const port = 3000;

let printer = new ThermalPrinter({
  type: PrinterTypes.EPSON, // Printer type: 'star' or 'epson'
  interface: "tcp://169.254.207.77", // Printer interface
  characterSet: CharacterSet.SLOVENIA, // Printer character set - default: SLOVENIA
  removeSpecialCharacters: false, // Removes special characters - default: false
  lineCharacter: "=", // Set character for lines - default: "-"
  breakLine: BreakLine.WORD, // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
  options: {
    // Additional options
    timeout: 5000, // Connection timeout (ms) [applicable only for network printers] - default: 3000
  },
});

// let isConnected = await printer.isPrinterConnected(); // Check if printer is connected, return bool of status
// let execute = await printer.execute(); // Executes all the commands. Returns success or throws error
// let raw = await printer.raw(Buffer.from("swag"));

app.get("/", (req, res) => {
  res.send("swag");
});

app.post("", express.raw({ type: "application/text" }), async (req, res) => {
  //

  printer.alignCenter();
  printer.println("Swagever");
  await printer.printImage("./assets/trust.png");
  printer.cut();

  try {
    let execute = printer.execute();
    console.log("that so printed!!");
  } catch (error) {
    console.error("sad no printe ;( :", error);
  }

  res.status(204);
  res.send();
});

app.listen(port, () => {
  console.log(`Thermal Printer loves you from port ${port}`);
});
