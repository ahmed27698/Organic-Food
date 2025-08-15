'use client'; 
import { useLocale } from 'next-intl';
import { useRouter } from '../../i18n/navigation';
import { BsArrowDownShort } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
export default function LanguageSwitcher() {
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
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center gap-2 border-1 rounded-lg p-2 border-green-600">
        {languageNames[locale] || 'English'} <BsArrowDownShort/>
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
