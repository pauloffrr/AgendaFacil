export interface CustomerReviewModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit?: (description: string, rating: number) => void;
};