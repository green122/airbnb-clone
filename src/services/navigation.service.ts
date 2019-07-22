import { createBrowserHistory } from "history";



export function getNavigationService() {
    const history = createBrowserHistory();
    return {
        goToRental: (id: string) => history.push(`rental/${id}`)
    };
}