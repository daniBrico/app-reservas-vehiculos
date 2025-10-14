## Readme para github

En primer instancia es necesario tener instalado NVM (Node Versión Manager), el cual gestiona las diferentes versiones de Node. La versión de Node que necesitamos para correr el proyecto será la última LTS.

Aclarado esto, debemos clonar el repositorio de github para tenerlo de forma local. Luego de esto, abrir la carpeta del mismo y posicionarnos, ya sea en la parte de backend o frontend y ejecutar en consola `npm install`, para instalar todos los paquetes necesarios para que la aplicación funcione.

Para iniciar el servidor del proyecto y realizar modificaciones ejecutar `npm run dev`. Esto abrirá un servidor local para ver en tiempo real los cambios realizados.

### Frontend

Para el frontend vamos a utilizar React con TypeScript, acompañando los estilos con Tailwindcss, y una librería de componentes para no tener que hacer todo desde cero.

La librería que vamos a utilizar es shadcdn (https://ui.shadcn.com/).

Cómo la aplicación va a tener diferentes links, vamos a necesitar utilizar react-router para gestionar las diferentes url's.

### Backend

En el lado del backend utilizaremos Node junto con TypeScript. Para el desarrollo de la API utilizaremos Express y Mongoose, que es el ODM para realizar la gestión de la base de datos MongoDB.

## Readme para github

Para corre la aplicación:

- Clonar el repositorio:
  - Descargarlo presionando en la parte superior donde dice `< > Code` y `Download ZIP`, extraerlo en su equipo y trabajar.
  - Si ya han configurado el SSH de de GitHub, simplemente posicionarse en una carpeta de su equipo, abrir la terminal en esa misma carpeta, y copiar y pegar el comando de SSH que aparece en `< > Code`. Eso clona el repositorio directamente.

**Aclaración**: Si o si, para poder trabajar en el repositorio, GitHub les va a pedir que configuren el SSH. Les dejo un [link](https://www.youtube.com/watch?v=akuG7eRtaXc) a un video para que sepan como hacerlo. O tambien este [link](https://www.youtube.com/watch?v=_2Hih_XylUA).

Una vez clonado el repositorio, abren Visual Studio Code en la carpeta raíz del proyecto. Tanto dentro de la carpeta backend, como de la carpeta frontend, deberán ejecutar el comando `npm install`, para que se instalen todos los paquetes necesarios para que la aplicación funcione.

Para lanzar la aplicación, tanto frontend como backend de forma local, ejecutar `npm run dev`.

### Tecnologías, extensiones, librerías

Extensiones útiles de VS-Code:

- **Thunder Client**: Esta extensión te permite hacer consultas básicas a una API. Obviamente pueden utilizar Postman o cualquier otra herramienta que sirva para esa finalidad, pero si no quieren hacerse tanto lio instalando un programa a parte, Thunder Client es básica y fácil de usar.
- **Tailwind CSS IntelliSense**: Esta extensión agrega un autocompletado a las clases de tailwind para programar más rápido y comodo. Para aquellos que vayan a utilizar tailwind, pueden consultar en la página ([link](https://tailwindcss.com/)) las diferentes clases que sustituyen las de CSS tradicional.
- **Prettier**: Este plugin te ayuda a formatear el código para que quede bien identado, con los espacios correctos, incluso acomodar las clases de tailwind para que sea más fácil su lectura.

Tecnologías utilizadas en el proyecto:

- Frontend: React, TypeScript, Tailwind, librería de componentes shadcdn.
- Backend: Node (v22.18.0), TypeScript, MongoDB (pueden instalar MongoDBCompass para tener una interfaz con la cual interactuar sobre la base de datos de MongoDB).

### Como correr la web:

1- Instalar la extensión MongoDB en VS Code, conectarse entre si:

Desde la web MongoDB conectando:

Overview (Menu lado izquierdo) -> Connect (Contenido del medio)-> MongoDB for VS Code -> copiar el link del paso 3 (pero en "<db_password>" sobreescribirlo por la contraseña de tu usuario de MongoDB). Luego ese link copiarlo cuando en la extensión MongoDB pide que se conecte.

2- Crear el la carpeta "backend" el archivo ".env":

Ir a la extensión de MongoDB (icono hoja): Ver en el primer menu (icono hoja verde) que en mi caso dice "poo-iii.u6lodlt.mongodb.net", tocar click derecho y darle en "Edit connection...".

Se dirige a "MongoDB" desde VS Code, tocar en donde dice "URL" y tildar la opción "Edit Connection String", para copiarlo en:

MONGO_URI= **"PEGAR"**/"**nombre_base_de_datos"**?retryWrites=true&w=majority

JWT_SECRET=clave_super_secreta

PORT=3000

Ejemplo: MONGO_URI=mongodb+srv://leonardogomez_db_user:pooiii@poo-iii.u6lodlt.mongodb.net/app_reservas?retryWrites=true&w=majority

**"PEGAR"**: mongodb+srv://leonardogomez_db_user:pooiii@poo-iii.u6lodlt.mongodb.net

**"nombre_base_de_datos"**: app_reservas.

3- Abrir la terminal en la carpeta "backend" para instalar las dependencias:

npm install

4- Abrir la terminal en la carpeta "frontend": para instalar las dependencias:

npm install

5- Abir la terminal en la carpeta "backend" para escribir datos de creacion de usuarios (es para probar que si funciona la conexion entre MongoDB y VS Code):

npx tsx src/seed.ts

6- Abir la terminal en la carpeta "backend" para conectarse a MongoDB:

npm run dev

7- Abir la terminal en la carpeta "frontend" para conectarse al servidor de la web y probar la misma:

npm run dev

8- En el apartado de "Iniciar sesión" es para probar que hace bien el "Login":

Escribir correo y contraseña escrita en el paso 4, que dará correcta (no la hasheada que arroja en MongoDB).

### Importar/clonar repositorio (ultima actualización)

1- git config --global user.name "NOMBRE USUARIO GIT" **(va con comillas)**

2- git config --global user.email "CORREO" **(va sin comillas)**

3- ssh-keygen -t ed25519 -C "CORREO" **(va con comillas, EN MI CASO ME MOSTRÓ POR PANTALLA: "Generating public/private ed25519 key pair.
Enter file in which to save the key (/c/Users/campe/.ssh/id_ed25519): ... y más"). Tocar enter hasta que te deje escribir otras lineas**

4- eval "$(ssh-agent -s)" **(va con comillas, al menos en Git Bash si, en VS Code o en otro tipo de terminal capaz va sin comillas, EN MI CASO ME MOSTRÓ POR PANTALLA: Agent pid 2340)**

5- ssh-add ~/.ssh/id_ed25519 **(EN MI CASO ME MOSTRÓ POR PANTALLA:** **"Identity added: /c/Users/campe/.ssh/id_ed25519 (campeonleonardo@hotmail.com)"**)

6- **VER VIDEO en** [link](https://www.youtube.com/watch?v=_2Hih_XylUA) **(ver desde minuto 2:11 hasta 3:02) para hacer lo de SSH (es obligatorio).**

7- ssh -T git@github.com **(EN MI CASO ME MOSTRÓ POR PANTALLA: "Hi NOMBRE_USUARIO! You've successfully authenticated, but GitHub does not provide shell access).**

8- git clone git@github.com:daniBrico/app-reservas-vehiculos.git **(clonar repositorio, EN MI CASO ME MOSTRÓ POR PANTALLA: Cloning into 'app-reservas-vehiculos'... y datos de los archivos que se clonaron).**

### Actualizar repositorio

1- git status

2- git add . **(va con el punto)**

3- git commit -m "MENSAJE A DEJAR DE LO QUE MODIFICÓ"

4- git push origin main
