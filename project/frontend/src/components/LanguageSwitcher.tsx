import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup } from '@mui/material';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ButtonGroup size="small" aria-label="language switcher">
      <Button
        variant={i18n.language === 'en' ? 'contained' : 'outlined'}
        onClick={() => changeLanguage('en')}
      >
        EN
      </Button>
      <Button
        variant={i18n.language === 'ru' ? 'contained' : 'outlined'}
        onClick={() => changeLanguage('ru')}
      >
        RU
      </Button>
    </ButtonGroup>
  );
};

export default LanguageSwitcher; 