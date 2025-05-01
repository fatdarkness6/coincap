 export function calculateBigNumber(y) {
    if (y <= 1000000000000 && y >= 100000000000) {
      let transformed = `${(y / 1000000000).toFixed(2)}B`;
      return transformed;
    } else if (y <= 100000000000 && y >= 10000000000) {
      return `${(y / 1000000000).toFixed(2)}B`;
    } else if (y < 10000000000 && y >= 1000000000) {
      return `${(y / 1000000000).toFixed(2)}B`;
    } else if (y < 1000000000 && y >= 100000000) {
      return `${(y / 1000000).toFixed(2)}m`;
    } else if (y < 100000000 && y >= 10000000) {
      return `${(y / 1000000).toFixed(2)}m`;
    } else if (y < 10000000 && y >= 1000000) {
      return `${(y / 1000000).toFixed(2)}m`;
    } else if (y < 10000000 && y >= 100000) {
      return `${(y / 1000).toFixed(2)}k`;
    } else if (y < 100000 && y >= 10000) {
      return `${(y / 1000).toFixed(2)}k`;
    } else if (y < 10000 && y >= 1000) {
      return `${(y / 1000).toFixed(2)}k`;
    } else if (y >= 1000000000000) {
      return `${(y / 1000000000000).toFixed(2)}t`;
    } else if (y >= 0.01 || y < 0) {
      return parseFloat(y).toFixed(2);
    } else if (y < 0.01) {
      return parseFloat(y).toFixed(6);
    }else if(y == null || y == undefined || !y) {
      return `-`;
    }else {
      return "-_-"
    }
  }