"use client";
import React from "react";
import "./globals.css";

import HomeComponent from "./slidebar/Home";
import { useModelContext } from "./context/Context";

export default function Home() {
    const { isSignedUp } = useModelContext();
    
    
   

    return (
        <div>

            
            <HomeComponent />
        </div>
    );

}
