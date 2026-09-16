import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: 'white' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10, marginBottom: 5 },
  inputError: { borderColor: '#d73a4a' },
  errorText: { color: '#d73a4a', marginBottom: 10 },
  button: { backgroundColor: '#0366d6', borderRadius: 4, padding: 12, alignItems: 'center', marginTop: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

const initialValues = { username: '', password: '', passwordConfirmation: '' };

const validationSchema = yup.object().shape({
  username: yup.string().min(5, 'Username must be at least 5 characters').max(30, 'Username must be at most 30 characters').required('Username is required'),
  password: yup.string().min(5, 'Password must be at least 5 characters').max(50, 'Password must be at most 50 characters').required('Password is required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Password confirmation is required'),
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        await signUp({ username, password });
        await signIn({ username, password });
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    },
  });

  const err = (f) => formik.touched[f] && formik.errors[f];

  return (
    <View style={styles.container}>
      <TextInput style={[styles.input, err('username') && styles.inputError]} placeholder="Username" value={formik.values.username} onChangeText={formik.handleChange('username')} onBlur={formik.handleBlur('username')} />
      {err('username') && <Text style={styles.errorText}>{formik.errors.username}</Text>}
      <TextInput style={[styles.input, err('password') && styles.inputError]} placeholder="Password" secureTextEntry value={formik.values.password} onChangeText={formik.handleChange('password')} onBlur={formik.handleBlur('password')} />
      {err('password') && <Text style={styles.errorText}>{formik.errors.password}</Text>}
      <TextInput style={[styles.input, err('passwordConfirmation') && styles.inputError]} placeholder="Password confirmation" secureTextEntry value={formik.values.passwordConfirmation} onChangeText={formik.handleChange('passwordConfirmation')} onBlur={formik.handleBlur('passwordConfirmation')} />
      {err('passwordConfirmation') && <Text style={styles.errorText}>{formik.errors.passwordConfirmation}</Text>}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
