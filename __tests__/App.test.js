import { render } from "@testing-library/react-native";
import { Provider } from 'react-redux';
import store from "Redux/Store";
import App from "../App";

describe("APP", () => {
    test("Renders Correctly", () => {
        render(<App />)
    })
    test("a", () => {
        // const { getByText } = render(<App />);
        const jso = render(
            <Provider store={store}>
                <App />
            </Provider>
        )
        store.getState()
        console.log(store.getState())
        // console.log(jso.children[0])
        // console.log(jso.children[0].children[0])
        // console.log(jso.children[0].children[0].children)
        // console.log(jso.children[0].children[0].children[0])
        // console.log(jso.debug)
    })
})