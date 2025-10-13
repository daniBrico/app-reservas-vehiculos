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
