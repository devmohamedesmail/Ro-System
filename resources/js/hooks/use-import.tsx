import React from 'react'
import { useTranslation } from 'react-i18next'

export default function useImport() {
    const {t,i18n}=useTranslation();
  return {
    t,
    i18n
  }
}
