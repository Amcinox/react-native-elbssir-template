import { RegisterOptions } from "react-hook-form"

export type Rules = Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
export interface RulesGroup {
    [key: string]: Rules
}