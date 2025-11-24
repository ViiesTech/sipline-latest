import React, { createContext, createRef, useContext } from 'react';

export const navigationRef = createRef();

const NavigationContext = createContext({
    navigate: () => {},
    navigationRef,
});

const navigate = (name, params) => {
    if (navigationRef.current && name) {
        navigationRef.current.navigate(name, params);
    }
};

export function NavigationProvider({ children }) {
    return (
        <NavigationContext.Provider value={{ navigate, navigationRef }}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation() {
    return useContext(NavigationContext);
}
