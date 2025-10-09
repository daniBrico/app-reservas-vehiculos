## Readme para github

Para corre la aplicación:

- Clonar el repositorio:
  - Descargarlo presionando en la parte superior donde dice `< > Code` y `Download ZIP`, extraerlo en su equipo y trabajar.
  - Si ya han configurado el SSH de de GitHub, simplemente posicionarse en una carpeta de su equipo, abrir la terminal en esa misma carpeta, y copiar y pegar el comando de SSH que aparece en `< > Code`. Eso clona el repositorio directamente.

**Aclaración**: Si o si, para poder trabajar en el repositorio, GitHub les va a pedir que configuren el SSH. Les dejo un [link](https://www.youtube.com/watch?v=akuG7eRtaXc) a un video para que sepan como hacerlo.

Una vez clonado el repositorio, simplemente abren Visual Studio Code en la carpeta del proyecto, ingresan, tanto a backend, como frontend, y ejecutan `npm install` para que se instalen todas las dependencias que se necesitan y puedan trabajar sin problemas.

### Tecnologías, extensiones, librerías

Extensiones útiles de VS-Code:

- **Thunder Client**: Esta extensión te permite hacer consultas básicas a una API. Obviamente pueden utilizar Postman o cualquier otra herramienta que sirva para esa finalidad, pero si no quieren hacerse tanto lio instalando un programa a parte, Thunder Client es básica y fácil de usar.
- **Tailwind CSS IntelliSense**: Esta extensión agrega un autocompletado a las clases de tailwind para programar más rápido y comodo. Para aquellos que vayan a utilizar tailwind, pueden consultar en la página ([link](https://tailwindcss.com/)) las diferentes clases que sustituyen las de CSS tradicional.
- **Prettier**: Este plugin te ayuda a formatear el código para que quede bien identado, con los espacios correctos, incluso acomodar las clases de tailwind para que sea más fácil su lectura.

Tecnologías utilizadas en el proyecto:

- Frontend: React, TypeScript, Tailwind, librería de componentes shadcdn.
- Backend: Node (v22.18.0), TypeScript, MongoDB (pueden instalar MongoDBCompass para tener una interfaz con la cual interactuar sobre la base de datos de MongoDB).
