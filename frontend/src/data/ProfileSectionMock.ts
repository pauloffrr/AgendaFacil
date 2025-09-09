import { AddressSection } from "@/src/components/sections/AddressSection";
import { PersonalDataSection } from "@/src/components/sections/PersonalDataSection";
import { CompanyDataSection } from "@/src/components/sections/CompanyDataSection";
import { ProfessionDataSection } from "@/src/components/sections/ProfessionDataSection";
import { LoginDataSection } from "@/src/components/sections/LoginDataSection";
import { SectionDefinition } from "@/src/types/ProfileSectionType";

export const profileSectionsForClient: SectionDefinition[] = [
    { 
        key: "address", 
        label: "Endereço", 
        component: AddressSection 
    },
    { 
        key: "personal", 
        label: "Dados Pessoais", 
        component: PersonalDataSection
    },
    { 
        key: "login", 
        label: "Dados de Login", 
        component: LoginDataSection
    }
];

export const profileSectionsForCompany: SectionDefinition[] = [
    { 
        key: "address", 
        label: "Endereço", 
        component: AddressSection 
    },
    { 
        key: "company", 
        label: "Dados da Empresa", 
        component: CompanyDataSection
    },
    { 
        key: "profession", 
        label: "Dados da Profissão", 
        component: ProfessionDataSection
    },
    { 
        key: "login", 
        label: "Dados de Login", 
        component: LoginDataSection
    }
];