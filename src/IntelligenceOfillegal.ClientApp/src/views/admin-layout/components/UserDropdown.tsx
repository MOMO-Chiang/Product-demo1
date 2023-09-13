import { FC } from 'react';
import { NavDropdown } from '@src/components/nav-dropdown';
import demoAvatarImg from '@src/assets/images/demo-avatar.png';
import { useAuth } from '@src/modules/auth';
import { useNavigation } from '@src/libs/router';
import { RoutePath } from '@src/app';

export interface UserDropdownProps {}

export const UserDropdown: FC<UserDropdownProps> = () => {
  const { logout, user } = useAuth();
  const navigation = useNavigation();

  return (
    <NavDropdown className="user-dropdown">
      <NavDropdown.Toggle className="user-dropdown-toggle">
        <div className="user-dropdown-greeting">{user?.username}</div>
        <div className="user-dropdown-avatar">
          {/* <img src={demoAvatarImg} alt="Avatar" /> */}
          <i className="fa-xl fas fa-user"></i>
        </div>
      </NavDropdown.Toggle>
      <NavDropdown.Menu>
        {/* <NavDropdown.Link>
          <i className="fa-solid fa-user"></i>
          <span className="ms-2">個人資訊</span>
        </NavDropdown.Link>
        <NavDropdown.Link>
          <i className="fa-solid fa-key"></i>
          <span className="ms-2">更改密碼</span>
        </NavDropdown.Link>
        <NavDropdown.Divider /> */}
        <NavDropdown.Link
          onClick={async () => {
            await logout();
            navigation.replace(RoutePath.LOGIN);
          }}
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span className="ms-2">登出</span>
        </NavDropdown.Link>
      </NavDropdown.Menu>
    </NavDropdown>
  );
};
