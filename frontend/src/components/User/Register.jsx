import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../../actions/userAction';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
 // For password strength estimation

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: "",
        email: "",
        gender: "",
        password: "",
        cpassword: "",
    });

    const { name, email, gender, password, cpassword } = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("preview.png");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
  

    const handleRegister = async (e) => {
        e.preventDefault();

        
        if (password.length < 8) {
            enqueueSnackbar("Password length must be at least 8 characters", { variant: "warning" });
            return;
        }
        if (password !== cpassword) {
            enqueueSnackbar("Passwords do not match", { variant: "error" });
            return;
        }
        if (!avatar) {
            enqueueSnackbar("Please select an avatar", { variant: "error" });
            return;
        }

      

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("gender", gender);
        formData.set("password", password);
        formData.set("avatar", avatar);

        dispatch(registerUser(formData));
    };

    const handleDataChange = (e) => {
        if (e.target.name === "avatar") {
            const file = e.target.files[0];
            if (file && file.size > 1024 * 1024) { // 1MB limit
                enqueueSnackbar("File size should be less than 1MB", { variant: "error" });
                return;
            }
            if (file && !file.type.startsWith("image/")) {
                enqueueSnackbar("Please upload a valid image file", { variant: "error" });
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });

           
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/');
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    const getPasswordStrengthColor = (strength) => {
        switch (strength) {
            case 0:
                return "red";
            case 1:
                return "orange";
            case 2:
                return "yellow";
            case 3:
                return "lightgreen";
            case 4:
                return "green";
            default:
                return "red";
        }
    };

    return (
        <>
            <MetaData title="Register | Flipkart" />

            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">
                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
                    <FormSidebar
                        title="Looks like you're new here!"
                        tag="Sign up with your mobile number to get started"
                    />

                    <div className="flex-1 overflow-hidden">
                        <form
                            onSubmit={handleRegister}
                            encType="multipart/form-data"
                            className="p-5 sm:p-10"
                        >
                            <div className="flex flex-col gap-4 items-start">
                                <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                                    <TextField
                                        fullWidth
                                        id="full-name"
                                        label="Full Name"
                                        name="name"
                                        value={name}
                                        onChange={handleDataChange}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={handleDataChange}
                                        required
                                    />
                                </div>

                                <div className="flex gap-4 items-center">
                                    <h2 className="text-md">Your Gender :</h2>
                                    <div className="flex items-center gap-6" id="radioInput">
                                        <RadioGroup
                                            row
                                            aria-labelledby="radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel name="gender" value="male" onChange={handleDataChange} control={<Radio required />} label="Male" />
                                            <FormControlLabel name="gender" value="female" onChange={handleDataChange} control={<Radio required />} label="Female" />
                                        </RadioGroup>
                                    </div>
                                </div>

                                <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                                    <TextField
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={handleDataChange}
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleClickShowPassword}>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        id="confirm-password"
                                        label="Confirm Password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="cpassword"
                                        value={cpassword}
                                        onChange={handleDataChange}
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleClickShowConfirmPassword}>
                                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>

                                <div className="w-full">
                                    <div
                                        style={{
                                            width: `${(passwordStrength + 1) * 25}%`,
                                            height: "5px",
                                            backgroundColor: getPasswordStrengthColor(passwordStrength),
                                            transition: "all 0.3s ease",
                                        }}
                                    ></div>
                                    <p className="text-sm text-gray-600">
                                        Password Strength: {["Very Weak", "Weak", "Fair", "Strong", "Very Strong"][passwordStrength]}
                                    </p>
                                </div>

                                <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                                    <Avatar
                                        alt="Avatar Preview"
                                        src={avatarPreview}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white w-full py-2 px-2.5 shadow hover:shadow-lg">
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleDataChange}
                                            className="hidden"
                                        />
                                        Choose File
                                    </label>
                                </div>

                                <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium">Signup</button>
                                <Link to="/login" className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium">Existing User? Log in</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            
        </>
    );
};

export default Register;