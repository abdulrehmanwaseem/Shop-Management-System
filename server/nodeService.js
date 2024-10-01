import { Service } from "node-windows";

// Create a new service object
var svc = new Service({
  name: "Store Management System",
  description: "The store management system web server.",
  script: `C:\\Users\\abdul\\OneDrive\\Desktop\\Shop Management System\\server\\server.js`,
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", function () {
  svc.start();
});

svc.install();
