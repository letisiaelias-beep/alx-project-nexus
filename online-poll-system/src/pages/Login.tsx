const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, currentUser } = useAppSelector((state) => state.users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      navigate("/dashboard"); 
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={...} />
      <input value={password} onChange={...} />
      <button type="submit" disabled={loading}>Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};
