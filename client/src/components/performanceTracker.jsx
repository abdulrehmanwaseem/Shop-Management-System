import { onLCP, onINP, onCLS } from "web-vitals";

function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onLCP(onPerfEntry);
    onINP(onPerfEntry);
    onCLS(onPerfEntry);
  }
}

export default reportWebVitals;
