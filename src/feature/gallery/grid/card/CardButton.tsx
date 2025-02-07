import { IconButton } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import styles from "./card-button.module.css";

export default function CardButton({ id }: { id: string }) {

  async function registerDownload() {
    try {
      await fetch(`/api/image/${id}/download`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      });
    } catch (error) {

    }
  }

  return (
    <div className={styles.card__buttons}>
      <IconButton
        className={styles.card__button}
        color="inherit"
        size="small"
        component="a"
        href={`/images/original/${id}.jpg`}
        download={`${id}.jpg`}
        onClick={registerDownload}
        rel="noopener noreferrer"
      >
        <SaveAltIcon className={styles.button__save} fontSize="small" />
      </IconButton>
      <IconButton
        className={styles.card__button}
        color="inherit"
        size="small"
        component="a"
        href={`/images/original/${id}.jpg`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <OpenInNewIcon className={styles.button__share} fontSize="small" />
      </IconButton>
    </div>
  );
}