class SessionHelper{
    setToken(token) {
        localStorage.setItem("token", token)
    }
    getToken() {
        return localStorage.getItem("token")
    }
 

    setUserDetails(UserDetails) {
        localStorage.setItem("UserDetails", JSON.stringify(UserDetails))
    }
    getUserDetails() {
        return JSON.parse(localStorage.getItem("UserDetails"))
    }
    setEmail(email) {
        localStorage.setItem("Email", email)
    }
    getEmail() {
        return localStorage.getItem("Email")
    }
    setCart(cartItems) {
        localStorage.setItem("cart", JSON.stringify(cartItems))

    }
    getCart() {
        return JSON.parse(localStorage.getItem("cart"))
    }
    removeCart() {
        return localStorage.removeItem("cart")
    }

    removeSessions = () => {
        localStorage.clear();
        window.location.href="/login"
    }

    
}

export const {setEmail, getEmail, setToken, getToken, setUserDetails, getUserDetails,setCart,getCart,removeCart,removeSessions} = new SessionHelper()