export const handleLoginSubmit = async({email, password, setError, onSuccess}) => {
    try {
        const response = await loginApi(email, password);
        onSuccess(response);
    } catch (error) {
        setError(error.message);
    }
}