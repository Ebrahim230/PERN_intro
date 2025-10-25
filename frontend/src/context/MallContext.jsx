import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const MallContext = createContext();

const ContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const decodeToken = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch {
            return null;
        }
    }
    const decoded = token ? decodeToken(token) : null;
    const userId = decoded ? decoded.id : null;
    const logoutUser = async () => {
        try {
            const res = await axios.post(`${serverUrl}/api/auth/logout`, {}, { headers: { Authorization: `Bearer ${token}` } });
            if (res.data.success) toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Session expired. Please login again.');
        } finally {
            localStorage.removeItem('token');
            setToken('');
            setCartItems({});
            navigate('/login');
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = formData
        try {
            setLoading(true)
            const endpoint = isLogin ? '/login' : '/register'
            const payload = isLogin ? { email, password } : { name, email, password }
            const res = await axios.post(`${serverUrl}/api/auth${endpoint}`, payload)
            if (res.data.success) {
                toast.success(res.data.message)
                setToken(res.data.token)
                localStorage.setItem('token', res.data.token)
                navigate('/')
            } else {
                toast.error(res.data.message)
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message)
        } finally {
            setLoading(false)
        }
    }

    const fetchCartData = async (jwtToken) => {
        if (!jwtToken) return null;
        // try {
        //     const res = await axios.post(
        //         `${serverUrl}/api/cart/get`,
        //         { userId: decodeToken(jwtToken)?.id },
        //         { headers: { Authorization: `Bearer ${jwtToken}` } }
        //     );
        //     if (res.data.success) setCartItems(res.data.cartData);
        // } catch (err) {
        //     console.log(err);
        //     toast.error(err.response?.data?.message || err.message);
        // }
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            fetchCartData(storedToken);
        }
    }, []);

    const addToCart = async (itemId, size) => {
        if (!size) return null;
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }
        setCartItems(cartData);
        // if (token) {
        //     try {
        //         await axios.post(
        //             `${serverUrl}/api/cart/add`,
        //             { userId: decodeToken(token)?.id, itemId, size },
        //             { headers: { Authorization: `Bearer ${token}` } }
        //         );
        //     } catch (err) {
        //         console.log(err);
        //         toast.error(err.response?.data?.message || err.message);
        //     }
        // }
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        if (!cartData[itemId]) return;
        if (quantity <= 0) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId][size] = quantity;
        }
        setCartItems(cartData);
        // if (token) {
        //     try {
        //         await axios.post(
        //             `${serverUrl}/api/cart/update`,
        //             { userId: decodeToken(token)?.id, itemId, size, quantity },
        //             { headers: { Authorization: `Bearer ${token}` } }
        //         );
        //     } catch (err) {
        //         console.log(err);
        //         toast.error(err.response?.data?.message || err.message);
        //     }
        // }
    }

    const getCartCount = () => {
        return Object.values(cartItems).reduce(
            (total, sizes) => total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
            0
        );
    }

    const getCartAmount = () => {
        let total = 0;
        for (const items in cartItems) {
            const product = products.find((p) => p._id === items);
            if (!product) continue;
            for (const size in cartItems[items]) {
                total += product.price * cartItems[items][size];
            }
        }
        return total;
    }

    const getProductsData = async () => {
        // try {
        //     const res = await axios.get(`${serverUrl}/api/product/list`);
        //     if (res.data.success) setProducts(res.data.products);
        //     else toast.error(res.data.message);
        // } catch (err) {
        //     console.log(err);
        //     toast.error(err.response?.data?.message || err.message);
        // }
    }

    useEffect(() => {
        getProductsData();
    }, []);

    const properties = {
        currency,
        delivery_fee,
        serverUrl,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        products,
        setProducts,
        token,
        setToken,
        navigate,
        userId,
        logoutUser,
        addToCart,
        updateQuantity,
        getCartCount,
        getCartAmount,
        handleSubmit,
        loading,
        formData,
        setFormData,
        isLogin, 
        setIsLogin
    }

    return (
        <MallContext.Provider value={properties}>
            {props.children}
        </MallContext.Provider>
    )
}

export default ContextProvider;