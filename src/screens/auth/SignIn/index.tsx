import React, { useState } from 'react';
import styles from './styles';
import Button from '../../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '../../../components/Title';
import Input from '../../../components/Input';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import RootStackParamList from '../../../types/RootStackParamList';
import { useNavigation } from '@react-navigation/native';
import { User } from '../../../types/User';
import auth from '@react-native-firebase/auth';
import ButtonType from '../../../enums/buttonType';
import colors from '../../../constants/colors';

type SignInNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

function SignIn(): React.JSX.Element {
    const navigation = useNavigation<SignInNavigationProp>();
    const [user, setUser] = useState<User>({ firstName: '', lastName: '', email: '', password: '', conformedPassword: '' });
    const [loading, setLoading] = useState<boolean>(false);

    const onChange = (value: string, key: string) => {
        setUser(vals => ({
            ...vals,
            [key]: value,
        }));
    };

    const onSubmit = () => {
        if (!areEmailAndPasswordNotEmpty()) {
            return;
        }
        setLoading(true);
        auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
                console.log('User signed in!');
                setLoading(false);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                    Alert.alert('That email address is invalid!');
                }
                else {
                    Alert.alert(error.message);
                }
            });
    };

    const areEmailAndPasswordNotEmpty = (): boolean => {
        if (isValueEmpty(user.password)) {
            Alert.alert('Please enter your password');
            return false;
        }
        if (isValueEmpty(user.email)) {
            Alert.alert('Please enter your password');
            return false;
        }
        return true;
    };

    const isValueEmpty = (val: string) => {
        if (val === '' || val === null || val === undefined) {
            return true;
        }
        return false;
    };


    return <SafeAreaView style={styles.container}>
        <Title>Welcome back!</Title>
        <Input onChangeText={(val) => onChange(val, 'email')} placeholder={'Email'} keyboardType="email-address" />
        <Input onChangeText={(val) => onChange(val, 'password')} placeholder={'Password'} secureTextEntry />
        <Button onPress={onSubmit} type={ButtonType.Secondary}>Log in</Button>
        <Text style={styles.footerText}>Not registered?
            <Text style={styles.footerLink} onPress={() => navigation.navigate('SignUp')}> Sign up!</Text>
        </Text>
        {loading && <View><ActivityIndicator size="large" color={colors.CharlestonGreen} /></View>}
    </SafeAreaView>;
}

export default React.memo(SignIn);
