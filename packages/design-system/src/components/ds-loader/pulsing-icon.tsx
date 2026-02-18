import styles from './ds-loader.module.scss';

const PulsingIcon = () => (
	<svg
		className={styles.pulsingIcon}
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle className={styles.pulsingOuter} cx="12" cy="12" r="8" />
		<circle className={styles.pulsingInner} cx="12" cy="12" r="5.5" />
	</svg>
);

export default PulsingIcon;
