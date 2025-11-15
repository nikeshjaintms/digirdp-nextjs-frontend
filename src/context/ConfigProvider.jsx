"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState(null);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/configurations`
                );
                setConfig(response.data);
            } catch (error) {
                console.error("Error fetching configuration:", error);
            } finally {
                // setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    return (
        <ConfigContext.Provider value={{ config }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);
