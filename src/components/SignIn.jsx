import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: 'white' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10, marginBottom: 5 },
  inputError: { borderColor: '#d73a4a' },
  errorText: { color: '#d73a4a', marginBottom: 10 },
  button: { backgroundColor: '#0366d6', borderRadius: 4, padding: 12, alignItems: 'center', marginTop: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

const initialValues = { username: '', password: '' };

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const usernameError = formik.touched.username && formik.errors.username;
  const passwordError = formik.touched.password && formik.errors.password;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, usernameError && styles.inputError]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {usernameError && <Text style={styles.errorText}>{formik.errors.username}</Text>}
      <TextInput
        style={[styles.input, passwordError && styles.inputError]}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />
      {passwordError && <Text style={styles.errorText}>{formik.errors.password}</Text>}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
