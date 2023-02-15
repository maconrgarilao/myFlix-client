import React from "react";
import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import { store } from "./redux/store";
import { Provider } from "react-redux";

//import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";
import { Provider } from "react-redux";

//main component (will eventually use all the others)
const MyFlixApplication = () => {
    return (
        <Provider store={store}>
        <Container>
            <MainView />
        </Container>
        </Provider>
    );
};

//finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

//tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);