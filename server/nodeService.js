import { Service } from "node-windows";

var svc = new Service({
  name: "Shop Management System",
  description: "The shop management system web server",
  script: `C:\\Users\\abdul\\OneDrive\\Desktop\\Shop Management System\\server\\server.js`,
});

svc.on("install", function () {
  svc.start();
});

svc.install();
