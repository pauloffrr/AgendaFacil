export type SectionProps = {
    label: string;
};

export type SectionDefinition = {
    key: string;
    label: string;
    component: React.ComponentType<SectionProps>;
};