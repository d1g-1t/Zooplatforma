import s from './style.module.scss';
import { FooterProps } from './types';
import { copyrightText } from './constants';

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={`${s.footer} ${className ? className : ''}`}>
      <p className={s.copyright}>{copyrightText}</p>
    </footer>
  );
};

export default Footer;
