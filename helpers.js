const escpos = require("escpos");
escpos.SerialPort = require("escpos-serialport");

const device = new escpos.SerialPort("/dev/ttyUSB0");

const options = {
  encoding: "GB18030" /* default */,
};
// encoding is optional

const printer = new escpos.Printer(device, options);

const print = (instructions) => {
  //print each instruction
  //based on type
  //text
  for (instruction of instructions) {
    switch (instruction.type) {
      case "text":
        printText(instruction);
        break;
      case "image":
        break;

      default:
        break;
    }
  }
};

const printText = (text) => {
  device.open(function (error) {
    printer.font("a").align("ct").style("bu").size(1, 1).text(text);
  });
};

const printImage = (image) => {
  //recieves image url + opt formatting
  //creates local file
  //resize with sharp
  //create escpos Image
  //print
};
