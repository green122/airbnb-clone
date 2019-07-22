export function getNavigator(props: any) : ({navigateTo: (path: string, params: any) => void} ) {
    return props && props.history.push;
}