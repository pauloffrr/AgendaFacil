export interface CustomerModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit?: (description: string, rating: number) => void;
}