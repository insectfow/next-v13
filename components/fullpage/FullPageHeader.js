import Image from 'next/image';
import Link from 'next/link';
import HeaderLogo from '../../public/favicon.svg';

export default function FullPageHeader() {
  return (
    <div className="fullpage-logo">
      <Link href="/">
        <Image src={HeaderLogo} width={60} height={60} alt="logo image" />
      </Link>
    </div>
  );
}
