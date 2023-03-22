## MVST Github Search Task

This is a React application that allows the user to query their own and other people's github repositories

The app is deployed here [https://mvst-repository-search-task.onrender.com](https://mvst-repository-search-task.onrender.com), some very quick highlights:
- Accepting the challenge and using Github's GraphQl API, That require authorization to work which brings us to the second point
- Integration with github OAuth authorization, this actually not only required integration with the frontend but i also had to develop a proxy server (for security reasons), that backend is deployed here [https://mvst-task-proxy-service.onrender.com](https://mvst-task-proxy-service.onrender.com)
- Storybooks that range from simple to ones that run component tests
- Unit and integration tests some of which mock various aspects of the application
- Documented my code in hopes of improving your inspection experience
- TailwindCss for styles and dark theme toggle implementation

(PS: i m going to send this as a zip file but if you would like to view it on github send me an email on mekni.wassime@gmail.com and i will invite you to the private repo)

Also if the app takes a long time to login that's because it goes through a proxy server hosted for free that gets shutdown for inactivity, please hang tight as it will automatically start but it might take about 30 seconds, only login goes through a proxy

## How To Run
Don't forget to run `npm install`

You can run the application locally by running `npm start` but it won't fonction correctly (explanation below)

To check the app in action visit this link [https://mvst-repository-search-task.onrender.com](https://mvst-repository-search-task.onrender.com)

Explanation: this application requires github authorization to work because it is built using Github's GraphQl API which requires authentification
For that reason the application redirects you to Github's OAuth site which then redirects back to [https://mvst-repository-search-task.onrender.com](https://mvst-repository-search-task.onrender.com) instead of localhost
## How To Run Tests
You run the Storybook by running two commands in this order
- `npm run pre-storybook` this generates tailwind.css file that the storybook uses
- `npm run storybook` to start Storybook, `Components/TextInput/AutomaticSubmitInteraction` for example runs a component test using storybook interactions

To run the unit and integration test suits use `npm test`

## Future improvements

- biggest one is implementing advanced search features (filter by programming language, stars, forks etc), the mechanisme for constructing these queries are implemented but i didn't get to implement their UI
- making it so that you can run storybook with one command, it might be a webpack thing or maybe versions are missmached but to figure it out i need time
- use proper hosting services with CLIs that would allow me two write proper CI/CD pipelines that run tests, build and deploy etc
- spend more time on making sure errors are handled properly
- expand repository from list to view more information
- allow the user to Star repositories
- spend more time writing more tests and increasing code coverage
- add search and filters to the url as query params so that they could be shared with other people
- one of the tests is complaining about an async change despite that being how things are supposed to go, the test is passed but it still complains so i need time to figure why that is happening


thats what i can think of off the top of my head for now, hope you like what i managed to put together 😁

---
