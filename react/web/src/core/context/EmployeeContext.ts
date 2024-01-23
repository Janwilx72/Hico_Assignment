
import { createContext } from "react";
import { EmployeeContextType } from "../types/EmployeeContextType";

export const EmployeeContext = createContext<EmployeeContextType | null>(null);
