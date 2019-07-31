export function getNavigationService(history: any) {    
    return {
        goToRental: (id: string) => history.push(`/rental/${id}`)
    };
}