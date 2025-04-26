import { HomeScreen } from "./screens/HomeScreen";
import { TaskChallengeScreen } from "./screens/TaskChallengeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Challenge" component={TaskChallengeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
