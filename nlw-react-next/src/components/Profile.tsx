import styles from '../styles/components/Profile.module.css'

export function Profile() {
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/GuilhermRodrigues.png" alt="Guilherme Rodridgues"/>
            <div>
                <strong>Guilherme Rodrigues</strong>
                <p>Level 1</p>
            </div>

        </div>
    );
} 