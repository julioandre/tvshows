# tvshows

This is a VueJs frontend project that fetches a list of TV shows and then displays them on a dashboard for the user. These dashboard has a serch functionality and also a sort by rating functionality to sort by the shows rating.
Additiionaly it is able to filter based on the show genre.

## Development Decisions

### TypeScript 

I made use of Typescript in my project to reduce runtime errors by adding strong typing to  and static checking to my projects.

### Pinia & Vitest 

I made use of the pinia library to create a store for global state management fr retrieving the list of shows from the api. I also made use of vitest and pinia test for mocking and testing my components 

### Genre List 

For the list of Genres I had hardcoded list of genres, because looping through the entire data to find unique genres when we have a set of universal genres of shows was a waste of resources.

### Pagination 

I added pagination for when the shows listed were more than 50 per page;

### Search & Filter

The Search and Filter work hand in hand, in the sense that the search, only searches items that are on the filter page 

## Versioning
 Node: >= 18.4
 NPM: >= 9.5
 
## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
