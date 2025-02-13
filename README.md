# TVShows

This is a VueJs frontend project to show my frontend skills. The main premise of the project is to provide a dashboard for the user that displays TV shows and categorizes these shows based on genre 

## Functionality 

 - Dashboard displays various horizontal scrollable list of shows based on Genre
 - The dashboard allows the user to search for movies based on their title
 - The dashboard groups shows based on their genre and also allows to sort them by their rating
 - Full responsiveness on mobile,tablet & desktop screens
 - Dashboard shows all movies of a specific category when view more on the horizontal list is clicked


## Development Decisions

### TypeScript 
Typescript is used in this project to enable:
- Satic typing
- Interfaces and Custom typing
- Less prone to runtime errors

### Reactivity & State
- I make use of pinia store library to keep the state of the list of shows via api call when the application is mounted
- I make use of Vue state and emits to handle reactivity throughout the rest of the project 

### Sorting, Searching and Filtering 

For the logic to my Search, Sort and Filter:
- Filter takes priority over the search functionality so the search function works on filtered values 
- Sorting takes the least priority and has effect on Filtered & Search values

## Testing 

With the help of pinia and vitest I have created unit test for all the components making sure that all pages and functionality work as intended


![Screenshot 2025-02-13 at 12 27 29](https://github.com/user-attachments/assets/20427e95-8043-43c6-b29f-dec5ca8e9517)


## Extras

### Pagination 
I added a pagaination element to display the first 50 results based on filters and search. This is to give the website a more cleaner feel and not to overwhelm the uer with too many items on one page

### Debounced Search 
I made use of debounce in my search functionality for a more intuitive design and faster search:
- Search results are provided as user is typing

### Conditional Rendering 
To keep the user always engaged I make sure not to show any blank pages in the application and instead provide the user with an error message or a loading screen.

### Global CSS

I make use of a global css file to make sure all the css classes are available to all the components in the application.

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
