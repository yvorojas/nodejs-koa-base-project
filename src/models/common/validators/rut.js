const calculateDv = (run) => {
    const runArray = run.split('').reverse();
    let cont = 2;
    let sum = 0;
    runArray.forEach((runElem) => {
      if (cont > 7) {
        cont = 2;
      }
      sum += runElem * cont;
      cont += 1;
    });
    const rest = 11 - (sum % 11);
    switch (rest) {
      case 11:
        return '0';
      case 10:
        return 'k';
      default:
        return rest.toString();
    }
  };
  
  const isRut = (input) => {
    if (!input || input.trim() === '') { return false; }
    const splittedRut = input.split('-');
    if (splittedRut.length !== 2) { return false; }
    const run = splittedRut[0];
    const dv = splittedRut[1];
    /* eslint-disable */
    if (isNaN(run)) { return false; }
    /* eslint-enable */
    if (calculateDv(run) !== dv) { return false; }
    return true;
  };

  module.exports = {
    isRut
  };