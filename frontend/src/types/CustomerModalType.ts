export interface CustomerReviewModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit?: () => void;
    onSubmitReview?: (description: string, rating: number) => void;
};