import { AuthRoutes } from "./stack/AuthRoutes"
import { NavigationContainer } from '@react-navigation/native'


export function Router() {
    return (
        <NavigationContainer>
            <AuthRoutes />
        </NavigationContainer>
    )
}