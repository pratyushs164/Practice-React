# BugBounty — React Learning Notes

This project is being built as a practical way to revise and strengthen React fundamentals. The application explores GitHub repositories and their open issues, with a watchlist feature for saving issues.

---

## 📚 Concepts Studied

### 1. React Components

Learned how to break a React application into small, reusable functional components.

Components created in this project include:

- `Home`
- `LanguageCard`
- `LangRepo`
- `RepoCard`
- `RepoIssues`
- `IssueCard`
- `Watchlist`
- `Header`
- `Layout`

The goal is to give each component a clear responsibility instead of putting all application logic into one component.

---

## 2. JSX

Learned how JSX allows HTML-like syntax to be written inside JavaScript.

Example:

```jsx
<h1>{issue.title}</h1>
```

JavaScript expressions can be inserted into JSX using `{}`.

---

## 3. Props

Learned how data can be passed from a parent component to a child component.

Example:

```jsx
<LanguageCard lang={lang} />
```

and:

```jsx
function LanguageCard({ lang }) {
  // use lang
}
```

Props are useful for making components reusable and allowing parents to control the data passed to children.

---

## 4. State with `useState`

Learned how `useState` is used to store data that can change during the lifetime of a component.

Used state for:

- Repository data
- Issues
- Loading state
- Error state
- Watchlist data

Example:

```jsx
const [issues, setIssues] = useState([]);
```

When state changes, React re-renders the component.

---

## 5. Lifting State Up

Learned that state should generally be owned by the component that needs to manage it and can be moved to a common parent when multiple components need access to it.

This was initially used for the selected language functionality.

---

## 6. Prop Drilling

Practiced passing data and functions through multiple components using props.

Example concept:

```text
Parent
  ↓ props
Child
  ↓ props
Grandchild
```

This helped demonstrate why Context API can be useful when deeply nested components need access to shared data.

---

## 7. Context API

Learned how Context API can provide shared state without manually passing props through every component.

Used:

```jsx
createContext()
useContext()
Provider
```

Created a custom hook:

```jsx
const useWatchList = () => {
  return useContext(WatchlistContext);
};
```

An important lesson from the project was:

> Context should not be used for everything.

For example, the selected language did not need Context once it became part of the URL.

---

## 8. Custom Hooks

Created custom hooks around Context:

```jsx
useWatchList()
```

This provides a cleaner way for components to consume the Context instead of directly calling `useContext()` everywhere.

---

## 9. React Router

Implemented client-side routing using:

```jsx
createBrowserRouter()
RouterProvider
```

Current routes include:

```text
/
 /repo/:lang
 /repo/:owner/:repoName/issues
 /watchlist
```

This allows different parts of the application to be represented by different URLs.

---

## 10. `Link`

Learned to use React Router's `Link` for internal navigation.

Example:

```jsx
<Link to="/watchlist">
  Watchlist
</Link>
```

Using `Link` avoids a full browser page reload when navigating within the React application.

---

## 11. Internal vs External Navigation

Learned an important distinction:

### Internal application route

Use:

```jsx
<Link to="/watchlist">
```

### External website

Use:

```jsx
<a
  href={issue.html_url}
  target="_blank"
  rel="noopener noreferrer"
>
```

For example, GitHub repository and issue URLs are external links.

---

## 12. URL Parameters with `useParams`

Used dynamic URL parameters to determine which data should be fetched.

Example:

```jsx
const { owner, repoName } = useParams();
```

For:

```text
/repo/facebook/react/issues
```

React Router provides:

```text
owner = "facebook"
repoName = "react"
```

This allows the application to dynamically fetch information based on the URL.

---

## 13. `useEffect`

Learned that `useEffect` is used to perform side effects such as API requests.

Example pattern:

```jsx
useEffect(() => {
  const fetchData = async () => {
    // API request
  };

  fetchData();
}, [owner, repoName]);
```

The dependency array controls when the effect should run.

For example:

```jsx
[owner, repoName]
```

means the effect runs again if either parameter changes.

---

## 14. Fetch API

Used the browser's `fetch()` API to retrieve data from GitHub.

Basic flow:

```text
fetch()
   ↓
Response object
   ↓
response.ok
   ↓
response.json()
   ↓
JavaScript data
   ↓
setState()
```

Example:

```jsx
const response = await fetch(url);

if (!response.ok) {
  throw new Error("Failed to fetch data");
}

const data = await response.json();
setIssues(data);
```

---

## 15. `response.ok`

Learned that `fetch()` does not automatically throw an error for HTTP errors such as `404` or `403`.

Therefore, HTTP status should be checked manually:

```jsx
if (!response.ok) {
  throw new Error("Request failed");
}
```

---

## 16. Async/Await with `useEffect`

Learned that the callback passed directly to `useEffect` should not be made `async`.

Instead, define an async function inside the effect:

```jsx
useEffect(() => {
  const fetchIssues = async () => {
    // async code
  };

  fetchIssues();
}, []);
```

---

## 17. Loading State

Implemented loading states while waiting for API responses.

Example:

```jsx
const [loading, setLoading] = useState(false);
```

Then:

```jsx
setLoading(true);

try {
  // fetch data
} finally {
  setLoading(false);
}
```

Conditional rendering can then display:

```jsx
return loading ? (
  <h1>Loading...</h1>
) : (
  // actual content
);
```

