import React from 'react'
import styles from '../styles/Cards.module.css'

export default function Card({children}) {
  return (
    <div className={styles.card}>
      {children}
    </div>
  )
}
