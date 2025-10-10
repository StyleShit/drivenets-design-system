import React from 'react';
import classNames from 'classnames';
import { FileUpload } from '@ark-ui/react';
import { DsIcon } from '../ds-icon';
import { DsTypography } from '../ds-typography';
import { DsButton } from '../ds-button';
import { FileUploadItem } from './components/file-upload-item';
import { DsFileUploadProps } from './ds-file-upload.types';
import {
	DEFAULT_ALLOWED_FILE_TYPES,
	DEFAULT_MAX_FILE_SIZE,
	DEFAULT_MAX_FILES,
	generateHelperText,
} from './utils';
import styles from './ds-file-upload.module.scss';

/**
 * Design system File Upload component using Ark UI
 * Used in conjunction with the useFileUpload hook
 */
const DsFileUpload: React.FC<DsFileUploadProps> = ({
	style = {},
	className,
	files,
	acceptedFiles,
	errorText,
	dropzoneText = 'Drag and drop files here or ',
	triggerText = 'Select file...',
	showProgress = false,
	allowDrop = true,
	onFileAccept,
	onFileReject,
	onRemove,
	accept = DEFAULT_ALLOWED_FILE_TYPES,
	maxFiles = DEFAULT_MAX_FILES,
	maxFileSize = DEFAULT_MAX_FILE_SIZE,
	compact = false,
	disabled = false,
}) => {
	const infoText = generateHelperText(accept, maxFileSize, maxFiles);

	return (
		<FileUpload.Root
			style={style}
			className={classNames(styles.fileUploadRoot, className)}
			maxFiles={maxFiles}
			maxFileSize={maxFileSize}
			accept={accept}
			disabled={disabled}
			allowDrop={allowDrop}
			acceptedFiles={acceptedFiles}
			onFileAccept={onFileAccept}
			onFileReject={onFileReject}
		>
			<FileUpload.Dropzone
				className={classNames(styles.dropzone, {
					[styles.dropzoneCompact]: compact,
				})}
			>
				<DsIcon icon="upload" className={styles.dropzoneIcon} />
				<DsTypography className={styles.dropzoneText} variant="body-xs-reg">
					{dropzoneText}
				</DsTypography>
				<FileUpload.Trigger asChild>
					<DsButton design="v1.2" variant="ghost" size="small" disabled={disabled}>
						{triggerText}
					</DsButton>
				</FileUpload.Trigger>
			</FileUpload.Dropzone>

			{infoText && !disabled && !errorText && (
				<DsTypography className={styles.infoText} variant="body-xs-reg">
					{infoText}
				</DsTypography>
			)}
			{errorText && (
				<DsTypography className={styles.errorText} variant="body-xs-reg">
					<DsIcon icon="error" size="tiny" />
					{errorText}
				</DsTypography>
			)}

			{files && files.length > 0 && (
				<div className={styles.fileList}>
					{files.map((uploadFile) => (
						<FileUploadItem
							key={uploadFile.id}
							id={uploadFile.id}
							name={uploadFile.name}
							progress={uploadFile.progress}
							showProgress={showProgress}
							status={uploadFile.status}
							errors={uploadFile.errors}
							onRemove={onRemove}
						/>
					))}
				</div>
			)}

			<FileUpload.HiddenInput />
		</FileUpload.Root>
	);
};

export default DsFileUpload;
