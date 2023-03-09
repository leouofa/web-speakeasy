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
          <footer className="mx-auto max-w-7xl px-6 bg-black">
            <div className="py-6 flex flex-col md:flex-row justify-between items-center space-y-4 font-extralight">
              <div>&copy; 2023 &nbsp;
                <span className="font-white">WEB
                  <span className=""> | SPEAKEASY</span>
                </span>
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
