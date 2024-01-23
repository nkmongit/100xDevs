````markdown
# React Suspense and Data Fetching

In React 16.6, the `Suspense` component was introduced to handle loading states,
similar to how `ErrorBoundary` handles errors. `Suspense` can render a fallback
UI while the app is loading JavaScript or fetching data via API. The following
example demonstrates its usage:

```jsx
function ProfilePage({ resource }) {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
    </Suspense>
  );
}
```
````

This allows rendering "Loading profile..." while `ProfileDetails` is loading and
"Loading posts..." while `ProfileTimeline` is loading. It helps control the
timing of component rendering, skip rendering while loading, and avoid race
conditions.

## How `Suspense` Works

`Suspense` catches promises thrown from its children, rendering a fallback while
the promise is pending, and unblocking the children when the promise is
resolved. It works similarly to `ErrorBoundary` but handles promises instead.

Example using `React.lazy`:

```jsx
const LazyComponent = React.lazy(() => import("./Component"));
<Suspense fallback={<h1>Loading component</h1>}>
  <LazyComponent />
</Suspense>;
```

A simplified version of `React.lazy` source code is provided.

## API Criteria for `Suspense`

For `Suspense` to work, the API needs to:

1. Trigger a `Promise` that loads the data.
2. Throw the `Promise` while loading.
3. Cache the result and return it when the `Promise` is resolved.

## Data Fetching with `Suspense`

Implementing data fetching for `Suspense` involves converting `fetch` into a
suspense-compatible API. The example introduces a `suspenseFetch` function and
mentions the `use-async-resource` package, which can turn `fetch` into a
suspense-compatible API.

```jsx
// Example of suspenseFetch function
const suspenseFetch = async (url) => {
  // ... implementation
};

// Example using use-async-resource
const { data, error, status } = useAsyncResource(() =>
  suspenseFetch("api/data")
);
```

## Conclusion

`Suspense` is a powerful concept that makes error handling and asynchronous
operations declarative. It is supported at the React level, ensuring stability
and ease of handling in the future. Note that the Apollo GraphQL client does not
support the `Suspense` API, but we can expect more libraries in the React
ecosystem to adopt `Suspense` in the future.

```
```
