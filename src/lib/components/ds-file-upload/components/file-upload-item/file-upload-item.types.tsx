export interface FileUploadItemProps {
	/** Unique identifier for the file */
	id: string;
	/** Name of the file */
	name: string;
	/** Upload progress percentage (0-100) */
	progress: number;
	/** Whether to show progress text during upload */
	showProgress?: boolean;
	/** Current status of the file upload */
	status: 'pending' | 'uploading' | 'completed' | 'error' | 'interrupted';
	/** Array of error messages if any */
	errors?: string[];
	/** Callback when cancel button is clicked */
	onCancel?: (fileId: string) => void;
	/** Callback when retry button is clicked */
	onRetry?: (fileId: string) => void;
	/** Callback when remove button is clicked */
	onRemove?: (fileId: string) => void;
	/** Callback when delete button is clicked */
	onDelete?: (fileId: string) => void;
}