---

## 18. Error Handling

Implemented error handling using:

```jsx
try {
  // API request
} catch (error) {
  setError(error);
} finally {
  setLoading(false);
}
```

The application can then display an appropriate error state.

Also learned that an `Error` object contains useful information such as:

```jsx
error.message
```

---

## 19. Conditional Rendering

Practiced rendering different UI depending on application state.

Examples:

```text
Loading
   ↓
Show loading message

Error
   ↓
Show error message

Data available
   ↓
Show content
```

Also implemented conditional buttons for the watchlist:

```text
Issue is saved
    ↓
Remove From Watchlist

Issue is not saved
    ↓
Add to Watchlist
```

---

## 20. Rendering Lists with `.map()`

Learned how API data can be converted into multiple React components.

Example:

```jsx
issues.map((issue) => (
  <IssueCard
    issue={issue}
    key={issue.id}
  />
))
```

This allows one reusable component to represent many API objects.

---

## 21. React Keys

Learned that dynamically rendered lists should have stable keys.

Example:

```jsx
key={issue.id}
```

The GitHub issue ID is used because it uniquely identifies the issue.

---

## 22. Component Decomposition

Instead of making `LangRepo` responsible for both fetching and displaying every repository detail, the UI was divided into smaller components.

For example:

```text
LangRepo
   ↓
Fetch repositories
   ↓
RepoCard
   ↓
Display one repository
```

Similarly:

```text
RepoIssues
   ↓
Fetch issues
   ↓
IssueCard
   ↓
Display one issue
```

This keeps components easier to understand and maintain.

---

## 23. GitHub API Integration

Integrated the GitHub API to retrieve:

- Repositories by programming language
- Open issues for a repository

Repository search:

```text
/search/repositories
```

Repository issues:

```text
/repos/{owner}/{repo}/issues
```

The API data is then stored in React state and rendered through reusable components.

---

## 24. Optional Chaining

Used optional chaining when dealing with API data.

Example:

```jsx
repo?.items?.map(...)
```

and:

```jsx
issue?.body
```

This helps prevent errors when a property may be missing or `null`.

---

## 25. Fallback Values

Learned to provide fallback content when API data is missing.

Example:

```jsx
issue?.body
  ? issue.body
  : "No Description Provided"
```

This is useful because GitHub issues can have a `null` body.

---

## 26. Object Comparison and IDs

While implementing the watchlist, learned that JavaScript objects are compared by reference.

For example:

```js
object1 === object2
```

is only true when both variables refer to the same object.

For the watchlist, comparing unique issue IDs is more reliable:

```jsx
prev.some((el) => el.id === issue.id)
```

---

# 🌐 Application Architecture

The current application roughly follows this structure:

```text
WatchlistProvider
        ↓
   RouterProvider
        ↓
      Layout
      /    \
   Header   Outlet
              ↓
      ┌───────┼────────┐
      ↓       ↓        ↓
    Home   LangRepo  RepoIssues
              ↓        ↓
          RepoCard  IssueCard
                         ↓
                    Watchlist
```

The `WatchlistProvider` sits above the routes so that multiple pages/components can access the same watchlist state.

---

# 🧠 Important React Lessons

### State vs Props

**Props**:

```text
Parent → Child
```

Used to pass data into a component.

**State**:

```text
Component → owns changing data
```

Used when data changes and should cause a re-render.

---

### Context vs URL State

Not every piece of state needs Context.

The selected language originally used Context, but after introducing routing it became available through:

```jsx
useParams()
```

Therefore:

```text
URL → selected language
```

was simpler than:

```text
Context → selected language
```

The watchlist is different because multiple unrelated parts of the application need access to it.

---

### Data Flow in the Project

The overall pattern learned so far is:

```text
User interaction
      ↓
React Router
      ↓
URL parameters
      ↓
useEffect
      ↓
GitHub API
      ↓
State
      ↓
map()
      ↓
Reusable component
      ↓
User interaction again
```

---

# 🚧 Concepts Planned for Later

The following concepts have **not been fully covered yet** and are planned for the next stages of the project:

- `useReducer`
- More advanced Context patterns
- `localStorage`
- Persisting the watchlist after page refresh
- Custom hooks beyond Context consumption
- API abstraction / reusable fetching logic
- Better component architecture
- Advanced error and empty states
- Performance optimization
- Final project cleanup and refactoring

---

# 🎯 Current Project Status

### Completed

- [x] React components
- [x] JSX
- [x] Props
- [x] `useState`
- [x] Lifting state
- [x] Prop drilling
- [x] Context API
- [x] Custom Context hook
- [x] React Router
- [x] Dynamic routes
- [x] `useParams`
- [x] `useEffect`
- [x] Fetch API
- [x] Async/Await
- [x] Loading states
- [x] Error handling
- [x] Conditional rendering
- [x] List rendering
- [x] React keys
- [x] Component decomposition
- [x] GitHub API integration
- [x] Repository exploration
- [x] Issue exploration
- [x] Watchlist Context
- [x] Add/remove watchlist functionality
- [x] Shared watchlist state
- [x] Watchlist page

### Next

- [ ] `useReducer`
- [ ] `localStorage`
- [ ] Custom hooks
- [ ] Refactoring and cleanup
- [ ] Final project polish
