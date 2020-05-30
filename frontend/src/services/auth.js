const Token_Key = "@user_token"
export const isAuthenticated = () => localStorage.getItem(Token_Key) !== null;
export const getToken = () => localStorage.getItem(Token_Key)
export const login = token => localStorage.setItem(Token_Key, token)
export const logout = () => localStorage.removeItem(Token_Key)
