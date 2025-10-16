import './commands';
import 'cypress-mochawesome-reporter/register';

// Opcional: antes de cada test podés limpiar la DB, loggear, etc.
before(() => {
  // Esto se ejecuta antes del *suite*; podemos preparar datos con API calls.
});
