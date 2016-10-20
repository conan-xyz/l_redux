let store = createStore(todoApp);
let rootElement = document.getElementById('root');


render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);