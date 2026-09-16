import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: 'white' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10, marginBottom: 5 },
  inputError: { borderColor: '#d73a4a' },
  errorText: { color: '#d73a4a', marginBottom: 10 },
  button: { backgroundColor: '#0366d6', borderRadius: 4, padding: 12, alignItems: 'center', marginTop: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

const initialValues = { ownerName: '', repositoryName: '', rating: '', text: '' };

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: yup.string(),
});

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await createReview(values);
        navigate(`/${data.createReview.repositoryId}`);
      } catch (e) {
        console.log(e);
      }
    },
  });

  const err = (f) => formik.touched[f] && formik.errors[f];

  return (
    <View style={styles.container}>
      <TextInput style={[styles.input, err('ownerName') && styles.inputError]} placeholder="Repository owner name" value={formik.values.ownerName} onChangeText={formik.handleChange('ownerName')} onBlur={formik.handleBlur('ownerName')} />
      {err('ownerName') && <Text style={styles.errorText}>{formik.errors.ownerName}</Text>}
      <TextInput style={[styles.input, err('repositoryName') && styles.inputError]} placeholder="Repository name" value={formik.values.repositoryName} onChangeText={formik.handleChange('repositoryName')} onBlur={formik.handleBlur('repositoryName')} />
      {err('repositoryName') && <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>}
      <TextInput style={[styles.input, err('rating') && styles.inputError]} placeholder="Rating between 0 and 100" value={formik.values.rating} onChangeText={formik.handleChange('rating')} onBlur={formik.handleBlur('rating')} keyboardType="numeric" />
      {err('rating') && <Text style={styles.errorText}>{formik.errors.rating}</Text>}
      <TextInput style={[styles.input, err('text') && styles.inputError]} placeholder="Review" multiline value={formik.values.text} onChangeText={formik.handleChange('text')} onBlur={formik.handleBlur('text')} />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;