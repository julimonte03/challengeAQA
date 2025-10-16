El usuario abre la página React (frontend).

En Login, al hacer submit, el frontend hace POST http://localhost:4000/api/login.

El backend (Express) recibe la petición, valida credenciales (hardcode), y devuelve { ok: true, user, token }.

El frontend guarda el user en memoria (estado) y muestra la vista Chat.

En Chat, al abrir la vista, el frontend hace GET http://localhost:4000/api/messages para obtener la historia.

Al enviar un mensaje, frontend hace POST /api/messages con { user, text }. El backend lo guarda en MongoDB (colección messages) y retorna el objeto guardado. Frontend lo agrega a la lista.

Agregado -> el frontend está haciendo poll cada 3s para actualizar mensajes en real time
-------------------------------------------------------------------------------------------

Buenas practicas:

Endpoints con prefijo /api: separación entre frontend y API.

Modelo Mongoose: estructura clara de datos; fácil de testear.

data-cy en inputs/buttons: identifica elementos para tests E2E sin romper con cambios de estilos.

Logs y manejo simple de errores: facilita debugging durante la demo.


--------------------------------------------------------------------------------------------

Cypress + Cucumber preprocessor (BDD):

Tener feature files legibles para mostrar en la entrevista.

Tests E2E veloces y estables.

Fácil integración con CI y generación de reportes.
---------------------------------------------------------------------------------

TESTS:

Login success (login.feature) ✅

Login fail (login.feature) ✅

Login validation missing fields (test de UI)

Send single message (chat.feature) ✅

See seeded messages in history (chat.feature) ✅

Reject empty message (chat.feature) ✅

Send multiple messages and order is correct

Long message handling (envío de string muy largo)

Special characters / XSS escape (mensaje con <script>)

UI elements present (input, button, header) — smoke test

Unauthorized send (API returns 401 when no token) — backend API test

Backend persists messages (API test: POST then GET)

Concurrent messages (simulate 2 users via API + UI)

Error handling: backend returns 500 => UI shows error

REPORTES Y COBERTURA: 

cd aqa
npm run test

generará archivos JSON en aqa/reports/mochawesome. Para obtener HTML también podés usar herramientas para convertir JSON a HTML (mochawesome hace esto si configuras html=true). Ajusta el script si querés HTML directo:
"test": "cypress run --reporter mochawesome --reporter-options reportDir=reports/mochawesome,overwrite=false,html=true,json=true"
