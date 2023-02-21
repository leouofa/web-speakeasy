import s from './Footer.module.css';

import GitHub from 'components/icons/GitHub';
import { useUser } from '@/utils/useUser';

export default function Footer() {
  const { user } = useUser();

  return (
    <div>
      <>
        { user ? (
          <></>
        ) : (
          <footer className="mx-auto max-w-[1920px] px-6 bg-zinc-900">
            <div className="py-6 flex flex-col md:flex-row justify-between items-center space-y-4 bg-zinc-900">
              <div>&copy; 2023 <span className="text-white font-bold">WEB<span className="text-green-500">SPEAKEASY</span><span className="font-extralight">*</span></span>
              </div>
              <div className="flex items-center">
                <a
                  aria-label="Github Repository"
                  href="https://github.com/leouofa/webspeakeasy"
                >
                  <GitHub />
                </a>
              </div>
            </div>
          </footer>
        )}
      </>
    </div>
  );
}
