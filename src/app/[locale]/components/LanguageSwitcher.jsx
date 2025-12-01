'use client'; 
import { useLocale } from 'next-intl';
import { useRouter } from '../../../i18n/navigation';
import { BsArrowDownShort } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const languageNames = {
    en: 'English',
    ar: 'العربية',
    es: 'Español',
    fr: 'Français',
    zh: '中文'
  };
  const router = useRouter();

  const changeLanguage = (locale) => {
    router.push('/', { locale });
    setIsOpen(false); 
  };
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center justify-center cursor-pointer hover:text-green-600 font-bold gap-2 rounded-lg p-2 outline-0">
        {languageNames[locale] || 'English'} 
        <BsArrowDownShort className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => changeLanguage('ar')}>
          العربية
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('es')}>
          Español
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('fr')}>
          Français
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('zh')}>
          中文
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}