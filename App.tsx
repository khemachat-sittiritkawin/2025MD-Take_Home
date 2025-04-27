import { HomeScreen } from "./screens/HomeScreen";
import { TaskChallengeScreen, TaskChallengeScreenProps } from "./screens/TaskChallengeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ChallengeEditorScreen, ChallengeEditorScreenProps } from "./screens/ChallengeEditorScreen";

export type RootStackParamList = {
    Home: undefined;
    Challenge: TaskChallengeScreenProps;
    Editor: ChallengeEditorScreenProps;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Challenge" component={TaskChallengeScreen} />
                <Stack.Screen name="Editor" component={ChallengeEditorScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
