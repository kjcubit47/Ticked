import store from "Redux/Store";
describe('State', () => {
    beforeEach(() => {
        store.dispatch({ type: "RESET_STATE" })
    })


    test("Add List", () => {
        store.dispatch({ type: "ADD_LIST", payload: { title: "TEST-LIST", id: 0, sublist: [] } })
        let listCount = store.getState().listReducer.lists.length
        let testList = store.getState().listReducer.lists[0]
        expect(listCount).toEqual(1)
        expect(testList.title).toEqual("TEST-LIST")
        expect(testList.id).toEqual(0)
        expect(testList.sublist.length).toEqual(0)
    })
    test("Delete List", () => {
        store.dispatch({ type: "ADD_LIST", payload: { title: "TEST-LIST", id: 0, sublist: [] } })
        let listCount = store.getState().listReducer.lists.length
        expect(listCount).toEqual(1)
        store.dispatch({ type: "DELETE_LIST", payload: 0 })
        listCount = store.getState().listReducer.lists.length
        expect(listCount).toEqual(0)
    })
    test("Update List Name", () => {
        store.dispatch({ type: "ADD_LIST", payload: { title: "TEST-LIST", id: 0, sublist: [] } })
        let list = store.getState().listReducer.lists[0]
        expect(list.title).toEqual("TEST-LIST")
        store.dispatch({ type: "UPDATE_LIST_NAME", payload: { id: 0, title: "NEW-TITLE" } })
        list = store.getState().listReducer.lists[0]
        expect(list.title).toEqual("NEW-TITLE")

    })
})