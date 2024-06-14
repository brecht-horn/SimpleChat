![simpleChatReadme1](https://github.com/kaptn-splash/Splash/assets/119518056/9fda543f-65b1-4b51-964f-03aef66701c8)

# SimpleChat

SimpleChat is a easy-to-use, real-time chat application designed with the mern stack and socket.io. It includes a simple login and registration process, and allows real-time messaging between members. It even has emojis! 😜

## Getting Started

First, make sure you have node installed.

- [Nodejs](https://nodejs.org/en/download)

Then you have two methods of running the application:

## 1. Start with Fork or Clone

- Fork or clone the project.
- Next, install dependencies using "npm" (or equivalent based on operating system):

```shell
cd server
npm i
cd ..
cd public
npm i
```

- Now start the development server.

- For Frontend:

```shell
cd public
npm start
```

- For Backend, open another terminal in the project's root folder, and then:

```shell
cd server
npm start
```

- Now, simply open localhost:3000 in your browser. Enjoy Chatting!

## 2. Start with Docker Compose

- This method requires docker and docker-compose to be installed on your system.
- Make sure you are in the root folder, and run the following command.

```shell
docker compose build --no-cache
```

After the build is complete, run the containers using the following command:

```shell
docker compose up
```

Now, simply open localhost:3000 in your browser. Enjoy Chatting!

## Testing

In order to test the frontend, start the server:

```shell
cd server
npm start
```
Then in a new terminal:

```shell
cd public
npm run test
```

To test the backend, from the root folder:

```shell
cd server
npm run test
```

Thank you!

### Created by

Brecht Horn [GitHub](https://github.com/brecht-horn) | [LinkedIn](https://www.linkedin.com/in/brecht-horn-a9b839213/)

![simpleChatReadme3](https://github.com/kaptn-splash/Splash/assets/119518056/8a37d815-2532-4974-abab-85e6238d5c5a)
